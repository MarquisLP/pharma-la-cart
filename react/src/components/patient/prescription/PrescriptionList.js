import React, { Component } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { withRouter } from 'react-router-dom'

const apiUrl = "http://localhost:8080";
const mockData ={
  description: "Tynelol Pain Relief",
  pharmacy_id: "5ea47ab5b2a97df4b647a7bc",
  status: 0,
  description: "Take medicine 2 times a day"
};

class PrescriptionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prescriptions: []
    };
  }

  componentDidMount() {
    this.createPrescription();
    return axios
      .get(`${apiUrl}/api/prescriptions/mine/`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          prescriptions: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        return;
      });

  }

   createPrescription() {
    return axios
    .post(`${apiUrl}/api/prescriptions`, {
      items: [],
      ...mockData
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      return;
    });
  }

  getPrescriptionById(id) {
    console.log(id);
    this.props.history.push(`/prescriptions/${id}`);
  }

  render() {
    const prescriptions = this.state.prescriptions;
    return (
      <ListGroup>
        {prescriptions && prescriptions.length > 0 ? (
          prescriptions.map((prescription) => (
            <ListGroup.Item
              key={prescription.id}
              id={prescription.id}
              onClick={() => this.getPrescriptionById(prescription._id)}
            >
              {prescription.description ? (
                <div> Description: {prescription.description} </div>
              ) : null}
              {prescription.user_name ? (
                <div> Patient Name: {prescription.user_name} </div>
              ) : null}
              <Button variant="link" onClick={() => this.getPrescriptionById(prescription._id)}>View Prescription</Button>
            </ListGroup.Item>
          ))
        ) : (
          <Alert variant="danger"> No Prescription exist for this user </Alert>
        )}
      </ListGroup>
    );
  }
}

export default withRouter(PrescriptionList);
