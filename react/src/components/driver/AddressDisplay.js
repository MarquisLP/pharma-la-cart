import React from 'react'
import { Grid, TextField } from '@material-ui/core'

class AddressDisplay extends React.Component {
  render() {
    const { address } = this.props

    return (
      <>
        <Grid
          container
          direction='row'
          justify='center'
          spacing={2}
        >
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              readOnly
              fullWidth
              label='Address Line 1'
              value={address.line1}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              readOnly
              fullWidth
              label='City'
              value={address.city}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              readOnly
              fullWidth
              label='Province'
              value={address.province}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              readOnly
              fullWidth
              label='Country'
              value={address.country}
            />
          </Grid>
        </Grid>
      </>
    )
  }
}

export default AddressDisplay
