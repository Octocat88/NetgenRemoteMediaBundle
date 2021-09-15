<?php

declare(strict_types=1);

namespace Netgen\RemoteMedia\Tests\Core\Provider\Cloudinary;

use Cloudinary\Api\NotFound;
use Cloudinary\Api\Response;
use Netgen\RemoteMedia\API\Search\Query;
use Netgen\RemoteMedia\API\Search\Result;
use Netgen\RemoteMedia\API\Values\RemoteResource;
use Netgen\RemoteMedia\API\Values\Variation;
use Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider;
use Netgen\RemoteMedia\Core\Provider\Cloudinary\Gateway;
use Netgen\RemoteMedia\Core\Transformation\Registry;
use Netgen\RemoteMedia\Core\UploadFile;
use Netgen\RemoteMedia\Core\VariationResolver;
use Netgen\RemoteMedia\Exception\RemoteResourceNotFoundException;
use org\bovigo\vfs\vfsStream;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use stdClass;
use Symfony\Component\HttpFoundation\File\Exception\FileNotFoundException;
use function implode;
use function json_encode;

final class CloudinaryProviderTest extends TestCase
{
    protected CloudinaryProvider $cloudinaryProvider;

    protected Registry $registry;

    protected VariationResolver $variationResolver;

    protected MockObject $gateway;

