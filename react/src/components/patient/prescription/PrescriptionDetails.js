import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
const apiUrl = "";

class PrescriptionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prescription: {
        file_url: "testing",
        user_name: "hello",
        pharmacy_id: "123"
      },
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
    const prescription = this.state.prescription;
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
      </>
    );
  }
}

export default PrescriptionDetails;
