import React, {FC} from "react";
import {Tabs} from "antd";

const {TabPane} = Tabs;

const MenuTabs: FC = () => {
    const onChange = (key: string) => {
        console.log(key);
    };

    return (<Tabs tabBarStyle={{margin: 0}} type={"card"} defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Tab 1" key="1">
        </TabPane>
        <TabPane tab="Tab 2" key="2">
        </TabPane>
        <TabPane tab="Tab 3" key="3">
        </TabPane>
    </Tabs>);
};

export default MenuTabs;