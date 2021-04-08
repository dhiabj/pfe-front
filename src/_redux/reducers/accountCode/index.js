const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  //console.log(action);
  switch (type) {
    case "ACCOUNT_CODES":
      return {
        ...state,
        data: payload,
      };
    case "ACCOUNT_CODE_ADD_SUCCESS":
      return {
        ...state,
        addRes: payload,
      };
    case "ACCOUNT_CODE_ADD_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "ACCOUNT_CODE_EDIT_SUCCESS":
      return {
        ...state,
        editRes: payload,
      };
    case "ACCOUNT_CODE_EDIT_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "ACCOUNT_CODE_DELETE_SUCCESS":
      return {
        ...state,
        data: state.data.filter((account) => account.id !== payload),
      };
    case "ACCOUNT_CODE_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
