import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Flex, Text } from 'theme-ui';
import { withApollo } from '../../helper/apollo';
import { LOGIN } from '../../graphql/mutation/user.mutattion';
import { LOGGED_IN } from '../../graphql/query/user.query';
import UserProfile from '../profile';
import Loading from '../../components/Loading/Loading';
import { Layout as LayoutRoot, Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Layout } from 'src/components/Admin';
import styled, { css } from 'styled-components';

const { Content } = LayoutRoot;

const ContentLoginStyle = css`
  max-width: 300px;
  margin-top: 50px;
`;

const WrapperForm = styled(Content)`
  ${ContentLoginStyle}
`;

type LoginType = {
  usernameOrEmail: string;
  password: string;
  role_id?: number;
};

const Admin = () => {
  const [useLogin] = useMutation(LOGIN);
  const [loader, setLoader] = useState(false);
  const { loading, error, data } = useQuery(LOGGED_IN);
  const [userData, setUserData] = useState<any>();

  const onLogin = async (values: LoginType) => {
    setLoader(true);
    const res = await useLogin({
      variables: {
        ...values,
        role_id: 1,
      },
    });
    setUserData(res.data.login);
    setLoader(false);
  };
  if (loader || loading) {
    return <Loading text="Loading..." />;
  }
  if (error) return `Error! ${error.message}`;
  if (userData && userData.errors && userData.errors.length > 0) {
    alert(`${userData.errors[0].field} : ${userData.errors[0].message}`);
  } else if (data && data.me) {
    return <UserProfile {...data.me} />;
  } else if (userData && userData.user) {
    return <UserProfile {...userData.user} />;
  }

  return (
    <Flex
      sx={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <WrapperForm>
        <Text
          sx={{
            fontSize: 30,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Admin Portal
        </Text>
        <Form
          name="admin_login"
          className="login-form"
          initialValues={{ remember: false }}
          onFinish={onLogin}
        >
          <Form.Item
            name="usernameOrEmail"
            rules={[{ required: true, message: 'Please input your Email / Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Button size="large" block type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form>
      </WrapperForm>
    </Flex>
  );
};
export default withApollo(Admin);
