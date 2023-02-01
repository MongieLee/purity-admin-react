import './App.css';
import Login from './pages/login/login';
import {HashRouter, Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import MainLayout from '@/layout/mainLayout';
import User from '@/pages/user/user';
import System from '@/pages/system/system';
import Home from '@/pages/home/home';
import routes from "@/router/config";
import React, {FC, useEffect, useLayoutEffect} from "react";

const App: FC = () => {
  const routerGuard = ()=>{
    if (location.pathname === '/system') {
      navigate(-1)
    }
  }

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {

  }, [location])
  return (<>{routes()}</>);
}


export default App;
// {/*<Routes>*/}
// {/*  <Route path={'/login'} element={<Login/>}/>*/}
// {/*  <Route path={'/'} element={<MainLayout/>}>*/}
// {/*    <Route index element={<Home/>}/>*/}
// {/*    <Route path={'user'} element={<User/>}/>*/}
// {/*    <Route path={'system'} element={<System/>}/>*/}
// {/*  </Route>*/}
// {/*  <Route path={'*'} element={<Navigate to={'/'} replace/>}/>*/}
// {/*</Routes>*/}
