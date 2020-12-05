import { gql } from '@apollo/client';

export const LOGGED_IN = gql`
  query getUser {
    me {
      id
      username
      role_id
      email
      profile_picture
    }
  }
`;

export const USER_LIST = gql`
  query getUsers {
    userList {
      id
      username
      role_id
      email
      profile_picture
    }
  }
`;
