const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ACCOUNT_TYPES":
      return {
        ...state,
        data: payload,
      };
    case "ACCOUNT_DELETE_SUCCESS":
      return {
        ...state,
        res: payload,
      };
    case "ACCOUNT_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
