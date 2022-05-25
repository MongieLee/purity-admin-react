import React, {FunctionComponent, useState, Fragment, FC} from 'react';
import {Button, Form, Input, message} from "antd";
import styleds from './index.module.less';
import AuthService, {authFormData} from "@/service/auth/auth";
import {useForm} from "antd/es/form/Form";
import {useNavigate} from "react-router-dom";

console.log(styleds);

interface LoginProps {
    [K: string]: any;
}

const Login: FC<LoginProps> = () => {
    const [isLogin, setIsLogin] = useState(true);

    const history = useNavigate();
    const login = async (value: authFormData) => {
        value.tokenGrantType = "access_token";
        await AuthService.login(value);
        message.success("登录成功！");
        history("/");
    };

    return (<Fragment>
        <Form onFinish={login} labelCol={{span: 4}} wrapperCol={{span: 16}} autoComplete={"off"}>
            <Form.Item name={"username"} label={"用户名"} rules={[{required: true, message: "请输入用户名"}]}>
                <Input/>
            </Form.Item>
            <Form.Item name={"password"} label={"密码"} rules={[{required: true, message: "请输入密码"}]}>
                <Input.Password/>
            </Form.Item>
            <Form.Item>
                <Button type={"primary"} htmlType={"submit"}>登录</Button>
            </Form.Item>
        </Form>
    </Fragment>);
};

export default Login;