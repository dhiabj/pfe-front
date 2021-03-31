const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "MOUVEMENTS_DATA":
      return {
        ...state,
        data: payload,
      };
    case "MOUVEMENT_UPLOADS":
      return {
        ...state,
        uploads: payload,
      };
    case "MOUVEMENT_DELETE_SUCCESS":
      return {
        ...state,
        res: payload,
      };
    case "MOUVEMENT_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
