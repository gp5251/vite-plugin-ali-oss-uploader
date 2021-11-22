import WebpackAliyunOss from 'webpack-aliyun-oss';

export default function (options = {}) {
	return {
		name: 'vite-plugin-ali-oss-uploader',
		closeBundle(){
			new WebpackAliyunOss(options).apply().catch(() => { }); // ignore error
		}
	}
}