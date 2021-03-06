import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation register($email: String!, $username: String!, $password: String!) {
    register(options: { email: $email, username: $username, password: $password }) {
      errors {
        field
        message
      }
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($usernameOrEmail: String!, $password: String!, $role_id: Float) {
    login(usernameOrEmail: $usernameOrEmail, password: $password, role_id: $role_id) {
      errors {
        field
        message
      }
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export const DELETE = gql`
  mutation delete($email: String!) {
    delete(email: $email)
  }
`;

export const UPDATE_ROLE = gql`
  mutation updateRole($id: Float!, $role_id: Float!) {
    updateUser(id: $id, role_id: $role_id) {
      errors {
        field
        message
      }
      user {
        id
        username
        email
        role_id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($id: Float!, $email: String!, $username: String!) {
    updateUser(id: $id, email: $email, username: $username) {
      errors {
        field
        message
      }
      user {
        id
        username
        email
        role_id
      }
    }
  }
`;
