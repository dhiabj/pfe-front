const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "OPERATION_CODES":
      return {
        ...state,
        data: payload,
      };
    case "OPERATION_DELETE_SUCCESS":
      return {
        ...state,
        data: state.data.filter(
          (operation) => operation.OperationCode !== payload
        ),
      };
    case "OPERATION_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
