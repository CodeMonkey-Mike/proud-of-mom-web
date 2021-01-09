import { gql } from '@apollo/client';

export const COUNTRY_LIST = gql`
  query countries {
    countries {
      id
      code
      name
    }
  }
`;
