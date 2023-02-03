import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {Provider} from "react-redux";
import store from "@/store";
import {HashRouter} from "react-router-dom";
import {ConfigProvider} from "antd";
import zhCN from 'antd/locale/zh_CN';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <App/>
      </ConfigProvider>
    </HashRouter>
  </Provider>
);
