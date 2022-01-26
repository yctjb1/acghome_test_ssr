import React, { Component, Fragment } from 'react';
import { Button, Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import queryString from "query-string";
import "./AdminTabs.less"
const { TabPane } = Tabs;

class AdminTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: "1",
            comicId: ""
        }

    }
    componentWillMount() {

        let params = queryString.parse(this.props.location.search);
        if (params) {
            let webTab, linkTab;
            if (params.comicId) {
                //【大改,comicData拿掉，仅用tabs_key,comicId,webId,LinkId】
                webTab = true;
                if (params.webId) {
                    linkTab = true;
                }
            }


            this.setState({
                activeKey: params.tabs_key || this.state.activeKey,
                comicId: params.comicId,

                webTab: webTab ? webTab : false,
                linkTab: linkTab ? linkTab : false,
            }, () => {

            })
        }
    }

    onChangeTabs = (activeKey) => {

        let params = queryString.parse(this.props.location.search);
        if (params) {
            // params = JSON.parse(params);
            params.tabs_key = activeKey;

        } else {
            params = {
                tabs_key: activeKey
            }

        }
        let gopath;
        if (activeKey === "1") {
            gopath = "/homepage/administer/adminmanage";
        }
        else if (activeKey === "2") {
            gopath = "/homepage/administer/comicmanage";
        }
        else if (activeKey === "3") {
            gopath = "/homepage/administer/webmanage";
        }
        else if (activeKey === "4") {
            gopath = "/homepage/administer/linkmanage";
        }
        else if (activeKey === "5") {
            gopath = "/homepage/administer/delmanage";
        }


        // params = JSON.stringify(params)

        params = queryString.stringify(params)
        this.setState({
            activeKey
        }, () => {
            this.props.history.push({
                pathname: gopath,
                search: params
            });
        })
    }

    render() {
        return <Fragment>

            <Tabs tabPosition="top" activeKey={this.state.activeKey} animated={false}
                className="admin_tabs"
                onChange={this.onChangeTabs}>
                <TabPane tab="用户管理" key="1">
                    {/* <AdminManage /> */}
                </TabPane>
                <TabPane tab="漫画管理" key="2">
                    {/* <ComicManage childTabs={this.childTabs}/> */}
                </TabPane>
                <TabPane tab="源站管理" key="3" disabled={!this.state.webTab}>
                    {/* <WebManage comicData={this.state.comicData}/> */}
                </TabPane>
                <TabPane tab="链接管理" key="4" disabled={!this.state.linkTab}>
                    {/* <LinkManage/> */}
                </TabPane>
                <TabPane tab="回收管理" key="5" >
                    {/* 这里是回收站 */}
                </TabPane>
            </Tabs>
        </Fragment>
    }
}

export default withRouter(AdminTabs);