const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CATEGORIES_AVOIR":
      return {
        ...state,
        data: payload,
      };
    case "CATEGORY_ADD_SUCCESS":
      return {
        ...state,
        addRes: payload,
      };
    case "CATEGORY_ADD_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "CATEGORY_EDIT_SUCCESS":
      return {
        ...state,
        editRes: payload,
      };
    case "CATEGORY_EDIT_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "CATEGORY_DELETE_SUCCESS":
      return {
        ...state,
        data: state.data.filter((category) => category.id !== payload),
      };
    case "CATEGORY_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
