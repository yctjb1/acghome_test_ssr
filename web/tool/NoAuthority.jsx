import React,{Component,Fragment} from 'react';

import AdminTabs from 'components/AdminTabs';
const NoAuthority = (props) =>{

    return <Fragment>
    <AdminTabs/>
    <h3 style={{padding:10}}>没有权限</h3>
</Fragment>
}

export default NoAuthority;