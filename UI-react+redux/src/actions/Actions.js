import { LOGIN_INPUTS, LOGIN_SUCCESS } from "./Types.js";
import { LOGOUT_SUCCESS } from "./Types.js";
import { TASK_DETAILS, TASKADDED_SUCCESS } from "./Types.js";
import { USERS_DATA } from "./Types";
import { ASSIGNEMP_INPUTS, ASSIGN_ACTION } from "./Types";
import { UPDATETASK_INPUTS, START_STARTED } from "./Types";

/*-------------------------------LOGIN-------------------------*/

export const LOGININPUTS = (name, value) => {
  return {
    type: LOGIN_INPUTS,
    payload: { name, value }
  };
};

export const LOGINSUCCESS = message => {
  return {
    type: LOGIN_SUCCESS,
    payload: message
  };
};

/*-------------------------------LOGOUT-------------------------*/

export const LOGOUTSUCCESS = message => {
  return {
    type: LOGOUT_SUCCESS,
    payload: message
  };
};
/*----------------------------------------------------------------------MANAGER-------------------------------------------------------------*/

/*-------------------------------TASK DETAILS-------------------------*/

export const TASKDETAILS = results => {
  return {
    type: TASK_DETAILS,
    payload: results
  };
};

/*-------------------------------TASKADDEDSUCCESS-------------------------*/

export const TASKADDEDSUCCESS = message => {
  return {
    type: TASKADDED_SUCCESS,
    payload: message
  };
};

/*-------------------------------USERSDATA-------------------------*/

export const USERSDATA = results => {
  return {
    type: USERS_DATA,
    payload: results
  };
};

/*-------------------------------ASSIGNACTION-------------------------*/

export const ASSIGNACTION = message => {
  return {
    type: ASSIGN_ACTION,
    payload: message
  };
};

/*-------------------------------ASSIGNEMPINPUTS-------------------------*/

export const ASSIGNEMPINPUTS = (name, value) => {
  return {
    type: ASSIGNEMP_INPUTS,
    payload: { name, value }
  };
};

/*-------------------------------UPDATETASKINPUTS-------------------------*/

export const UPDATETASKINPUTS = (name, value) => {
  return {
    type: UPDATETASK_INPUTS,
    payload: { name, value }
  };
};

/*----------------------------------------------------------------------EMPLOYEE-------------------------------------------------------------*/

export const STARTSTARTED = (message) => {
  return {
    type: START_STARTED,
    payload: message
  };
};