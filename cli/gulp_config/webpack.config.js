// 和gulpfile.kids.js配套使用的配置文件
var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var entries = {
    kids: './Src/Kids/scripts/entry.js',
};

var cdnPath = '';
var outPath = '/Public/xxx/';

module.exports = {

    // 入口文件地址
    entry: entries,

    // 输出
    output: {
        path: path.join(__dirname, 'Src/Kids'),
        publicPath: '/Src/Kids/',
        filename: 'js/[name].bundle.js'
    },
    resolve: {
        extensions: ['', '.js']
    },

    // 加载器
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192&name=images/[name]-[hash:6].[ext]'
        }]
    },
    plugins: [

        // 设置抽出css文件名
        new ExtractTextPlugin('./css/[name].css', {
            disable: false,
            allChunks: true
        }),

        // 代理服务器，提供自动刷新和转发请求
        new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                proxy: 'http://mysites.local'
            },
            // plugin options
            {
                reload: false
            })
    ],

    // 从外部引入，内部不会打包合并进去
    externals: {
        zepto: 'window.Zepto'
    }
};

// 区分生产环境和开发环境
module.exports.plugins = (module.exports.plugins || []);

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = 'source-map';
    module.exports.output.publicPath = outPath;
}else if(process.env.NODE_ENV === 'dist'){
    module.exports.devtool = 'source-map';
    module.exports.output.publicPath = cdnPath;
} else {
    module.exports.watch = true;
    module.exports.devtool = 'cheap-module-eval-source-map';
}
