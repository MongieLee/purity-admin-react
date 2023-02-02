import {Button, Form, Input, message, Space} from "antd";
import {useState} from "react";
import {RuleObject, StoreValue} from "rc-field-form/lib/interface";
import AuthService from "@/service/auth/auth";
import {useNavigate} from "react-router-dom";

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

  return <div>
    <Form form={form} onFinish={onFinish}>
      <Form.Item name={'oldPassword'} rules={[{required: true, message: "请输入旧密码"}]}>
        <Input.Password/>
      </Form.Item>
      <Form.Item name={'newPassword'} rules={[{required: true, message: "请输入新密码"}]}>
        <Input.Password/>
      </Form.Item>
      <Form.Item name={'confirmPassword'} rules={[{required: true, validator: confirmValidator}]}>
        <Input.Password placeholder={'请确认新密码'}/>
      </Form.Item>
      <Form.Item>
        <div style={{}}>
          <Button htmlType={"reset"} size={'large'}>重置</Button>
          <Button type={"primary"} htmlType={"submit"} size={'large'}>确认修改</Button>
        </div>
      </Form.Item>
    </Form>
  </div>
}
export default ChangePassword;
