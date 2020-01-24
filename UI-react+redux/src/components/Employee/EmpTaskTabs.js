import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs, Tab, Container } from "react-bootstrap";
import { FETCHTASKDETAILS } from "../../actions/ActionCreators";
import PendingTasks from "./PendingTasks";
import CompletedTasks from "./CompletedTasks";

class TaskTabs extends Component {
  componentDidMount() {
    this.props.FETCHTASKDETAILS(localStorage.getItem("emp_id"));
  }
  render() {
    return (
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        style={{ marginTop: 10 }}
      >
        <Tab eventKey="profile" title="Pending Tasks">
          <PendingTasks />
        </Tab>
        <Tab eventKey="home" title="Completed Tasks">
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
    FETCHTASKDETAILS: emp_id => {
      dispatch(FETCHTASKDETAILS(emp_id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskTabs);
