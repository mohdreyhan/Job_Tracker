var express = require("express");
var app = express();

const bodyParser = require("body-parser");
const mysql = require("mysql");

const cors = require("cors");
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "volume_tracker"
});

app.use(function(req, res, next) {
  var _send = res.send;
  var sent = false;
  res.send = function(data) {
    if (sent) return;
    _send.bind(res)(data);
    sent = true;
  };
  next();
});

app.post("/login", function(req, res) {
  const loginInputs = req.body;
  var role;
  var actualEmail;
  var emp_id;
  var name;
  connection.query(
    "select emp_email, emp_id,role,emp_name from users where emp_email = ? and emp_password = ?",
    [loginInputs.email, loginInputs.password],
    function(error, results, next) {
      if (results.length !== 0) {
        actualEmail = results[0].emp_email;
        role = results[0].role;
        emp_id = results[0].emp_id;
        name = results[0].emp_name;
        if (loginInputs.email === actualEmail) {
          let token;
          connection.query(
            "select token from users where emp_email = ?",
            [loginInputs.email],
            function(error, results, next) {
              token = results;
            }
          );
          if (token === undefined) {
            token = new Date().getTime() + 557000;
            connection.query(
              "update users set token = ? where emp_email = ?",
              [token, loginInputs.email],
              function(error, results, next) {}
            );
          } else if (token < new Date().getTime()) {
            res.send({
              status: 401,
              message: "Session expired"
            });
          }
          res.send({
            status: 200,
            message: "Login successfully",
            email: actualEmail,
            token: token,
            role: role,
            emp_id: emp_id,
            name: name
          });
        } else {
          res.send({
            status: 400,
            message: "Incorrect Password entered"
          });
        }
      } else {
        res.send({
          status: 400,
          message: "Incorrect Details"
        });
      }
    }
  );
});

app.post("/logout", function(req, res) {
  const email = req.body.email;
  connection.query(
    "SELECT emp_email from users WHERE emp_email = ? ",
    [email],
    function(error, results, next) {
      if (results.length !== 0) {
        const email = results[0].emp_email;
        if (email !== undefined) {
          connection.query(
            "update users set token = ? where emp_email = ?",
            [null, email],
            function(error, results, next) {
              if (error) {
                res.send({
                  status: 400,
                  message: "Incorrect Details"
                });
              } else {
                res.send({
                  status: 200,
                  message: "Logged out successfully"
                });
              }
            }
          );
        }
      }
    }
  );
});

app.post("/inserttask", function(req, res) {
  const task_data = req.body.task_data;
  var b = JSON.parse(task_data);
  b.map((data, index) => {
    connection.query(
      "insert into tasks(task_name,priority,due_date,status) values ?",
      [[[data.Task, data.Priority, data.Due_Date, data.Status]]],
      function(error, results) {
        if (results !== undefined) {
          res.send({
            status: 200,
            message: "Tasks added successfully"
          });
        }
      }
    );
  });
});

app.get("/fetchtaskdetails", function(req, res) {
  connection.query("select * from tasks", function(error, results, next) {
    if (results !== undefined) {
      res.send({
        status: 200,
        results: results
      });
    }
  });
});

app.post("/fetchtaskdetailsemp", function(req, res) {
  let emp_id = req.body.emp_id;
  connection.query(
    "select * from ticket_details where emp_id = ?",
    [emp_id],
    function(error, results, next) {
      if (results !== undefined) {
        res.send({
          status: 200,
          results: results
        });
      }
    }
  );
});

app.get("/fetchusers", function(req, res) {
  connection.query("select * from users", function(error, results, next) {
    if (results !== undefined) {
      res.send({
        status: 200,
        results: results
      });
    }
  });
});

app.post("/assignemp", function(req, res) {
  let task_id = req.body.task_id;
  let task_name = req.body.task_name;
  let assignempInputs = req.body.assignemp_Inputs;
  let records = [
    [
      task_id,
      task_name,
      assignempInputs.select_employee,
      assignempInputs.review_date,
      "Pending"
    ]
  ];
  connection.query(
    "insert into ticket_details(task_id,task_name,emp_id,review_date,status) values ?",
    [records],
    function(error, results, next) {
      if (results !== undefined) {
        connection.query(
          "update tasks set status = ?,assigned_to = ? where task_id = ?",
          ["Assigned", assignempInputs.select_employee, task_id],
          function(error, results, next) {
            if (results !== undefined) {
              res.send({
                status: 200,
                message: "assigned Successfully"
              });
            }
          }
        );
      }
    }
  );
});

app.post("/updatetask", function(req, res) {
  const updatetask_Inputs = req.body.updatetask_Inputs;
  const task_id = req.body.task_id;
  var db_task_name,
    db_priority,
    db_due_date,
    db_status,
    db_time_allocated,
    db_assigned_to;
  connection.query("select * from tasks", function(error, results, next) {
    if (results.length !== 0) {
      (db_task_name =
        updatetask_Inputs.task_name === undefined ||
        updatetask_Inputs.task_name === ""
          ? results[0].task_name
          : updatetask_Inputs.task_name),
        (db_priority =
          updatetask_Inputs.priority === undefined ||
          updatetask_Inputs.priority === ""
            ? results[0].priority
            : updatetask_Inputs.priority),
        (db_due_date =
          updatetask_Inputs.due_date === undefined ||
          updatetask_Inputs.due_date === ""
            ? results[0].due_date
            : updatetask_Inputs.due_date),
        (db_status =
          updatetask_Inputs.status === undefined ||
          updatetask_Inputs.status === ""
            ? results[0].status
            : updatetask_Inputs.status),
        (db_time_allocated =
          updatetask_Inputs.time_allocated === undefined ||
          updatetask_Inputs.time_allocated === ""
            ? results[0].time_allocated
            : updatetask_Inputs.time_allocated),
        (db_assigned_to =
          updatetask_Inputs.assigned_to === undefined ||
          updatetask_Inputs.assigned_to === ""
            ? results[0].assigned_to
            : updatetask_Inputs.assigned_to);
    }
    connection.query(
      "UPDATE tasks SET  task_name = ? , priority = ? , due_date = ? , status = ? , time_allocated = ? , assigned_to = ?  where task_id = ?",
      [
        db_task_name,
        db_priority,
        db_due_date,
        db_status,
        db_time_allocated,
        db_assigned_to,
        task_id
      ],
      function(error, results, next) {
        if (error) {
          res.send({
            status: 400,
            message: "Incorrect data"
          });
        } else {
          res.send({
            status: 200,
            message: "Cab data updated successfully"
          });
        }
      }
    );
  });
});

app.post("/starttask", function(req, res) {
  console.log("hit");
  let task_id = req.body.task_id;
  console.log(task_id);
  connection.query(
    "update tasks set status = ?, start_time = ? where task_id =?",
    ["In Progress", 1, task_id],
    function(error, results, next) {
      if (results !== undefined) {
        connection.query(
          "select start_time from tasks where task_id = ?",
          [task_id],
          function(error, results, next) {
            res.send({
              status: 200,
              results: results
            });
          }
        );
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Go to http://localhost:3000/posts to see posts");
});
