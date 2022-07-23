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

export const ADD_CHILDREN_0 = gql`
  mutation AddChildren0($_id:ID!, $input: AddChildren!) {
    addChildren0(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const ADD_CHILDREN_1 = gql`
  mutation AddChildren1($_id:ID!, $input: AddChildren!) {
    addChildren1(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const ADD_CHILDREN_2 = gql`
  mutation AddChildren2($_id:ID!, $input: AddChildren!) {
    addChildren2(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const ADD_CHILDREN_3 = gql`
  mutation AddChildren3($_id:ID!, $input: AddChildren!) {
    addChildren3(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const ADD_CHILDREN_4 = gql`
  mutation AddChildren4($_id:ID!, $input: AddChildren!) {
    addChildren4(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const ADD_CHILDREN_5 = gql`
  mutation AddChildren5($_id:ID!, $input: AddChildren!) {
    addChildren5(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const UPDATE_CHILDREN_0 = gql`
  mutation UpdateChildren0($_id:ID!, $input: UpdateChildren!) {
    updateChildren0(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const UPDATE_CHILDREN_1 = gql`
  mutation UpdateChildren1($_id:ID!, $input: UpdateChildren!) {
    updateChildren1(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const UPDATE_CHILDREN_2 = gql`
  mutation UpdateChildren2($_id:ID!, $input: UpdateChildren!) {
    updateChildren2(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const UPDATE_CHILDREN_3 = gql`
  mutation UpdateChildren3($_id:ID!, $input: UpdateChildren!) {
    updateChildren3(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const UPDATE_CHILDREN_4 = gql`
  mutation UpdateChildren4($_id:ID!, $input: UpdateChildren!) {
    updateChildren4(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const UPDATE_CHILDREN_5 = gql`
  mutation UpdateChildren5($_id:ID!, $input: UpdateChildren!) {
    updateChildren5(_id:$_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_CHILDREN_0 = gql`
  mutation DeleteChildren0($_id: ID!, $input: DeleteChildren!) {
    deleteChildren0(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_CHILDREN_1 = gql`
  mutation DeleteChildren1($_id: ID!, $input: DeleteChildren!) {
    deleteChildren1(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_CHILDREN_2 = gql`
  mutation DeleteChildren2($_id: ID!, $input: DeleteChildren!) {
    deleteChildren2(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_CHILDREN_3 = gql`
  mutation DeleteChildren3($_id: ID!, $input: DeleteChildren!) {
    deleteChildren3(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_CHILDREN_4 = gql`
  mutation DeleteChildren4($_id: ID!, $input: DeleteChildren!) {
    deleteChildren4(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_CHILDREN_5 = gql`
  mutation DeleteChildren5($_id: ID!, $input: DeleteChildren!) {
    deleteChildren5(_id: $_id, input: $input) {
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
export const ADD_SECTION_2 = gql`
  mutation AddSection2($_id:ID!, $input: AddSectionInput2!) {
    addSection2(_id:$_id, input: $input) {
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
export const ADD_SECTION_4 = gql`
  mutation AddSection4($_id:ID!, $input: AddSectionInput4!) {
    addSection4(_id:$_id, input: $input) {
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

export const UPDATE_SECTION_1 = gql`
  mutation UpdateSection1($_id:ID!, $input: UpdateSectionInput1!) {
    updateSection1(_id:$_id, input: $input) {
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

export const UPDATE_SECTION_3 = gql`
  mutation UpdateSection3($_id:ID!, $input: UpdateSectionInput3!) {
    updateSection3(_id:$_id, input: $input) {
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
export const UPDATE_SECTION_5 = gql`
  mutation UpdateSection5($_id:ID!, $input: UpdateSectionInput5!) {
    updateSection5(_id:$_id, input: $input) {
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
export const DELETE_SECTION_2 = gql`
  mutation DeleteSection2($_id: ID!, $input: DeleteSectionInput2!) {
    deleteSection2(_id: $_id, input: $input) {
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


export const DELETE_SECTION_4 = gql`
  mutation DeleteSection4($_id: ID!, $input: DeleteSectionInput4!) {
    deleteSection4(_id: $_id, input: $input) {
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


export const ADD_ITEM_1 = gql`
mutation AddItems1($_id:ID!, $input: AddChildren1!) {
  addItems1(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;
export const ADD_ITEM_2 = gql`
mutation AddItems2($_id:ID!, $input: AddChildren2!) {
  addItems2(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;
export const ADD_ITEM_3 = gql`
mutation AddItems3($_id:ID!, $input: AddChildren3!) {
  addItems3(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;
export const ADD_ITEM_4 = gql`
mutation AddItems4($_id:ID!, $input: AddChildren4!) {
  addItems4(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;
export const ADD_ITEM_5 = gql`
mutation AddItems5($_id:ID!, $input: AddChildren5!) {
  addItems5(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;

export const UPDATE_ITEM_1 = gql`
mutation UpdateItems1($_id:ID!, $input: AddChildren1!) {
  updateItems1(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;

export const UPDATE_ITEM_2 = gql`
mutation UpdateItems2($_id:ID!, $input: AddChildren2!) {
  updateItems2(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;

export const UPDATE_ITEM_3 = gql`
mutation UpdateItems3($_id:ID!, $input: AddChildren3!) {
  updateItems3(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;
export const UPDATE_ITEM_4 = gql`
mutation UpdateItems4($_id:ID!, $input: AddChildren4!) {
  updateItems4(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;
export const UPDATE_ITEM_5 = gql`
mutation UpdateItems5($_id:ID!, $input: AddChildren5!) {
  updateItems5(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;

export const DELETE_ITEM_1 = gql`
  mutation DeleteItems1($_id: ID!, $input: DeleteChildrenInput1!) {
    deleteItems1(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_ITEM_2 = gql`
  mutation DeleteItems2($_id: ID!, $input: DeleteChildrenInput2!) {
    deleteItems2(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_ITEM_3 = gql`
  mutation DeleteItems3($_id: ID!, $input: DeleteChildrenInput3!) {
    deleteItems3(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_ITEM_4 = gql`
  mutation DeleteItems4($_id: ID!, $input: DeleteChildrenInput4!) {
    deleteItems4(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_ITEM_5 = gql`
  mutation DeleteItems5($_id: ID!, $input: DeleteChildrenInput5!) {
    deleteItems5(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const ADD_FEATURED_1 = gql`
mutation AddFeatured1($_id:ID!, $input: AddChildren1!) {
  addFeatured1(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;
export const ADD_FEATURED_2 = gql`
mutation AddFeatured2($_id:ID!, $input: AddChildren2!) {
  addFeatured2(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;
export const ADD_FEATURED_3 = gql`
mutation AddFeatured3($_id:ID!, $input: AddChildren3!) {
  addFeatured3(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;
export const ADD_FEATURED_4 = gql`
mutation AddFeatured4($_id:ID!, $input: AddChildren4!) {
  addFeatured4(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;
export const ADD_FEATURED_5 = gql`
mutation AddFeatured5($_id:ID!, $input: AddChildren5!) {
  addFeatured5(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;

export const UPDATE_FEATURED_1 = gql`
mutation UpdateFeatured1($_id:ID!, $input: AddChildren1!) {
  updateFeatured1(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;

export const UPDATE_FEATURED_2 = gql`
mutation UpdateFeatured2($_id:ID!, $input: AddChildren2!) {
  updateFeatured2(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;

export const UPDATE_FEATURED_3 = gql`
mutation UpdateFeatured3($_id:ID!, $input: AddChildren3!) {
  updateFeatured3(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;
export const UPDATE_FEATURED_4 = gql`
mutation UpdateFeatured4($_id:ID!, $input: AddChildren4!) {
  updateFeatured4(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;
export const UPDATE_FEATURED_5 = gql`
mutation UpdateFeatured5($_id:ID!, $input: AddChildren5!) {
  updateFeatured5(_id:$_id, input: $input) {
    data{
    title
    }
  }
}
`;

export const DELETE_FEATURED_1 = gql`
  mutation DeleteFeatured1($_id: ID!, $input: DeleteChildrenInput1!) {
    deleteFeatured1(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_FEATURED_2 = gql`
  mutation DeleteFeatured2($_id: ID!, $input: DeleteChildrenInput2!) {
    deleteFeatured2(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_FEATURED_3 = gql`
  mutation DeleteFeatured3($_id: ID!, $input: DeleteChildrenInput3!) {
    deleteFeatured3(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_FEATURED_4 = gql`
  mutation DeleteFeatured4($_id: ID!, $input: DeleteChildrenInput4!) {
    deleteFeatured4(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;
export const DELETE_FEATURED_5 = gql`
  mutation DeleteFeatured5($_id: ID!, $input: DeleteChildrenInput5!) {
    deleteFeatured5(_id: $_id, input: $input) {
			data{
      title
      }
    }
  }
`;