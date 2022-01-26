import React,{Component,Fragment} from 'react';

import {message,Input,Button} from 'antd';
//本组件生成指定范围内随机长度的随机验证码

class YanZhengMa extends Component{
    constructor(props){
        super(props);
        this.state={
            inputCode:"",//用户输入的验证码
            code:"",//生成的验证码
            btnDisabled:false,
        }

    }
    
    componentWillMount(){
        this.createCode()
    }


    //底层是否生成任意长度的随机验证码
    randomWord=(randomFlag, min, max)=>{
        //如果是false则是固定长度，用min传值
        let str = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
     
        // randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
        if(randomFlag){
            range = Math.round(Math.random() * (max-min)) + min;
        }
        //原理是在范围长度生成随机索引，根据随机索引去数组内提取成随机验证码
        for(var i=0; i<range; i++){
            let pos = Math.round(Math.random() * (arr.length-1));
            str += arr[pos];
        }
        return str;
    }

    //创建/刷新验证码--仅维持state同步，和不污染拷贝出来的验证码生成方法
    createCode=()=>{ 
        let code = this.state.inputCode;  
        code = this.randomWord(true,5,8);//生成5~8位随机验证码
        code = code.toUpperCase()//将验证码大写化
        this.props.YanZhengCheck(false); 
        this.setState({
            code:code,
            btnDisabled:false,
            inputCode:"",
        })  
     } 
    
    //校验验证码  
    validate=()=>{  
        let inputCode = this.state.inputCode.toUpperCase(); //取得输入的验证码并转化为大写
        let code = this.state.code;     
        if(inputCode.length !== code.length) { //若输入的验证码长度为0  
            message.warning("验证码长度不符！"); //则弹出请输入验证码
            this.props.YanZhengCheck(false);
        }else if(inputCode !== code ) { //若输入的验证码与产生的验证码不一致时  
            message.error("验证码输入错误！"); //则弹出验证码输入错误 
            this.props.YanZhengCheck(false); 
            this.createCode(); 
            this.setState({inputCode:""});//清空文本框  
        }else if(inputCode === code){ //输入正确时  
            message.success("验证码通过！");
//逻辑是通过this.props.YanZhengCheck(boolean)去调用父组件的(boolean)this.setState({YanZhengFlag:boolean})
            this.props.YanZhengCheck(true);
            this.setState({btnDisabled:true})
        }else{
            message.error("快去看控制台！");
            console.log(code)
            console.log(inputCode)
        } 
        
    } 

    render(){
        return <Fragment>
            <Input style={{width:150}} disabled={this.state.btnDisabled}
            value={this.state.inputCode} onChange={(e)=>this.setState({inputCode:e.target.value})}/>
            <Button onClick={()=>this.validate()} disabled={this.state.btnDisabled}>验证</Button>
            <input type="button" onClick={()=>this.createCode()} title='点击更换验证码'
            value={this.state.code} 
            style={{
                width:150,color:"hotpink",border:0,padding:"2px 3px",
                fontFamily:"auto",fontStyle:"italic",
                letterSpacing:"3px",fontWeight:"bolder",
            }}/>
            
    </Fragment>
    }
}



export default YanZhengMa;