import React, { Component } from "react";
import axios from "axios";

const apiUrl = "";

class PrescriptionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        prescription: {}
    };
  }

  componentDidMount() {
    const prescriptionId = this.props.match.params.id;
    return axios
    .get(`${apiUrl}/prescriptions/${prescriptionId}`)
    .then((response) => {
      this.setState({
        prescription: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
      return;
    });

  }

  render() {
      return (
          <></>
      )
  
  }
}

export default PrescriptionDetails;
