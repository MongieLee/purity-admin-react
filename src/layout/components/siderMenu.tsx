import React, {FC, Fragment, useEffect, useState} from "react";
import {Menu, MenuProps} from "antd";
import {HomeOutlined, UserOutlined} from "@ant-design/icons";
import styles from "./siderMenu.module.less";
import {Link, useNavigate} from "react-router-dom";
import config from "@/config";
import Logo from "@/assets/logo.png";
import {connect} from "react-redux";
import {RootState} from "@/store";
import useUpdatedEffect from "antd/es/typography/hooks/useUpdatedEffect";
import MenuService, {PermissionMenu} from "@/service/menu/menu";
import {ItemType, MenuItemType} from "antd/es/menu/hooks/useItems";

const menuList = [
  {key: "/", icon: <HomeOutlined/>, label: "首页"},
  {key: "/user", icon: <UserOutlined/>, label: "用户"},
  {key: "/system", icon: <UserOutlined/>, label: "系统"}
];

type MenuItem = Required<MenuProps>['items'][number];

function getItem(item: PermissionMenu): MenuItem {
  return {
    key: item.path,
    // icon: item.icon,
    label: item.name,
  } as ItemType;
}

type Props = ReturnType<typeof mapStateToProps>;


const SiderMenu = ({menus}: Props) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  function menusFilter(data: (PermissionMenu) []) {
    data.forEach((item) => {
      items.push(getItem(item))
    })
    setItems([...items]);
  }

  const navigate = useNavigate();
  const menuChange: MenuProps["onClick"] = (props) => {
    console.log(props.key);
    navigate(props.key);
  };

  async function getSome() {
    const menus = await MenuService.getMenuTreeOfSelf()
    menusFilter(menus)
    console.log('fuck:')
    console.log(items);
    console.log('fuck:')
  }

  useEffect(() => {
    getSome();
  }, []);

  return (<Fragment>
      <div className={styles.logo}>
        <Link to={"/"}>
          <img width={32} src={Logo} alt={"logo"}/>
          <h1 className={styles.systemName}>{config.systemName}</h1>
        </Link>
      </div>
      <Menu onClick={(info) => menuChange(info)} theme={"dark"} mode={"inline"} defaultSelectedKeys={['1']}
            items={items}/>
    </Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    menus: state.permission.menus
  }
}

export default connect(mapStateToProps)(SiderMenu);
