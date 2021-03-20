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
    default:
      return state;
  }
};
