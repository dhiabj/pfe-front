const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "STOCKS_DATA":
      return {
        ...state,
        data: payload,
      };
    case "STOCK_UPLOADS":
      return {
        ...state,
        uploads: payload,
      };
    case "STOCK_DELETE_SUCCESS":
      return {
        ...state,
        res: payload,
      };
    case "STOCK_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
