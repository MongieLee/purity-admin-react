import {
  Button,
  Card,
  Checkbox,
  Divider,
  Dropdown,
  Form,
  Input,
  InputNumber,
  MenuProps,
  message,
  Modal,
  Popconfirm,
  Radio,
  Space,
  Table,
  Tag,
  Tooltip,
  TreeSelect
} from "antd";
import styleds from './department.module.less';
import {ColumnHeightOutlined, SettingOutlined, SyncOutlined} from "@ant-design/icons";
import {createElement, useEffect, useMemo, useState} from "react";
import {SizeType} from "antd/es/config-provider/SizeContext";
import DepartmentService, {DepartmentItem} from "@/service/department";
import {checkPermission, clearChildren, shallowCopy} from "@/utils";
import {ColumnsType} from "antd/es/table";
import {connect} from "react-redux";
import {RootState} from "@/store";
import {CheckboxChangeEvent} from "antd/es/checkbox";

const emptyRecord = (): DepartmentItem => ({
  name: undefined,
  parentId: undefined,
  sequence: undefined,
  principal: undefined,
  phoneNumber: undefined,
  state: true
});

const buttonPermissionKeys = {
  creatBtn: "department:create",
  editBtn: "department:edit",
  delBtn: "department:delete",
}

const getRequiredRules = (message: string = '请输入信息', other: any[] = []) => {
  return [{required: true, message}, ...other];
}

type ColumnItem = { checked: boolean, render?: Function, title: string };

type Props = ReturnType<typeof mapStateToProps>

