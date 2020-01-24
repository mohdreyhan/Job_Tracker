import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Tab, Container } from "react-bootstrap";
import TaskDetails from "./TaskDetails";
import PendingTasks from "./PendingTasks";
import CompletedTasks from "./CompletedTasks";
import { FETCHTASKDETAILS, FETCHUSERS } from "../../../actions/ActionCreators";

class TaskTabs extends Component {
  componentDidMount() {
    this.props.FETCHTASKDETAILS();
    this.props.FETCHUSERS();
  }
  render() {
    return (
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        style={{ marginTop: 10 }}
      >
        <Tab eventKey="profile" title="Task Details">
          <TaskDetails />
        </Tab>
        <Tab eventKey="home" title="Pending Tasks">
          <PendingTasks />
        </Tab>
        <Tab eventKey="contact" title="Completed Tasks">
          <CompletedTasks />
        </Tab>
      </Tabs>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    FETCHTASKDETAILS: () => {
      dispatch(FETCHTASKDETAILS());
    },
    FETCHUSERS: () => {
      dispatch(FETCHUSERS());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskTabs);
