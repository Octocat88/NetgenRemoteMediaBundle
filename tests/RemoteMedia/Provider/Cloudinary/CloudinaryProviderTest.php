<?php

declare(strict_types=1);

namespace Netgen\Bundle\RemoteMediaBundle\Tests\RemoteMedia\Provider\Cloudinary;

use Cloudinary\Api\Response;
use Netgen\Bundle\RemoteMediaBundle\Core\FieldType\RemoteMedia\Value;
use Netgen\Bundle\RemoteMediaBundle\Core\FieldType\RemoteMedia\Variation;
use Netgen\Bundle\RemoteMediaBundle\RemoteMedia\Provider\Cloudinary\CloudinaryProvider;
use Netgen\Bundle\RemoteMediaBundle\RemoteMedia\Provider\Cloudinary\Gateway\CloudinaryApiGateway;
use Netgen\Bundle\RemoteMediaBundle\RemoteMedia\Provider\Cloudinary\Search\Query;
use Netgen\Bundle\RemoteMediaBundle\RemoteMedia\Provider\Cloudinary\Search\Result;
use Netgen\Bundle\RemoteMediaBundle\RemoteMedia\Transformation\Registry;
use Netgen\Bundle\RemoteMediaBundle\RemoteMedia\UploadFile;
use Netgen\Bundle\RemoteMediaBundle\RemoteMedia\VariationResolver;
use org\bovigo\vfs\vfsStream;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\File\Exception\FileNotFoundException;

class CloudinaryProviderTest extends TestCase
{
    /**
     * @var \Netgen\Bundle\RemoteMediaBundle\RemoteMedia\Provider\Cloudinary\CloudinaryProvider
     */
    protected $cloudinaryProvider;

    /**
     * @var \PHPUnit_Framework_MockObject_MockObject
     */
    protected $registry;

    /**
     * @var \PHPUnit_Framework_MockObject_MockObject
     */
    protected $variationResolver;

    /**
     * @var \PHPUnit_Framework_MockObject_MockObject
     */
    protected $gateway;

    public function setUp()
    {
        $this->registry = $this->createMock(Registry::class);
        $this->variationResolver = $this->createMock(VariationResolver::class);
        $this->gateway = $this->createMock(CloudinaryApiGateway::class);

        $this->cloudinaryProvider = new CloudinaryProvider(
            $this->registry,
            $this->variationResolver,
            $this->gateway
        );
    }

