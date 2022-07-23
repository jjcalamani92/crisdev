import { gql } from "graphql-request";

export const SITES = gql`
  query SitesAll {
    sitesAll {
      _id
      client
      type
      data {
        title
        icon
        logo
        imageSrc
        imageAlt
        numberPhone
        address
        location
        description
      }
    }
  }
`;
export const SITES_ID = gql`
  query SitesAll {
    sitesAll {
      _id
    }
  }
`;
export const SITE_ROUTE = gql`
  query Site($_id: ID!) {
    site(_id: $_id) {
      route {
        uid
        name
        description
        href
        imageSrc
        imageAlt
        

        children {
          uid
          name
          description
          href
          imageSrc
          imageAlt
          
          children {
            uid
            name
            description
            href
            imageSrc
            imageAlt
            
            children {
              uid
              name
              description
              href
              imageSrc
              imageAlt
              
              children {
                uid
                name
                description
                href
                imageSrc
                imageAlt
                
                children {
                  uid
                  name
                  description
                  href
                  imageSrc
                  imageAlt
                  
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const SITE_PATHS_TREE = gql`
  query Site($_id: ID!) {
    site(_id: $_id) {
      route {
        name
        href
        children {
          name
          href
          children {
            name
            href
            children {
              name
              href
            }
          }
        }
      }
    }
  }
`;

export const SITE_ROUTE_PRODUCT = gql`
  query Site($_id: ID!) {
    site(_id: $_id) {
      route {
        name
        href
        children {
          name
          href
          children {
            name
            href
            children {
              name
              href
              children {
                name
                href
                children {
                  name
                  href
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const SITE = gql`
  query Site($_id: ID!) {
    site(_id: $_id) {
      _id
      client
      type
      data {
        title
        logo
        icon
        imageSrc
        imageAlt
        numberPhone
        address
        location
        description
      }
    }
  }
`;
