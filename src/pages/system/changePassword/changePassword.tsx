import {Button, Card, Form, Input, message, Space} from "antd";
import {useState} from "react";
import {RuleObject, StoreValue} from "rc-field-form/lib/interface";
import AuthService from "@/service/auth";
import {useNavigate} from "react-router-dom";
import {clearAuthToken} from "@/utils/token";

export interface PasswordState {
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
}

const ChangePassword = () => {
  const navigate = useNavigate();
  const onFinish = async (values: PasswordState) => {
    await AuthService.changePassword(values);
    message.success("修改密码成功，需要重新登录");
    clearAuthToken();
    navigate("/login");
  }
  const [form] = Form.useForm();
  const confirmValidator = (rule: RuleObject, value: StoreValue, callback: (error?: string) => void) => {
    if (!value) {
      return Promise.reject("请输入确认密码")
    }
    if (value !== form.getFieldValue('newPassword')) {
      return Promise.reject("两次输入的密码不一致")
    } else {
      return Promise.resolve();
    }
    // if(!())
  }

  return (<Card>
    <h3><strong>修改密码</strong></h3>
    <p>修改成功后将自动退出系统，需要重新登录账号！</p>
    <Form form={form} onFinish={onFinish} labelCol={{span: 4}} wrapperCol={{span: 16}}>
      <Form.Item label={'旧密码'} name={'oldPassword'} rules={[{required: true, message: "请输入旧密码"}]}>
        <Input.Password/>
      </Form.Item>
      <Form.Item label={'新密码'} name={'newPassword'} rules={[{required: true, message: "请输入新密码"}]}>
        <Input.Password/>
      </Form.Item>
      <Form.Item label={'确认新密码'} name={'confirmPassword'} rules={[{required: true, validator: confirmValidator}]}>
        <Input.Password placeholder={'请确认新密码'}/>
      </Form.Item>
      <Form.Item wrapperCol={{span: 24}}>
        <div className={'dfcc'}>
          <Space>
            <Button htmlType={"reset"}>重置</Button>
            <Button type={"primary"} htmlType={"submit"}>确认</Button>
          </Space>
        </div>
      </Form.Item>
    </Form>
  </Card>)
}
export default ChangePassword;
