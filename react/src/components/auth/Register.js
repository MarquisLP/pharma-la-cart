import React, { Component } from "react";
import {Form,Button, NavItem, Alert} from 'react-bootstrap';
import axios from "axios";

const apiUrl = 'http://localhost:8080';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      role: "",
      credentialsMatch: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUsername(event) {
    event.preventDefault();
    this.setState({ username: event.target.value });
  }

  handleEmail(event) {
    event.preventDefault();
    this.setState({ email: event.target.value });
  }

  handlePassword(event) {
    event.preventDefault();
    this.setState({ password: event.target.value });
  }

  handleRole(event) {
    event.preventDefault();
    this.setState({ role: event.target.value });
  }


  handleSubmit(event) {
    event.preventDefault();
    axios.post(
      `${apiUrl}/api/users`,
      {
        user_name: this.state.username,
        password: this.state.password,
        role: this.state.role
      }
    )
      .then((response) => {
        if ("data" in response && "_id" in response.data) {
        this.setState({
          credentialsMatch: true
        })
      }
      })
  }

  componentDidMount() {}

  render() {
    return (
      <Form id="register" onSubmit={this.handleSubmit}>
        <Form.Label> Enter username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          onChange={this.handleUsername.bind(this)}
          required
        />
        <Form.Label> Enter role</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter role"
          onChange={this.handleRole.bind(this)}
          required
        />
        <Form.Label> Enter password </Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          onChange={this.handlePassword.bind(this)}
          required
        />
        <Button variant="primary" type="submit">
          {" "}
          Register{" "}
        </Button>
        <Form.Text className="text-muted">
          {this.state.credentialsMatch ? null : (
            <Alert variant="danger"> Invalid Credentials </Alert>
          )}
        </Form.Text>
      </Form>
    );
  }
}

export default Register;