const Department = ({permissions}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [customSize, setCustomSize] = useState<SizeType>('large');
  const [tableData, setTableData] = useState<DepartmentItem[]>([]);

  const items: MenuProps['items'] = [
    {
      key: 'large',
      label: (<a>宽松</a>),
      onClick() {
        setCustomSize('large');
      }
    },
    {
      key: 'middle',
      label: (<a>中等</a>),
      onClick() {
        setCustomSize('middle');
      }
    },
    {
      key: 'small',
      label: (<a>紧密</a>),
      onClick() {
        setCustomSize('small');
      }
    },
  ]

  useEffect(() => {
    getTree();
  }, []);
  const delRecord = async (record: DepartmentItem) => {
    setTableLoading(true);
    try {
      await DepartmentService.deleteDepartment(record.id!);
      message.success(`删除${record.name}成功`);
      getTree();
    } finally {
      setTableLoading(false);
    }
  }
  const columns: ColumnsType<DepartmentItem> = [
    {
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
      width: 220
    },
    {
      title: '排序',
      dataIndex: 'sequence',
      key: 'sequence',
      width: 80
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      width: 80,
      render(value, record, index) {
        return createElement(Tag, {color: value ? "success" : "error"}, value ? '启用' : '禁用')
      }
    },
    {
      title: '负责人',
      dataIndex: 'principal',
      key: 'principal',
    },
    {
      title: '联系电话', dataIndex: 'phoneNumber',
      key: 'principal',
    },
    {
      title: '创建时间',
      key: 'createdAt',
      dataIndex: 'createdAt',
      width: 180
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render(value, record, index) {
        return (<Space>
          {checkPermission(buttonPermissionKeys.editBtn, <a onClick={() => editRecord(record)}>编辑</a>)}
          {checkPermission(buttonPermissionKeys.delBtn, <Popconfirm title={`确定要删除【${record.name}】吗`} okText={'确定'}
                                                                    cancelText={'取消'}
                                                                    onConfirm={() => delRecord(record)}>
            <a>删除</a>
          </Popconfirm>)}
        </Space>)
      }
    }
  ]

  const cloneColumnsInitial = shallowCopy(columns).map((i: ColumnItem) => {
    i.checked = true;
    return i;
  });

  const [cloneColumns, setCloneColumns] = useState<ColumnItem[]>(cloneColumnsInitial);
  const resetColumns = () => {
    setCloneColumns(cloneColumns.map((i) => {
      i.checked = true;
      return i;
    }))
  }

  const showColumns = useMemo(() => {
    const target = cloneColumns.filter(i => i.checked);
    return columns.filter((c) => {
      return Boolean(target.find((i) => i.title === c.title));
    })
  }, [cloneColumns])

  function editRecord(record: DepartmentItem) {
    form.setFieldsValue(shallowCopy(record));
    setModalVisible(true);
  }

  const addRecord = () => {
    form.setFieldsValue(emptyRecord());
    setModalVisible(true);
  }

  const getTree = async () => {
    try {
      setTableLoading(true);
      const tree = await DepartmentService.getDepartmentTree()
      setTableData(clearChildren(tree));
    } finally {
      setTableLoading(false);
    }
  }

  function submitForm() {
    form.validateFields().then(async (values: DepartmentItem) => {
      const isUpdate = Boolean(values.id);
      if (isUpdate) {
        await DepartmentService.updateDepartment({values});
      } else {
        await DepartmentService.createDepartment(values);
      }
      message.success(isUpdate ? '更新成功' : '新增成功');
      getTree();
      cancelModal();
    })
  }

  function cancelModal() {
    setModalVisible(false);
    form.resetFields();
  }

  const [form] = Form.useForm();

  const allColumnChange = (e: CheckboxChangeEvent) => {
    setCloneColumns(cloneColumns.map(i => {
      i.checked = e.target.checked;
      return i;
    }));
  }

  const isAllChecked = useMemo(() => {
    return cloneColumns.every(i => i.checked);
  }, [cloneColumns]);

  const onCheckboxChange = (e: CheckboxChangeEvent, i: ColumnItem) => {
    i.checked = e.target.checked;
    setCloneColumns([...cloneColumns]);
  }

  // @ts-ignore
  return <Card>
    <div className={styleds.moduleHeader}>
      <div>部门列表</div>
      <div className={styleds.tableExtension}>
        {checkPermission(buttonPermissionKeys.creatBtn, <Button type={'primary'} onClick={addRecord}>新增部门</Button>)}
        <Tooltip title={'刷新'}>
          <SyncOutlined onClick={getTree} disabled={tableLoading}/>
        </Tooltip>
        <Tooltip title={'密度'}>
          <Dropdown menu={{items}} trigger={['click']} placement={'bottom'}>
            <ColumnHeightOutlined/>
          </Dropdown>
        </Tooltip>
        <Tooltip title={'列设置'}>
          <Dropdown trigger={['click']} overlay={(
            <div className={styleds.columnSetting}>
              <div className={styleds.topColumn}>
                <Checkbox checked={isAllChecked} onChange={allColumnChange}>列展示</Checkbox>
                <a onClick={resetColumns}>重置</a>
              </div>
              <div>
              </div>
              {cloneColumns.map((i) => (<div>
                  <Checkbox onChange={(evt) => onCheckboxChange(evt, i)} checked={i.checked}>{i.title}</Checkbox>
                </div>)
              )}
            </div>)}>
            <SettingOutlined onClick={getTree} disabled={tableLoading}/>
          </Dropdown>
        </Tooltip>
      </div>
    </div>
    <Table pagination={false} loading={tableLoading} size={customSize} columns={showColumns} dataSource={tableData}/>
    <Modal mask={true} maskClosable={false} destroyOnClose={true} confirmLoading={tableLoading} okText={'确认'}
           title={`${form.getFieldValue('id') ? '编辑' : '新增'}部门`}
           open={modalVisible} onOk={submitForm} onCancel={cancelModal}>
      <Divider/>
      <Form form={form} {...{wrapperCol: {span: 14}, labelCol: {span: 6}}}>
        <Form.Item rules={getRequiredRules('请输入部门名称')} name={'name'} label={'部门名称'}>
          <Input/>
        </Form.Item>
        <Form.Item name={'parentId'} label={'上级部门'}>
          <TreeSelect allowClear treeData={tableData}
                      fieldNames={{label: 'name', value: 'id'}}></TreeSelect>
        </Form.Item>
        <Form.Item rules={getRequiredRules('请输入排序')} name={'sequence'} label={'排序'}>
          <InputNumber style={{width: '100%'}} min={1}/>
        </Form.Item>
        <Form.Item rules={getRequiredRules('请输入负责人')} name={'principal'} label={'负责人'}>
          <Input/>
        </Form.Item>
        <Form.Item name={'phoneNumber'} label={'联系号码'}>
          <Input/>
        </Form.Item>
        <Form.Item rules={getRequiredRules('请选择状态')} name={'state'} label={'状态'}>
          <Radio.Group>
            <Radio value={true}>启用</Radio>
            <Radio value={false}>禁用</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  </Card>;
}

const mapStateToProps = (state: RootState) => {
  return {permissions: state.permission.permissions}
};

export default connect(mapStateToProps)(Department);
