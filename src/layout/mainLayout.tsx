import React, {FC, useState} from "react";
import {Layout, Space} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import styles from "./index.module.less";
import SiderMenu from "./components/siderMenu";
import {Outlet, useMatches, useNavigate} from "react-router-dom";
import config from "@/config";
import {CopyrightOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import MenuTabs from "@/layout/components/menuTabs";
import AnimationRoutes from "@/components/animationRoutes/animationRoutes";
import CustomHeader from "./components/header";
import Test from "@/layout/components/Test";

const contentDifferenceHeight = 144; // 142为视窗-头部-内边距-tabs高度-底部
const MainLayout: FC = () => {
  // const user = useSelector((state: any) => state.user);
  // const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(false);

  var na = useNavigate();
  console.log(na)

  return (<Layout className={styles.layout}>
      <Sider collapsed={collapsed} width={256} className={styles.sider}>
        <SiderMenu/>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <CustomHeader/>
        </Header>
        <Content className={styles.context}>
          {/*<MenuTabs/>*/}
          <main>
            <AnimationRoutes in={show}>
              <Outlet/>
            </AnimationRoutes>
            {/*<Outlet/>*/}
          </main>
        </Content>
        <div className={styles.footer}>
          <Space>
            <span>Copyright</span>
            <CopyrightOutlined/>
            {config.copyright}
          </Space>
        </div>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
