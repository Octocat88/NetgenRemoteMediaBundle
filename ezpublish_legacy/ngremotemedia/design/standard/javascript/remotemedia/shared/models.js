/*global eZOeGlobalSettings, RemoteMediaShared*/
window.RemoteMediaShared || (window.RemoteMediaShared = {});

window.RemoteMediaShared.config = function() {

    var is_admin = typeof eZOeGlobalSettings !== 'undefined';
    this.user_id || ( this.user_id = $('[data-user-id]').data('user-id') );

    return {
        is_admin: is_admin,
        user_id: this.user_id,
        plupload_swf: is_admin ? '/extension/remotemedia/design/standard/javascript/libs/plupload/Moxie.swf' : eZExceed.config.plupload.flash_swf_url,
        currentObjectId: is_admin ? eZOeGlobalSettings.ez_contentobject_id : eZExceed.config.currentObjectId
    };
};


window.RemoteMediaShared.Models = function() {

    // var url = function() {
    //     // var args = ['remotemedia', 'media', this.id, this.get('version')];
    //     // if (arguments.length > 0) {
    //     //     args = ['remotemedia'].concat(_.toArray(arguments));
    //     // }
    //     console.warn(arguments);
    //     return ["/ezexceed/ngremotemedia/fetch", this.id, this.get('version')].join('/') // /90430/5
    //         // return args.join('/');
    // };


    // var find_version = function(versions, version_name){
    //     return _.find(versions, function(v){ v.name.toLowerCase() === version_name.toLowerCase(); });
    // };

    var Attribute = Backbone.Model.extend({
        urlRoot: null,
        medias: null,

        initialize: function() {
            _.bindAll(this);
            this.medias = new MediaCollection();
        },

        toScaleIndexed: function() {
            return _.reduce(this.get('toScale') || [], function(h, v) {
                h[v.name.toLowerCase()] = v;
                return h;
            }, {});
        },

        defaults: function() {
            return {
                content: false,
                media: new Media()
            };
        },

        url: function() {
            return ["/ezexceed/ngremotemedia/fetch", RemoteMediaShared.config().currentObjectId, this.id, this.get('version')].join('/'); // /90430/5
        },


        parse: function(data) {
            console.log(data);
            if ('media' in data) {
                data.media.attr = this;
                data.media = new Media(data.media, {
                    parse: true
                });
            }
            return data;
        },


        combined_versions: function() {
            var indexed = this.toScaleIndexed();
            return _.map(this.get('available_versions'), function(v) {
                v = $.extend({}, v);
                var exact_version = indexed[v.name.toLowerCase()];
                exact_version && (v.coords = exact_version.coords);
                return v;
            });
        },

        fetch: function(options) {
            options = options || ({});
            options.success = this.fetched;
            options.transform = false;
            return Backbone.sync('read', this, options);
        },

        fetched: function(response) {
            this.set(this.parse(response));
            this.trigger('fetched');
        },

        onScale: function(response) {
            this.trigger('scale', response);
        },


        change_media: function(id){
            var url = ["/standard/ngremotemedia/change", RemoteMediaShared.config().currentObjectId, this.id, this.get('version')].join('/');

            return this.save({}, {
                url: url,
                method: 'POST',
                data: {
                    resource_id: id, 
                    user_id: RemoteMediaShared.config().user_id
                } 
            });
        },

        // Create a new vanity url for a version
        // name should be a string to put on the back of the object name
        // coords should be an array [x,y,x2,y2]
        // size shoudl be an array [width,height]
        addVanityUrl: function(name, coords, size, options) {
            options = (options || {});
            var data = {
                name: name
            };

            if (coords) {
                data.crop_x = Math.round(coords[0]);
                data.crop_y = Math.round(coords[1]);
                data.crop_w = Math.round(coords[2] - coords[0]);
                data.crop_h = Math.round(coords[3] - coords[1]);
            }

            if (_(options).has('media')) {
                data.mediaId = options.media.id;
                data.remotemediaId = options.media.get('remotemediaId');
            } else {
                var media = this.get('media');
                data.mediaId = media.id;
                data.remotemediaId = media.get('remotemediaId');
            }

            // var id = this.id !== "ezoe" ? this.id : this.get('attributeId');
            // var url = this.url('saveVersion', id, this.get('version'));

            var url = ["/ezexceed/ngremotemedia/save", RemoteMediaShared.config().currentObjectId, this.id, this.get('version')].join('/'); // /90430/5

            return Backbone.sync('create', {
                url: url
            }, {
                data: data,
                transform: false
            });
        }
    });


    var Media = Backbone.Model.extend({
        urlRoot: '',

        initialize: function(options) {
            options = (options || {});
            _.bindAll(this);
            if ('urlRoot' in options) {
                this.urlRoot = options.urlRoot;
                delete options.urlRoot;
            }
        },

        parse: function(data) {
            data.id = data.resourceId;
            data.file = _.extend({}, data.metaData); //Create alias for metaData            
            delete(data.metaData); //TODO: rename on server
            data.file.type = data.file.resource_type;
            data.tags = new Backbone.Collection(_.map(data.file.tags, function(tag) {
                return {
                    id: tag,
                    tag: tag
                };
            }));
            return data;
        },

        url: false,


        tags_url: function() {
            var attr = this.get('attr');
            return ['/ezexceed/ngremotemedia/tags', RemoteMediaShared.config().currentObjectId, attr.id, attr.get('version')].join('/');
        },


        add_tag: function(tag_name) {
            return Backbone.sync('create', this, {
                transform: false,
                url: this.tags_url(),
                data: {
                    id: this.get('resourceId'), //this.get('attr').get('media').get('resourceId'),
                    tag: tag_name
                }
            });
        },


        remove_tag: function(tag_name) {
            console.log('remove_tag');
            return Backbone.sync('delete', this, {
                transform: false,
                method: 'DELETE',
                url: this.tags_url(),
                data: {
                    id: this.get('resourceId'),
                    tag: tag_name
                }
            });
        },


        // Generate thumb url for a given size
        thumb: function(width, height, filetype) {
            filetype = (filetype || 'jpg');
            // return this.domain() + '/' + width + 'x' + height + '/' + this.id + '.' + filetype;
            // http://res.cloudinary.com/netgentest/image/upload/v1454075723/phpb3r2JI/5.jpg
            var url = this.get('url').split(/\/v\d+\//);
            return [url[0], 'w_' + width + ',h_' + height, url[1]].join("/");
        }
    });

    var MediaCollection = Backbone.Collection.extend({
        model: Media,

        // Must end in trailing slash
        urlRoot: '/',
        attr: null,
        total: 0,
        q: '',
        limit: 25,
        remotemediaId: null,
        xhr: null,

        initialize: function() {
            _.bindAll(this);
        },

        url: function() {
            return ['/ezexceed/ngremotemedia/browse', RemoteMediaShared.config().currentObjectId, this.id, this.version].join('/');
        },

        transformUrl: false,


        search: function(q, data) {
            data = (data ||  {});
            if (typeof q === 'string') {
                this.q = q;
                data.q = q;
            }
            data.limit = this.limit;
            data.user_id = RemoteMediaShared.config().user_id;
            
            if (this.xhr && typeof this.xhr.abort === 'function') {
                this.xhr.abort();
            }
            this.xhr = this.fetch({
                data: data,
                reset: true
            });
            return this.xhr;
        },

        fetched: function() {
            this.trigger('fetched');
            this.xhr = null;
        },

        parse: function(data) {
            if ('remotemediaId' in data) {
                this.remotemediaId = data.remotemediaId;
            }
            if ('results' in data) {
                this.total = data.results.total;
                data = data.results.hits;
            }
            return data;
        },

        page: function() {
            if (this.length < this.total) {
                var data = {
                    limit: this.limit,
                    offset: this.length,
                    q: this.q
                };

                return Backbone.sync('read', {
                    url: this.url()
                }, {
                    data: data,
                    transform: false
                }).done(this.paged);
            }
            return false;
        },

        paged: function(data) {
            this.add(this.parse(data));
        }
    });


    return {
        Media: Media,
        Attribute: Attribute,
        MediaCollection: MediaCollection
    };

};