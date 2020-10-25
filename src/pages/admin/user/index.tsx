import React, { useEffect, useState } from 'react';
import { Layout, Table, message, Input, Button, Space, Row, Col, Modal, Switch } from 'antd';
import { withApollo } from 'src/helper/apollo';
import { useQuery, useMutation } from '@apollo/client';
import { USER_LIST } from 'src/graphql/query/user.query';
import { DELETE, REGISTER, UPDATE_ROLE } from 'src/graphql/mutation/user.mutattion';
import Loading from 'src/components/Loading/Loading';
import { UserInformationTypes } from 'src/types/User';
import { WarningOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AdminLogo as Logo, MainMenu, DashboardHeader as Header } from 'src/components/Admin';
import Add from 'src/components/Admin/Add/Add';
import { Box, Flex } from 'theme-ui';

const { Sider, Content } = Layout;
const { Search } = Input;
const { Column } = Table;

export interface RegisterType {
  email: string;
  username: string;
  password: string;
}

const User = () => {
  const { loading, error, data } = useQuery(USER_LIST);
  const [UseRegister] = useMutation(REGISTER);
  const [UseDelete] = useMutation(DELETE);
  const [UseUpdateRole] = useMutation(UPDATE_ROLE);
  const [collapsed, setCollapsed] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [apiFallBackError, setApiFallBackError] = useState(null);

  const onRegister = async (values: RegisterType) => {
    const res = await UseRegister({
      variables: {
        ...values,
      },
    });
    if (res.data.register.user) {
      setAddUser(false);
      setApiFallBackError(null);
    }
    res.data.register.errors && setApiFallBackError(res.data.register.errors[0]);
  };

  if (loading) return <Loading text="Loading..." />;

  if (error) return message.error(`Error! ${error.message}`);

  const deletConfirm = (email: string) => {
    Modal.confirm({
      title: 'Delete confirmation',
      icon: <WarningOutlined />,
      content: 'Please confirm...',
      okText: 'OK',
      cancelText: 'Cancel',
      onOk: async () => {
        const res = await UseDelete({
          variables: {
            email: email,
          },
        });
        if (res.data.delete) {
          message.success('Deleted!');
          Modal.destroyAll();
        }
      },
    });
  };

  const handleChangeRole = async (id: number, role_id: number) => {
    const res = await UseUpdateRole({
      variables: {
        id: id,
        role_id: role_id,
      },
    });
    if (res.data.updateRole.user) {
      message.success('Role changed!');
    }
  };

  useEffect(() => {
    const dataS = data.userList.map((user: UserInformationTypes, idx: number) => {
      return {
        key: idx + 1,
        ...user,
      };
    });
    setDataSource(dataS);
  }, [data]);
  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* Logo comp */}
        <Logo />
        {/* Menu comp */}
        <MainMenu />
      </Sider>
      <Layout>
        <Add
          addUser={addUser}
          apiFallBackError={apiFallBackError}
          setAddUser={() => setAddUser(!addUser)}
          addNewUser={onRegister}
        />
        <Header setCollapsed={() => setCollapsed(!collapsed)} collapsed={collapsed} />
        <Content>
          <Box
            sx={{
              padding: '20px',
            }}
          >
            <Box
              sx={{
                marginBottom: 20,
              }}
            >
              <Row>
                <Col span={12}>
                  <Search
                    placeholder="Email / Role"
                    onSearch={() => console.log('aaa')}
                    enterButton
                  />
                </Col>
                <Col span={12}>
                  <Flex
                    sx={{
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button
                      onClick={() => setAddUser(!addUser)}
                      type="primary"
                      shape="round"
                      icon={<PlusCircleOutlined />}
                    >
                      Add
                    </Button>
                  </Flex>
                </Col>
              </Row>
            </Box>
            <Table dataSource={dataSource}>
              <Column title="User ID" dataIndex="id" key="id" sortOrder={'ascend'} />
              <Column title="Username" dataIndex="username" key="username" />
              <Column title="Email" dataIndex="email" key="email" />
              <Column
                title="Admin"
                key="admin"
                render={({ role_id, id }) => {
                  return (
                    <Switch
                      defaultChecked={role_id === 1}
                      onChange={() => handleChangeRole(id, role_id)}
                    />
                  );
                }}
              />
              <Column
                title="Action"
                key="email"
                render={({ email }) => (
                  <Space size="middle">
                    <Button type="primary">Edit</Button>
                    <Button danger onClick={() => deletConfirm(email)}>
                      Delete
                    </Button>
                  </Space>
                )}
              />
            </Table>
          </Box>
        </Content>
      </Layout>
    </Layout>
  );
};

export default withApollo(User);
