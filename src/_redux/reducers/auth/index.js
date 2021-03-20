const initialState = { logged: false, isVerified: false };

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: payload,
        logged: true,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "LOGIN_USER":
      return {
        ...state,
        isVerified: true,
        logged: true,
        currentUser: payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        logged: false,
        currentUser: {},
      };
    case "LOGIN_USER_FAILED":
      return {
        ...state,
        isVerified: true,
      };
    default:
      return state;
  }
};

// {logged : fasle}
// ...state = {logged : fasle  , token : fdsfjsdk , logged : true }
// {logged : fasle  , token : fdsfjsdk , logged : false , currentUser }
