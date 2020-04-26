import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { withCookies, Cookies } from "react-cookie";
import { withRouter, Redirect } from "react-router-dom";

const apiUrl = "http://localhost:8080";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = { loggedIn: false, loginInfo: "", hour: "" };
    this.getHour = this.getHour.bind(this);
    this.logout = this.logout.bind(this);
    this.testchanges = this.testchanges.bind(this);
  }

  componentDidMount() {
    const { cookies } = this.props;
    if (cookies.get("loginCredentials")) {
      console.log("first check");
      console.log(cookies.get("loginCredentials"));
      console.log("second check");
      this.setState({
        loggedIn: true,
        loginInfo: cookies.get("loginCredentials"),
      });
    } else {
      console.log("second check");
      this.setState({ loggedIn: false });
    }
    this.getHour();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("previous state check 1");
    var loginCheck = prevProps.cookies.cookies.loginCredentials;
    if (!prevState.loggedIn && loginCheck) {
      this.setState({ loggedIn: true, loginInfo: loginCheck });
    }

    if (prevState.loggedIn && loginCheck == undefined) {
      this.setState({ loggedIn: false });
    }
  }

  testchanges() {
    const { cookies } = this.props;
    if (cookies.get("loginCredentials")) {
      console.log("first check");
      console.log(cookies.get("loginCredentials"));
      console.log("second check");
      this.setState({
        loggedIn: true,
        loginInfo: cookies.get("loginCredentials"),
      });
    }
  }

  logout(event) {
    const { cookies } = this.props;
    cookies.remove("loginCredentials", { path: "/" });
    this.removeSession();
    this.props.history.push("/");
  }

  removeSession() {
    return axios
    .get(`${apiUrl}/api/logout`)
    .then((response) => {
      console.log("user logged out");
    })
    .catch((error) => {
      console.log(error);
      return;
    });

  }

  getHour() {
    var date = new Date();
    var hour = date.getHours();
    console.log("just check");
    this.setState({ hour });
  }

  render() {
    return this.state.loggedIn ? (
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto" style={{ width: "100%" }}>
          <Nav.Link className="header">
            {" "}
            Welcome {this.state.loginInfo}
            {this.state.hour < 12 ? (
              <span> Good Morning</span>
            ) : (
              <span> Good Evening</span>
            )}
          </Nav.Link>
          <Nav.Link onClick={this.logout}>
            {" "}
            Logout{" "}
          </Nav.Link>
        </Nav>
      </Navbar>
    ) : null;
  }
}
const Testing = withCookies(NavigationBar);
export default withRouter(Testing);
