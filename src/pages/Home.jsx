import React from 'react';
import { Layout, Nav, Button, Breadcrumb, Avatar, Space, Popover } from '@douyinfe/semi-ui';
import { IconCloud, IconBytedanceLogo, IconDescend2 } from '@douyinfe/semi-icons';
import CreateDirectoryButton from "../compoments/CreateDirectoryButton";
import UploadFileButton from "../compoments/UploadFileButton";
import FileTable from "../compoments/FileTable";
import { Link } from "react-router-dom";

const { Header, Footer, Content } = Layout;

const Home = () => {
    const renderContent = ({ initialFocusRef }) => {
        return (
            <div style={{ padding: 12 }}>
                <Space>
                    <Button>
                        <Link to='/login'>登陆</Link>
                    </Button>
                    <Button>
                        <Link to='/register'>注册</Link>
                    </Button>
                </Space>
            </div>
        );
    };

    return (
        <Layout style={{ border: '1px solid var(--semi-color-border)' }}>
            <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                <div>
                    <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
                        <Nav.Header>
                            <IconCloud style={{ fontSize: 36 }} />
                            <div style={{ marginLeft: '12px', fontSize: 18 }}>HCloud</div>
                        </Nav.Header>
                        <Nav.Item itemKey="MyPage" text="我的文件" icon={<IconDescend2 size="large" />} />
                        <Nav.Footer>
                            <Popover content={renderContent} trigger="click">
                                <Avatar color="orange" size="small">
                                    {window.localStorage.getItem("username").charAt(0)}
                                </Avatar>
                            </Popover>
                        </Nav.Footer>
                    </Nav>
                </div>
            </Header>
            <Content
                style={{
                    padding: '24px',
                    backgroundColor: 'var(--semi-color-bg-0)',
                }}
            >
                <div>
                    <Breadcrumb
                        style={{
                            float: "left"
                        }}>
                        <Breadcrumb.Item href="/">我的文件</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            float: "right"
                        }}>
                        <CreateDirectoryButton></CreateDirectoryButton>
                        <div style={{width: 360}}></div>
                        <UploadFileButton></UploadFileButton>
                    </div>
                </div>
                <div
                    style={{
                        marginTop: '40px',
                        borderRadius: '10px',
                        border: '1px solid var(--semi-color-border)',
                        height: 'auto',
                        padding: '32px',
                    }}
                >
                    <FileTable/>
                </div>
            </Content>
            <Footer
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '20px',
                    color: 'var(--semi-color-text-2)',
                    backgroundColor: 'rgba(var(--semi-grey-0), 1)',
                }}
            >
            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <IconBytedanceLogo size="large" style={{ marginRight: '8px' }} />
                <span>大数据小组. </span>
            </span>
            </Footer>
        </Layout>
    )
}

export default Home