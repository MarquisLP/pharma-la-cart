import React, { Component } from "react";
import {Form,Button, NavItem, Alert} from 'react-bootstrap';

const apiUrl = 'http://localhost:8080';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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


  handleSubmit(event) {
    debugger;
    event.preventDefault();

    var registerCredentials = JSON.stringify({
      username: this.state.username,
      password: this.state.password,
    });

    fetch(`${apiUrl}/api/users/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: registerCredentials,
    })
      .then((response) => response.json())
      .then((data) => {
        debugger;
        if (data.authorized) {
          alert("Authorized");
        } else {
          this.setState({ credentialsMatch: false });
        }
      });
  }

  componentDidMount() {}

  render() {
    return (
      <Form id="register" onSubmit={this.handleSubmit}>
        <Form.Label> Enter username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          onChange={this.handleUsername}
          required
        />
        <Form.Label> Enter password </Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          onChange={this.handlePassword}
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
