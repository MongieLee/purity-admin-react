import React, {FC} from "react";
import {Tabs, TabsProps} from "antd";

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

const MenuTabs: FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (<Tabs tabBarStyle={{margin: 0}} type={"card"} defaultActiveKey="1" onChange={onChange} items={items}>
  </Tabs>);
};

export default MenuTabs;
