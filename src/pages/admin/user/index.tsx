import React, { useEffect, useState } from 'react';
import { Layout, Table, message, Input, Button, Space, Row, Col, Modal, Switch } from 'antd';
import { withApollo } from 'src/helper/apollo';
import { UserInformationTypes } from 'src/types';
import { useQuery, useMutation } from '@apollo/client';
import { USER_LIST } from 'src/graphql/query/user.query';
import { DELETE, REGISTER, UPDATE_ROLE, UPDATE_USER } from 'src/graphql/mutation/user.mutattion';
import Loading from 'src/components/Loading/Loading';
import { WarningOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AdminLogo as Logo, MainMenu, DashboardHeader as Header } from 'src/components/Admin';
import { Add } from 'src/components/Admin';
import { Edit } from 'src/components/Admin';
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
  const { loading, error, data, refetch } = useQuery(USER_LIST);
  const [UseRegister] = useMutation(REGISTER);
  const [UseDelete] = useMutation(DELETE);
  const [UseUpdateRole] = useMutation(UPDATE_ROLE);
  const [UseUpdateUser] = useMutation(UPDATE_USER);
  const [collapsed, setCollapsed] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [apiFallBackError, setApiFallBackError] = useState(null);

  if (error) return message.error(`Error! ${error.message}`);

  //=> Start add new user func
  const onRegister = async (values: RegisterType) => {
    const res = await UseRegister({
      variables: {
        ...values,
      },
    });
    if (res.data.register.user) {
      setAddUser(false);
      setApiFallBackError(null);
      refetch();
    }
    res.data.register.errors && setApiFallBackError(res.data.register.errors[0]);
  };

  const onUpdateUser = async (values: UserInformationTypes) => {
    const res = await UseUpdateUser({
      variables: {
        ...values,
      },
    });
    if (res.data.updateUser.user) {
      message.success('User updated!');
      setEditUser(false);
      setApiFallBackError(null);
      refetch();
    }
    res.data.updateUser.errors && setApiFallBackError(res.data.updateUser.errors[0]);
  };

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
          refetch();
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
    if (res.data.updateUser.user) {
      message.success('Role changed!');
      refetch();
    }
  };

  const onSearch = (v: string) => {
    let result: any[] = [];
    if (v.includes('@')) {
      result = data.userList.filter((user: any) => user.email.includes(v));
    } else {
      result = data.userList.filter((user: any) => user.username.includes(v));
    }
    setDataSource(result);
  };

  useEffect(() => {
    if (data && data.userList) {
      const dataS = data.userList.map((user: UserInformationTypes, idx: number) => {
        return {
          key: idx + 1,
          ...user,
        };
      });
      setDataSource(dataS);
    }
  }, [data]);
  return (
    <Layout style={{ height: '100%' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* Logo comp */}
        <Logo />
        {/* Menu comp */}
        <MainMenu pageId={2} />
      </Sider>
      <Layout>
        <Add
          addUser={addUser}
          apiFallBackError={apiFallBackError}
          setAddUser={() => setAddUser(!addUser)}
          addNewUser={onRegister}
        />
        <Edit
          userInfo={userInfo}
          editUser={editUser}
          apiFallBackError={apiFallBackError}
          setEditUser={() => setEditUser(!editUser)}
          editInfoUser={onUpdateUser}
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
                    onSearch={onSearch}
                    onChange={(v) => onSearch(v.target.value)}
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
            {loading ? (
              <Loading text="Loading..." />
            ) : (
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
                  render={({ email, ...rest }) => (
                    <Space size="middle">
                      <Button
                        type="primary"
                        onClick={() => {
                          setUserInfo({ email, ...rest });
                          setEditUser(!editUser);
                        }}
                      >
                        Edit
                      </Button>
                      <Button danger onClick={() => deletConfirm(email)}>
                        Delete
                      </Button>
                    </Space>
                  )}
                />
              </Table>
            )}
          </Box>
        </Content>
      </Layout>
    </Layout>
  );
};

export default withApollo(User);
