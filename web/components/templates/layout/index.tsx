import React,{useState,useEffect,useContext} from "react";
import { SProps,IContext } from "ssr-types-react";

import { Tabs,Button} from "antd";
import { HomeOutlined } from '@ant-design/icons';
import { _defaultHandle } from '@/tool/handleSessionStorage';
import { updateContext } from '@/tool/handleDispatch';
import { ILayout } from "@/interface";
import InMainLayout from "./InMainLayout";
import "./index.less"

const { TabPane } = Tabs;


const NewPage = (props:any) =>{
    return <iframe src={props.src} style={{border:0,width:"100%",height:props.ClientHeight}}></iframe>
}

export default (props: SProps) => {
    const { dispatch } = useContext<IContext<ILayout>>(window.STORE_CONTEXT)
    const [tabState,setTabState] = useState<any>({
        activeKey: '1',
        panes:[
            {
                title:<> 
                    <Button type="primary" className="logoBtn"
                    onClick={()=>{window.location.href="/"}}
                    icon={<HomeOutlined style={{marginRight:0}}/>}>
                    </Button>
                    <span>动漫小站</span></>
                    ,
                content: <InMainLayout {...props}/>,
                key: '1',
                closable: false,
              },
        ],
        newTabIndex:2
    })
    useEffect(()=>{
        const {newTabIndex} = tabState;
        let acghome_tabpane:any = _defaultHandle("acghome_tabpane","get");
        if(acghome_tabpane){
            setTabState(Object.assign({},tabState,{newTabIndex}))
        }else{
            _defaultHandle("acghome_tabpane","set",{newTabIndex:newTabIndex||2})
        }
        updateContext(dispatch,{
            addNewPage
        })
    },[])

    const addNewPage=(title:any,childsrc:any,ClientHeight:any)=>{
        const {panes,newTabIndex} = tabState;
        let _newTabIndex = newTabIndex + 1;
        let activeKey = `newTab${_newTabIndex}`;
        panes.push({ title: title, content: <NewPage src={childsrc} ClientHeight={ClientHeight}/>, key: activeKey });
        setTabState(Object.assign({},tabState,{activeKey,panes,newTabIndex:_newTabIndex}))

    }

    const add = () => {//使用不到
        const { panes,newTabIndex } = tabState;
        let _newTabIndex = newTabIndex + 1;
        const activeKey = `newTab${_newTabIndex}`;
        panes.push({ title: 'New Tab', content: '内容', key: activeKey });
        setTabState(Object.assign({},tabState,{activeKey,panes,newTabIndex:_newTabIndex}))
    };

    const remove = (targetKey:any) => {
        let { activeKey,panes } = tabState;
        let lastIndex:any;
        tabState.panes.forEach((pane:any, i:any) => {
            if (pane.key === targetKey) {
            lastIndex = i - 1;
            }
        });
        const _panes = panes.filter((pane:any) => pane.key !== targetKey);
        if (_panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
            activeKey = _panes[lastIndex].key;
            } else {
            activeKey = _panes[0].key;
            }
        }
        setTabState(Object.assign({},tabState,{panes:_panes,activeKey}))

    };
    return (
        <>
            <Tabs
                    onChange={(activeKey)=>setTabState(Object.assign({},tabState,{activeKey}))}
                    activeKey={tabState.activeKey}
                    type="editable-card"
                    onEdit={(targetKey, action)=>action=="add"?add():remove(targetKey)}
                    hideAdd
                >
                    {tabState.panes.map((pane:any) => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                            {pane.content}
                        </TabPane>
                        ))}
            </Tabs>
        </>
    );
}
