import React, { Component } from "react";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";
import XLSX from "xlsx";
import { make_cols } from "./MakeColumns";
import { SheetJSFT } from "./Types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { INSERTTASKS } from "../../../actions/ActionCreators";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: []
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  }

  handleFile(event, form) {
    event.preventDefault();
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;

    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {
        type: rABS ? "binary" : "array",
        bookVBA: true
      });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws["!ref"]) }, () => {
        // console.log(JSON.stringify(this.state.data, null, 2));
        this.props.INSERTTASKS(form, JSON.stringify(this.state.data, null, 2));
      });
    };

    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    }
  }

  render() {
    return (
      <div>
        <Form
          ref="form"
          onSubmit={event => this.handleFile(event, this.refs.form)}
        >
          <Form.Group>
            <Form.Label className="textFieldHeader">Upload File</Form.Label>
            <Form.Control
              type="file"
              placeholder="Add your Excel file"
              name="uploAD_FILE"
              accept={SheetJSFT}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Button variant="dark" type="submit">
              Add Tasks
            </Button>
          </Form.Group>
        </Form>
        {/* <p>{this.props.taskaddedsuccessmsg}</p> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    taskaddedsuccessmsg: state.ManagerReducer.taskaddedsuccessmsg
  };
}

function mapDispatchToProps(dispatch) {
  return {
    INSERTTASKS: (form, task_data) => {
      dispatch(INSERTTASKS(form, task_data));
    }
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExcelReader)
);
