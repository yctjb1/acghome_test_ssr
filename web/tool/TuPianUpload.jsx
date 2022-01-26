import React,{Component,Fragment} from 'react';
import {Button,Upload, message} from 'antd';
import { LoadingOutlined, PlusOutlined} from '@ant-design/icons';

import axios from 'axios';
import { GLOBAL_URL } from '@/tool/api/config'
//有bug，上传了就是真上传了，特别是修改里面，取消是没用的
//还有个get失败的问题，可能是http/https的问题?
class TuPianUpload extends Component{
    constructor(props){
        super(props);
        this.state={
            thumbUrl:"",
            loading:false,
            Folder:{}
        }

    }
//钩子函数区
    componentWillMount(){
        this.setState({
            Folder:this.props.Folder
        },()=>this.queryImg())
           
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.Folder.cFolder!==nextProps.Folder.cFolder ||this.props.Folder.cFileName!==nextProps.Folder.cFileName )
        this.setState({
            Folder: nextProps.Folder
        });
    }
    //自定义函数区
    queryImg=()=>{
        //20191217添加，禁用谷歌浏览器的缓存
        let url = `http://static.acg-home.cn/${this.state.Folder.cFolder}${this.state.Folder.cFileName}`
        axios.get(url,{headers: {'Cache-Control': 'no-cache'}})
        .then(res=>{

            if(res.status ===200){
                this.props.handleoneUpload(url)
                this.setState({thumbUrl:url,loading: false})
            }
            else{
                console.log("失败")
            }
        })
        .catch(err=>{console.log("失败")})

    }

    handleChange = info => {
        // console.log(info.file)
        // console.log(info.fileList)
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.

            this.setState({
                loading: true,
                thumbUrl:""   
            },()=>this.queryImg())
            return;
        }
      };
    getUploadData=(file)=>{
        let params = {
            cFolder:this.state.Folder.cFolder,
            cFileName:this.state.Folder.cFileName}
        return params;
    }

    beforeUpload = (file, fileList) =>{
     
        return new Promise((resolve,reject) => {
                // const isRightType = (file.type === 'image/jpeg'||file.type === 'image/png'|| file.type === 'image/bmp'||file.type === 'application/pdf');
                const isRightType = (file.type === 'image/jpeg');
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isRightType ) {
                //accept属性的介绍里，image/jpeg对应.jpe、.jpg、.jpeg
                message.error(`你只能上传jpg、jpeg文件!而不是${JSON.stringify(file.type)}`);
                    reject(file);
                }
                else if (!isLt5M) {
                message.error('文件必须小于 5MB!');
                    reject(file);
                }
                else{
                    resolve(file);
                }

            });
    }
//render函数区
    render(){
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">上传</div>
            </div>
            );

        return <Fragment>
             <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={GLOBAL_URL.oneUpload}
                onChange={this.handleChange}
                beforeUpload={this.beforeUpload}
                data={(file) =>this.getUploadData(file)}
            >
                {this.state.thumbUrl ? <img src={this.state.thumbUrl} alt="测试上传" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </Fragment>
    }
}

export default TuPianUpload;
        