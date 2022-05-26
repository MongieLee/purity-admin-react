import React, {FC, useState} from "react";
import {Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content, Header} from "antd/es/layout/layout";
import styles from "./index.module.less";
import SiderMenu from "./components/siderMenu";
import {Outlet} from "react-router-dom";
import config from "@/config";
import {CopyrightOutlined, MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import MenuTabs from "@/layout/components/menuTabs";
import AnimationRoutes from "@/components/animationRoutes/animationRoutes";


const contentDifferenceHeight = 144; // 142为视窗-头部-内边距-tabs高度-底部
const AuthenticatedApp: FC = () => {
    // const user = useSelector((state: any) => state.user);
    // const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const [show, setShow] = useState(false);

    return (<Layout className={styles.layout}>
            <Sider collapsed={collapsed} width={256} className={styles.sider}>
                <SiderMenu/>
            </Sider>
            <Layout>
                <Header className={styles.header}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: styles.trigger,
                            onClick: () => setCollapsed(!collapsed)
                        }
                    )}
                    {/*<Button onClick={() => dispatch({type: "update", payload: {name: 1, age: 20}})}>*/}
                    {/*    dispatch*/}
                    {/*    {user?.name}*/}
                    {/*</Button>*/}
                </Header>
                <Content className={styles.context}>
                    <MenuTabs/>
                    <main style={{height: `calc(100vh - ${contentDifferenceHeight}px)`}}>
                        <AnimationRoutes in={show}>
                            <Outlet/>
                        </AnimationRoutes>
                        {/*<Outlet/>*/}
                    </main>
                </Content>
                <div className={styles.footer}>
                    <span>Copyright</span>
                    <CopyrightOutlined/>
                    {config.copyright}
                </div>
            </Layout>
        </Layout>
    );
};

export default AuthenticatedApp;
