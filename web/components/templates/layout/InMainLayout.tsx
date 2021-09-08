import React,{useContext,useEffect,useState} from "react";

import { SProps,IContext } from "ssr-types-react";
import { Layout } from 'antd';
import { ILayout } from "@/interface";
import { updateContext } from '@/tool/handleDispatch';
import { getClientHeight } from '@/tool/utils';
import NormalHeader from "./NormalHeader";
import NormalFooter from "./NormalFooter";
const { Content,Header,Footer } = Layout;

export default (props: SProps) => {
    const { dispatch } = useContext<IContext<ILayout>>(window.STORE_CONTEXT)
    const [clientState,setClientState] = useState<any>({
        height:"100vh"
    })
    useEffect(()=>{
        const ClientHeight = getClientHeight() - 48;//【精确计算高度，移除最外层滚动】
        setClientState({height: ClientHeight})
        updateContext(dispatch,{ClientHeight})
    },[])


    return (
        <>
            <Layout style={{ minHeight: clientState.height + 5 }}>
                {/* 高度限制了2次，第一次是这儿的布局，限制了header,第二次MainHeader里具体限制了[旧注释] */}
                <Header style={{ paddingLeft: 10, backgroundColor: "#fff", height: "35px", paddingRight: 10 }}>
                    <NormalHeader {...props}/>
                </Header>
                <Content>
                    {(props as any).children}
                </Content>
                <Footer style={{ textAlign: "center", background: "transparent" }}>
                    <NormalFooter {...props}/>
                </Footer>
            </Layout>
        </>
    );
}