    private function getSearchResponse()
    {
        $response = new \stdClass();
        $response->body = \json_encode([
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

    public function testIdentifier()
    {
        $this->assertEquals(
            'cloudinary',
            $this->cloudinaryProvider->getIdentifier()
        );
    }

    public function testSupportsContentBrowser()
    {
        $this->assertFalse(
            $this->cloudinaryProvider->supportsContentBrowser()
        );
    }

    public function testSupportsFolders()
    {
        $this->assertTrue(
            $this->cloudinaryProvider->supportsFolders()
        );
    }

    public function testCountResources()
    {
        $this->gateway
            ->expects($this->once())
            ->method('countResources')
            ->willReturn(0);

        $this->cloudinaryProvider->countResources();
    }

    public function testListFolders()
    {
        $this->gateway
            ->expects($this->once())
            ->method('listFolders')
            ->willReturn([]);

        $this->cloudinaryProvider->listFolders();
    }

    public function testCountResourcesInFolder()
    {
        $this->gateway
            ->expects($this->once())
            ->method('countResourcesInFolder')
            ->willReturn(0);

        $this->cloudinaryProvider->countResourcesInFolder('testFolder');
    }

    public function testSearchResources()
    {
        $query = new Query('query', 'image', 0);

        $this->gateway
            ->expects($this->once())
            ->method('search')
            ->with($query)
            ->willReturn(
                Result::fromResponse(new Response($this->getSearchResponse()))
            );

        $this->cloudinaryProvider->searchResources($query);
    }

    public function testSearchResourcesWithLimitAndOffset()
    {
        $query = new Query('query', 'image', 25, null, null, '823b');

        $this->gateway
            ->expects($this->once())
            ->method('search')
            ->with($query)
            ->willReturn(
                Result::fromResponse(new Response($this->getSearchResponse()))
            );

        $this->cloudinaryProvider->searchResources($query);
    }

    public function testSearchResourcesByTag()
    {
        $query = new Query('', 'image', 25, null, 'tag');

        $this->gateway
            ->expects($this->once())
            ->method('search')
            ->with($query)
            ->willReturn(
                Result::fromResponse(new Response($this->getSearchResponse()))
            );

        $this->cloudinaryProvider->searchResources($query);
    }

    public function testGetEmptyResourceId()
    {
        $this->gateway
            ->expects($this->never())
            ->method('get');

        $value = $this->cloudinaryProvider->getRemoteResource('', 'image');

        $this->assertInstanceOf(Value::class, $value);
        $this->assertNull(
            $value->resourceId
        );
    }

    public function testGetRemoteResource()
    {
        $this->gateway->method('get')->willReturn(
            [
                'public_id' => 'testResourceId',
                'url' => 'http://some.url/path',
                'secure_url' => 'https://some.url/path',
                'bytes' => 1024,
                'resource_type' => 'image',
            ]
        );

        $this->gateway
            ->expects($this->once())
            ->method('get')
            ->with('testResourceId', 'image');

        $value = $this->cloudinaryProvider->getRemoteResource('testResourceId', 'image');

        $this->assertInstanceOf(Value::class, $value);
        $this->assertEquals(
            'testResourceId',
            $value->resourceId
        );
        $this->assertEquals(
            'http://some.url/path',
            $value->url
        );
        $this->assertEquals(
            'https://some.url/path',
            $value->secure_url
        );
        $this->assertEquals(
            1024,
            $value->size
        );
        $this->assertEquals(
            Value::TYPE_IMAGE,
            $value->mediaType
        );
    }

    public function testGetRemoteVideo()
    {
        $this->gateway->method('get')->willReturn(
            [
                'public_id' => 'testResourceId',
                'url' => 'http://some.url/path',
                'secure_url' => 'https://some.url/path',
                'bytes' => 1024,
                'resource_type' => 'video',
            ]
        );

        $this->gateway
            ->expects($this->once())
            ->method('get')
            ->with('testResourceId', 'video');

        $value = $this->cloudinaryProvider->getRemoteResource('testResourceId', 'video');

        $this->assertInstanceOf(Value::class, $value);
        $this->assertEquals(
            Value::TYPE_VIDEO,
            $value->mediaType
        );
    }

    public function testGetRemoteDocument()
    {
        $this->gateway->method('get')->willReturn(
            [
                'public_id' => 'testResourceId',
                'url' => 'http://some.url/path',
                'secure_url' => 'https://some.url/path',
                'bytes' => 1024,
                'resource_type' => 'image',
                'format' => 'pdf',
            ]
        );

        $this->gateway
            ->expects($this->once())
            ->method('get')
            ->with('testResourceId', 'image');

        $value = $this->cloudinaryProvider->getRemoteResource('testResourceId', 'image');

        $this->assertInstanceOf(Value::class, $value);
        $this->assertEquals(
            Value::TYPE_OTHER,
            $value->mediaType
        );
    }

    public function testAddTag()
    {
        $this->gateway
            ->expects($this->once())
            ->method('addTag')
            ->with('testResourceId', 'testTag');

        $this->cloudinaryProvider->addTagToResource('testResourceId', 'testTag');
    }

    public function testRemoveTag()
    {
        $this->gateway
            ->expects($this->once())
            ->method('removeTag')
            ->with('testResourceId', 'testTag');

        $this->cloudinaryProvider->removeTagFromResource('testResourceId', 'testTag');
    }

    public function testUpdateResourceContext()
    {
        $options = [
            'context' => ['caption' => 'test_caption'],
            'resource_type' => 'image',
        ];

        $this->gateway
            ->expects($this->once())
            ->method('update')
            ->with('testResourceId', $options);

        $this->cloudinaryProvider->updateResourceContext('testResourceId', 'image', ['caption' => 'test_caption']);
    }

    public function testGetVideoThumbnail()
    {
        $options = [
            'start_offset' => 'auto',
            'resource_type' => 'video',
            'crop' => 'fit',
            'width' => 320,
            'height' => 240,
        ];

        $this->gateway
            ->expects($this->once())
            ->method('getVideoThumbnail')
            ->with('testResourceId', $options)
            ->willReturn('');

        $value = new Value();
        $value->resourceId = 'testResourceId';

        $this->cloudinaryProvider->getVideoThumbnail($value);
    }

    public function testVideoThumbnailWithProvidedOptions()
    {
        $options = [
            'start_offset' => 'auto',
            'resource_type' => 'video',
            'crop' => 'fill',
            'width' => 200,
            'height' => 200,
        ];

        $this->gateway
            ->expects($this->once())
            ->method('getVideoThumbnail')
            ->with('testResourceId', $options)
            ->willReturn('');

        $value = new Value();
        $value->resourceId = 'testResourceId';

        $this->cloudinaryProvider->getVideoThumbnail($value, ['crop' => 'fill', 'width' => 200, 'height' => 200]);
    }

    public function testGetVideoTag()
    {
        $options = [
            'fallback_content' => 'Your browser does not support HTML5 video tags',
        ];

        $this->gateway
            ->expects($this->once())
            ->method('getVideoTag')
            ->with('testResourceId', $options)
            ->willReturn('');

        $value = new Value();
        $value->resourceId = 'testResourceId';

        $this->cloudinaryProvider->generateVideoTag($value, 'test_content_type');
    }

    public function testGetVideoTagWithProvidedVariation()
    {
        $options = [
            'fallback_content' => 'Your browser does not support HTML5 video tags',
        ];

        $variationConfig = [
            'crop' => 'fit',
            'width' => 200,
        ];

        $this->gateway
            ->expects($this->once())
            ->method('getVideoTag')
            ->with('testResourceId', $options + $variationConfig)
            ->willReturn('');

        $value = new Value();
        $value->resourceId = 'testResourceId';

        $this->cloudinaryProvider->generateVideoTag($value, 'test_content_type', $variationConfig);
    }

    public function testGenerateDownloadLink()
    {
        $options = [
            'type' => 'upload',
            'resource_type' => 'image',
            'flags' => 'attachment',
        ];

        $value = new Value(
            [
                'resourceId' => 'testResourceId',
                'resourceType' => 'image',
                'type' => 'upload',
            ]
        );

        $this->gateway
            ->expects($this->once())
            ->method('getDownloadLink')
            ->with('testResourceId', $options)
            ->willReturn('');

        $this->cloudinaryProvider->generateDownloadLink($value);
    }

    public function testDeleteResource()
    {
        $this->gateway
            ->expects($this->once())
            ->method('delete')
            ->with('testResourceId');

        $this->cloudinaryProvider->deleteResource('testResourceId');
    }

    public function testUpload()
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
            ]
        );

        $this->gateway
            ->expects($this->once())
            ->method('upload')
            ->with(
                $uploadFile->uri(),
                $options
            );

        $value = $this->cloudinaryProvider->upload($uploadFile, ['overwrite' => true]);

        $this->assertInstanceOf(Value::class, $value);

        $this->assertEquals(
            'filename',
            $value->resourceId
        );
        $this->assertEquals(
            'http://some.url/filename',
            $value->url
        );
        $this->assertEquals(
            'https://some.url/filename',
            $value->secure_url
        );
        $this->assertEquals(
            1024,
            $value->size
        );
        $this->assertEquals(
            Value::TYPE_IMAGE,
            $value->mediaType
        );
    }

