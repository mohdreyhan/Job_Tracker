import { USERS_DATA } from "../actions/Types";

const initialState = {
  usersDetails : []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA:
      return Object.assign({}, state, {
        usersDetails: action.payload
      });
    default:
      return state;
  }
};

export default reducer;
