import {  gql } from 'graphql-request'

export const SITES = gql`
	query SitesAll{
		sitesAll {
			_id
      client
			type
			data {
        title
        domain
        logo
        imageSrc
        imageAlt
        numberPhone
        address
        location
        description
      }
      routes {
        section_level_0{
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
	query Site($_id: ID!){
		site(_id: $_id) {
			_id
      client
			type
			data {
        title
        domain
        logo
        imageSrc
        imageAlt
        numberPhone
        address
        location
        description
      }
      routes {
        section_level_0{
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