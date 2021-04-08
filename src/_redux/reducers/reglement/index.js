const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "REGLEMENTS_DATA":
      return {
        ...state,
        data: payload,
      };
    case "REGLEMENT_ADD_SUCCESS":
      return {
        ...state,
        addRes: payload,
      };
    case "REGLEMENT_ADD_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "REGLEMENT_EDIT_SUCCESS":
      return {
        ...state,
        editRes: payload,
      };
    case "REGLEMENT_EDIT_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "REGLEMENT_DELETE_SUCCESS":
      return {
        ...state,
        data: state.data.filter((reglement) => reglement.id !== payload),
      };
    case "REGLEMENT_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
