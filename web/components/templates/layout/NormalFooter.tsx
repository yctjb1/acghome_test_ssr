import React,{useContext,useEffect} from "react";

import { SProps } from "ssr-types-react";
import { Layout } from 'antd';

const { Footer } = Layout;


export default (props: SProps) => {


    return (
        <div style={{ background: "rgb(240 242 245 / 0.6)", display: "inline-block" }}>

            <b>
                ©&nbsp;2019-2023&nbsp;动漫小站&nbsp;|&nbsp;
                <a href="http://beian.miit.gov.cn/" target="_blank">苏ICP备16022584号-1</a>
                &nbsp;|&nbsp;react+express+pm2,[2021]+ ssr (midway-react-ssr)
                &nbsp;|&nbsp;服务器提供：<a href="https://www.xiuluohost.com/" target="_blank">修罗云</a>
            </b>
        </div>
    );
}
