export const getClientHeight = () =>{//拷贝的获取页面高度的方法

    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {//都存在则谁小用谁
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    else {//不是都存在则谁大用谁
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
    }
    return clientHeight;
}

export const handleSetState=(setState:any,prev_state:any,obj:any)=>{
    setState(Object.assign({},prev_state,obj))
}