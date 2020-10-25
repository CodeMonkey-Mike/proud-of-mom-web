import React from 'react';
import { Layout, Row, Col, Button, Popover, List, Typography } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Flex } from 'theme-ui';
import { useMutation } from '@apollo/client';
import { LOGOUT } from 'src/graphql/mutation/user.mutattion';
import { useRouter } from 'next/router';

const { Header } = Layout;

export const DashboardHeader = ({
  setCollapsed = () => {},
  collapsed = false,
}: {
  setCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
}) => {
  const [useLogout] = useMutation(LOGOUT);
  const router = useRouter();
  const onLogout = () => {
    useLogout().then((res) => {
      res.data.logout && router.push('/admin/login');
    });
  };

  const data = [
    'David John has created as a new account',
    'David John has created as a new account',
    'David John has created as a new account',
    'David John has created as a new account',
    'David John has created as a new account',
    'David John has created as a new account',
  ];

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <Flex
        sx={{
          alignItems: 'center',
          paddingX: 10,
          height: '100%',
        }}
      >
        <Row
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Col span="12">
            <Flex>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                style: { color: 'white' },
                onClick: () => setCollapsed(!collapsed),
              })}
            </Flex>
          </Col>
          <Col span="12">
            <Flex
              sx={{
                justifyContent: 'flex-end',
              }}
            >
              <Popover
                placement="bottomLeft"
                title={'Notification'}
                content={() => {
                  return (
                    <List
                      bordered
                      dataSource={data}
                      renderItem={(item) => (
                        <List.Item>
                          <Typography.Text mark>[New]</Typography.Text> {item}
                        </List.Item>
                      )}
                    />
                  );
                }}
                trigger="click"
              >
                <Button icon={<BellOutlined />} />
              </Popover>

              <Button
                style={{
                  marginLeft: 15,
                }}
                onClick={() => onLogout()}
                icon={<LogoutOutlined />}
              >
                Log out
              </Button>
            </Flex>
          </Col>
        </Row>
      </Flex>
    </Header>
  );
};
