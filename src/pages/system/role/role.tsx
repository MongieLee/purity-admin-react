import {Button, Card, Form, Input, message, Select, Space} from "antd";
import {useState} from "react";

const Role = () => {
  const [tableLoading, setTableLoading] = useState(false);
  return <div>
    <Card>
      <Form layout={'inline'} onFinish={(values) => {
        message.success("????")
      }}>
        <Form.Item label={'角色名称'} name={"roleName"}>
          <Input placeholder={'可输入'}/>
        </Form.Item>
        <Form.Item label={'启用状态'} name={'state'}>
          <Select placeholder={'可选择'} options={[{value: 1, label: '启用'}, {value: 1, label: '禁用'}]}/>
        </Form.Item>
        <Form.Item name={'state'}>
          <Space>
            <Button htmlType={"reset"}>重置</Button>
            <Button loading={tableLoading} type={'primary'} htmlType={'submit'}>查询</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
    <Card style={{marginTop: '1em'}}>456</Card>
  </div>
}
export default Role;
