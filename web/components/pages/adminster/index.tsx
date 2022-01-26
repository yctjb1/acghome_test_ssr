import React,{useContext} from "react";
import { SProps, IContext } from "ssr-types-react";
import { IAdminsterData } from "@/interface";

import ComicManage  from "./comicmanage"
import AdminManage  from "./adminmanage"
import Delmanage  from "./delmanage"
import Linkmanage  from "./linkmanage"
import Webmanage  from "./webmanage"

export default (props: SProps) => {
    const { state } = useContext<IContext<IAdminsterData>>(window.STORE_CONTEXT);

    const swtichComponent = (nav:any)=>{switch(nav){
            case "comicmanage":
                return <ComicManage {...props}/>
            case "adminmanage":
                return <AdminManage {...props}/>
            case "delmanage":
                return <Delmanage {...props}/>
            case "linkmanage":
                return <Linkmanage {...props}/>
            case "webmanage":
                return <Webmanage {...props}/>
            default:
                return <ComicManage {...props}/>
        }
    }
    
    return (
        <>
            {swtichComponent(state?.IndexData.nav)}
        </>
    );
}
