import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation {
    register($options: UsernamePasswordInput) {
      errors {
        field,
        message
      }
      user {
        id.
        username,
        email
      }
    }
  }
`;
