import React,{Component,Fragment} from 'react';
import {Tag} from 'antd';
import { CrownOutlined } from '@ant-design/icons';
const QuanXianTag = (props) =>{

    return <Fragment>
        <div>
            {props.children}

            <label>权限Tag:&nbsp;</label>
            {props.ObjInfo.base===true?
                (props.ObjInfo.admin===true?
                    (props.ObjInfo.super===true?
                        <Tag color="#E91E63">超级管理</Tag>
                        :<Tag color="#2db7f5">普通管理</Tag>)
                :<Tag color="#87d068">普通用户</Tag>)
            :<Tag color="#f4364c">被限制中</Tag>
            }

            {props.ObjInfo.user_Id==="0000000001"?
                <Tag color="gold">站长&nbsp;<CrownOutlined twoToneColor="#eb2f96" /></Tag>:null
            }

            
{/* 不知道为什么不能用Icon */}

        </div>
    </Fragment>
}

export default QuanXianTag;