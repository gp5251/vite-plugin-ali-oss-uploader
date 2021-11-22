const WebpackAliyunOss = require('webpack-aliyun-oss');

module.exports = function (options = {}) {
	return {
		name: 'vite-plugin-ali-oss-uploader',
		closeBundle() {
			new WebpackAliyunOss(options).apply().catch(() => { }); // ignore error
		}
	}
}