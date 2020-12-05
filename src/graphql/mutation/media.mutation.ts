import { gql } from '@apollo/client';

export const UPLOAD = gql`
  mutation upload($file: Upload!, $email: String!) {
    upload(file: $file, email: $email)
  }
`;
