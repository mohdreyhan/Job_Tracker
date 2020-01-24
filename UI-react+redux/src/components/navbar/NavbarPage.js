import React, { Component } from "react";
import {
  Navbar,
  Button,
  Image,
  Dropdown,
  Container,
  Nav
} from "react-bootstrap";
import "./NavbarPage.css";
import { withRouter, Link } from "react-router-dom";
import { USERLOGOUT } from "../../actions/ActionCreators";
import { connect } from "react-redux";

class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownStatus: false
    };
  }

  logout = () => {
    this.setState({
      dropdownStatus: !this.state.dropdownStatus
    });
    this.props.USERLOGOUT(localStorage.getItem("email"), this.props.history);
  };

  render() {
    return (
      <Container>
        {(() => {
          var token = localStorage.getItem("token");
          if (token !== null) {
            return (
              <Navbar expand="lg">
                <Navbar.Brand>
                  <Link to="/dashboard" className="navbartitle">
                    <span>
                      {" "}
                      Volume<span style={{ color: "red" }}>Tracker</span>{" "}
                    </span>
                  </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    {(() => {
                      if (localStorage.getItem("role") === "employee/manager") {
                        return (
                          <div>
                             <Nav className="mr-auto">
                            <Nav.Link>
                              <Link className="navlinks" to="/addtasks">
                                Add Tasks
                              </Link>
                            </Nav.Link>
                            <Nav.Link>
                              <Link className="navlinks" to="/managetasks">
                                Manage Tasks
                              </Link>
                            </Nav.Link>
                            </Nav>
                          </div>
                        );
                      }
                    })()}
                  </Nav>
                  <Button
                    variant="dark"
                    className="mr-sm-4"
                    onClick={() =>
                      this.setState({
                        dropdownStatus: !this.state.dropdownStatus
                      })
                    }
                    style={{ borderRadius: "100%", padding: "1px" }}
                  >
                    <Image
                      src={require("../../images/user.png")}
                      style={{ width: 40, height: 40 }}
                      roundedCircle
                    />
                  </Button>
                  <Dropdown.Menu show={this.state.dropdownStatus} alignRight>
                    <Dropdown.Item eventKey="1">Profile</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Settings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="3" onClick={this.logout}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Navbar.Collapse>
              </Navbar>
            );
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
  return {
    USERLOGOUT: (email, history) => {
      dispatch(USERLOGOUT(email, history));
    }
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavbarPage)
);
