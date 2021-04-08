const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "MARKET_DATA":
      return {
        ...state,
        data: payload,
      };
    case "MARKET_ADD_SUCCESS":
      return {
        ...state,
        addRes: payload,
      };
    case "MARKET_ADD_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "MARKET_EDIT_SUCCESS":
      return {
        ...state,
        editRes: payload,
      };
    case "MARKET_EDIT_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "MARKET_DELETE_SUCCESS":
      return {
        ...state,
        data: state.data.filter((market) => market.id !== payload),
      };
    case "MARKET_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
