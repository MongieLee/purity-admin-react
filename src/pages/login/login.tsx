import React, {FC, useState} from 'react';
import {Button, Card, Form, Input, message} from "antd";
import styleds from './index.module.less';
import AuthService, {authFormData} from "@/service/auth/auth";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import companyLogo from "@/assets/logo.png";
import {UserOutlined, LockOutlined} from "@ant-design/icons"
import {setAuthToken} from "@/utils/token";

const topic = 'Purity Admin'
const minorTitle = '后台管理系统';

interface LoginProps {
  [K: string]: any;
}

const redirectKey = "redirect";

const Login: FC<LoginProps> = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const history = useNavigate();
  const [searchParams] = useSearchParams();
  console.log()
  const login = async (value: authFormData) => {
    value.tokenGrantType = "access_token";
    setLoginLoading(true);
    try {
      const {token, expires} = await AuthService.login(value);
      setAuthToken(token, expires);
      message.success("登录成功！");
      const redirectPath = searchParams.get(redirectKey);
      history(redirectPath ? decodeURIComponent(redirectPath) : "/");
    } catch (e) {
      setLoginLoading(false);
    }
  };

  return (
    <div className={styleds.container}>
      <Card className={styleds.cardDecorator}>
        <div className={'dfcc'}>
          <img alt={'company\'s logo'} width={50} src={companyLogo}/>
          <span className={styleds.topic}>{topic}</span>
        </div>
        <p className={styleds.minorTopic}>{minorTitle}</p>
        <Form onFinish={login} autoComplete={"off"}>
          <Form.Item name={"username"} rules={[{required: true, message: "请输入用户名"}]}>
            <Input prefix={<UserOutlined/>} placeholder={"默认账号为：superadmin"}/>
          </Form.Item>
          <Form.Item name={"password"} rules={[{required: true, message: "请输入密码"}]}>
            <Input.Password prefix={<LockOutlined/>} placeholder={"默认密码为：123qwe"}/>
          </Form.Item>
          <Form.Item>
            <Button loading={loginLoading} size={'large'} className={styleds.loginBtn} type={"primary"}
                    htmlType={"submit"}>登录</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>);
};

export default Login;
