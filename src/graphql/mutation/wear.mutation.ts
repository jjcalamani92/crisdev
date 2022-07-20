import { gql } from "graphql-request";

export const CREATE_PRODUCT = gql`
  mutation CreateWear($input: CreateProductInput!) {
    createWear(input: $input) {
      _id
      article {
        title
        mark
        description
        inStock
        price
        discountPrice
        featured {
          name
          href
        }
      }
      site
    }
  }
`;
export const UPDATE_PRODUCT = gql`
  mutation UpdateWear($_id: ID!, $input: UpdateProductInput!) {
    updateWear(_id: $_id, input: $input) {
      article {
        title
        mark
        description
        inStock
        price
        discountPrice
        featured {
          name
          href
        }
      }
    }
  }
`;
export const REMOVE_PRODUCT = gql`
  mutation RemoveWear($_id: ID!) {
    removeWear(_id: $_id)
  }
`;
