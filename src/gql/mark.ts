import { gql } from "graphql-request";


export const MARKS = gql`
	query MarkAll($site: String!) {
		markAll(site: $site) {
			_id
			name
			imageSrc
			imageAlt
      href
			description
		}
	}
`;

export const MARK_BY_HREF = gql`
	query MarksByHref($href: String!, $site: String!) {
		marksByHref(href: $href, site: $site) {
			_id
			name
			imageSrc
			imageAlt
      href
			description
		}
	}
`;