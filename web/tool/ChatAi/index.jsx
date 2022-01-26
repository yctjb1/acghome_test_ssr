import React, { useState, useEffect, useReducer, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, Input, message, Spin, Pagination, Timeline } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const initialChatState = {

};

const reducerChat = (state, action) => {
    let TianXing_86_chat;

    switch (action.type) {
        case 'reset':

            sessionStorage.removeItem("TianXing_86_chat")
            return initialChatState;
        case 'update':
            //传来的形式{type: 'onload',question:"",answer:"",user_Id:user_Id}

            let nowtimenumber = moment().valueOf();
            TianXing_86_chat = JSON.parse(sessionStorage.getItem("TianXing_86_chat")) || undefined;
            if (!TianXing_86_chat) {
                TianXing_86_chat = {}
            }
            if (!TianXing_86_chat[action.user_Id]) {
                TianXing_86_chat[action.user_Id] = {}
            }

            TianXing_86_chat[action.user_Id][nowtimenumber] = {
                question: action.question,
                answer: action.answer
            }
            let newobj = Object.assign({}, state, {
                [nowtimenumber]: {
                    question: action.question,
                    answer: action.answer
                }
            })

            sessionStorage.setItem("TianXing_86_chat", JSON.stringify(TianXing_86_chat))
            return newobj;
        case 'onload':
            TianXing_86_chat = JSON.parse(sessionStorage.getItem("TianXing_86_chat")) || undefined;

            if (TianXing_86_chat && TianXing_86_chat[action.user_Id]) {
                return TianXing_86_chat[action.user_Id]
            } else {
                return state;
            }
        default:

            return state;

    }
}






const ChatAi = (props) => {

    const [user_Id, setUser_Id] = useState("")
    const [stateQuestion, setQuestion] = useState("");
    const [stateChatBtn, setChatBtn] = useState(false);

    const [stateChat, dispatchChat] = useReducer(reducerChat,
        initialChatState);


    useEffect(() => {
        setUser_Id(props.user_Id ? "acghome_" + props.user_Id : "")
        if (props.user_Id) {

            dispatchChat({ type: "onload", user_Id: "acghome_" + props.user_Id })
        }
    }, [props.user_Id]);


    const handleTianXing = () => {
        setChatBtn(true)
        //天行机器人
        let params = {
            "key": "39bda6d81eceebbbd0b2d1508d752fa3",
            "question": encodeURIComponent(stateQuestion),
            "userid": user_Id,
            "limit": 10,
            "mode": 0,
            "restype": 0,
            "datatype": 0,//datatype=>0（text文本[默认]）；datatype=>1（voice语音）
            "num": 10,
            "voc": 2,
            "speed": 5,
            "volume": 5,
        }

        let url = "http://api.tianapi.com/txapi/robot/index?key=" + params.key + "&question=" + params.question
            + "&userid=" + params.userid + "&limit=" + params.limit + "&mode=" + params.mode
            + "&restype=" + params.restype + "&datatype=" + params.datatype + "&num=" + params.num
            + "&voc=" + params.voc + "&speed=" + params.speed + "&volume=" + params.volume;

        axios.get(url)
            .then(function (res) {
                let data = res.data;
                if (data.code == 200 || data.msg == "success") {
                    let resultObj = data.newslist[0]
                    if (resultObj.datatype === "text") {

                        dispatchChat({ type: 'update', question: stateQuestion, answer: data.newslist[0].reply, user_Id });
                        setQuestion("");//清空输入框
                    }
                    else if (resultObj.datatype === "view") {

                        dispatchChat({ type: 'update', question: stateQuestion, answer: JSON.stringify(data.newslist), user_Id });
                        setQuestion("");//清空输入框
                    }
                    else if (resultObj.datatype === "voice") {
                        dispatchChat({ type: 'update', question: stateQuestion, answer: "file=http://res.tianapi.com" + data.newslist[0].voice_reply, user_Id });
                        setQuestion("");//清空输入框


                    }
                }
                else {
                    console.log(data);
                    message.warning("其他错误,data.code==" + data.code + "," + data.msg)
                }
                setChatBtn(false)
            })
            .catch(function (error) {
                setChatBtn(false)
                console.log(error);
                message.warning("天行机器人-发生异常")
            });


    }



    const handleRuYi = () => {//海知智能如意机器人
        setChatBtn(true)
        let params = {
            "app_key": "e3b405a9-061a-4448-ad73-9da4b21372c4",
            "service": "chat_common",//这个是个问题，官方好像没提供分词后的插件应用
            "q": stateQuestion,//好像是别的service才要encodeURIComponent(msg)编码一下
            "user_id": user_Id
        }
        let url = "http://api.ruyi.ai/v1/message";
        if (params.q.replace(/\s/g, "") === "") { return }
        axios.post(url, params)
            .then(function (res) {
                let data = res.data;
                if (data.code === 0 || data.msg === "ok") {
                    let result = data.result;
                    let intents = result.intents[0];

                    let outputs = intents.outputs.filter((item) => item.type === "dialog");

                    if (outputs[0].property) {

                        let ai_answer = outputs[0].property.text;
                        switch (outputs[0].property.emotion) {
                            case "calm": ai_answer += "(淡定中)"; break;
                            case "happy": ai_answer += ":)"; break;
                            case "excited": ai_answer += ":D"; break;
                            case "despite": ai_answer += "(哼！)"; break;
                            case "naughty": ai_answer += "(吐舌头)"; break;
                            case "worry": ai_answer += ">^<"; break;
                            case "sad": ai_answer += "T^T"; break;
                            case "like": ai_answer += "(心跳心跳、扑通扑通)"; break;
                            case "angry": ai_answer += ":("; break;
                            case "surprise": ai_answer += "Σ(⊙▽⊙)!"; break;
                            case "disappointed": ai_answer += "(失望)"; break;
                            case "positive": ai_answer += "(确信)"; break;
                            case "negative": ai_answer += "(否定)"; break;
                            case "confused": ai_answer += "(紧张、紧张、紧张)"; break;
                            case "proud": ai_answer += "(得意--挺胸)"; break;
                            case "suspect": ai_answer += "(黑人问号)"; break;
                            default: ai_answer += "(-_-)面无表情"; break;
                        }


                        dispatchChat({ type: 'update', question: stateQuestion, answer: ai_answer, user_Id });

                        setQuestion("");//清空输入框
                    }
                }
                else if (data.code === 403) {
                    handleTianXing()
                }
                else {
                    console.log(params)
                    console.log(data)
                    message.warning("其他错误,来自于海知智能如意机器人")
                }
                setChatBtn(false)
            })
            .catch(function (error) {
                setChatBtn(false)
                console.log(error);
                message.warning("海知智能-如意机器人发生异常")
            });

    }


    const ruyi_url = `https://ruyi.ai/h5-wechat/wechat.html?v=20181023a&appName=八六&app_id=e5e294a9-5375-4ad7-87ca-3ec69f1e6e69&robotImage=https://qiniu.ruyi.ai/e5e294a9-5375-4ad7-87ca-3ec69f1e6e69-1587977755517-head.jpg`;

    return <Fragment>
        <p>我的提问:你是谁?</p>
        <p>八六回答:我是八六</p>
        {/* {
            Object.keys(stateChat).map((key, index) => {


                return <p key={key}>时间：{moment(new Date(Number(key))).format('YYYY-MM-DD HH:mm:ss')}-我的提问:{stateChat[key]["question"]}
                    <br />
时间：{moment(new Date(Number(key))).format('YYYY-MM-DD HH:mm:ss')}-八六回答:{stateChat[key]["answer"]}
                </p>

            })
        } */}
        <Chathistory stateChat={stateChat} />

        {user_Id ?

            <Spin indicator={<LoadingOutlined />} spinning={stateChatBtn} >

                <Input onChange={(e) => {
                    setQuestion(e.target.value)
                }} value={stateQuestion} disabled={stateChatBtn} />
                <Button onClick={() => handleTianXing()} disabled={stateChatBtn}>发送(天行)</Button>
                {/* <Button onClick={() => handleRuYi()} disabled={stateChatBtn}>发送(如意)</Button> */}
                {/* <Button>
                    <a href={ruyi_url} target="_blank">发送(如意)</a></Button> */}
                <Button onClick={() => {
                    dispatchChat({ type: 'reset' })
                    setQuestion("");//清空输入框
                }
                } disabled={stateChatBtn}>重置</Button>
            </Spin>
            :
            <p>未登录，无法与机器人对话</p>
        }


    </Fragment >
}


