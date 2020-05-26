module.exports = {
    configureWebpack: {
        resolve: {
            //默认的配置有：@就表示src
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        }
    }
}
