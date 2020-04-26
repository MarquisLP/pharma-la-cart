import React, { Component } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";

const apiUrl = "";

class PrescriptionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prescriptions: [],
    };
  }

  componentDidMount() {
    return axios
      .get(`${apiUrl}/prescriptions`)
      .then((response) => {
        this.setState({
          prescriptions: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }

  getPrescriptionById(id) {
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
              variant="info"
              onClick={() => this.getPrescriptionById(prescription.id)}
            >
              {prescription.description ? (
                <div> Description: {prescription.description} </div>
              ) : null}
              {prescription.user_name ? (
                <div> Patient Name: {prescription.user_name} </div>
              ) : null}
            </ListGroup.Item>
          ))
        ) : (
          <Alert variant="danger"> No Prescription exist for this user </Alert>
        )}
      </ListGroup>
    );
  }
}

export default PrescriptionList;
