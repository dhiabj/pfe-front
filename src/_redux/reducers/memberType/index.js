const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "MEMBER_TYPES":
      return {
        ...state,
        data: payload,
      };
    case "MEMBER_TYPE_DELETE_SUCCESS":
      return {
        ...state,
        data: state.data.filter(
          (membertype) => membertype.MemberTypeCode !== payload
        ),
      };
    case "MEMBER_TYPE_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
