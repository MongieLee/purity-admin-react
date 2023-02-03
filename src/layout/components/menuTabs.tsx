import React, {FC} from "react";
import {Tabs, TabsProps} from "antd";
import {connect} from "react-redux";
import {RootState} from "@/store";

const {TabPane} = Tabs;

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Tab 1`,
  },
  {
    key: '2',
    label: `Tab 2`,
  },
  {
    key: '3',
    label: `Tab 3`,
  },
];

const getItems = (data: []) => {
  return data.map((i: any) => {
    return {
      key: i.key,
      label: i.label,
    }
  })
}

const MenuTabs: FC = (props: any) => {
  const onChange = (key: string) => {
    console.log(key);
    console.log(props.tabsInfo)
  };

  return (<Tabs tabBarStyle={{margin: 0}} type={"card"}
                activeKey={props.tabsInfo.activityKey} onChange={onChange}
                items={props.tabsInfo.tabs}>
  </Tabs>);
};

const mapStateToProps = (state: RootState) => {
  console.log(state.permission.permissions);
  return {tabsInfo: state.tabs}
}
export default connect(mapStateToProps)(MenuTabs);
