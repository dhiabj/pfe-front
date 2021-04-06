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
        data: state.data.filter((operation) => operation.id !== payload),
      };
    case "OPERATION_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "OPERATION_ADD_SUCCESS":
      return {
        ...state,
        addRes: payload,
      };
    case "OPERATION_ADD_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "OPERATION_EDIT_SUCCESS":
      return {
        ...state,
        editRes: payload,
      };
    case "OPERATION_EDIT_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
