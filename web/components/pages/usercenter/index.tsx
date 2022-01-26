import React,{useContext} from "react";
import { SProps, IContext } from "ssr-types-react";
import { IUserCenterData } from "@/interface";
import Collecting  from "./collecting"
import Activity  from "./activity"
import Followed  from "./followed"
import Following  from "./following"
import Liking  from "./liking"



export default (props: SProps) => {
    const { state } = useContext<IContext<IUserCenterData>>(window.STORE_CONTEXT);

    const swtichComponent = (bar:any)=>{switch(bar){
            case "activity":
                return <Activity {...props}/>
            case "collecting":
                return <Collecting {...props}/>
            case "followed":
                return <Followed {...props}/>
            case "following":
                return <Following {...props}/>
            case "liking":
                return <Liking {...props}/>
            default:
                return <Collecting {...props}/>
        }
    }
    
    return (
        <>
            {swtichComponent(state?.IndexData.bar)}
        </>
    );
}
