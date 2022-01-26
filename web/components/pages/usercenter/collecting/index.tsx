import React,{useContext} from "react";
import { SProps, IContext } from "ssr-types-react";
import { IUserCenterData } from "@/interface";
import { Menu,Button } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

export default (props: SProps) => {
    const { state } = useContext<IContext<IUserCenterData>>(window.STORE_CONTEXT);

    return (
        <>
           <span>这里是homepage/usercenter/:userId/collecting</span>
           <span>当前userId={state?.IndexData.userId},bar={state?.IndexData.bar}</span>
           <Button>测试主题</Button>
           <Button type="default">测试主题</Button>
           <Button type="primary">测试主题</Button>
           <Menu mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Navigation Two
        </Menu.Item>
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
            Navigation Four - Link
          </a>
        </Menu.Item>
      </Menu>
        </>
    );
}
