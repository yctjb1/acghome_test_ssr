import React,{useContext} from "react";
import { SProps, IContext } from "ssr-types-react";
import { IError } from "@/interface";

export default function NotFoundPage (props: SProps) {
    const { state } = useContext<IContext<IError>>(window.STORE_CONTEXT);

    return (
        <div>
            这里是error/:code,其中code={state?.ErrorData.code}
        </div>
    )
}
