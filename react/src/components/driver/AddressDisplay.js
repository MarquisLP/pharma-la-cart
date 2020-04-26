import React from 'react'
import { Grid, TextField } from '@material-ui/core'

class AddressDisplay extends React.Component {
  render() {
    const { address } = this.props
    const line1 = address ? address.line1 : ''
    const line2 = address ? address.line2 : ''
    const city = address ? address.city : ''
    const state_or_province = address ? address.state_or_province : ''
    const zip_code_or_postal_code = address ? address.zip_code_or_postal_code : ''
    const country = address ? address.country : ''

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
              value={line1}
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
              label='Address Line 2'
              value={line2}
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
              value={city}
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
              label='Zip / Postal Code'
              value={zip_code_or_postal_code}
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
              label='State / Province'
              value={state_or_province}
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
              value={country}
            />
          </Grid>
        </Grid>
      </>
    )
  }
}

export default AddressDisplay
