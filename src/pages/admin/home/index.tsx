import React, { useEffect, useMemo, useState } from 'react';
import { withApollo } from 'src/helper/apollo';
import { AdminLogo as Logo, MainMenu, DashboardHeader as Header } from 'src/components/Admin';
import { Layout, Row, Col, Card, Statistic, Skeleton, Alert } from 'antd';
import { Box } from 'theme-ui';
import { useQuery } from '@apollo/client';
import { USER_LIST } from 'src/graphql/query/user.query';

const { Sider, Content } = Layout;

const Home = () => {
  const { loading, error, data } = useQuery(USER_LIST);
  const [collapsed, setCollapsed] = useState(false);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalNormalUser, setTotalNormalUser] = useState(0);
  useEffect(() => {
    if (!loading && data)
      setTotalAdmin(data.userList.filter((item: { role_id: number }) => item.role_id === 1).length);
    setTotalNormalUser(
      data.userList.filter((item: { role_id: number }) => item.role_id === 2).length
    );
  }, [loading, data]);
  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* Logo comp */}
        <Logo />
        {/* Menu comp */}
        <MainMenu pageId={1} />
      </Sider>
      <Layout>
        <Header setCollapsed={() => setCollapsed(!collapsed)} collapsed={collapsed} />
        <Content>
          <Box
            sx={{
              padding: '20px',
            }}
          >
            {error ? (
              <Alert message="Error" description={error.message} type="error" showIcon />
            ) : (
              <Row gutter={16}>
                <Col span={8}>
                  <Skeleton loading={loading} active={loading}>
                    <Card title="Admin" bordered={false}>
                      <Statistic value={totalAdmin} />
                    </Card>
                  </Skeleton>
                </Col>
                <Col span={8}>
                  <Skeleton loading={loading} active={loading}>
                    <Card title="Users" bordered={false}>
                      <Statistic value={totalNormalUser} />
                    </Card>
                  </Skeleton>
                </Col>
                <Col span={8}>
                  <Skeleton loading={loading} active={loading}>
                    <Card title="Total Users" bordered={false}>
                      <Statistic value={totalAdmin + totalNormalUser} />
                    </Card>
                  </Skeleton>
                </Col>
              </Row>
            )}
          </Box>
        </Content>
      </Layout>
    </Layout>
  );
};
export default withApollo(Home);
