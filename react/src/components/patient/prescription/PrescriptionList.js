import React, { Component } from "react";
import axios from "axios";

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
    return (
      <ListGroup>
        {this.state.prescriptions &&
          this.state.prescriptions.map((prescription) => (
            <ListGroup.Item
              key={prescription.id}
              id={prescription.id}
              onClick={this.getPrescriptionById(prescription.id)}
            ></ListGroup.Item>
          ))}
      </ListGroup>
    );
  }
}

export default PrescriptionList;
