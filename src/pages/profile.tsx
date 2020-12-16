import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Box, Flex, Text } from 'theme-ui';
import { useRouter } from 'next/router';
import Button from 'src/atoms/Button';
import { withApollo } from 'src/helper/apollo';
import { LOGOUT } from '../graphql/mutation/user.mutattion';
import { Alert, Form } from 'antd';
import { UPLOAD } from 'src/graphql/mutation/media.mutation';
import { Avatar, Loader } from 'src/components';
import { LOGGED_IN } from 'src/graphql/query/user.query';
import _get from 'lodash/get';
import { AuthContext } from 'src/contexts/auth/auth.context';

const Wrapper = styled.div`
  padding: 2rem;
  button {
    width: 150px;
    margin-top: 10px;
  }
`;

const Profile = () => {
  const { authDispatch } = useContext<any>(AuthContext);
  const { loading, error, data, refetch } = useQuery(LOGGED_IN);
  const [UseLogout] = useMutation(LOGOUT);
  const [Upload] = useMutation(UPLOAD);
  const router = useRouter();
  const onLogout = () => {
    UseLogout().then((res) => {
      authDispatch({ type: 'SIGN_OUT' });
      res.data.logout && router.replace('/login');
    });
  };

  const onChange = useCallback(
    async ({
      target: {
        validity,
        files: [file],
      },
    }) => {
      if (validity.valid && data.me) {
        const {
          data: { upload },
        } = await Upload({ variables: { file, email: data.me.email } });
        upload && refetch();
      }
    },
    [refetch, data]
  );

  const onUpload = useCallback(() => {
    const fileInput = document.querySelector('input[name="profilePicture"]') as HTMLInputElement;
    fileInput && fileInput.click();
  }, []);

  const avatar = useMemo(() => data && data.me && data.me.profile_picture, [data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Wrapper>
      {error && <Alert message={error} type="error" />}
      <Loader loading={loading} />
      {data && data.me && (
        <Box>
          <Form>
            <input hidden type="file" name="profilePicture" onChange={(e) => onChange(e)} />
            <Flex
              sx={{
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Box bg="primary">
                <Avatar onClick={onUpload} dataTestId="avartar" src={avatar} />
                <Text
                  sx={{
                    fontSize: 4,
                    fontWeight: 'bold',
                  }}
                >
                  Hello! {data.me.username}
                </Text>
                <Text variant="caps">Your email: {data.me.email}</Text>
                <Button size="small" variant="outlined" onClick={() => onLogout()}>
                  Logout
                </Button>
              </Box>
            </Flex>
          </Form>
        </Box>
      )}
    </Wrapper>
  );
};

export default withApollo(Profile);
