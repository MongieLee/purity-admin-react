import React, {FC} from 'react';
import {Breadcrumb} from 'antd';
import {useLocation,useMatch} from "react-router-dom";

const BreadCrumb: FC = (props: any) => {

  // todo: 路由面包屑信息
  return (
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="">Application Center</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="">Application List</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default (BreadCrumb);
