const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "MEMBER_TYPES":
      return {
        ...state,
        data: payload,
      };
    case "MEMBER_TYPE_DELETE_SUCCESS":
      return {
        ...state,
        data: state.data.filter((membertype) => membertype.id !== payload),
      };
    case "MEMBER_TYPE_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "MEMBER_TYPE_ADD_SUCCESS":
      return {
        ...state,
        addRes: payload,
      };
    case "MEMBER_TYPE_ADD_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "MEMBER_TYPE_EDIT_SUCCESS":
      return {
        ...state,
        editRes: payload,
      };
    case "MEMBER_TYPE_EDIT_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
