import {Navigate, useRoutes} from "react-router-dom";
import Login from "@/pages/login/login";
import MainLayout from "@/layout/mainLayout";
import Home from "@/pages/home/home";
import System from "@/pages/system/system";
import NotFind from "@/pages/notFind";

export const asyncConfigMap = {}

export const routes = [
  {
    path: '/',
    element: <Navigate to={"/dashboard"} replace/>,
  },
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      {
        path: 'dashboard',
        meta: {
          title: '首页',
        },
        // index: true,
        element: <Home/>
      },
      {
        path: 'system',
        meta: {
          title: '系统管理',
        },
        element: <System/>
      },
      {
        path: '*',
        // element: <Navigate to={"/"} replace/>,
        element: <NotFind/>
      },
    ]
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
