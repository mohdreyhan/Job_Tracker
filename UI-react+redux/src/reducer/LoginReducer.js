import { LOGIN_INPUTS, LOGOUT_SUCCESS, LOGIN_SUCCESS } from "../actions/Types";

const initialState = {
  loginInputs: [],
  loginerrormsg: "",
  loggedoutmsg: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_INPUTS:
      const name = action.payload.name;
      const value = action.payload.value;
      return {
        ...state,
        loginInputs: {
          ...state.loginInputs,
          [name]: value
        }
      };
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loginerrormsg: action.payload
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        loggedoutmsg: action.payload
      });

    default:
      return state;
  }
};

export default reducer;
