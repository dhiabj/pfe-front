const initialState = { showStocks: false };
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
        uploads: state.uploads.filter((stock) => stock.id !== payload),
      };
    case "STOCK_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "SHOW_STOCK_TABLES":
      return {
        ...state,
        showStocks: true,
      };
    case "HIDE_STOCK_TABLES":
      return {
        ...state,
        showStocks: false,
      };
    case "SELECT_TOTAL_STOCKS":
      return {
        ...state,
        totalStocks: payload,
      };
    default:
      return state;
  }
};
