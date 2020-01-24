import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Container } from "react-bootstrap";
import Timer from "react-compound-timer";
import { STARTTASK } from "../../actions/ActionCreators";

class PendingTasks extends Component {
  cons;
  handleClick = (start, task_id) => {
    start();
    this.props.STARTTASK(task_id);
  };
  render() {
    return (
      <div>
        <Table hover striped responsive style={{ marginTop: 10 }}>
          <TableHeader />
          <TableBody
            taskDetails={this.props.taskDetails}
            handleClick={this.handleClick}
          />
        </Table>
      </div>
    );
  }
}

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Ticket ID</th>
        <th>Task ID</th>
        <th>Task Name</th>
        <th>Review Date</th>
        {/* <th>Status</th>
        <th>Allocated Time</th>
        <th>Assigned To</th> */}
      </tr>
    </thead>
  );
};

const TableBody = props => {
  const filteredDetails = props.taskDetails.filter(
    row => row.status === "Pending" || row.status === "In Progress"
  );
  console.log("fdfsf",props.taskDetails)
  const rows = filteredDetails.map((row, index) => {
    return (
      <tr key={index} onClick = {()=>console.log(index)}>
        <td>{row.ticket_id}</td>
        <td>{row.task_id}</td>
        <td>{row.task_name}</td>
        <td>{row.review_date}</td>
        {/* <td>{row.status}</td>
        <td>{row.time_allocated !== null ? row.time_allocated : "00:00"}</td>
        <td>{row.assigned_to}</td> */}
        {/* <td>
          <Timer
            initialTime={55000}
            startImmediately={false}
            
          >
            {({start, stop, reset, getTime }) => (
              <React.Fragment>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    size="sm"
                    onClick = {()=>props.handleClick(start,row.task_id)}
                  >
                    Start
                  </Button>
                  <Button size="sm" onClick={stop}>
                    Stop
                  </Button>
                  <Button size="sm" onClick={reset}>
                    Reset
                  </Button>
                </div>
                <div>
                  <Timer.Days /> days
                  <Timer.Hours /> hours
                  <Timer.Minutes /> minutes
                  <Timer.Seconds /> seconds
                </div>
                <div>{parseInt(getTime() / 60000)}minutes</div>
              </React.Fragment>
            )}
          </Timer>
        </td> */}
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
  return {
    STARTTASK: task_id => {
      dispatch(STARTTASK(task_id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingTasks);
