(function(e){function t(t){for(var n,r,o=t[0],l=t[1],d=t[2],u=0,p=[];u<o.length;u++)r=o[u],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&p.push(i[r][0]),i[r]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);c&&c(t);while(p.length)p.shift()();return s.push.apply(s,d||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],n=!0,o=1;o<a.length;o++){var l=a[o];0!==i[l]&&(n=!1)}n&&(s.splice(t--,1),e=r(r.s=a[0]))}return e}var n={},i={editor_plugin:0},s=[];function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=n,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var d=0;d<o.length;d++)t(o[d]);var c=l;s.push(["c925","chunk-vendors"]),a()})({"184d":function(e,t,a){"use strict";var n=a("94cc"),i=a.n(n);i.a},"1be4":function(e,t,a){},"1f12":function(e,t,a){"use strict";var n=a("20b0"),i=a.n(n);i.a},"20b0":function(e,t,a){},"3fb5":function(e,t,a){},"48a2":function(e,t,a){},6212:function(e,t,a){},"84d8":function(e,t,a){},"89cc":function(e,t,a){"use strict";var n=a("ef9e"),i=a.n(n);i.a},"8a3f":function(e,t,a){},"94cc":function(e,t,a){},"9ca3":function(e,t,a){"use strict";var n=a("6212"),i=a.n(n);i.a},ad0a:function(e,t,a){},b39d:function(e,t){Array.prototype.difference||(Array.prototype.difference=function(e){return this.filter((function(t){return e.indexOf(t)<0}))})},c925:function(e,t,a){"use strict";a.r(t);a("8e6e"),a("ac6a"),a("456d");var n=a("bd86"),i=(a("cadf"),a("551c"),a("f751"),a("097d"),a("a026")),s=(a("3fb5"),a("6107"),function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("preview",{ref:"preview",attrs:{"field-id":e.fieldId,base:e.base,"selected-image":e.selectedImage}}),a("div",{staticClass:"ngremotemedia-buttons",attrs:{id:"ngremotemedia-buttons-"+e.fieldId,"data-id":e.fieldId,"data-contentobject-id":e.contentObjectId,"data-version":e.version}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedImage.id,expression:"selectedImage.id"}],staticClass:"media-id",attrs:{type:"hidden",name:e.base+"_media_id_"+e.fieldId},domProps:{value:e.selectedImage.id},on:{input:function(t){t.target.composing||e.$set(e.selectedImage,"id",t.target.value)}}}),e.isCroppable?a("input",{staticClass:"ngremotemedia-scale hid button",attrs:{type:"button",value:e.translations.interactions_scale},on:{click:e.handleCropClicked}}):e._e(),e.selectedImage.id?a("input",{staticClass:"ngremotemedia-remove-file button",attrs:{type:"button",value:e.translations.interactions_remove_media},on:{click:e.handleRemoveMediaClicked}}):e._e(),a("input",{staticClass:"ngremotemedia-remote-file button",attrs:{type:"button",value:e.translations.interactions_manage_media},on:{click:e.handleBrowseMediaClicked}}),a("div",{staticClass:"ngremotemedia-local-file-container"},[a("button",{staticClass:"btn btn-default ngremotemedia-local-file button upload-from-disk",attrs:{type:"button"}},[a("Label",{attrs:{for:"new_file"}},[e._v("\n          "+e._s(e.translations.interactions_quick_upload)+"\n        ")]),a("input",{ref:"fileInput",attrs:{hidden:"",id:"new_file",name:e.base+"_new_file_"+e.fieldId,type:"file"},on:{change:e.handleFileInputChange}})],1)])]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.stringifiedVariations,expression:"stringifiedVariations"}],staticClass:"media-id",attrs:{type:"hidden",name:e.base+"_image_variations_"+e.fieldId},domProps:{value:e.stringifiedVariations},on:{input:function(t){t.target.composing||(e.stringifiedVariations=t.target.value)}}}),e.cropModalOpen?a("crop-modal",{attrs:{"selected-image":e.selectedImage,"available-variations":e.config.availableVariations,"data-user-id":e.userId},on:{change:e.handleVariationCropChange,close:e.handleCropModalClose}}):e._e(),e.mediaModalOpen?a("media-modal",{attrs:{folders:e.folders,"selected-media-id":e.selectedImage.id,paths:e.config.paths},on:{close:e.handleMediaModalClose,"media-selected":e.handleMediaSelected}}):e._e(),e.uploadModalOpen?a("upload-modal",{attrs:{folders:e.folders,loading:e.uploadModalLoading,name:e.selectedImage.name},on:{close:e.handleUploadModalClose,save:e.handleUploadModalSave}}):e._e()],1)}),r=[],o=(a("7f7f"),a("28a5"),a("96cf"),a("3b8d")),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ngremotemedia-image"},[a("div",{staticClass:"image-wrap"},["image"===e.selectedImage.mediaType?a("img",{ref:"image",attrs:{src:e.selectedImage.url}}):a("i",{staticClass:"ng-icon big",class:e.nonImagePreviewClass})]),a("div",{staticClass:"image-meta"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedImage.type,expression:"selectedImage.type"}],attrs:{type:"hidden",name:e.base+"_media_type_"+e.fieldId},domProps:{value:e.selectedImage.type},on:{input:function(t){t.target.composing||e.$set(e.selectedImage,"type",t.target.value)}}}),a("h3",{staticClass:"title"},[e._v(e._s(e.selectedImage.name))]),a("div",{staticClass:"image-meta-data"},[a("div",{staticClass:"ngremotemedia-alttext"},[a("span",{staticClass:"help-block description"},[e._v(e._s(this.$root.$data.NgRemoteMediaTranslations.preview_alternate_text))]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedImage.alternateText,expression:"selectedImage.alternateText"}],staticClass:"media-alttext data",attrs:{type:"text",name:e.base+"_alttext_"+e.fieldId},domProps:{value:e.selectedImage.alternateText},on:{input:function(t){t.target.composing||e.$set(e.selectedImage,"alternateText",t.target.value)}}})]),a("v-select",{attrs:{options:e.allTags,multiple:"",taggable:""},on:{input:e.handleTagsInput},model:{value:e.selectedImage.tags,callback:function(t){e.$set(e.selectedImage,"tags",t)},expression:"selectedImage.tags"}}),a("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedImage.tags,expression:"selectedImage.tags"}],staticClass:"ngremotemedia-newtags",attrs:{hidden:"",name:e.base+"_tags_"+e.fieldId+"[]",multiple:"multiple"},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(e.selectedImage,"tags",t.target.multiple?a:a[0])}}},e._l(e.allTags,(function(t){return a("option",[e._v(e._s(t))])})),0)],1),a("p",[e._v(e._s(this.$root.$data.NgRemoteMediaTranslations.preview_size)+": "+e._s(e.formattedSize))])])])},d=[],c=(a("5df3"),a("4f7f"),a("75fc")),u=a("01c8"),p=function(e){var t=[];for(var a in e)t.push(encodeURIComponent(a)+"="+encodeURIComponent(e[a]));return t.join("&")},h=function(e){return e[0].toUpperCase()+e.slice(1)},m=function(e){var t=e.split("-"),a=Object(u["a"])(t),n=a[0],i=a.slice(1);return[n].concat(Object(c["a"])(i.map(h))).join("")},f=function(e,t){var a=Math.pow(10,t);return parseFloat(Math.round(e*a)/a).toFixed(t)},g={B:"KB",KB:"MB",MB:"GB",GB:"TB"},v=function e(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"B",n=g[a];return!n||t<1024?"".concat(f(t,2)," ").concat(a):e(t/1024,n)},b=a("4a7a"),y=a.n(b),_={name:"Preview",props:["fieldId","base","selectedImage"],data:function(){return{allTags:[]}},components:{"v-select":y.a},computed:{nonImagePreviewClass:function(){return"video"===this.selectedImage.type?"ng-video":"ng-book"},formattedSize:function(){return v(this.selectedImage.size)}},methods:{handleTagsInput:function(e){this.allTags=Object(c["a"])(new Set([].concat(Object(c["a"])(this.allTags),Object(c["a"])(e))))}},mounted:function(){this.allTags=Object(c["a"])(this.selectedImage.tags)},watch:{selectedImage:function(){this.allTags=Object(c["a"])(this.selectedImage.tags)}}},C=_,w=a("2877"),O=Object(w["a"])(C,l,d,!1,null,null,null),I=O.exports,M=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("modal",{attrs:{title:this.$root.$data.NgRemoteMediaTranslations.browse_title},on:{close:function(t){return e.$emit("close")}}},[a("media-facets",{attrs:{folders:e.folders,facets:e.facets},on:{change:e.handleFacetsChange}}),a("media-galery",{attrs:{media:e.media,canLoadMore:e.canLoadMore,selectedMediaId:e.selectedMediaId},on:{loadMore:e.handleLoadMore,"media-selected":function(t){return e.$emit("media-selected",t)}}}),e.loading?a("i",{staticClass:"ng-icon ng-spinner"}):e._e()],1)},V=[],j=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mediaFacets"},[a("ul",{staticClass:"tabs"},[a("li",{class:{active:e.isType(e.TYPE_IMAGE)}},[a("span",{on:{click:function(t){return e.handleTypeChange(e.TYPE_IMAGE)}}},[e._v(e._s(this.$root.$data.NgRemoteMediaTranslations.browse_image_and_documents))])]),a("li",{class:{active:e.isType(e.TYPE_VIDEO)}},[a("span",{on:{click:function(t){return e.handleTypeChange(e.TYPE_VIDEO)}}},[e._v(e._s(this.$root.$data.NgRemoteMediaTranslations.browse_video))])])]),a("div",{staticClass:"body"},[a("div",{staticClass:"form-field"},[a("label",{attrs:{for:"folder"}},[e._v(e._s(this.$root.$data.NgRemoteMediaTranslations.browse_select_folder))]),a("v-select",{attrs:{options:e.folders,label:"name",reduce:function(e){return e.id},placeholder:this.$root.$data.NgRemoteMediaTranslations.browse_all_folders},on:{input:e.handleFolderChange},model:{value:e.selectedFolder,callback:function(t){e.selectedFolder=t},expression:"selectedFolder"}})],1),a("div",{staticClass:"search-wrapper"},[a("span",{staticClass:"search-label"},[e._v(e._s(this.$root.$data.NgRemoteMediaTranslations.search))]),a("div",{staticClass:"search"},[a("ul",{staticClass:"searchType"}),a("input",{directives:[{name:"model",rawName:"v-model",value:e.query,expression:"query"}],attrs:{type:"text",placeholder:this.$root.$data.NgRemoteMediaTranslations.search_by_name},domProps:{value:e.query},on:{keyup:e.handleQueryChange,keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.preventDefault(),null(t))},input:function(t){t.target.composing||(e.query=t.target.value)}}})]),a("div",{staticClass:"search"},[a("ul",{staticClass:"searchType"}),a("input",{directives:[{name:"model",rawName:"v-model",value:e.tag,expression:"tag"}],attrs:{type:"text",placeholder:this.$root.$data.NgRemoteMediaTranslations.search_by_tag},domProps:{value:e.tag},on:{keyup:e.handleTagChange,keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.preventDefault(),null(t))},input:function(t){t.target.composing||(e.tag=t.target.value)}}})])])])])},S=[],x="image",k="video",T="name",P="tag",E="all",F={name:"MediaFacets",props:["folders","facets"],data:function(){return{TYPE_IMAGE:x,TYPE_VIDEO:k,SEARCH_NAME:T,SEARCH_TAG:P,FOLDER_ALL:E,selectedFolder:this.facets.folder,query:this.facets.query}},methods:{handleSearchChange:function(e){this.$emit("change",{searchType:e})},handleTypeChange:function(e){this.$emit("change",{mediaType:e})},isType:function(e){return this.facets.mediaType===e},handleFolderChange:function(e){this.$emit("change",{folder:this.selectedFolder})},handleQueryChange:function(){this.$emit("change",{query:this.query})},handleTagChange:function(){this.$emit("change",{tag:this.tag})}},components:{"v-select":y.a}},N=F,R=(a("89cc"),Object(w["a"])(N,j,S,!1,null,"43e8593a",null)),A=R.exports,z=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mediaGalery"},[a("div",{staticClass:"items"},[e.media.length?e._e():a("div",{staticClass:"folder-empty"},[a("span",{staticClass:"icon-folder"}),e._m(0)]),e._l(e.media,(function(t){return a("div",{key:t.id,staticClass:"media",class:{selected:t.resourceId===e.selectedMediaId}},["image"===t.mediaType||"video"===t.mediaType?a("div",{staticClass:"media-container"},[a("img",{staticClass:"img",attrs:{src:t.browse_url,alt:t.filename}}),a("Label",{staticClass:"filename"},[e._v(e._s(t.filename))]),a("div",{staticClass:"size-description"},[e._v(e._s(t.width)+" x "+e._s(t.height))])],1):a("div",{staticClass:"media-container"},[e._m(1,!0),a("Label",{staticClass:"filename"},[e._v(e._s(t.filename))]),a("div",{staticClass:"size-description format"},[e._v(e._s(t.format))])],1),a("button",{staticClass:"btn btn-blue select-btn",attrs:{type:"button"},on:{click:function(a){return e.$emit("media-selected",t)}}},[e._v("Select")])])}))],2),e.canLoadMore?a("div",{staticClass:"load-more-wrapper"},[a("button",{staticClass:"btn btn-blue",attrs:{type:"button"},on:{click:function(t){return e.$emit("loadMore")}}},[e._v("Load more")])]):e._e()])},D=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",[a("strong",[e._v("Folder is empty")]),e._v("Upload media from your local storage.")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("span",{staticClass:"video-placeholder"},[a("span",{staticClass:"icon-doc"},[a("i",{staticClass:"fa fa-lg fa-file"})])])}],L={name:"MediaGalery",props:["media","canLoadMore","onLoadMore","selectedMediaId"]},Q=L,B=(a("9ca3"),Object(w["a"])(Q,z,D,!1,null,"2b0c884c",null)),q=B.exports,U=a("b012"),G=a.n(U),W=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"overlay"},[a("div",{staticClass:"media-modal"},[a("div",{staticClass:"title"},[e._v("\n      "+e._s(e.title)+"\n      "),a("span",{staticClass:"close",on:{click:e.close}},[a("span",{staticClass:"icon-cancel"})])]),a("div",{staticClass:"body"},[e._t("default")],2)])])},Y=[],H={name:"Modal",props:["title"],methods:{close:function(){this.$emit("close")}}},J=H,K=(a("d84e"),Object(w["a"])(J,W,Y,!1,null,"52710e69",null)),X=K.exports;function Z(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function ee(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?Z(a,!0).forEach((function(t){Object(n["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Z(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var te=25,ae={name:"MediaModal",props:["folders","selectedMediaId","paths"],components:{"media-facets":A,"media-galery":q,modal:X},data:function(){return{media:[],canLoadMore:!1,nextCursor:null,loading:!0,facets:{folder:"",searchType:T,mediaType:x,query:"",tag:""}}},methods:{debouncedLoad:G()((function(e){this.load(e)}),500),load:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t,a,n,i,s,r,o=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=o.length>0&&void 0!==o[0]?o[0]:{patch:!1},a=t.patch,this.loading=!0,this.abortController&&this.abortController.abort(),this.abortController=new AbortController,n={limit:te,offset:a?this.media.length:0,q:this.facets.query,mediatype:this.facets.mediaType,folder:this.facets.folder||E,search_type:this.facets.searchType,next_cursor:a?this.nextCursor:null,tag:this.facets.tag},i="".concat(this.paths.browse,"?").concat(p(n)),e.prev=6,e.next=9,fetch(i,{signal:this.abortController.signal});case 9:return s=e.sent,e.next=12,s.json();case 12:r=e.sent,this.media=a?this.media.concat(r.hits):r.hits,this.canLoadMore=r.load_more,this.nextCursor=r.next_cursor,this.loading=!1,e.next=23;break;case 19:if(e.prev=19,e.t0=e["catch"](6),20===e.t0.code){e.next=23;break}throw e.t0;case 23:case"end":return e.stop()}}),e,this,[[6,19]])})));function t(){return e.apply(this,arguments)}return t}(),handleLoadMore:function(){this.debouncedLoad({patch:!0})},handleFacetsChange:function(e){this.facets=ee({},this.facets,{},e),this.debouncedLoad()}},mounted:function(){this.load()}},ne=ae,ie=(a("d460"),Object(w["a"])(ne,M,V,!1,null,"420b29ab",null)),se=ie.exports,re=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("modal",{attrs:{title:"Crop"},on:{close:function(t){return e.$emit("close")}}},[a("crop-sizes",{attrs:{availableVariations:e.availableVariations,allVariationValues:e.allVariationValues,imageSize:e.imageSize,selectedVariation:e.selectedVariation},on:{selected:e.handleVariationSelected,addedVariations:e.handleAddedVariations,removedVariation:e.handleRemovedVariation}}),e._l(e.availableVariations,(function(t,n){return a("div",{key:n,staticClass:"crop-container"},[n===e.selectedVariation?a("crop",{attrs:{value:e.allVariationValues[n],src:e.selectedImage.url,variation:e.availableVariations[n],imageSize:e.imageSize},on:{change:function(t){return e.handleVariationValueChange(n,t)}}}):e._e()],1)})),e.selectedVariation?e._e():a("div",{staticClass:"img-placeholder"},[a("img",{attrs:{src:e.selectedImage.url}})]),a("div",{staticClass:"action-strip"},[a("button",{staticClass:"btn",attrs:{type:"button"},on:{click:e.handleCancelClicked}},[e._v("Cancel")]),a("button",{staticClass:"btn btn-blue",attrs:{type:"button"},on:{click:e.handleSaveClicked}},[a("span",{staticClass:"icon-floppy"}),a("span",[e._v("Save sizes")])])])],2)},oe=[],le=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sidebar-crop"},[a("div",{staticClass:"buttons"},[e.addingVariations?e._e():a("button",{staticClass:"btn",attrs:{type:"button"},on:{click:e.handleAddCropSize}},[e._v("Add crop size")]),e.addingVariations?a("button",{staticClass:"btn",attrs:{type:"button"},on:{click:e.handleCancel}},[e._v("Cancel")]):e._e(),e.addingVariations?a("button",{staticClass:"btn crop-btn-add",attrs:{type:"button"},on:{click:e.handleAdd}},[e._v("Add")]):e._e()]),e._m(0),a("div",{directives:[{name:"show",rawName:"v-show",value:e.addingVariations,expression:"addingVariations"}],class:{unselectedVariations:e.addingVariations}},e._l(e.unselectedVariations,(function(t){return a("div",{key:t,class:{disabled:!e.isVariationSelectable(t)}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.newSelection,expression:"newSelection"}],attrs:{type:"checkbox",id:t,disabled:!e.isVariationSelectable(t)},domProps:{value:t,checked:Array.isArray(e.newSelection)?e._i(e.newSelection,t)>-1:e.newSelection},on:{change:function(a){var n=e.newSelection,i=a.target,s=!!i.checked;if(Array.isArray(n)){var r=t,o=e._i(n,r);i.checked?o<0&&(e.newSelection=n.concat([r])):o>-1&&(e.newSelection=n.slice(0,o).concat(n.slice(o+1)))}else e.newSelection=s}}}),a("label",{attrs:{for:t}},[a("span",{staticClass:"name"},[e._v(e._s(t))]),a("span",{staticClass:"formatted-size"},[e._v(e._s(e.formattedSize(t)))])]),e.isVariationSelectable(t)?e._e():a("div",{staticClass:"legend-not-selectable"},[a("span",[e._v("Media is too small.")])])])})),0),a("div",{staticClass:"selectedVariations"},[a("ul",e._l(e.selectedVariations,(function(t){return a("li",{key:t,class:{set:!!e.allVariationValues[t],selected:e.selectedVariation===t,disabled:!e.isVariationSelectable(t)},on:{click:function(a){return e.handleVariationClicked(t)}}},[a("div",[a("span",{staticClass:"name"},[e._v(e._s(t))]),a("span",{staticClass:"formatted-size"},[e._v(e._s(e.formattedSize(t)))])]),e.addingVariations?e._e():a("a",{attrs:{href:"#"}},[a("span",{staticClass:"circle-orange"}),a("span",{staticClass:"icon-trash",on:{click:function(a){return e.removeItem(t)}}})])])})),0)])])},de=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sidebar-crop-label"},[a("span",[e._v("Addded for Confirmation")])])}],ce=a("768b"),ue={name:"CropSizes",props:["availableVariations","allVariationValues","imageSize","selectedVariation"],data:function(){return{newSelection:[],addingVariations:!1}},computed:{unselectedVariations:function(){var e=Object.keys(this.availableVariations),t=Object.keys(this.allVariationValues);return e.difference(t)},selectedVariations:function(){return Object.getOwnPropertyNames(this.allVariationValues)}},methods:{handleAddCropSize:function(){this.addingVariations=!0},handleCancel:function(){this.addingVariations=!1,this.newSelection=[]},handleAdd:function(){this.$emit("addedVariations",this.newSelection),this.newSelection=[],this.addingVariations=!1},removeItem:function(e){this.$emit("removedVariation",e)},formattedSize:function(e){return"".concat(this.availableVariations[e][0]," x ").concat(this.availableVariations[e][1])},isVariationSelectable:function(e){var t=Object(ce["a"])(this.availableVariations[e],2),a=t[0],n=t[1];return this.imageSize.width>=a&&this.imageSize.height>=n},handleVariationClicked:function(e){this.isVariationSelectable(e)&&this.$emit("selected",e)}}},pe=ue,he=(a("1f12"),Object(w["a"])(pe,le,de,!1,null,"55a3bdf8",null)),me=he.exports,fe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"crop"},[a("div",{ref:"cropper",staticClass:"cropper",style:e.cropperStyle},[a("img",{ref:"image",attrs:{src:e.src}}),a("div",{ref:"buttons",staticClass:"buttons",style:e.applyButtonStyle},[a("button",{staticClass:"btn btn-blue",attrs:{type:"button"},on:{click:e.handleReset}},[a("span",{staticClass:"icon-ccw"}),a("span",[e._v("Reset")])]),a("button",{staticClass:"btn btn-blue",attrs:{type:"button"},on:{click:e.handleApply}},[a("span",{staticClass:"icon-ok"}),a("span",[e._v("Apply")])])])]),a("div",[a("h4",[e._v("Preview")]),a("div",{ref:"preview",staticClass:"preview"})])])},ge=[],ve=a("5435"),be={name:"Crop",props:["value","variation","src","imageSize"],mounted:function(){this.setCropper()},beforeDestroy:function(){this.destroyCropper()},data:function(){return{crop:{},cropper:null}},methods:{setCropper:function(){var e,t=this.value||{},a=t.x,i=t.y,s=t.w,r=t.h,o={x:a,y:i,width:s,height:r},l=Object(ce["a"])(this.variation,2),d=l[0],c=l[1],u=d>0&&c>0?d/c:void 0;this.destroyCropper();this.$refs.cropper.clientWidth,this.imageSize.width;this.cropper=new ve["a"](this.$refs.image,(e={viewMode:2,dragMode:"none",autoCrop:!0,data:o,aspectRatio:u,guides:!0,movable:!1,rotatable:!1},Object(n["a"])(e,"guides",!1),Object(n["a"])(e,"center",!1),Object(n["a"])(e,"zoomable",!1),Object(n["a"])(e,"scalable",!0),Object(n["a"])(e,"minCropBoxWidth",50),Object(n["a"])(e,"minCropBoxHeight",50),Object(n["a"])(e,"crop",this.handleCrop),Object(n["a"])(e,"preview",this.$refs.preview),e)),this.cropper.setData(o)},handleCrop:function(e){this.crop=this.cropper.getData(!0)},destroyCropper:function(){this.cropper&&this.cropper.destroy()},handleReset:function(){this.cropper.reset()},handleApply:function(){var e=this.cropper.getData(!0),t=e.x,a=e.y,n=e.width,i=e.height;this.$emit("change",{x:t,y:a,w:n,h:i})}},computed:{applyButtonStyle:function(){var e=this.crop,t=e.x,a=e.y,n=e.width,i=e.height,s=this.$refs.buttons?this.$refs.buttons.clientWidth:0,r=this.$refs.cropper?this.$refs.cropper.clientWidth/this.imageSize.width:1;return{top:"".concat((a+i)*r+10,"px"),left:"".concat((t+n)*r-s-1,"px")}},cropperStyle:function(){var e=this.imageSize.height/this.imageSize.width*100;return{"padding-bottom":"".concat(e,"%"),height:"0px",width:"100%"}}}},ye=be,_e=(a("d21c"),Object(w["a"])(ye,fe,ge,!1,null,"b4d83f7e",null)),Ce=_e.exports,we=function(e){return function(t){return Object.keys(t).reduce((function(a,n){return e(t[n],n)&&(a[n]=t[n]),a}),{})}},Oe=function(e){return function(t){return!e(t)}},Ie=function(e){return function(t){return e===t}},Me=function(e){return!!e},Ve=Oe(Ie(void 0));function je(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function Se(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?je(a,!0).forEach((function(t){Object(n["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):je(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var $e={name:"CropModal",props:["availableVariations","selectedImage"],components:{modal:X,"crop-sizes":me,crop:Ce},data:function(){return{selectedVariation:null,newVariationValues:{}}},computed:{allVariationValues:function(){return we(Ve)(Se({},this.selectedImage.variations,{},this.newVariationValues))},imageSize:function(){return{height:this.selectedImage.height,width:this.selectedImage.width}}},methods:{handleVariationSelected:function(e){this.selectedVariation=e},handleAddedVariations:function(e){this.newVariationValues=Se({},this.newVariationValues,{},e.reduce((function(e,t){return e[t]=null,e}),{}))},handleRemovedVariation:function(e){this.newVariationValues=Se({},this.newVariationValues,Object(n["a"])({},e,void 0))},handleVariationValueChange:function(e,t){this.newVariationValues=Se({},this.newVariationValues,Object(n["a"])({},e,t))},handleCancelClicked:function(){this.newVariationValues={},this.$emit("close")},handleSaveClicked:function(){this.$emit("change",Se({},this.newVariationValues)),this.newVariationValues={},this.$emit("close")}}},xe=$e,ke=(a("e6ba"),Object(w["a"])(xe,re,oe,!1,null,"6540a3a8",null)),Te=ke.exports,Pe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("modal",{attrs:{title:"Upload image"},on:{close:function(t){return e.$emit("close")}}},[e.loading?a("i",{staticClass:"ng-icon ng-spinner"}):a("div",[a("label",{attrs:{for:"folder"}},[e._v("Select Folder")]),a("select-folder",{attrs:{folders:e.folders},on:{change:e.handleFolderChange}}),a("input",{directives:[{name:"model",rawName:"v-model",value:e.newName,expression:"newName"}],attrs:{type:"text"},domProps:{value:e.newName},on:{input:function(t){t.target.composing||(e.newName=t.target.value)}}}),a("button",{attrs:{disabled:""===e.newName,type:"button"},on:{click:e.handleSaveClick}},[e._v("Save")])],1)])},Ee=[],Fe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-field"},[a("v-select",{attrs:{options:e.foldersWithNew,label:"name",reduce:function(e){return e.id},placeholder:"/"},on:{input:e.handleFolderChanged},scopedSlots:e._u([{key:"search",fn:function(t){return["checkbox"===t.attributes.type?a("input",e._g(e._b({directives:[{name:"model",rawName:"v-model",value:e.folderSearchQuery,expression:"folderSearchQuery"}],staticClass:"vs__search",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.folderSearchQuery)?e._i(e.folderSearchQuery,null)>-1:e.folderSearchQuery},on:{change:function(t){var a=e.folderSearchQuery,n=t.target,i=!!n.checked;if(Array.isArray(a)){var s=null,r=e._i(a,s);n.checked?r<0&&(e.folderSearchQuery=a.concat([s])):r>-1&&(e.folderSearchQuery=a.slice(0,r).concat(a.slice(r+1)))}else e.folderSearchQuery=i}}},"input",t.attributes,!1),t.events)):"radio"===t.attributes.type?a("input",e._g(e._b({directives:[{name:"model",rawName:"v-model",value:e.folderSearchQuery,expression:"folderSearchQuery"}],staticClass:"vs__search",attrs:{type:"radio"},domProps:{checked:e._q(e.folderSearchQuery,null)},on:{change:function(t){e.folderSearchQuery=null}}},"input",t.attributes,!1),t.events)):a("input",e._g(e._b({directives:[{name:"model",rawName:"v-model",value:e.folderSearchQuery,expression:"folderSearchQuery"}],staticClass:"vs__search",attrs:{type:t.attributes.type},domProps:{value:e.folderSearchQuery},on:{input:function(t){t.target.composing||(e.folderSearchQuery=t.target.value)}}},"input",t.attributes,!1),t.events))]}},{key:"option",fn:function(t){return[t.new?a("div",[e._v("\n        "+e._s(t.name)+"\n        "),a("button",{attrs:{type:"button"}},[e._v("Create new")])]):t.added?a("div",[e._v(e._s(t.name)+" (new)")]):a("div",[e._v(e._s(t.name))])]}}]),model:{value:e.folder,callback:function(t){e.folder=t},expression:"folder"}})],1)},Ne=[],Re=(a("7514"),{name:"SelectFolder",props:["folders","selectedFolder"],data:function(){return{folderSearchQuery:"",addedFolders:[],folder:this.selectedFolder}},computed:{foldersWithNew:function(){var e=this,t=[].concat(Object(c["a"])(this.folders),Object(c["a"])(this.addedFolders));return 0===this.folderSearchQuery.length?t:t.find((function(t){return t.name===e.folderSearchQuery}))?t:[{name:this.folderSearchQuery,id:this.folderSearchQuery,new:!0}].concat(Object(c["a"])(t))}},methods:{handleFolderChanged:function(e){this.folderSearchQuery="";var t=[].concat(Object(c["a"])(this.folders),Object(c["a"])(this.addedFolders));t.find((function(t){return t.name===e}))||this.addedFolders.push({id:e,name:e,added:!0}),this.$emit("change",this.folder)}},components:{"v-select":y.a}}),Ae=Re,ze=(a("e624"),Object(w["a"])(Ae,Fe,Ne,!1,null,"e0caddfc",null)),De=ze.exports,Le={name:"UploadModal",props:["folders","loading","name"],data:function(){return{selectedFolder:"",newName:this.name}},components:{"select-folder":De,modal:X},methods:{handleFolderChange:function(e){this.selectedFolder=e},handleSaveClick:function(){var e=this.newName;this.selectedFolder&&(e="".concat(this.selectedFolder,"/").concat(this.newName)),this.$emit("save",e)}}},Qe=Le,Be=Object(w["a"])(Qe,Pe,Ee,!1,null,"39c1a599",null),qe=Be.exports;function Ue(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function Ge(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?Ue(a,!0).forEach((function(t){Object(n["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Ue(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var We={name:"Interactions",props:["contentObjectId","version","fieldId","base","config","translations","selectedImage"],components:{preview:I,"media-modal":se,"crop-modal":Te,"upload-modal":qe},computed:{isCroppable:function(){return!!this.selectedImage.id&&"image"===this.selectedImage.mediaType&&Object.keys(this.config.availableVariations).length>0},stringifiedVariations:function(){return JSON.stringify(we(Me)(this.selectedImage.variations))}},data:function(){return{mediaModalOpen:!1,cropModalOpen:!1,uploadModalOpen:!1,uploadModalLoading:!1,folders:[]}},methods:{prepareDomForModal:function(){var e=document.querySelector(".ez-page-builder-wrapper");e&&(e.style.transform="none")},resetDomAfterModal:function(){var e=document.querySelector(".ez-page-builder-wrapper");e&&e.removeAttribute("style")},handleMediaModalClose:function(){this.mediaModalOpen=!1,this.resetDomAfterModal()},handleCropModalClose:function(){this.cropModalOpen=!1,this.resetDomAfterModal()},handleUploadModalClose:function(){this.uploadModalOpen=!1},handleEditorInsertModalClose:function(){this.editorInsertModalOpen=!1},handleMediaSelected:function(e){this.selectedImage={id:e.resourceId,name:e.filename,type:e.type,mediaType:e.mediaType,url:e.url,alternateText:e.alt_text,tags:e.tags,size:e.filesize,variations:{},height:e.height,width:e.width},this.mediaModalOpen=!1},handleVariationCropChange:function(e){this.selectedImage=Ge({},this.selectedImage,{variations:Ge({},this.selectedImage.variations,{},e)})},handleUploadModalSave:function(e){this.selectedImage=Ge({},this.selectedImage,{name:e,id:e}),this.uploadModalOpen=!1},handleCropClicked:function(){this.cropModalOpen=!0,this.prepareDomForModal()},handleRemoveMediaClicked:function(){this.selectedImage={id:"",name:"",type:"image",mediaType:"image",url:"",alternateText:"",tags:[],size:0,variations:{},height:0,width:0},this.$refs.fileInput.value=null},fetchFolders:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){var t,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch(this.config.paths.folders);case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,this.folders=a;case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),handleBrowseMediaClicked:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:this.mediaModalOpen=!0,this.prepareDomForModal(),this.fetchFolders();case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),getFileType:function(e){var t=e.type.split("/")[0];return"video"!==t?"image":t},getFileMediaType:function(e){var t=e.type.split("/")[0];return"video"!==t&&"image"!==t?"other":t},handleFileInputChange:function(e){this.uploadModalOpen=!0,this.uploadModalLoading=!0,this.fetchFolders();var t=e.target.files.item(0);if(t)if(this.selectedImage={id:t.name,name:t.name,type:this.getFileType(t),mediaType:this.getFileMediaType(t),url:"",alternateText:"",tags:[],size:t.size,variations:{},height:0,width:0},"image"===this.selectedImage.mediaTye){var a=new FileReader;a.addEventListener("load",function(){this.$refs.preview.$refs.image.onload=function(){this.selectedImage.width=this.$refs.preview.$refs.image.naturalWidth,this.selectedImage.height=this.$refs.preview.$refs.image.naturalHeight,this.uploadModalLoading=!1}.bind(this),this.selectedImage.url=a.result}.bind(this),!1),a.readAsDataURL(t)}else this.uploadModalLoading=!1}}},Ye=We,He=Object(w["a"])(Ye,s,r,!1,null,null,null),Je=He.exports,Ke=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("modal",{staticClass:"editor-insert-modal",attrs:{title:this.$root.$data.NgRemoteMediaTranslations.editor_insert_title},on:{close:function(t){return e.$emit("close")}}},[e.editorInsertModalLoading?a("i",{staticClass:"ng-icon ng-spinner"}):a("div",{staticClass:"editor-insert-modal-body"},[a("interactions",{attrs:{"content-object-id":e.contentObjectId,version:e.contentVersion,"field-id":e.fieldId,base:e.base,config:e.config,translations:e.translations,"selected-image":e.selectedImage}}),a("v-select",{attrs:{options:e.config.availableEditorVariations,label:e.Variation,placeholder:this.$root.$data.NgRemoteMediaTranslations.editor_insert_variations_original_image},on:{input:e.handleVariationChange}}),a("input",{attrs:{type:"hidden",name:e.base+"_content_type_identifier_"+e.fieldId},domProps:{value:e.contentTypeIdentifier}}),a("input",{attrs:{type:"hidden",name:e.base+"_selected_variation_"+e.fieldId}})],1),a("div",{staticClass:"action-strip"},[a("button",{staticClass:"btn",attrs:{type:"button"},on:{click:function(t){return e.$emit("close")}}},[e._v(e._s(this.$root.$data.NgRemoteMediaTranslations.editor_insert_cancel_button))]),a("button",{staticClass:"btn btn-blue",attrs:{type:"button"},on:{click:this.handleEditorInsertModalSave}},[a("span",[e._v(e._s(this.$root.$data.NgRemoteMediaTranslations.editor_insert_insert_button))])])])])},Xe=[],Ze={name:"EditorInsertModal",props:["loading","base","fieldId","contentObjectId","contentVersion","contentTypeIdentifier","config","translations","selectedImage","editorInsertAjaxUrl"],components:{modal:X,interactions:Je,"v-select":y.a},methods:{handleVariationChange:function(e){$('input[name="'+this.base+"_selected_variation_"+this.fieldId+'"]').val(e)},handleEditorInsertModalSave:function(){this.editorInsertModalLoading=!0;var e=new FormData;e.append("resource_id",$("body").find('input[name="'+this.base+"_media_id_"+this.fieldId+'"]').val()),e.append("alt_text",$("body").find('input[name="'+this.base+"_alttext_"+this.fieldId+'"]').val()),e.append("new_file",$("body").find('input[name="'+this.base+"_new_file_"+this.fieldId+'"]')[0].files[0]),e.append("image_variations",$("body").find('input[name="'+this.base+"_image_variations_"+this.fieldId+'"]').val()),e.append("content_type_identifier",$("body").find('input[name="'+this.base+"_content_type_identifier_"+this.fieldId+'"]').val()),e.append("variation",$("body").find('input[name="'+this.base+"_selected_variation_"+this.fieldId+'"]').val());var t=$("body").find('select[name="'+this.base+"_tags_"+this.fieldId+'[]"]').val();if(!$.isArray(t)){var a=t;t=[];a&&t.push(a)}$.each(t,(function(t,a){e.append("tags[]",a)}));var n=this;$.ajax({type:"post",url:this.editorInsertAjaxUrl,processData:!1,contentType:!1,data:e,success:function(e){n.$emit("media-inserted",e),n.$emit("close"),this.editorInsertModalLoading=!1}})}}},et=Ze,tt=(a("184d"),Object(w["a"])(et,Ke,Xe,!1,null,"67804e4d",null)),at=tt.exports,nt={bind:function(e,t,a){var n=m(t.arg);a.context[n]=t.value}};a("b39d");function it(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function st(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?it(a,!0).forEach((function(t){Object(n["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):it(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}(function(e){e.PluginManager.add("ngremotemedia",(function(e){var t="".concat(e.editorId,"_modal"),a=document.createElement("div");return a.setAttribute("id",t),document.getElementById(e.editorId).parentElement.appendChild(a),window.ngrm=st({},window.ngrm),window.ngrm[t]={selectedImage:{},modal:new i["a"]({el:"#".concat(t),directives:{init:nt},data:{NgRemoteMediaTranslations:NgRemoteMediaTranslations,RemoteMediaSelectedImage:{},RemoteMediaConfig:RemoteMediaConfig,editorInsertModalOpen:!1,editorInsertModalLoading:!1,selectedImage:{id:"",name:"",type:"image",mediaType:"image",url:"",browse_url:"",alternateText:"",tags:[],size:"",variations:{},height:0,width:0},config:{paths:{},availableVariations:{}}},components:{interactions:Je,"editor-insert-modal":at,modal:X},methods:{openModal:function(){this.editorInsertModalOpen=!0},closeModal:function(){this.editorInsertModalOpen=!1}},template:'<editor-insert-modal\n                        @close="closeModal"\n                        v-show="editorInsertModalOpen"\n                        :loading="editorInsertModalLoading"\n                        :config="config"\n                        :selected-image="selectedImage"\n                        :translations="NgRemoteMediaTranslations"\n                    ></editor-insert-modal>'})},e.addButton("ngremotemedia",{title:"Insert remote media",onclick:function(){window.ngrm["".concat(this.editorId,"_modal")].modal.openModal()}}),{getMetadata:function(){return{name:"Netgen remote media",url:"https://github.com/netgen/NetgenRemoteMediaBundle"}}}}))})(tinymce)},d21c:function(e,t,a){"use strict";var n=a("1be4"),i=a.n(n);i.a},d460:function(e,t,a){"use strict";var n=a("48a2"),i=a.n(n);i.a},d84e:function(e,t,a){"use strict";var n=a("ad0a"),i=a.n(n);i.a},e624:function(e,t,a){"use strict";var n=a("84d8"),i=a.n(n);i.a},e6ba:function(e,t,a){"use strict";var n=a("8a3f"),i=a.n(n);i.a},ef9e:function(e,t,a){}});
//# sourceMappingURL=editor_plugin.js.map