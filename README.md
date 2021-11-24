# vite-plugin-ali-oss-uploader
上传静态资源到阿里云oss。

Install
------------------------
```shell
$ npm i vite-plugin-aliyun-oss -D
```

Options
------------------------

插件支持所有 [webpack-aliyun-oss](https://www.npmjs.com/package/webpack-aliyun-oss) 的配置参数

- `from`: 上传哪些文件，支持类似gulp.src的glob方法，如'./build/**', 可以为glob字符串或者数组。
- `dist`: 上传到oss哪个目录下，默认为oss根目录。可作为路径前缀使用。
- `region`: 阿里云上传区域
- `accessKeyId`: 阿里云的授权accessKeyId
- `accessKeySecret`: 阿里云的授权accessKeySecret
- `bucket`: 上传到哪个bucket
- `timeout`: oss超时设置，默认为30秒(30000)
- `overwrite`: 是否覆盖oss同名文件。默认false
- `deletOrigin`: 上传完成是否删除原文件，默认false
- `deleteEmptyDir`: 如果某个目录下的文件都上传过了，是否删除此目录。deleteOrigin为true时候生效。默认false。
- `setOssPath`: 自定义每个文件上传路径。接收参数为当前文件路径。不传，或者所传函数返回false则按默认方式上传。
- `buildRoot`: 构建目录。如：path/to/your/files。独立使用时候需要传。如果已传`setOssPath`可忽略。默认为当前工作目录。
- `test`: 测试，仅显示要上传的文件，但是不执行上传操作。默认false
- `bail`: 出错中断上传。默认false
- `logToLocal`: 出错信息写入本地upload.error.log。默认false

#### 注意: `accessKeyId, accessKeySecret` 很重要，注意保密!!!

Example
------------------------

```javascript
import uploader from 'vite-plugin-ali-oss-uploader';

export default defineConfig({
  plugins: [
    {
      ...uploader({
        from: ['./build/**', '!./build/**/*.html'],
        dist: 'path/in/alioss',
        buildRoot: path.resolve(__dirname, 'dist'),
        region: 'your region',
        accessKeyId: 'your key',
        accessKeySecret: 'your secret',
        bucket: 'your bucket',

        // 想自定义上传路径就传
        // 否则按`buildRoot`指定目录的文件结构上传
        setOssPath(filePath) {
          // filePath为当前文件路径。函数应该返回路径+文件名。
          // 如果返回/new/path/to/file.js，则最终上传路径为 /path/in/alioss/new/path/to/file.js
          return '/new/path/to/file.js';
        },

        // 想自定义header就传
        setHeaders(filePath) {
          // some operations to filePath
          return {
            'Cache-Control': 'max-age=31536000'
          }
        }
      }),
      apply: 'build', // 只在 build 模式启用
      enforce: 'post' // 在 Vite 构建插件之后调用该插件
    }
  ]
})
```   
