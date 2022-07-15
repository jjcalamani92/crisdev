import { gql } from "graphql-request";

export const SITES = gql`
  query SitesAll {
    sitesAll {
      _id
      client
      type
      data {
        title
        domain
        icon
        logo
        imageSrc
        imageAlt
        numberPhone
        address
        location
        description
      }
      routes {
        section_level_0 {
          id
          name
          href
          description
          imageAlt
          imageSrc
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
        domain
        logo
        icon
        imageSrc
        imageAlt
        numberPhone
        address
        location
        description
      }
      routes {
        section_level_0 {
          id
          name
          href
          description
          imageAlt
          imageSrc
          featured {
            id
            name
            href
            description
            imageSrc
            imageAlt
          }
          items {
            id
            name
            href
            description
            imageSrc
            imageAlt
          }
          section_level_1 {
            id
            name
            href
            description
            imageAlt
            imageSrc
            featured {
              id
              name
              href
              description
              imageSrc
              imageAlt
            }
            items {
              id
              name
              href
              description
              imageSrc
              imageAlt
            }
            section_level_2 {
              id
              name
              href
              description
              imageAlt
              imageSrc
              featured {
                id
                name
                href
                description
                imageSrc
                imageAlt
              }
              items {
                id
                name
                href
                description
                imageSrc
                imageAlt
              }
              section_level_3 {
                id
                name
                href
                description
                imageAlt
                imageSrc
                featured {
                  id
                  name
                  href
                  description
                  imageSrc
                  imageAlt
                }
                items {
                  id
                  name
                  href
                  description
                  imageSrc
                  imageAlt
                }
                section_level_4 {
                  id
                  name
                  href
                  description
                  imageAlt
                  imageSrc
                  featured {
                    id
                    name
                    href
                    description
                    imageSrc
                    imageAlt
                  }
                  items {
                    id
                    name
                    href
                    description
                    imageSrc
                    imageAlt
                  }
                  section_level_5 {
                    id
                    name
                    href
                    description
                    imageAlt
                    imageSrc
                    featured {
                      id
                      name
                      href
                      description
                      imageSrc
                      imageAlt
                    }
                    items {
                      id
                      name
                      href
                      description
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
    }
  }
`;
