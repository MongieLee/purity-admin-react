import {Navigate, Outlet, useRoutes} from "react-router-dom";
import Login from "@/pages/login/login";
import MainLayout from "@/layout/mainLayout";
import NotFind from "@/pages/notFind";
import ChangePassword from "@/pages/system/changePassword/changePassword";
import Board from "@/pages/board/board";
import {PermissionMenu} from "@/service/menu/menu";
import Menu from "@/pages/system/menu/menu";
import User from "@/pages/system/user/user";
import Role from "@/pages/system/role/role";
import Department from "@/pages/system/department/department";

export const asyncConfigMap = {
  "wrapper": <Outlet/>,
  "board": <Board/>,
  "menu": <Menu/>,
  "user": <User/>,
  "role": <Role/>,
  "department": <Department/>,
  "changePassword": <ChangePassword/>
}

export const menuTypeEnum = {
  carte: "C", // 菜单
  button: "F", // 按钮
  menu: "M" // 菜单组
}

const businessRoutes: Routt[] = [
  {
    path: '*',
    // element: <Navigate to={"/"} replace/>,
    element: <NotFind/>
  },
]

type Routt = { path: string, element: JSX.Element, name?: string, children?: Routt[], meta?: { title: string } }

export function dynamicAddRoute(routes: PermissionMenu[], parent?: Routt) {
  let pp: Routt;
  console.log(routes)
  routes.map(route => {
    if (route.menuType === menuTypeEnum.button) return
    if (route.menuType === menuTypeEnum.menu) {
      pp = {
        meta: {title: route.name},
        name: route.name,
        path: route.path,
        element: asyncConfigMap[route.compName as keyof typeof asyncConfigMap] || asyncConfigMap.wrapper
      }
    } else if (route.menuType === menuTypeEnum.carte) {
      pp = {
        meta: {title: route.name},
        name: route.name,
        path: route.path,
        element: asyncConfigMap[route.compName as keyof typeof asyncConfigMap] || asyncConfigMap.wrapper
      };
    }
    if (route.children.length) {
      pp.children = [];
      dynamicAddRoute(route.children, pp);
    }
    if (parent?.children) {
      parent.children.push(pp);
    } else {
      businessRoutes.unshift(pp)
    }
  })
  console.log('businessRoutes');
  console.log(businessRoutes);
}


export const routes: Routt [] = [
  {
    path: '/',
    element: <Navigate to={"/dashboard"} replace/>,
  },
  {
    name: 'layout',
    path: '/',
    element: <MainLayout/>,
    children: businessRoutes
  },
  {
    path: '/login',
    element: <Login/>,
    meta: {
      title: '登录',
    }
  },
  {
    path: '*',
    element: <Navigate to={"/"} replace/>,
  },
];

const Routes = () => useRoutes(routes);
export default Routes;
