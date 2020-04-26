import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core'

class AddMedicineDialog extends React.Component {
  constructor(props) {
    super(props)
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
        <form>
          <DialogContent>
            <TextField
              required
              autoFocus
              label='Medicine Name'
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
