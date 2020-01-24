import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { ASSIGNEMP } from "../../../actions/ActionCreators";
import { ASSIGNEMPINPUTS } from "../../../actions/Actions";

class TaskDetails extends Component {
  render() {
    return (
      <div>
        <Table hover striped responsive style={{ marginTop: 10 }}>
          <TableHeader />
          <TableBody taskDetails={this.props.taskDetails} />
        </Table>
      </div>
    );
  }
}

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Task ID</th>
        <th>Task Name</th>
        <th>Priority</th>
        <th>Due Date</th>
        <th>Status</th>
        <th>Assigned To</th>
      </tr>
    </thead>
  );
};

const TableBody = props => {
  const rows = props.taskDetails.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.task_id}</td>
        <td>{row.task_name}</td>
        <td>{row.priority}</td>
        <td>{row.due_date}</td>
        <td>{row.status !== null ? row.status : "Not Assigned"}</td>
        <td>{row.assigned_to !== null ? row.assigned_to : "None"}</td>
      </tr>
    );
  });
  return <tbody>{rows}</tbody>;
};

function mapStateToProps(state) {
  return {
    taskDetails: state.ManagerReducer.taskDetails,
    usersDetails: state.EmployeeReducer.usersDetails,
    assignsuccess: state.ManagerReducer.assignsuccess,
    assignemp_Inputs: state.ManagerReducer.assignemp_Inputs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ASSIGNEMPINPUTS: event => {
      let name = event.target.name;
      let value = event.target.value;
      dispatch(ASSIGNEMPINPUTS(name, value));
    },
    ASSIGNEMP: (assignemp_Inputs, event, form, task_id) => {
      dispatch(ASSIGNEMP(assignemp_Inputs, event, form, task_id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);
