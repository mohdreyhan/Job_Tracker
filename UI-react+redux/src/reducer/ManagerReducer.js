import {
  TASK_DETAILS,
  TASKADDED_SUCCESS,
  ASSIGN_ACTION,
  ASSIGNEMP_INPUTS,
  UPDATETASK_INPUTS
} from "../actions/Types";

const initialState = {
  taskaddedsuccessmsg: "",
  taskDetails: [],
  assignemp_Inputs: [],
  assignsuccess: "",
  updatetask_Inputs : []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKADDED_SUCCESS:
      return Object.assign({}, state, {
        taskaddedsuccessmsg: action.payload
      });
    case TASK_DETAILS:
      return Object.assign({}, state, {
        taskDetails: action.payload
      });
    case ASSIGNEMP_INPUTS:
      const name = action.payload.name;
      const value = action.payload.value;
      return {
        ...state,
        assignemp_Inputs: {
          ...state.assignemp_Inputs,
          [name]: value
        }
      };
      case UPDATETASK_INPUTS:
      return {
        ...state,
        updatetask_Inputs: {
          ...state.updatetask_Inputs,
          [action.payload.name]: action.payload.value
        }
      };
    case ASSIGN_ACTION:
      return Object.assign({}, state, {
        assignsuccess: action.payload
      });
    default:
      return state;
  }
};

export default reducer;
