import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation create($name: String!) {
    create(name: $name) {
      errors {
        field
        message
      }
      role {
        id
        name
      }
    }
  }
`;

export const DELETE = gql`
  mutation delete($id: String!) {
    delete(id: $id)
  }
`;

export const UPDATE_ROLE = gql`
  mutation updateRole($id: Float!, $name: String!) {
    updateRole(id: $id, name: $name) {
      errors {
        field
        message
      }
      role {
        id
        name
      }
    }
  }
`;
