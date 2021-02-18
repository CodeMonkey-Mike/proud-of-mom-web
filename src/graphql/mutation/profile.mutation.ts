import { gql } from '@apollo/client';

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $address1: String!
    $address2: String!
    $country: String!
    $state_province: String!
    $postal_code: String!
    $gender: String!
    $user_id: Float!
  ) {
    updateProfile(
      options: {
        address1: $address1
        address2: $address2
        country: $country
        state_province: $state_province
        postal_code: $postal_code
        gender: $gender
        user_id: $user_id
      }
    ) {
      errors {
        field
        message
      }
      profile {
        address1
        address2
        country
        state_province
        postal_code
        gender
      }
    }
  }
`;
