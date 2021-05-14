import { gql } from "@apollo/client";


export const LOGIN_QUERY = gql`
mutation login($input: authenticateInput) {
  authenticate(input: $input) {
    token
    user {
      phone
      email
      name
      id
    }
  }
}
`

export const REGISTER_QUERY = gql`
mutation register($input: registerInput) {
  register(input: $input) {
    token
    user {
      phone
      email
      name
      id
    }
  }
}
`