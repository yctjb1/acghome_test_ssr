import React,{ useState,useEffect } from "react";

import { SProps } from "ssr-types-react";
import InMainLayout from "@/components/templates/layout"
import { Button, Drawer } from 'antd';
import {handleSetState} from "@/tool/utils"
import styles from './index.module.less'
const ruyi_url = `https://ruyi.ai/h5-wechat/wechat.html?v=20181023a&appName=八六&app_id=e5e294a9-5375-4ad7-87ca-3ec69f1e6e69&robotImage=https://qiniu.ruyi.ai/e5e294a9-5375-4ad7-87ca-3ec69f1e6e69-1587977755517-head.jpg`;

export default (props: SProps) => {
    const [baseState,setBaseState] = useState({
        searchValue: "展示文本",
        oneUpload_thumbUrl: "",
        user_Id: "",
        visible: false
    })

    useEffect(()=>{
        /*
        queryAuthority()
            .then(result => {
                this.setState({ user_Id: result.user_Id })
            })
        */
    },[])

    return (
        <InMainLayout {...props}>
            <div className={styles["main"]}>
                {/* <MyBreadcrumb match={this.props.match} historyPush={this.props.history.push} /> */}

                <p>首页丢什么呢,还没得定好做什么样的</p>

                <b>首页暂时什么也没有，公告丢到了文章区</b>
                <div  className={styles["ruyibox"]}>

                    <iframe src={ruyi_url} className={styles["ruyi"]}
                        scrolling="yes"
                        marginWidth={0}
                        sandbox="allow-forms
                allow-same-origin
                allow-scripts
                allow-top-navigation"></iframe>
                </div>
                <Button onClick={() =>handleSetState(setBaseState,baseState,{ visible: true })}>与八六对话(天行ai)</Button>

                {/* <Drawer
                    title="注：网站退出后将清除聊天历史"
                    placement="right"
                    closable={true}
                    onClose={() =>handleSetState(setBaseState,baseState,{ visible: false })}
                    visible={baseState.visible}
                    getContainer={false}
                    className={styles["drawer"]}
                >
                    <ChatAi user_Id={baseState.user_Id} />
                </Drawer> */}

                <hr />

                {/* <TuPianUpload Folder={{ cFolder: "acghometest/test/", cFileName: 'test.jpg' }} handleoneUpload={this.handleoneUpload} /> */}
                <span>上传后的链接={baseState.oneUpload_thumbUrl}</span>

            </div>
            
        </InMainLayout>
    );
}
