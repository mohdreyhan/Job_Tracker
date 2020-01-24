import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Table,
  Button,
  Form,
  Modal,
  Container,
  Carousel
} from "react-bootstrap";
import { ASSIGNEMP } from "../../../actions/ActionCreators";
import { ASSIGNEMPINPUTS, UPDATETASKINPUTS } from "../../../actions/Actions";
import {
  FETCHTASKDETAILS,
  FETCHUSERS,
  UPDATETASK
} from "../../../actions/ActionCreators";

class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      task_id: "",
      task_name: "",
      taskdata: [],
      modalShow2: false
    };
  }
  componentDidMount() {
    this.props.FETCHTASKDETAILS();
    this.props.FETCHUSERS();
  }

  handleModal = (value, task_id, task_name) => {
    const taskdata = this.props.taskDetails.filter(
      item => item.task_id === task_id
    );
    this.setState({
      modalShow: value,
      task_id: task_id,
      taskdata: taskdata,
      task_name: task_name
    });
  };

  handleModal2 = (value, task_id, task_name) => {
    const taskdata = this.props.taskDetails.filter(
      item => item.task_id === task_id
    );
    this.setState({
      modalShow2: value,
      task_id: task_id,
      taskdata: taskdata,
      task_name: task_name
    });
  };

  render() {
    return (
      <Container>
        <div>
          <Table hover striped responsive style={{ marginTop: 10 }}>
            <TableHeader />
            <TableBody
              taskDetails={this.props.taskDetails}
              handleModal={this.handleModal}
              modalShow={this.state.modalShow}
              handleModal2={this.handleModal2}
            />
          </Table>
        </div>

        {/*------------------------------- Modal 1 -------------------------*/}

        <div>
          <Modal show={this.state.modalShow}>
            <Modal.Header
              style={{ backgroundColor: "#003d79", color: "white" }}
            >
              <Modal.Title>Assign Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                ref="form"
                style={{ marginTop: 10 }}
                onSubmit={event =>
                  this.props.ASSIGNEMP(
                    this.props.assignemp_Inputs,
                    event,
                    this.refs.form,
                    this.state.task_id,
                    this.state.task_name
                  )
                }
              >
                <AssignEmp
                  taskdata={this.state.taskdata}
                  usersDetails={this.props.usersDetails}
                  ASSIGNEMPINPUTS={this.props.ASSIGNEMPINPUTS}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: "#003d79" }}>
              <Button
                variant="outline-light"
                onClick={() => this.handleModal(!this.state.modalShow)}
              >
                Close
              </Button>
              <p>{this.props.assignsuccess}</p>
            </Modal.Footer>
          </Modal>
        </div>

        {/*------------------------------- Modal 1 -------------------------*/}

        <div>
          <Modal show={this.state.modalShow2}>
            <Modal.Header>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                ref="form"
                style={{ marginTop: 10 }}
                onSubmit={event =>
                  this.props.UPDATETASK(
                    this.props.updatetask_Inputs,
                    event,
                    this.refs.form,
                    this.state.task_id
                  )
                }
              >
                <UpdateTasks
                  taskdata={this.state.taskdata}
                  UPDATETASKINPUTS={this.props.UPDATETASKINPUTS}
                />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => this.handleModal2(!this.state.modalShow2)}
              >
                Close
              </Button>
              {/* <Button variant="primary" onClick={}>
                Save Changes
              </Button> */}
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    );
  }
}
const AssignEmp = props => {
  return (
    <div>
      <Form.Group>
        <Form.Label>Task Id.</Form.Label>
        <Form.Control
          type="text"
          value={props.taskdata[0] ? props.taskdata[0].task_id : ""}
          disabled={true}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Select Emloyee</Form.Label>
        <Form.Control
          as="select"
          name="select_employee"
          onChange={props.ASSIGNEMPINPUTS}
          required
        >
          <option value="" disabled selected hidden>
            Select Emloyee
          </option>
          {props.usersDetails.map(data => {
            return <option value={data.emp_id}>{data.emp_name}</option>;
          })}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Review Date</Form.Label>
        <Form.Control
          type="date"
          name="review_date"
          onChange={props.ASSIGNEMPINPUTS}
        />
      </Form.Group>

      <Button variant="outline-dark" type="submit">
        Assign
      </Button>
    </div>
  );
};

const UpdateTasks = props => {
  return (
    <div>
      <Form.Group>
        <Form.Label>Task Id.</Form.Label>
        <Form.Control
          type="text"
          value={props.taskdata[0] ? props.taskdata[0].task_id : ""}
          disabled={true}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Task Name</Form.Label>
        <Form.Control
          name="task_name"
          type="text"
          placeholder={props.taskdata[0] ? props.taskdata[0].task_name : ""}
          onChange={props.UPDATETASKINPUTS}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Priority</Form.Label>
        <Form.Control
          name="priority"
          type="text"
          placeholder={props.taskdata[0] ? props.taskdata[0].priority : ""}
          onChange={props.UPDATETASKINPUTS}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          name="due_date"
          type="text"
          placeholder={props.taskdata[0] ? props.taskdata[0].due_date : ""}
          onChange={props.UPDATETASKINPUTS}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Status</Form.Label>
        <Form.Control
          name="status"
          type="text"
          placeholder={props.taskdata[0] ? props.taskdata[0].status : ""}
          onChange={props.UPDATETASKINPUTS}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Time allocated</Form.Label>
        <Form.Control
          name="time_allocated"
          type="text"
          placeholder={
            props.taskdata[0] ? props.taskdata[0].time_allocated : ""
          }
          onChange={props.UPDATETASKINPUTS}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Assigned To</Form.Label>
        <Form.Control
          name="assigned_to"
          type="text"
          placeholder={props.taskdata[0] ? props.taskdata[0].assigned_to : ""}
          onChange={props.UPDATETASKINPUTS}
        />
      </Form.Group>

      <Button variant="outline-dark" type="submit">
        Update
      </Button>
    </div>
  );
};

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
        <th>Assign Employee</th>
        <th>Update Task Details</th>
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
        <td>
          <Button
            variant="outline-dark"
            disabled={row.assigned_to === null ? false : true}
            onClick={() =>
              props.handleModal(!props.modalShow, row.task_id, row.task_name)
            }
          >
            Assign
          </Button>
        </td>
        <td>
          <Button
            variant="outline-dark"
            onClick={() => props.handleModal2(!props.modalShow, row.task_id)}
          >
            Update
          </Button>
        </td>
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
    assignemp_Inputs: state.ManagerReducer.assignemp_Inputs,
    updatetask_Inputs: state.ManagerReducer.updatetask_Inputs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    FETCHTASKDETAILS: () => {
      dispatch(FETCHTASKDETAILS());
    },
    FETCHUSERS: () => {
      dispatch(FETCHUSERS());
    },
    ASSIGNEMPINPUTS: event => {
      let name = event.target.name;
      let value = event.target.value;
      dispatch(ASSIGNEMPINPUTS(name, value));
    },
    ASSIGNEMP: (assignemp_Inputs, event, form, task_id,task_name) => {
      dispatch(ASSIGNEMP(assignemp_Inputs, event, form, task_id,task_name));
    },
    UPDATETASKINPUTS: event => {
      let name = event.target.name;
      let value = event.target.value;
      dispatch(UPDATETASKINPUTS(name, value));
    },
    UPDATETASK: (updatetask_Inputs, event, form, task_id) => {
      dispatch(UPDATETASK(updatetask_Inputs, event, form, task_id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetails);
