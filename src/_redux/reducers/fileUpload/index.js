const initialState = { uploadPercentage: 0 };
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOADING_PRGOGRESS":
      return {
        ...state,
        uploadPercentage: payload,
      };
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
    case "INTERM_UPLOAD_SUCCESS":
      return {
        ...state,
        intermResponse: payload,
      };
    case "INTERM_UPLOAD_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "PROGRESS_RESET":
      return {
        ...state,
        uploadPercentage: 0,
      };
    default:
      return state;
  }
};
