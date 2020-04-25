import React from 'react'
import { Grid, CssBaseline } from '@material-ui/core'
import DeliveryList from './DeliveryList'

class DriverDashboard extends React.Component {
  render() {
    return (
      <>
        <CssBaseline />
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
        >
          <DeliveryList />
        </Grid>
      </>
    )
  }
}

export default DriverDashboard