const Chathistory = (props) => {
    const [dataSource, setdataSource] = useState([])
    const [stateBase, setBase] = useState({
        total: 0,
        pageSize: 5,
        pageIndexMax: 0,
        nowData: [],
        pageIndex: 0
    });

    useEffect(() => {
        let arr = [];
        Object.keys(props.stateChat).map(key => {
            arr.push([key, props.stateChat[key]["question"], props.stateChat[key]["answer"]])
        })
        setdataSource(arr);
        let total = arr.length;//调用处拦截了0与不存在

        let pageSize = 5;
        let pageIndexMax = total % pageSize ? Math.floor(total / pageSize) + 1 : total / pageSize;
        let pageIndex = pageIndexMax;
        let nowData = arr.slice((pageIndexMax - 1) * pageSize);//要截取的开始处下标索引
        let new_stateBase = { total, pageSize, pageIndexMax, nowData, pageIndex };

        setBase(new_stateBase)
    }, [props.stateChat])
    useEffect(() => {

    }, [stateBase])


    const handlePageparams = (pageIndex, pageSize) => {


        let nowDataIndex = (pageIndex - 1) * pageSize;//要截取的开始处下标索引
        let nowData;

        if (pageIndex == stateBase.pageIndexMax) {
            nowData = dataSource.slice(nowDataIndex);

        } else {
            nowData = dataSource.slice(nowDataIndex, nowDataIndex + pageSize)//slice方法包头不包尾
        }
        let new_stateBase = JSON.parse(JSON.stringify(stateBase));
        new_stateBase.nowData = nowData;
        new_stateBase.pageIndex = pageIndex;
        setBase(new_stateBase)
    }

    return <Fragment>

        <Timeline>
            {stateBase.nowData.map((item, index) => {

                return <Timeline.Item key={item[0]}>
                    <p><b>{moment(new Date(Number(item[0]))).format('YYYY-MM-DD HH:mm:ss')}</b></p>
                    <p>我的提问:{item[1]}</p>
                    <p style={{ whiteSpace: "pre-line" }}>八六回答:{item[2].replace(/<br\S?>/g, "\n")}</p>
                </Timeline.Item>
            })}


        </Timeline>
        <Pagination showQuickJumper current={stateBase.pageIndex} size="small"
            style={{ marginBottom: 12 }}
            pageSize={stateBase.pageSize} total={stateBase.total}
            onChange={(pageIndex, pageSize) => handlePageparams(pageIndex, pageSize)} />
    </Fragment>
}


export default ChatAi;