const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "TITLES_DATA":
      return {
        ...state,
        data: payload,
      };
    case "TITLE_ADD_SUCCESS":
      return {
        ...state,
        addRes: payload,
      };
    case "TITLE_ADD_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "TITLE_EDIT_SUCCESS":
      return {
        ...state,
        editRes: payload,
      };
    case "TITLE_EDIT_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "TITLE_DELETE_SUCCESS":
      return {
        ...state,
        data: state.data.filter((title) => title.id !== payload),
      };
    case "TITLE_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
