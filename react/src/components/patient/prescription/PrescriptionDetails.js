import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
const apiUrl = "http://localhost:8080";

class PrescriptionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const prescriptionId = this.props.match.params.id;
    return axios
      .get(`${apiUrl}/api/prescriptions/${prescriptionId}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          prescription: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }

  navigateToPatientDashboard() {
    this.props.history.push('/patient/dashboard');
  }

  render() {
    const prescription = this.state.prescription;
    console.log(prescription);
    return (
      <>
        {prescription ? (
          <ListGroup>
            {prescription.file_url ? (
              <ListGroup.Item>File Url: {prescription.file_url}</ListGroup.Item>
            ) : null}
            {prescription.user_name ? (
              <ListGroup.Item>
                Username: {prescription.user_name}
              </ListGroup.Item>
            ) : null}
            {prescription.pharmacy_id ? (
              <ListGroup.Item>
                Pharmacy Id: {prescription.pharmacy_id}
              </ListGroup.Item>
            ) : null}
            {prescription.status ? (
              <ListGroup.Item>Status: {prescription.status}</ListGroup.Item>
            ) : null}
            {prescription.description ? (
              <ListGroup.Item>
                Description: {prescription.description}
              </ListGroup.Item>
            ) : null}
          </ListGroup>
        ) : (
          <div> No Prescription exist </div>
        )}
        <Button variant="link" onClick={() => this.navigateToPatientDashboard()}> Go Back </Button>
      </>
    );
  }
}

export default PrescriptionDetails;
