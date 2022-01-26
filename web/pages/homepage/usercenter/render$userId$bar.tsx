import React from "react";

import { SProps } from "ssr-types-react";
import UserCenter from "@/components/pages/usercenter";

export default (props: SProps) => {
    return (
        <>
            <UserCenter {...props} />
        </>
    );
}
