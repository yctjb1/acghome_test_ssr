import React,{Component,Fragment} from 'react';

import {message,Input,Button} from 'antd';
//本组件生成一个算式验证码

class ArithmeticMa extends Component{
    constructor(props){
        super(props);
        this.state={
            inputCode:"",//用户输入的验证码结果
            codeLabel:"",//生成的验证码算式
            codeResult:"",//生成的验证码结果
            btnDisabled:false,
        }

    }
    
    componentWillMount(){
        this.createCode()
    }




    //创建/刷新验证码--仅维持state同步，和不污染拷贝出来的验证码生成方法
    createCode=()=>{ 
        let codeLabel = this.state.codeLabel;
        let codeResult = this.state.codeResult;
        let arr1 = ["加","减","乘"];
        let arr2 = ["0","1","2","3","4","5","6","7","8","9"];
        let index1 = Math.round(Math.random() * (arr1.length-1));
        let index2 = Math.round(Math.random() * (arr2.length-1));
        let index3 = Math.round(Math.random() * (arr2.length-1));

        let num1 = arr2[index2];
        let num2 = arr2[index3];

        codeLabel = " "+num1+" "+arr1[index1]+" "+num2+" = ? "
        if(index1===0){//匹配到加      
            codeResult = parseInt(num1) + parseInt(num2);
        }  
        else if(index1===1){//匹配到减
            codeResult = parseInt(num1) - parseInt(num2);
        }
        else if(index1===2){//匹配到乘
            codeResult = parseInt(num1) * parseInt(num2);
        }
        this.setState({
            codeLabel,codeResult,
            btnDisabled:false,
            inputCode:"",
        })  
     } 
    
    //校验验证码  
    validate=()=>{  
        let inputCode = parseInt(this.state.inputCode); //取得输入的验证码结果
        let codeResult = this.state.codeResult;   

        if(Number.isNaN(inputCode)) { //没有输入或者输入的不是一个数
            message.warning("请输入正确的计算结果！"); //则弹出请输入验证码
            this.props.YanZhengCheck(false);
        }else if(inputCode !== codeResult ) { //若输入的验证码与产生的验证码不一致时  
            message.error("验证码输入错误(这都能算错)！"); //则弹出验证码输入错误 
            this.props.YanZhengCheck(false); 
            this.createCode(); 
            this.setState({inputCode:""});//清空文本框  
            //查看结果
            // console.log("正确结果"+codeResult)
            // console.log("输入的结果"+inputCode)
        }else if(inputCode === codeResult){ //输入正确时  
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
            value={this.state.codeLabel} 
            style={{
                width:150,color:"hotpink",border:0,padding:"2px 3px",
                fontFamily:"auto",fontStyle:"italic",
                letterSpacing:"3px",fontWeight:"bolder",
            }}/>
            
    </Fragment>
    }
}



export default ArithmeticMa;