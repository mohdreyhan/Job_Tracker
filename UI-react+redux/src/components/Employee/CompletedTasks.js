import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Container } from "react-bootstrap";

class CompletedTasks extends Component {
  render() {
    return (
      <Table hover striped responsive style={{ marginTop: 10 }}>
        <TableHeader />
        <TableBody taskDetails={this.props.taskDetails} />
      </Table>
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
        <th>Allocated Time</th>
        <th>Assigned To</th>
      </tr>
    </thead>
  );
};

const TableBody = props => {
  const filteredDetails = props.taskDetails.filter(
    row => row.status === "Completed"
  );
  const rows = filteredDetails.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.task_id}</td>
        <td>{row.task_name}</td>
        <td>{row.priority}</td>
        <td>{row.due_date}</td>
        <td>{row.status}</td>
        <td>{row.time_allocated !== null ? row.time_allocated : "00:00"}</td>
        <td>{row.assigned_to !== null ? row.assigned_to : "None"}</td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

function mapStateToProps(state) {
  return {
    taskDetails: state.ManagerReducer.taskDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedTasks);
