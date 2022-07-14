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
export const ADD_SECTION_1 = gql`
  mutation AddSection1($_id:ID!, $input: AddSectionInput1!) {
    addSection1(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const UPDATE_SECTION_1 = gql`
  mutation UpdateSection1($_id:ID!, $input: UpdateSectionInput1!) {
    updateSection1(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_SECTION_1 = gql`
  mutation DeleteSection1($_id: ID!, $input: DeleteSectionInput1!) {
    deleteSection1(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const ADD_SECTION_2 = gql`
  mutation AddSection2($_id:ID!, $input: AddSectionInput2!) {
    addSection2(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const UPDATE_SECTION_2 = gql`
  mutation UpdateSection2($_id:ID!, $input: UpdateSectionInput2!) {
    updateSection2(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_SECTION_2 = gql`
  mutation DeleteSection2($_id: ID!, $input: DeleteSectionInput2!) {
    deleteSection2(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const ADD_SECTION_3 = gql`
  mutation AddSection3($_id:ID!, $input: AddSectionInput3!) {
    addSection3(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const UPDATE_SECTION_3 = gql`
  mutation UpdateSection3($_id:ID!, $input: UpdateSectionInput3!) {
    updateSection3(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_SECTION_3 = gql`
  mutation DeleteSection3($_id: ID!, $input: DeleteSectionInput3!) {
    deleteSection3(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const ADD_SECTION_4 = gql`
  mutation AddSection4($_id:ID!, $input: AddSectionInput4!) {
    addSection4(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const UPDATE_SECTION_4 = gql`
  mutation UpdateSection4($_id:ID!, $input: UpdateSectionInput4!) {
    updateSection4(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_SECTION_4 = gql`
  mutation DeleteSection4($_id: ID!, $input: DeleteSectionInput4!) {
    deleteSection4(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const ADD_SECTION_5 = gql`
  mutation AddSection5($_id:ID!, $input: AddSectionInput5!) {
    addSection5(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const UPDATE_SECTION_5 = gql`
  mutation UpdateSection5($_id:ID!, $input: UpdateSectionInput5!) {
    updateSection5(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_SECTION_5 = gql`
  mutation DeleteSection5($_id: ID!, $input: DeleteSectionInput5!) {
    deleteSection5(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;