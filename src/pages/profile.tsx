import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { Box, Flex, Text } from 'theme-ui';
import { useRouter } from 'next/router';
import Button from 'src/atoms/Button';
import { withApollo } from 'src/helper/apollo';
import { UserInformationTypes } from 'src/types';
import { LOGOUT } from '../graphql/mutation/user.mutattion';
import { Form } from 'antd';
import { UPLOAD } from 'src/graphql/mutation/media.mutation';
import { Avatar } from 'src/components';

const Wrapper = styled.div`
  padding: 2rem;
  button {
    width: 150px;
    margin-top: 10px;
  }
`;

const Profile = ({ username, email, profile_picture }: UserInformationTypes) => {
  const [UseLogout] = useMutation(LOGOUT);
  const [Upload] = useMutation(UPLOAD);
  const [avatar, setAvatar] = useState(profile_picture);
  const router = useRouter();
  const onLogout = () => {
    UseLogout().then((res) => {
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
      if (validity.valid) {
        const { data } = await Upload({ variables: { file, email: email } });
        setAvatar(data.upload);
      }
    },
    [setAvatar, email]
  );

  const onUpload = useCallback(() => {
    const fileInput = document.querySelector('input[name="profilePicture"]') as HTMLInputElement;
    console.log(fileInput);
    fileInput && fileInput.click();
  }, []);

  return (
    <Wrapper>
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
                Hello! {username}
              </Text>
              <Text variant="caps">Your email: {email}</Text>
              <Button size="small" variant="outlined" onClick={() => onLogout()}>
                {' '}
                Logout{' '}
              </Button>
            </Box>
          </Flex>
        </Form>
      </Box>
    </Wrapper>
  );
};

export default withApollo(Profile);
