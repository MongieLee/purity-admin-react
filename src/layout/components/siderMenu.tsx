import React, {FC, Fragment} from "react";
import {Menu, MenuProps} from "antd";
import {HomeOutlined, UserOutlined} from "@ant-design/icons";
import styles from "./siderMenu.module.less";
import {Link, useNavigate} from "react-router-dom";
import Logo from "@/assets/biz-logo.png";
import config from "@/config";

const menuList = [
    {key: "/", icon: <HomeOutlined/>, label: "首页"},
    {key: "/user", icon: <UserOutlined/>, label: "用户"},
    {key: "/system", icon: <UserOutlined/>, label: "系统"}
];

const SiderMenu: FC = () => {
    const navigate = useNavigate();
    const menuChange: MenuProps["onClick"] = (props) => {
        navigate(props.key);
    };
    return (<Fragment>
            <div className={styles.logo}>
                <Link to={"/"}>
                    <img width={32} src={Logo} alt={"logo"}/>
                    <h1 className={styles.systemName}>{config.systemName}</h1>
                </Link>
            </div>
            <Menu onClick={(info) => menuChange(info)} theme={"dark"} mode={"inline"} defaultSelectedKeys={['1']}
                  items={menuList}/>
        </Fragment>
    );
};

export default SiderMenu;