import { gql } from '@apollo/client';

export const LOGGED_IN = gql`
  query getUser($id: String = "1") {
    me(id: $id) {
      id
      username
      email
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
    }
  }
`;
