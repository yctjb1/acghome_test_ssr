module.exports = {
    serverPort:3089,//Nodejs本地监听端口，默认3000
    fePort:8089,//本地开发时 webpack-dev-server 托管前端静态资源的端口，Node.js Server 会自动 proxy 静态资源, 无特殊需求不需要修改,默认8888
/*
    css: () => { 
        return {
          loaderOptions: {
            // cssOptions: any // css-loader options
            less: { // less-loader options
                lessOptions: {
                    modifyVars: {//antd定制
                    //   'primary-color': '#69EBFF',
                    //   'link-color': '#D2691E',
                    //   'border-radius-base': '20px'
                    },
                    javascriptEnabled: true
                }
            }
            // sass?: any // css-loader options
            // postcss: {
            //   options: any
            //   plugins: any[]
            // }
          }}
    }
*/
}
