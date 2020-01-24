import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { LOGININPUTS } from "../../actions/Actions.js";
import "./Login.css";
import { USERLOGIN } from "../../actions/ActionCreators.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedoutmsg: false
    };
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <Form
              ref="form"
              onSubmit={event =>
                this.props.USERLOGIN(
                  event,
                  this.refs.form,
                  this.props.loginInputs,
                  this.props.history
                )
              }
            >
              <Form.Group>
                <Form.Label className="textFieldHeader">
                  Email address
                </Form.Label>
                <Form.Control
                  className="textField"
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={this.props.LOGININPUTS}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="textFieldHeader">Password</Form.Label>
                <Form.Control
                  className="textField"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={this.props.LOGININPUTS}
                  required
                />
              </Form.Group>
              <span className="formbtn">
                <Button className="submitBtn" variant="dark" type="submit">
                  Log In
                </Button>
              </span>
              <p className="existingusertext">
                Not a User ?{"    "}
                <span>
                  <Link to="/signin"> Sign Up</Link>
                </span>
              </p>
            </Form>
            <p className="textmsg">{this.props.loginerrormsg}</p>

            {(() => {
              if (
                this.props.loggedoutmsg === "" ||
                this.props.loggedoutmsg === null ||
                this.props.loggedoutmsg === undefined
              ) {
                return null;
              } else {
                return <p className="textmsg">{this.props.loggedoutmsg}</p>;
              }
            })()}
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginInputs: state.LoginReducer.loginInputs,
    loginerrormsg: state.LoginReducer.loginerrormsg,
    loggedoutmsg: state.LoginReducer.loggedoutmsg
  };
}

function mapDispatchToProps(dispatch) {
  return {
    LOGININPUTS: event => {
      const name = event.target.name;
      const value = event.target.value;
      dispatch(LOGININPUTS(name, value));
    },
    USERLOGIN: (event, form, loginInputs, history) => {
      event.preventDefault();
      dispatch(USERLOGIN(event, form, loginInputs, history));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
