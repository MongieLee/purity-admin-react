import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from 'antd';
import Login from './pages/login/login';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import AuthenticatedApp from '@/layout/authenticated-app';
import User from '@/pages/user/user';
import System from '@/pages/system/system';
import Home from '@/pages/home/home';

function App() {
    const [count, setCount] = useState(0);

    const clickT = () => {
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/'} element={<AuthenticatedApp/>}>
                    <Route index element={<Home/>}/>
                    <Route path={'user'} element={<User/>}/>
                    <Route path={'system'} element={<System/>}/>
                </Route>
                <Route path={'*'} element={<Navigate to={'/'} replace/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
