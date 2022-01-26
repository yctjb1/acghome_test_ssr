
import React, { Component, Fragment } from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { GLOBAL_URL } from '@/tool/api/config'
/*引用此面包屑的时候别忘了在使用的地方传
match={this.props.match}
historyPush={this.props.history.push}
*/
class MyBreadcrumb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "1",
            breadbabel: "首页",
            pathname: "/homepage/home"
        }

    }
    componentWillMount() {

        this.nowMatchUpdate(this.props.match)


    }

    nowMatchUpdate = (match) => {
        let pathname = match.path;
        let referenceOBJ = [
            { mode: "1", pathname: "/homepage/home", breadbabel: "首页" },
            { mode: "2", pathname: "/homepage/usercenter/:id", breadbabel: "空间主页" },
            { mode: "3", pathname: "/homepage/usersetting", breadbabel: "设置中心" },
            { mode: "4", pathname: "/homepage/comiclist", breadbabel: "漫画列表" },
            { mode: "5", pathname: "/homepage/articlelist", breadbabel: "文章列表" },
            { mode: "91", pathname: "/homepage/comiclist/:id", breadbabel: "具体漫画" },
            { mode: "92", pathname: "/homepage/articlelist/:id", breadbabel: "具体文章" },
            { mode: "93", pathname: "/homepage/articlelist/taglist", breadbabel: "标签列表" },
        ]

        referenceOBJ = referenceOBJ.filter(item => item.pathname === pathname)[0];
        this.setState({ pathname })
        if (Number(referenceOBJ.mode) <= 90) {
            this.setState({
                mode: referenceOBJ.mode,
                breadbabel: referenceOBJ.breadbabel,
            })
        } else if (referenceOBJ.mode === "91") {
            axios.post(GLOBAL_URL.comicContent, { id: match.params.id })
                .then(res => {
                    res = res.data;
                    if (res.code === "200") {
                        this.setState({
                            breadbabel: res.Info.comic_Name,
                            mode: "91",
                        })
                    }

                })
        } else if (referenceOBJ.mode === "92" || referenceOBJ.mode === "93") {
            if (referenceOBJ.mode !== "92") {
                this.setState({
                    mode: referenceOBJ.mode,
                    breadbabel: referenceOBJ.breadbabel,
                })
            }
            else if (match.params.id === "new") {
                this.setState({
                    breadbabel: "创建文章",
                    mode: "92",
                })
            } else {

                this.setState({
                    breadbabel: this.props.articleTitle,
                    mode: "92",
                })
            }
        }
    }


    componentWillReceiveProps(nextProps) {
        let articleTitle = this.props.articleTitle || undefined;

        if (articleTitle && articleTitle !== nextProps.articleTitle) {
            this.setState({
                breadbabel: nextProps.articleTitle
            })
        } else if (this.state.pathname !== nextProps.match.path) {
            this.nowMatchUpdate(nextProps.match)
        }
    }


    changePathname = (pathname) => {

        this.props.historyPush({
            pathname: pathname
        });

    }

    render() {
        return <Fragment>
            <Breadcrumb style={{ margin: 5 }}>
                <Breadcrumb.Item >
                    <img src="http://www.acg-home.cn/public/images/logo.png" alt="返回首页" width="80" height="30"
                        className="hover_hand"
                        onClick={() => this.props.historyPush({ pathname: "/homepage/home" })} />
                    <a onClick={() => this.changePathname("/homepage/home")}><HomeOutlined />首页</a>
                </Breadcrumb.Item>
                {Number(this.state.mode) <= 90 && this.state.mode !== "1" ?
                    <Breadcrumb.Item>{this.state.breadbabel}</Breadcrumb.Item> : null}

                {this.state.mode === "91" ?
                    <Fragment>
                        <Breadcrumb.Item>
                            <a onClick={() => this.changePathname("/homepage/comiclist")}>漫画列表</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.breadbabel}</Breadcrumb.Item>
                    </Fragment>
                    : null
                }
                {this.state.mode === "92" || this.state.mode === "93" ?
                    <Fragment>
                        <Breadcrumb.Item>
                            <a onClick={() => this.changePathname("/homepage/articlelist")}>文章列表</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.breadbabel}</Breadcrumb.Item>
                    </Fragment>
                    : null
                }


            </Breadcrumb>
        </Fragment>
    }
}

export default MyBreadcrumb;