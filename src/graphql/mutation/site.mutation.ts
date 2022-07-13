import {  gql } from 'graphql-request'

export const CREATE_SITE = gql`
  mutation CreateSite($input: CreateSiteInput!) {
    createSite(input: $input) {
			data{
      title
      domain
      }
    }
  }
`;
export const UPDATE_SITE = gql`
  mutation UpdateSite($_id:ID!, $input: UpdateSiteInput!) {
    updateSite(_id:$_id, input: $input) {
			data{
      title
      domain
      }
    }
  }
`;
export const REMOVE_SITE = gql`
  mutation RemoveSite($_id: ID!) {
    removeSite(_id: $_id)
  }
`;
export const ADD_SECTION_0 = gql`
  mutation AddSection0($_id:ID!, $input: AddSectionInput0!) {
    addSection0(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const UPDATE_SECTION_0 = gql`
  mutation UpdateSection0($_id:ID!, $input: UpdateSectionInput0!) {
    updateSection0(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_SECTION_0 = gql`
  mutation DeleteSection0($_id: ID!, $input: DeleteSectionInput0!) {
    deleteSection0(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;