import { LOGINSUCCESS, LOGOUTSUCCESS } from "./Actions";
import { TASKDETAILS, TASKADDEDSUCCESS } from "./Actions";
import { USERSDATA } from "./Actions";
import { ASSIGNACTION, STARTSTARTED } from "./Actions";

/*---------------------------LOGIN-------------------------------*/

export const USERLOGIN = (event, form, loginInputs, history) => dispatch => {
  event.preventDefault();
  var role;
  return fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginInputs)
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        if (
          response.role === "admin" ||
          response.role === "employee/manager" ||
          response.role === "employee"
        ) {
          localStorage.setItem("role", response.role);
          role = localStorage.getItem("role");
          localStorage.setItem("email", response.email);
          localStorage.setItem("token", response.token);
          localStorage.setItem("emp_id", response.emp_id);
          localStorage.setItem("name", response.name);
        }

        if (role === "") {
          return history.replace({
            pathname: "/"
          });
        } else if (role === "employee/manager") {
          return history.replace({ pathname: "/dashboard" });
        } else if (role === "employee") {
          return history.replace({
            pathname: "/dashboard"
          });
        } else if (role === "admin") {
          return history.replace({ pathname: "/dashboard" });
        }
      } else if (response.status === 401) {
        dispatch(LOGINSUCCESS(response.message));
        form.reset();
      } else if (response.status === 400) {
        dispatch(LOGINSUCCESS(response.message));
        form.reset();
      } else {
        const message =
          response.message !== undefined
            ? response.message
            : "Unknown error recevied";
        dispatch(LOGINSUCCESS(message));
      }
    });
};

/*---------------------------LOGOUT-------------------------------*/

export const USERLOGOUT = (email, history) => dispatch => {
  return fetch("http://localhost:3000/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email
    })
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        localStorage.clear();
        if (localStorage.length === 0) {
          history.replace("/");
        }
        dispatch(LOGOUTSUCCESS(response.message));
      }
    });
};

/*---------------------------INSERT TASK-------------------------------*/

export const INSERTTASKS = (form, task_data) => dispatch => {
  return fetch("http://localhost:3000/inserttask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      task_data
    })
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        form.reset();
        dispatch(TASKADDEDSUCCESS(response.message));
      }
    });
};

/*---------------------------Task Details-------------------------------*/

export const FETCHTASKDETAILS = emp_id => dispatch => {
  if (emp_id !== undefined) {
    return fetch("http://localhost:3000/fetchtaskdetailsemp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        emp_id: emp_id
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(TASKDETAILS(response.results));
        }
      });
  } else {
    return fetch("http://localhost:3000/fetchtaskdetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          dispatch(TASKDETAILS(response.results));
        }
      });
  }
};

/*---------------------------GET USERS-------------------------------*/

export const FETCHUSERS = () => dispatch => {
  return fetch("http://localhost:3000/fetchusers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        dispatch(USERSDATA(response.results));
      }
    });
};

/*---------------------------ASSIGN EMP-------------------------------*/

export const ASSIGNEMP = (
  assignemp_Inputs,
  event,
  form,
  task_id,
  task_name
) => dispatch => {
  event.preventDefault();
  return fetch("http://localhost:3000/assignemp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ assignemp_Inputs, task_id, task_name })
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        // form.reset();
        window.location.reload();
        dispatch(ASSIGNACTION(response.message));
      }
    });
};

/*---------------------------UPDATETASK-------------------------------*/

export const UPDATETASK = (
  updatetask_Inputs,
  event,
  form,
  task_id
) => dispatch => {
  event.preventDefault();
  return fetch("http://localhost:3000/updatetask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ updatetask_Inputs, task_id })
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        // form.reset();
        window.location.reload();
        // dispatch(ASSIGNACTION(response.message));
      }
    });
};

/*---------------------------STARTTASK-------------------------------*/

export const STARTTASK = task_id => dispatch => {
  return fetch("http://localhost:3000/starttask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ task_id: task_id })
  })
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        dispatch(STARTSTARTED(response.message));
      }
    });
};
