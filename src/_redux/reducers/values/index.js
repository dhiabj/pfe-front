const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "VALUES_DATA":
      return {
        ...state,
        data: payload,
      };
    case "VALUE_ADD_SUCCESS":
      return {
        ...state,
        addRes: payload,
      };
    case "VALUE_ADD_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "VALUE_EDIT_SUCCESS":
      return {
        ...state,
        editRes: payload,
      };
    case "VALUE_EDIT_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "VALUE_DELETE_SUCCESS":
      return {
        ...state,
        data: state.data.filter((value) => value.id !== payload),
      };
    case "VALUE_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
