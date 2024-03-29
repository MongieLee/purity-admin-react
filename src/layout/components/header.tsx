import React, {FC, useEffect, useState} from 'react';

import styleds from "./header.module.less";
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined
} from "@ant-design/icons";
import styles from "@/layout/index.module.less";
import BreadCrumb from "@/layout/components/breadCrumb";
import {Avatar, Dropdown, MenuProps, message, Space, Tooltip} from "antd";
import {exitFullScreen, openFullScreen} from "@/utils/fullScreen";
import DefaultAvatar from "@/assets/default-avatar.png";
import {connect} from "react-redux";
import {RootState} from "@/store";
import AuthService, {authInfoResponse} from "@/service/auth";
import {bindActionCreators, Dispatch} from "redux";
import {UPDATE} from "@/store/const/userConst";
import {updateUser} from "@/store/actions/userAction";
import {ThunkAction} from "redux-thunk/src/types";
import {StateUser} from "@/store/reducers/authReducer";
import {Root} from "react-dom/client";
import * as userActions from "@/store/actions/userAction";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import mainLayout from "@/layout/mainLayout";


const authStore = {avatar: null, name: null}


type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>

const Header = ({userInfo: auth}: Props) => {
  const navigate = useNavigate();
  const items: MenuProps['items'] = [
    {
      key: 'personal',
      label: <span>个人中心</span>,
      icon: <UserOutlined/>
    },
    {
      key: 'logout',
      label: <span>退出登录</span>,
      onClick: () => {
        // todo: 退出登录

        navigate('/login');
        message.success("退出登录");
      },
      icon: <PoweroffOutlined/>,
    },
  ];

  useEffect(() => {
    updateUser()
  }, [])

  // const {auth} = useAppSelector((state) => state.auth);
  // const dispatch = useAppDispatch();

  // console.log(auth)
  // console.log(dispatch);

  const [collapsed, setCollapsed] = useState(false);
  const [isFullScreenSelf, setIsFullScreenSelf] = useState(false);

  const changeFullScreenState = () => {
    setIsFullScreenSelf(!isFullScreenSelf);
    if (!isFullScreenSelf) {
      openFullScreen();
    } else {
      exitFullScreen();
    }
  }

  return (
    <div className={styleds.container}>
      <div className={'dfcc'}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: styles.trigger,
            onClick: () => setCollapsed(!collapsed)
          }
        )}
        <BreadCrumb/>
      </div>
      <div className={styleds.rightBox}>
        <Tooltip className={styleds.boxItem} placement={"bottom"} title={isFullScreenSelf ? '退出' : '进入' + '全屏'}>
          {React.createElement(collapsed ? FullscreenExitOutlined : FullscreenOutlined,
            {
              onClick: changeFullScreenState
            }
          )}
        </Tooltip>
        <Dropdown menu={{items}}>
          <Space className={styleds.boxItem}>
            <Avatar className={styleds.avatar} size={"large"} shape={'circle'} src={auth?.avatar || DefaultAvatar}/>
            <span>{auth?.nickname || 'pure'}</span>
          </Space>
        </Dropdown>
        <Tooltip className={styleds.boxItem} placement="bottom" title={'项目配置'}>
          <SettingOutlined/>
        </Tooltip>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    userInfo: state.auth as StateUser
  }
}
//
// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {
//     [UPDATE]: () => {
//       dispatch({type: UPDATE, payload: {test: 'test'}})
//     },
//     dispatch
//   }
// }
function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({updateUser}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
// export default Header;
