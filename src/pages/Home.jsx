import React from 'react';
import { Layout, Nav, Button, Breadcrumb, Skeleton, Avatar } from '@douyinfe/semi-ui';
import { IconCloud, IconPlus, IconHelpCircle, IconBytedanceLogo, IconDescend2, IconSetting } from '@douyinfe/semi-icons';
import CreateDirectoryButton from "../compoments/CreateDirectoryButton";
import UploadFileButton from "../compoments/UploadFileButton";
import FileTable from "../compoments/FileTable";

const { Header, Footer, Content } = Layout;

export default function Home() {
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
                        <Nav.Item itemKey="Setting" text="设置" icon={<IconSetting size="large" />} />
                        <Nav.Footer>
                            <Avatar color="orange" size="small">
                                YD
                            </Avatar>
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
                        }}
                        routes={['我的文件', '文件名', '文件名', '文件名']}
                    />
                    <div
                        style={{
                            float: "right"
                        }}>
                        <UploadFileButton></UploadFileButton>
                        <CreateDirectoryButton></CreateDirectoryButton>
                    </div>
                </div>
                <div
                    style={{
                        marginTop: '40px',
                        borderRadius: '10px',
                        border: '1px solid var(--semi-color-border)',
                        height: '376px',
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
