import { gql } from '@apollo/client';

const PROFILE_FRAGMENT = gql`
  fragment profile on Profile {
    id
    address1
    address2
    state_province
    postal_code
    gender
    country
    picture
  }
`;

export const LOGGED_IN = gql`
  query getUser {
    me {
      id
      username
      role_id
      email
      info {
        ...profile
      }
    }
  }
  ${PROFILE_FRAGMENT}
`;

export const USER_LIST = gql`
  query getUsers {
    userList {
      id
      username
      role_id
      email
    }
  }
`;
