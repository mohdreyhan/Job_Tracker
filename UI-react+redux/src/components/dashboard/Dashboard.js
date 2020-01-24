import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import TaskTabs from "../manager/showtasks/TaskTabs";
import EmpTaskTabs from "../Employee/EmpTaskTabs";

class Dashboard extends Component {
  render() {
    return (
      <Container>
        {(() => {
          if (localStorage.getItem("role") === "employee/manager") {
            return <TaskTabs />;
          } else if (localStorage.getItem("role") === "employee") {
            return <EmpTaskTabs />;
          }
        })()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
