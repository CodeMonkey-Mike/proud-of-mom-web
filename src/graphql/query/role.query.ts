import { gql } from '@apollo/client';

export const ROLE_LIST = gql`
  query roleList {
    roleList {
      id
      name
    }
  }
`;
