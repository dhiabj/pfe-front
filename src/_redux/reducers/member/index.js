const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "MEMBERS_DATA":
      return {
        ...state,
        data: payload,
      };
    case "MEMBER_DELETE_SUCCESS":
      return {
        ...state,
        data: state.data.filter((member) => member.id !== payload),
      };
    case "MEMBER_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "MEMBER_ADD_SUCCESS":
      return {
        ...state,
        addRes: payload,
      };
    case "MEMBER_ADD_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "MEMBER_EDIT_SUCCESS":
      return {
        ...state,
        editRes: payload,
      };
    case "MEMBER_EDIT_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