    protected function setUp(): void
    {
        $this->registry = new Registry();
        $this->variationResolver = new VariationResolver();
        $this->gateway = $this->createMock(Gateway::class);

        $this->cloudinaryProvider = new CloudinaryProvider(
            $this->registry,
            $this->variationResolver,
            $this->gateway,
            false,
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::getIdentifier
     */
    public function testIdentifier(): void
    {
        self::assertSame(
            'cloudinary',
            $this->cloudinaryProvider->getIdentifier(),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::usage
     */
    public function testUsage(): void
    {
        $data = [
            'bandwith' => 3245453,
            'api_limit' => 500,
            'api_limit_left' => 489,
        ];

        $this->gateway
            ->expects(self::once())
            ->method('usage')
            ->willReturn($data);

        self::assertSame(
            $data,
            $this->cloudinaryProvider->usage(),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::supportsFolders
     */
    public function testSupportsFolders(): void
    {
        self::assertTrue(
            $this->cloudinaryProvider->supportsFolders(),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::listFolders
     */
    public function testListFolders(): void
    {
        $folders = [
            'folder_1',
            'folder_2',
            'folder_2/subfolder',
        ];

        $this->gateway
            ->expects(self::once())
            ->method('listFolders')
            ->willReturn($folders);

        self::assertSame(
            $folders,
            $this->cloudinaryProvider->listFolders(),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::listSubFolders
     */
    public function testListSubFolders(): void
    {
        $folders = [
            'folder_1',
            'folder_2',
        ];

        $this->gateway
            ->expects(self::once())
            ->method('listSubFolders')
            ->with('parent_folder/sub_folder')
            ->willReturn($folders);

        self::assertSame(
            $folders,
            $this->cloudinaryProvider->listSubFolders('parent_folder/sub_folder'),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::createFolder
     */
    public function testCreateFolder(): void
    {
        $this->gateway
            ->expects(self::once())
            ->method('createFolder')
            ->with('parent_folder/sub_folder');

        $this->cloudinaryProvider->createFolder('parent_folder/sub_folder');
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::countResources
     */
    public function testCountResources(): void
    {
        $this->gateway
            ->expects(self::once())
            ->method('countResources')
            ->willReturn(4);

        self::assertSame(
            4,
            $this->cloudinaryProvider->countResources(),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::countResourcesInFolder
     */
    public function testCountResourcesInFolder(): void
    {
        $this->gateway
            ->expects(self::once())
            ->method('countResourcesInFolder')
            ->with('parent_folder/sub_folder')
            ->willReturn(2);

        self::assertSame(
            2,
            $this->cloudinaryProvider->countResourcesInFolder('parent_folder/sub_folder'),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::listTags
     */
    public function testListTags(): void
    {
        $tags = [
            'tag1',
            'tag2',
            'tag3',
        ];

        $this->gateway
            ->expects(self::once())
            ->method('listTags')
            ->willReturn($tags);

        self::assertSame(
            $tags,
            $this->cloudinaryProvider->listTags(),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::upload
     */
    public function testUpload(): void
    {
        $options = [
            'public_id' => 'filename',
            'overwrite' => true,
            'invalidate' => true,
            'discard_original_filename' => true,
            'context' => [
                'alt' => '',
                'caption' => '',
            ],
            'resource_type' => 'auto',
            'tags' => [],
        ];

        $root = vfsStream::setup('some');
        $file = vfsStream::newFile('filename')->at($root);

        $uploadFile = UploadFile::fromUri($file->url());

        $this->gateway->method('upload')->willReturn(
            [
                'public_id' => 'filename',
                'url' => 'http://some.url/filename',
                'secure_url' => 'https://some.url/filename',
                'bytes' => 1024,
                'resource_type' => 'image',
            ],
        );

        $this->gateway
            ->expects(self::once())
            ->method('upload')
            ->with(
                $uploadFile->uri(),
                $options,
            );

        $resource = $this->cloudinaryProvider->upload($uploadFile, ['overwrite' => true]);

        self::assertInstanceOf(RemoteResource::class, $resource);

        self::assertSame(
            'filename',
            $resource->resourceId,
        );
        self::assertSame(
            'http://some.url/filename',
            $resource->url,
        );
        self::assertSame(
            'https://some.url/filename',
            $resource->secure_url,
        );
        self::assertSame(
            1024,
            $resource->size,
        );
        self::assertSame(
            RemoteResource::TYPE_IMAGE,
            $resource->mediaType,
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::upload
     */
    public function testUploadWithExtension(): void
    {
        $options = [
            'public_id' => 'file.zip',
            'overwrite' => true,
            'invalidate' => true,
            'discard_original_filename' => true,
            'context' => [
                'alt' => '',
                'caption' => '',
            ],
            'resource_type' => 'auto',
            'tags' => [],
        ];

        $root = vfsStream::setup('some');
        $file = vfsStream::newFile('file.zip')->at($root);

        $this->gateway->method('upload')->willReturn(
            [
                'public_id' => 'file.zip',
                'url' => 'http://some.url/file.zip',
                'secure_url' => 'https://some.url/file.zip',
                'bytes' => 1024,
                'resource_type' => 'other',
            ],
        );

        $this->gateway
            ->expects(self::once())
            ->method('upload')
            ->with(
                $file->url(),
                $options,
            );

        $uploadFile = UploadFile::fromUri($file->url());

        $resource = $this->cloudinaryProvider->upload($uploadFile, ['overwrite' => true]);

        self::assertInstanceOf(RemoteResource::class, $resource);

        self::assertSame(
            'file.zip',
            $resource->resourceId,
        );
        self::assertSame(
            'http://some.url/file.zip',
            $resource->url,
        );
        self::assertSame(
            'https://some.url/file.zip',
            $resource->secure_url,
        );
        self::assertSame(
            1024,
            $resource->size,
        );
        self::assertSame(
            RemoteResource::TYPE_OTHER,
            $resource->mediaType,
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::upload
     */
    public function testUploadNoFile(): void
    {
        $this->expectException(FileNotFoundException::class);

        $uploadFile = UploadFile::fromUri('/some/path.jpg');

        $this->cloudinaryProvider->upload($uploadFile, ['overwrite' => true]);
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::getRemoteResource
     */
    public function testGetEmptyResourceId(): void
    {
        $this->gateway
            ->expects(self::once())
            ->method('get')
            ->with('', 'image')
            ->willThrowException(new NotFound());

        self::expectException(RemoteResourceNotFoundException::class);
        self::expectExceptionMessage("[NgRemoteMedia] Remote resource with ID '' of 'image' type not found.");

        $this->cloudinaryProvider->getRemoteResource('', 'image');
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::getRemoteResource
     */
    public function testGetResourceIdWithEmptyResponse(): void
    {
        $this->gateway
            ->expects(self::once())
            ->method('get')
            ->with('test_id', 'image')
            ->willReturn([]);

        self::expectException(RemoteResourceNotFoundException::class);
        self::expectExceptionMessage("[NgRemoteMedia] Remote resource with ID 'test_id' of 'image' type not found.");

        $this->cloudinaryProvider->getRemoteResource('test_id', 'image');
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::getRemoteResource
     */
    public function testGetResourceIdWithInvalidResponse(): void
    {
        $this->gateway
            ->expects(self::once())
            ->method('get')
            ->with('test_id', 'image')
            ->willReturn(['id' => 'test']);

        self::expectException(RemoteResourceNotFoundException::class);
        self::expectExceptionMessage("[NgRemoteMedia] Remote resource with ID 'test_id' of 'image' type not found.");

        $this->cloudinaryProvider->getRemoteResource('test_id', 'image');
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::getRemoteResource
     */
    public function testGetRemoteResource(): void
    {
        $data = [
            'public_id' => 'testResourceId',
            'url' => 'http://some.url/path',
            'secure_url' => 'https://some.url/path',
            'bytes' => 1024,
            'resource_type' => 'image',
        ];

        $this->gateway
            ->expects(self::once())
            ->method('get')
            ->with('testResourceId', 'image')
            ->willReturn($data);

        $resource = $this->cloudinaryProvider->getRemoteResource('testResourceId', 'image');

        self::assertInstanceOf(RemoteResource::class, $resource);
        self::assertSame(
            $data['public_id'],
            $resource->resourceId,
        );
        self::assertSame(
            $data['url'],
            $resource->url,
        );
        self::assertSame(
            $data['secure_url'],
            $resource->secure_url,
        );
        self::assertSame(
            $data['bytes'],
            $resource->size,
        );
        self::assertSame(
            RemoteResource::TYPE_IMAGE,
            $resource->mediaType,
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::getRemoteResource
     */
    public function testGetRemoteVideo(): void
    {
        $data = [
            'public_id' => 'testResourceId',
            'url' => 'http://some.url/path',
            'secure_url' => 'https://some.url/path',
            'bytes' => 1024,
            'resource_type' => 'video',
        ];

        $this->gateway
            ->expects(self::once())
            ->method('get')
            ->with('testResourceId', 'video')
            ->willReturn($data);

        $resource = $this->cloudinaryProvider->getRemoteResource('testResourceId', 'video');

        self::assertInstanceOf(RemoteResource::class, $resource);
        self::assertSame(
            $data['public_id'],
            $resource->resourceId,
        );
        self::assertSame(
            $data['url'],
            $resource->url,
        );
        self::assertSame(
            $data['secure_url'],
            $resource->secure_url,
        );
        self::assertSame(
            $data['bytes'],
            $resource->size,
        );
        self::assertSame(
            RemoteResource::TYPE_VIDEO,
            $resource->mediaType,
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::getRemoteResource
     */
    public function testGetRemoteDocument(): void
    {
        $data = [
            'public_id' => 'testResourceId',
            'url' => 'http://some.url/path',
            'secure_url' => 'https://some.url/path',
            'bytes' => 1024,
            'resource_type' => 'image',
            'format' => 'pdf',
        ];

        $this->gateway
            ->expects(self::once())
            ->method('get')
            ->with('testResourceId', 'image')
            ->willReturn($data);

        $resource = $this->cloudinaryProvider->getRemoteResource('testResourceId', 'image');

        self::assertInstanceOf(RemoteResource::class, $resource);
        self::assertSame(
            $data['public_id'],
            $resource->resourceId,
        );
        self::assertSame(
            $data['url'],
            $resource->url,
        );
        self::assertSame(
            $data['secure_url'],
            $resource->secure_url,
        );
        self::assertSame(
            $data['bytes'],
            $resource->size,
        );
        self::assertSame(
            RemoteResource::TYPE_OTHER,
            $resource->mediaType,
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::searchResources
     */
    public function testSearchResources(): void
    {
        $query = new Query('query', 'image', 0);
        $result = Result::fromResponse(
            new Response($this->getSearchResponse()),
        );

        $this->gateway
            ->expects(self::once())
            ->method('search')
            ->with($query)
            ->willReturn($result);

        self::assertSame(
            $result,
            $this->cloudinaryProvider->searchResources($query),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::searchResources
     */
    public function testSearchResourcesWithLimitAndOffset(): void
    {
        $query = new Query(
            'query',
            'image',
            25,
            null,
            null,
            '823b',
        );

        $result = Result::fromResponse(
            new Response(
                $this->getSearchResponse(),
            ),
        );

        $this->gateway
            ->expects(self::once())
            ->method('search')
            ->with($query)
            ->willReturn($result);

        self::assertSame(
            $result,
            $this->cloudinaryProvider->searchResources($query),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::searchResources
     */
    public function testSearchResourcesByTag(): void
    {
        $query = new Query(
            '',
            'image',
            25,
            null,
            'tag',
        );

        $result = Result::fromResponse(
            new Response(
                $this->getSearchResponse(),
            ),
        );

        $this->gateway
            ->expects(self::once())
            ->method('search')
            ->with($query)
            ->willReturn($result);

        self::assertSame(
            $result,
            $this->cloudinaryProvider->searchResources($query),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::searchResourcesCount
     */
    public function testSearchResourceCount(): void
    {
        $query = new Query('query', 'image', 0);

        $this->gateway
            ->expects(self::once())
            ->method('searchCount')
            ->with($query)
            ->willReturn(125);

        self::assertSame(
            125,
            $this->cloudinaryProvider->searchResourcesCount($query),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::deleteResource
     */
    public function testDeleteResource(): void
    {
        $resource = RemoteResource::createFromParameters([
            'resourceId' => 'testResourceId',
            'resourceType' => 'image',
        ]);

        $this->gateway
            ->expects(self::once())
            ->method('delete')
            ->with($resource->resourceId);

        $this->cloudinaryProvider->deleteResource($resource);
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::buildVariation
     */
    public function testBuildVariation(): void
    {
        $resource = RemoteResource::createFromParameters(
            [
                'resourceId' => 'testId',
                'url' => 'http://cloudinary.com/some/url',
                'secure_url' => 'https://cloudinary.com/some/url',
                'variations' => [
                    'small' => [
                        'x' => 10,
                        'y' => 10,
                        'w' => 300,
                        'h' => 200,
                    ],
                ],
            ],
        );

        $variation = $this->cloudinaryProvider->buildVariation($resource, 'test_group', '');

        self::assertInstanceOf(Variation::class, $variation);
        self::assertSame(
            $resource->secure_url,
            $variation->url,
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::buildVariation
     */
    public function testBuildVariationWithProvidedConfiguration(): void
    {
        $resource = RemoteResource::createFromParameters(
            [
                'resourceId' => 'testId',
                'url' => 'http://cloudinary.com/some/url',
                'secure_url' => 'https://cloudinary.com/some/url',
                'variations' => [
                    'small' => [
                        'x' => 10,
                        'y' => 10,
                        'w' => 300,
                        'h' => 200,
                    ],
                ],
            ],
        );

        $this->gateway->method('getVariationUrl')->willReturn('https://cloudinary.com/c_fit,w_200,h_200/testId');

        $variation = $this->cloudinaryProvider->buildVariation(
            $resource,
            'test_content_type',
            ['crop' => 'fit', 'width' => 200, 'height' => 200],
        );

        self::assertInstanceOf(Variation::class, $variation);
        self::assertSame(
            'https://cloudinary.com/c_fit,w_200,h_200/testId',
            $variation->url,
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::addTagToResource
     */
    public function testAddTag(): void
    {
        $resource = RemoteResource::createFromParameters([
            'resourceId' => 'testResourceId',
            'resourceType' => 'image',
        ]);

        $this->gateway
            ->expects(self::once())
            ->method('addTag')
            ->with($resource->resourceId, $resource->resourceType, 'testTag');

        $this->cloudinaryProvider->addTagToResource($resource, 'testTag');
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::removeTagFromResource
     */
    public function testRemoveTag(): void
    {
        $resource = RemoteResource::createFromParameters([
            'resourceId' => 'testResourceId',
            'resourceType' => 'image',
        ]);

        $this->gateway
            ->expects(self::once())
            ->method('removeTag')
            ->with($resource->resourceId, $resource->resourceType, 'testTag');

        $this->cloudinaryProvider->removeTagFromResource($resource, 'testTag');
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::removeAllTagsFromResource
     */
    public function testRemoveAllTags(): void
    {
        $resource = RemoteResource::createFromParameters([
            'resourceId' => 'testResourceId',
            'resourceType' => 'image',
        ]);

        $this->gateway
            ->expects(self::once())
            ->method('removeAllTags')
            ->with($resource->resourceId, $resource->resourceType);

        $this->cloudinaryProvider->removeAllTagsFromResource($resource);
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::updateTags
     */
    public function testUpdateTags(): void
    {
        $resource = RemoteResource::createFromParameters([
            'resourceId' => 'testResourceId',
            'resourceType' => 'image',
        ]);

        $tags = [
            'newtag1',
            'newtag2',
        ];

        $options = [
            'tags' => implode(',', $tags),
        ];

        $this->gateway
            ->expects(self::once())
            ->method('update')
            ->with($resource->resourceId, $resource->resourceType, $options);

        $this->cloudinaryProvider->updateTags($resource, $tags);
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::updateResourceContext
     */
    public function testUpdateResourceContext(): void
    {
        $resource = RemoteResource::createFromParameters([
            'resourceId' => 'testResourceId',
            'resourceType' => 'image',
        ]);

        $options = [
            'context' => [
                'caption' => 'test_caption',
            ],
        ];

        $this->gateway
            ->expects(self::once())
            ->method('update')
            ->with($resource->resourceId, $resource->resourceType, $options);

        $this->cloudinaryProvider->updateResourceContext(
            $resource,
            [
                'caption' => 'test_caption',
            ],
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::getVideoThumbnail
     */
    public function testGetVideoThumbnail(): void
    {
        $resource = RemoteResource::createFromParameters([
            'resourceId' => 'testResourceId',
            'resourceType' => 'image',
        ]);

        $options = [
            'start_offset' => 'auto',
            'resource_type' => 'video',
        ];

        $this->gateway
            ->expects(self::once())
            ->method('getVideoThumbnail')
            ->with($resource->resourceId, $options)
            ->willReturn('https://cloudinary.com/upload/image/video_thumbnail.jpg');

        self::assertSame(
            'https://cloudinary.com/upload/image/video_thumbnail.jpg',
            $this->cloudinaryProvider->getVideoThumbnail($resource),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::getVideoThumbnail
     */
    public function testVideoThumbnailWithProvidedOptions(): void
    {
        $resource = RemoteResource::createFromParameters([
            'resourceId' => 'testResourceId',
            'resourceType' => 'image',
        ]);

        $options = [
            'start_offset' => 'auto',
            'resource_type' => 'video',
            'crop' => 'fill',
            'width' => 200,
            'height' => 200,
        ];

        $this->gateway
            ->expects(self::once())
            ->method('getVideoThumbnail')
            ->with($resource->resourceId, $options)
            ->willReturn('https://cloudinary.com/upload/image/video_thumbnail.jpg');

        self::assertSame(
            'https://cloudinary.com/upload/image/video_thumbnail.jpg',
            $this->cloudinaryProvider->getVideoThumbnail(
                $resource,
                [
                    'crop' => 'fill',
                    'width' => 200,
                    'height' => 200,
                ],
            ),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::generateVideoTag
     */
    public function testGetVideoTag(): void
    {
        $resource = RemoteResource::createFromParameters([
            'resourceId' => 'testResourceId',
            'resourceType' => 'image',
        ]);

        $options = [
            'fallback_content' => 'Your browser does not support HTML5 video tags',
            'controls' => true,
            'poster' => [],
        ];

        $this->gateway
            ->expects(self::once())
            ->method('getVideoTag')
            ->with($resource->resourceId, $options)
            ->willReturn('<video src="htttps://cloudinary.com/upload/video.mp4></video>');

        self::assertSame(
            '<video src="htttps://cloudinary.com/upload/video.mp4></video>',
            $this->cloudinaryProvider->generateVideoTag(
                $resource,
                'test_group',
                [],
            ),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::generateVideoTag
     */
    public function testGetVideoTagWithProvidedVariation(): void
    {
        $resource = RemoteResource::createFromParameters([
            'resourceId' => 'testResourceId',
            'resourceType' => 'image',
        ]);

        $variationConfig = [
            'crop' => 'fit',
            'width' => 200,
        ];

        $options = [
            'fallback_content' => 'Your browser does not support HTML5 video tags',
            'controls' => true,
            'poster' => $variationConfig,
        ];

        $this->gateway
            ->expects(self::once())
            ->method('getVideoTag')
            ->with($resource->resourceId, $options + $variationConfig)
            ->willReturn('<video src="htttps://cloudinary.com/upload/video.mp4></video>');

        self::assertSame(
            '<video src="htttps://cloudinary.com/upload/video.mp4></video>',
            $this->cloudinaryProvider->generateVideoTag(
                $resource,
                'test_group',
                $variationConfig,
            ),
        );
    }

    /**
     * @covers \Netgen\RemoteMedia\Core\Provider\Cloudinary\CloudinaryProvider::generateDownloadLink
     */
    public function testGenerateDownloadLink(): void
    {
        $resource = RemoteResource::createFromParameters([
            'resourceId' => 'testResourceId',
            'resourceType' => 'image',
        ]);

        $options = [
            'type' => 'upload',
            'resource_type' => 'image',
            'flags' => 'attachment',
            'secure' => true,
        ];

        $this->gateway
            ->expects(self::once())
            ->method('getDownloadLink')
            ->with($resource->resourceId, $resource->resourceType, $options)
            ->willReturn('https://cloudinary.com/upload/file.zip');

        self::assertSame(
            'https://cloudinary.com/upload/file.zip',
            $this->cloudinaryProvider->generateDownloadLink($resource),
        );
    }

    private function getSearchResponse(): stdClass
    {
        $response = new stdClass();
        $response->body = json_encode([
            'total_count' => 200,
            'next_cursor' => '123',
            'resources' => [],
        ]);
        $response->responseCode = 200;
        $response->headers = [
            'X-FeatureRateLimit-Reset' => 'test',
            'X-FeatureRateLimit-Limit' => 'test',
            'X-FeatureRateLimit-Remaining' => 'test',
        ];

        return $response;
    }
}
