import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { Box } from 'theme-ui';
import { useRouter } from 'next/router';
import Button from 'src/atoms/Button';
import { withApollo } from 'src/helper/apollo';
import { UserInformationTypes } from 'src/types';
import { LOGOUT } from '../../graphql/mutation/user.mutattion';

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 400px;
  button {
    width: 150px;
    margin-top: 10px;
  }
`;

const Profile = ({ username, email }: UserInformationTypes) => {
  const [UseLogout] = useMutation(LOGOUT);
  const router = useRouter();
  const onLogout = () => {
    UseLogout().then((res) => {
      res.data.logout && router.replace('/admin/login');
    });
  };
  return (
    <Wrapper>
      <Box>
        Hello! {username} <br />
        Your email: {email} <br />
        <Button size="small" variant="outlined" onClick={() => onLogout()}>
          Logout
        </Button>
      </Box>
    </Wrapper>
  );
};

export default withApollo(Profile);
