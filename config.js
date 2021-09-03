module.exports = {
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
}
