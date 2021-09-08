import React from "react";

import { SProps } from "ssr-types-react";
import Adminster from "@/components/templates/adminster";

export default (props: SProps) => {
    return (
        <>
           <Adminster {...props} />
        </>
    );
}
