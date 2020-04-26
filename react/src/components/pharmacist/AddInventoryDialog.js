import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem } from '@material-ui/core'
import axios from 'axios'

class AddInventoryDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      medicines: [],
      medicineId: ''
    }

    this.handleMedicineSelectChange = this.handleMedicineSelectChange.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }

  componentDidUpdate(prevProps) {
    if ((!prevProps.open) && (this.open)) {
      this.fetchMedicineCatalog()
    }
  }

  fetchMedicineCatalog() {
    axios.get(
      // TODO: Replace Mocky call once backend is integrated.
      // `${apiUrl}/api/medicines`
      'http://www.mocky.io/v2/5ea505fa3000008150ce2e2a'
    )
      .then((response) => {
        this.setState({
          medicines: response.data
        })
      })
  }

  handleMedicineSelectChange(e) {
    this.setState({
      medicineId: e.target.value
    })
  }

  handleSubmitForm(e) {
    e.preventDefault()

    axios.post(
      // TODO: Replace Mocky call once backend is integrated.
      // `${apiUrl}/api/pharmacies/${this.props.pharmacyId}/inventory/medicines/${medicineId}`
      'http://www.mocky.io/v2/5ea50e3e3000006100ce2e3d',
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
          Add Medicine to Inventory
        </DialogTitle>
        <form
          onSubmit={this.handleSubmitForm}
        >
          <DialogContent>
            <Select
              fullWidth
              value={this.state.medicineId}
              onChange={this.handleMedicineSelectChange}
            >
              {
                this.state.medicines.map((medicine) => {
                  return (
                    <MenuItem
                      key={medicine._id}
                      value={medicine._id}
                    >
                       {medicine.name}
                    </MenuItem>
                  )
                })
              }
            </Select>
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

export default AddInventoryDialog
