import { gql } from "graphql-request";

export const PRODUCTS_PAGINATION = gql`
  query ListWearsWithCursor($args: ConnectionArgs!, $site: String!) {
    listWearsWithCursor(args:$args, site: $site) {
      page {
        edges {
          
          cursor
          node{
            _id
            article{
              title
              slug
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasPreviousPage
          hasNextPage
        }
      }
      pageData{
        count
        limit
        offset
      }
    }
  }
`;

export const PRODUCT_BY_SLUG = gql`
  query WearBySlug($slug: String!, $site: String!) {
    wearBySlug(slug: $slug, site: $site) {
			_id
      article{
        title
        mark
        description
        inStock
        price
        discountPrice
        featured{
          name
        }
        specs{
          text
        }
        image{
          imageSrc
        }
        tags{
          text
        }
      }
      routes{
        section{
          name
        }
        category{
          name
        }
        subCategory{
          name
        }
        item{
          name
        }
      }
      site
    }
  }
`;
export const CREATE_PRODUCT = gql`
  mutation CreateWear($input: CreateProductInput!) {
    createWear(input: $input) {
			_id
      article{
        title
        mark
        description
        inStock
        price
        discountPrice
        featured{
          name
          href
        }
      }
      routes{
        section{
          name
        }
        category{
          name
        }
        subCategory{
          name
        }
        item{
          name
        }
      }
      site
    }
  }
`;
export const UPDATE_PRODUCT = gql`
  mutation UpdateWear($_id: ID!, $input: UpdateProductInput!) {
    updateWear(_id: $_id, input: $input) {
			_id
      article{
        title
        mark
        description
        inStock
        price
        discountPrice
        featured{
          name
          href
        }
      }
      routes{
        section{
          name
        }
        category{
          name
        }
        subCategory{
          name
        }
        item{
          name
        }
      }
      site
    }
  }
`;
export const REMOVE_PRODUCT = gql`
  mutation RemoveWear($_id: ID!) {
    removeWear(_id: $_id) }
`;