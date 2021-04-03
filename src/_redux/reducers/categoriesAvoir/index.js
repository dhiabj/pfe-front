const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CATEGORIES_AVOIR":
      return {
        ...state,
        data: payload,
      };
    case "CATEGORY_DELETE_SUCCESS":
      return {
        ...state,
        data: state.data.filter(
          (category) => category.CategoryCode !== payload
        ),
      };
    case "CATEGORY_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
