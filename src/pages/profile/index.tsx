import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 5rem;
`;

const UserProfile = (user: { email: string; username: string }) => {
  const { email, username } = user;
  return (
    <Wrapper>
      <div>
        Hello! {username} <br />
        Your email: {email}
      </div>
    </Wrapper>
  );
};

export default UserProfile;
