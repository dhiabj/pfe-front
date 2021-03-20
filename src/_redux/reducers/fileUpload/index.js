const initialState = { uploadPercentage: 0 };
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "MOUVEMENT_UPLOAD_SUCCESS":
      return {
        ...state,
        mouvmentResponse: payload,
      };
    case "MOUVEMENT_UPLOAD_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "STOCK_UPLOAD_SUCCESS":
      return {
        ...state,
        stockResponse: payload,
      };
    case "STOCK_UPLOAD_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "LOADING_PRGOGRESS":
      return {
        ...state,
        uploadPercentage: payload,
      };
    default:
      return state;
  }
};
