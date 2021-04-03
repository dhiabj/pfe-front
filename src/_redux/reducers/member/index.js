const initialState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "MEMBERS_DATA":
      return {
        ...state,
        data: payload,
      };
    case "MEMBER_DELETE_SUCCESS":
      return {
        ...state,
        data: state.data.filter((member) => member.MembershipCode !== payload),
      };
    case "MEMBER_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
