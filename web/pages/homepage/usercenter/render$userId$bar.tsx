import React from "react";

import { SProps } from "ssr-types-react";
import UserCenter from "@/components/usercenter";

export default (props: SProps) => {
    return (
        <>
            <UserCenter {...props} />
        </>
    );
}
