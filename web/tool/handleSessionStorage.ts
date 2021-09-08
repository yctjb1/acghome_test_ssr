export const _defaultHandle = (key:string|any,op:string|any = "get",val?:any) =>{
    if(!key) return undefined;
    if(op=="init"){//自带转换返回值，result = obj
        let data:any = sessionStorage.getItem(key);
        if(data != null){
            data = JSON.parse(data)
        }else{
            data = {};
            sessionStorage.setItem(key,JSON.stringify(data));
        }
            return data;
    }else if(op=="get"){//直接返回getItem
        let data:any = sessionStorage.getItem(key);
        return data;
    }else if(op=="set"){//成功运行返回true
        if(!val){
            sessionStorage.setItem(key,JSON.stringify(val));
            return true;
        }else{
            console.log("没有val")
            return undefined;
        }
    }else{
        console.log("未定义的op")
        return undefined;
    }
}