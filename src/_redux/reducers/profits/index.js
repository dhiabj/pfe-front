const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "PROFITS_DATA":
      return {
        ...state,
        data: payload,
      };
    case "PROFIT_ADD_SUCCESS":
      return {
        ...state,
        addRes: payload,
      };
    case "PROFIT_ADD_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "PROFIT_EDIT_SUCCESS":
      return {
        ...state,
        editRes: payload,
      };
    case "PROFIT_EDIT_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "PROFIT_DELETE_SUCCESS":
      return {
        ...state,
        data: state.data.filter((profit) => profit.id !== payload),
      };
    case "PROFIT_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