    public function testUploadWithExtension()
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
            ]
        );

        $this->gateway
            ->expects($this->once())
            ->method('upload')
            ->with(
                $file->url(),
                $options
            );

        $uploadFile = UploadFile::fromUri($file->url());

        $value = $this->cloudinaryProvider->upload($uploadFile, ['overwrite' => true]);

        $this->assertInstanceOf(Value::class, $value);

        $this->assertEquals(
            'file.zip',
            $value->resourceId
        );
        $this->assertEquals(
            'http://some.url/file.zip',
            $value->url
        );
        $this->assertEquals(
            'https://some.url/file.zip',
            $value->secure_url
        );
        $this->assertEquals(
            1024,
            $value->size
        );
        $this->assertEquals(
            Value::TYPE_OTHER,
            $value->mediaType
        );
    }

    public function testUploadNoFile()
    {
        $this->expectException(FileNotFoundException::class);

        $uploadFile = UploadFile::fromUri('/some/path.jpg');

        $this->cloudinaryProvider->upload($uploadFile, ['overwrite' => true]);
    }

    public function testBuildVariation()
    {
        $value = new Value(
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
            ]
        );

        $variation = $this->cloudinaryProvider->buildVariation($value, 'test_content_type', '');

        $this->assertInstanceOf(Variation::class, $variation);
        $this->assertEquals(
            $value->secure_url,
            $variation->url
        );
    }

    public function testBuildVariationWithProvidedConfiguration()
    {
        $value = new Value(
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
            ]
        );

        $this->gateway->method('getVariationUrl')->willReturn('https://cloudinary.com/c_fit,w_200,h_200/testId');

        $variation = $this->cloudinaryProvider->buildVariation(
            $value,
            'test_content_type',
            ['crop' => 'fit', 'width' => 200, 'height' => 200]
        );

        $this->assertInstanceOf(Variation::class, $variation);
        $this->assertEquals(
            'https://cloudinary.com/c_fit,w_200,h_200/testId',
            $variation->url
        );
    }
}
