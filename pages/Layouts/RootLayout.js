import { Breadcrumb, Layout, theme } from 'antd';
import Navbar from '../Shared/navbar';
const { Header, Content, Footer } = Layout;



const RootLayout = ({children}) => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    return (
        <Layout className="layout">
        {/* <Header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={new Array(15).fill(null).map((_, index) => {
              const key = index + 1;
              return {
                key,
                label: `nav ${key}`,
              };
            })}
          />
        </Header> */}
        <Navbar></Navbar>
        <Content
          style={{
            padding: '0 ,0',
          }}
        >
          
          <div
            className="site-layout-content"
            style={{
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    );
};

export default RootLayout;