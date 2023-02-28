import React, {Fragment, useEffect, useState} from "react";
import {Menu, MenuProps} from "antd";
import {HomeOutlined, UserOutlined} from "@ant-design/icons";
import styles from "./siderMenu.module.less";
import {Link, useLocation, useNavigate} from "react-router-dom";
import config from "@/config";
import Logo from "@/assets/logo.png";
import {connect} from "react-redux";
import {RootState} from "@/store";
import MenuService, {PermissionMenu} from "@/service/menu";
import {ItemType} from "antd/es/menu/hooks/useItems";
import * as menuActions from "@/store/actions/menuAction";
import {dynamicAddRoute} from "@/router/config";
import {findBtnPermissions} from "@/store/reducers/menuReducer";
import {bindActionCreators, Dispatch} from "redux";

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

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const SiderMenu = ({menus, setPermissions, setMenus}: Props) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [menuSelectedKeys, setMenuSelectedKeys] = useState<Array<string>>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getSome();
  }, []);

  useEffect(() => {
    const {hash, key, pathname, search, state} = location;
    setMenuSelectedKeys([pathname]);
  }, [location]);

  const menuChange: MenuProps["onClick"] = ({key}) => {
    navigate(key);
  };

  async function getSome() {
    const menus = await MenuService.getMenuTreeOfSelf()
    dynamicAddRoute(menus);
    setMenus(menus);
    console.log(findBtnPermissions(menus))
    setPermissions(findBtnPermissions(menus));
    setItems(menusFilter(menus));
  }

  function menusFilter(data: PermissionMenu []) {
    const target: MenuItem[] = [];
    data.forEach(({visible, path, state, name, id, children}) => {
      if (visible && state) {
        const temp: MenuItem = {label: name, key: path, children: []};
        target.push(temp);
        if (children.length) {
          children.map(({name, path}) => {
            if (visible && state) {
              temp.children.push({label: name, key: path});
            }
          })
        } else {
          Reflect.deleteProperty(temp, 'children');
        }
      }
    });
    return target;
  }

  return (<Fragment>
      <div className={styles.logo}>
        <Link to={"/"}>
          <img width={32} src={Logo} alt={"logo"}/>
          <h1 className={styles.systemName}>{config.systemName}</h1>
        </Link>
      </div>
      <Menu selectedKeys={menuSelectedKeys} onClick={menuChange} theme={"dark"} mode={"inline"} items={items}/>
    </Fragment>
  );
};
SiderMenu.displayName = 'fuck';
const mapStateToProps = (state: RootState) => {
  return {
    menus: state.permission.menus
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  console.log(menuActions)
  return bindActionCreators(menuActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderMenu);
