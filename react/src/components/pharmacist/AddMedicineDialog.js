import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core'
import axios from 'axios'

const apiUrl = 'http://localhost:8080'

class AddMedicineDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      name: ''
    }

    this.handleNameFieldChange = this.handleNameFieldChange.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }

  handleNameFieldChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleSubmitForm(e) {
    e.preventDefault()

    axios.post(
      `${apiUrl}/api/medicines`,
      {
        name: this.state.name
      }
    )
      .then((response) => {
        this.props.onSuccess()
      })
  }

  render() {
    this.open = this.props.open
    this.onClose = this.props.onClose

    return (
      <Dialog
        open={this.open}
        onClose={this.onClose}
      >
        <DialogTitle>
          Add Medicine
        </DialogTitle>
        <form
          onSubmit={this.handleSubmitForm}
        >
          <DialogContent>
            <TextField
              required
              autoFocus
              label='Medicine Name'
              value={this.state.name}
              onChange={this.handleNameFieldChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              color='primary'
              onClick={this.onClose}
            >
              CANCEL
            </Button>
            <Button
              color='primary'
              type='submit'
            >
              ADD
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

export default AddMedicineDialog
