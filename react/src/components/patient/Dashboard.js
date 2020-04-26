import React, { Component } from "react";
import PrescriptionList from '../patient/prescription/PrescriptionList';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <>
    <PrescriptionList />
    </>;
  }
}

export default Dashboard;
