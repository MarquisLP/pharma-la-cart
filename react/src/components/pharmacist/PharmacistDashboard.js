import React from 'react'
import { Grid, CssBaseline } from '@material-ui/core'
import MedicineList from './MedicineList'

class PharmacistDashboard extends React.Component {
  render() {
    return (
      <>
       <CssBaseline />
        <Grid
          container
          direction='row'
          spacing={5}
          justify='center'
          style={{
            marginTop: 30
          }}
        >
          <Grid
            item
          >
            <MedicineList />
          </Grid>
        </Grid>
      </>
    )
  }
}

export default PharmacistDashboard
