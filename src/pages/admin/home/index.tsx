import React, { useState } from 'react';
import { withApollo } from 'src/helper/apollo';
import { AdminLogo as Logo, MainMenu, DashboardHeader as Header } from 'src/components/Admin';
import { Layout, Row, Col, Card, Statistic } from 'antd';
import { Box } from 'theme-ui';

const { Sider, Content } = Layout;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* Logo comp */}
        <Logo />
        {/* Menu comp */}
        <MainMenu />
      </Sider>
      <Layout>
        <Header setCollapsed={() => setCollapsed(!collapsed)} collapsed={collapsed} />
        <Content>
          <Box
            sx={{
              padding: '20px',
            }}
          >
            <Row gutter={16}>
              <Col span={8}>
                <Card title="Activities" bordered={false}>
                  <Statistic title="Active Users" value={112893} />
                </Card>
              </Col>
              <Col span={8}>
                <Card title="New Users" bordered={false}>
                  Andy Lee
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Total Users" bordered={false}>
                  1000
                </Card>
              </Col>
            </Row>
          </Box>
        </Content>
      </Layout>
    </Layout>
  );
};
export default withApollo(Home);
