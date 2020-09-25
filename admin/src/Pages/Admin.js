import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    UserOutlined,
    PoweroffOutlined
} from '@ant-design/icons';
import '../static/style/Admin.css';
import { Route } from 'react-router-dom';
import AddArticle from './AddArticle';
import ArticleList from './ArticleList';
import ChangeInfo from './ChangeInfo';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Admin(props) {
    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const handleClickArticle = e => {
        // console.log(e.item.props);
        if (e.key === 'addArticle') {
            props.history.push('/index/add');
        } else if(e.key === 'articleList') {
            props.history.push('/index/list');
        } else if(e.key === 'personalInfo') {
            props.history.push('/index/ChangeInfo');
        } else if(e.key === 'exit') {;
            localStorage.removeItem('userId');
            props.history.push('/');
        }
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['addArticle']} mode="inline">
                    <SubMenu
                        key="sub1"
                        onClick={handleClickArticle}
                        icon={<DesktopOutlined />}
                        title="文章管理"
                    >
                        <Menu.Item key="addArticle">添加文章</Menu.Item>
                        <Menu.Item key="articleList">文章列表</Menu.Item>
                    </SubMenu>
                    <Menu.Item onClick={handleClickArticle} key="personalInfo" icon={<UserOutlined />}>
                        个人信息管理
                    </Menu.Item>
                    <Menu.Item onClick={handleClickArticle} key="exit" icon={<PoweroffOutlined />}>
                        退出
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <div>
                            <Route path="/index/" exact component={AddArticle} />
                            <Route path="/index/add/" exact component={AddArticle} />
                            <Route path="/index/list/" exact component={ArticleList} />
                            <Route path="/index/add/:id" exact component={AddArticle} />
                            <Route path="/index/changeInfo" exact component={ChangeInfo} />
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>www.xwenkai.cn</Footer>
            </Layout>
        </Layout>
    );
}

// ReactDOM.render(<SiderDemo />, mountNode);
export default Admin;