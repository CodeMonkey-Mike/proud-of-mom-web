import Button from 'src/atoms/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2rem;
  max-width: 400px;
  button {
    width: 150px;
    margin-top: 10px;
  }
`;

const UserProfile = (user: { email: string; username: string }) => {
  const { email, username } = user;
  return (
    <Wrapper>
      <div>
        Hello! {username} <br />
        Your email: {email}
        <Button size="small" variant="outlined" onClick={() => window.location.reload()}>
          Logout
        </Button>
      </div>
    </Wrapper>
  );
};

export default UserProfile;
