import React,{Component,Fragment} from 'react';

import {message,Input,Button} from 'antd';
import md5 from "md5";
import { GLOBAL_URL } from '@/tool/api/config'
import axios from 'axios';
import moment from 'moment';

//本组件生成指定范围内随机长度的随机验证码

class MailSMS extends Component{
    constructor(props){
        super(props);
        this.state={
            inputEmailCode:"",//用户输入的验证码
            emailCode:"",//获取的生成的验证码
            btnDisabled:false,
            btnSendEmail:false,
            user_Mail:props.user_Mail?props.user_Mail:"",
        }

    }
//钩子函数区


//自定义函数区
    //校验验证码  
    validate=()=>{  
        let inputEmailCode = this.state.inputEmailCode;
        let emailCode = this.state.emailCode;        
        let user_Mail = this.state.user_Mail;
 
        inputEmailCode = md5(inputEmailCode);

        if(!inputEmailCode){
            message.warning("这验证码啊，你一个字儿也没输，咋回事啊")
        }
        else if(!user_Mail){
            message.warning("太过分啦，邮箱都不留，给谁发邮件啊")
        }
        else if(!emailCode){
            message.warning("发生了意外，没有生成验证码")
        }
        else if(inputEmailCode !== emailCode){
            message.warning("验证码，你输的那个，是个错的，再来")
        }
        else if(inputEmailCode === emailCode){
            message.success("邮箱验证成功!")
            this.setState({btnDisabled:true},()=>{
                this.props.EmailCheck(true); 
            })
        }


        
    }

    onChangeInput=(key,value)=>{
       
        this.setState({
            [key]:value
        },()=>this.props.fatherChange(key,value))

    }

    sendEmail=()=>{
        let user_Mail = this.state.user_Mail;

        if(!user_Mail){
            message.warning("太过分啦，邮箱都不留，给谁发邮件啊")
        }
        else{

            // this.setTimer()//单独测一下计时器
            axios.post(GLOBAL_URL.mailSMS,{user_Mail,type:this.props.type})
            .then(res=>{
                res = res.data;
                if(res.code==="200"){
                    let Info = res.Info;
                    //获得失效时间，并在点验证时进行匹配
                    //同时获得md5的数据
                    this.setState({
                        emailCode:Info.codeMD5,
                        endtimeNumber:Info.endtimeNumber,
                        btnSendEmail: true,count:60,
                    },()=>this.setTimer())
                }
                else if(res.code==="403"){
                    message.warning(res.Info);
                }
                else{
                    message.warning("未知错误，见控制台打印res");
                    console.log(res)
                }
            })

           
            

        }

    }

    setTimer = () => {
    /*此处正是定时器运用的巧妙之处，以及对定时器返回值的理解程度体现
        定时器必须在一个函数中赋值给一个属性，在state中赋值就不行，定时器会自执行,
        因此必须在一个不会自动执行的函数中把定时器ID赋值给一个变量保存
        此ID可以作为clearInterval()的参数，用于清除定时器*/
        this.timer = setInterval(()=>{
            let count = this.state.count;
            if ( count === 1) {
                this.clearTimer();
                this.setState( { btnSendEmail: false });
            } else {
                this.setState( { count: count - 1});
            }
        }, 1000)
    }

    clearTimer= () =>{
        clearInterval(this.timer)
    }

//render函数区

    render(){
        return <Fragment>
            <Input style={{width:200}} type="email"  disabled={this.props.user_Mail?true:this.state.btnDisabled}
            value={this.state.user_Mail} onChange={(e)=>this.onChangeInput("user_Mail",e.target.value)}/>
            <Button onClick={()=>this.sendEmail()} disabled={this.state.btnDisabled===true?true:this.state.btnSendEmail}>
                {this.state.btnSendEmail===true? `${this.state.count}秒重发`:'获取验证码'}
            </Button>
            <Input style={{width:150}} disabled={this.state.btnDisabled}
            value={this.state.inputEmailCode} onChange={(e)=>this.onChangeInput("inputEmailCode",e.target.value)}/>
            <Button onClick={()=>this.validate()} disabled={this.state.btnDisabled}>验证</Button>
            
    </Fragment>
    }
}



export default MailSMS;







