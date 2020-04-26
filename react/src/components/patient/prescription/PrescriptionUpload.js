import React, { Component } from "react";
import { Upload } from "react-bootstrap-icons";

const apiUrl = "";

class PrescriptionUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      loading: false,
      loadMessage: "",
    };
  }

  setLoading(loading, loadMessage) {
    this.setState({ loading, loadMessage });
  }

  submitFile = (event) => {
    event.preventDefault();
    this.setLoading(true);
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    axios
      .post(`${apiUrl}/api/files/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // handle your response;
        this.setLoading(false, "File uploaded successfully");
      })
      .catch((error) => {
        // handle your error
        console.log("error", error);
        this.setLoading(false, "Error encountered in file upload");
        return;
      });
  };

  handleFileUpload(event) {
    this.setState({ file: event.target.files });
  }

  render() {
    return (
      <div>
        {this.state.loading ? Loading : null}
        <Upload /> Upload Prescription
        <form onSubmit={this.submitFile}>
          <input
            label="upload file"
            type="file"
            onChange={this.handleFileUpload}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default PrescriptionUpload;
