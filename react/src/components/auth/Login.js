import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { withCookies, Cookies } from "react-cookie";

const apiUrl = "http://localhost:8080";

class Login extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      loggedIn: false,
      username: "",
      password: "",
      invalidLogin: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { cookies } = this.props;
    axios
      .post(`${apiUrl}/api/sessions`, {
        user_name: this.state.username,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response);
        if (response && response.data) {
          this.setState({
            isFinishedLoggingIn: true,
          });
          cookies.set("loginCredentials", response.data._id, { path: "/" });

          if ("role" in response.data) {
            this.navigateRoute(response.data.role);
          } else {
            this.props.history.push("/patient/dashboard");
          }
        }
      })
      .catch((error) => {
        this.setState({ invalidLogin: true });
      });
  }

  navigateRoute(role) {
    if (role == 0) {
      this.props.history.push("/patient/dashboard");
    } else if (role == 1) {
      this.props.history.push("/driver/dashboard");
    } else {
      //this.props.history.push("/pharmacist/dashboard");
    }
  }

  handleUsernameChange(event) {
    event.preventDefault();
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    event.preventDefault();
    this.setState({ password: event.target.value });
  }

  componentDidMount() {
    const { cookies } = this.props;
    if (cookies.get("loginCredentials")) {
      this.setState({ loggedIn: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { cookies } = this.props;
    if (prevState.loggedIn && cookies.get("loginCredentials") == undefined) {
      this.setState({ loggedIn: false });
    }
  }

  render() {
    return (
      <div className="login-container">
        {false ? (
          <Alert variant="info"> Congratulations you are logged in </Alert>
        ) : (
          <Form id="login" onSubmit={this.handleSubmit}>
            <Form.Label> Enter username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={this.handleUsernameChange}
            />
            <Form.Label> Enter password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={this.handlePasswordChange}
            />
            <Button variant="primary" type="submit">
              {" "}
              Login{" "}
            </Button>
            {this.state.invalidLogin ? (
              <Alert variant="danger"> Invalid Login Credentials </Alert>
            ) : null}
          </Form>
        )}
      </div>
    );
  }
}

export default withCookies(Login);
