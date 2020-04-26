import React from 'react'
import { Grid, CssBaseline } from '@material-ui/core'
import axios from 'axios'
import DeliveryList from './DeliveryList'

axios.defaults.withCredentials = true

class DriverDashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFinishedLoggingIn: false
    }
  }

  // Temporary test account login
  componentDidMount() {
    axios.post(
      'http://localhost:8080/api/sessions',
      {
        user_name: 'DriverTwo',
        password: 'clear'
      }
    )
      .then((response) => {
        this.setState({
          isFinishedLoggingIn: true
        })
      })
  }

  render() {
    return (
      <>
        <CssBaseline />
        {
          this.state.isFinishedLoggingIn
            ? (
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
              >
                <DeliveryList />
              </Grid>
            )
            : null
        }
      </>
    )
  }
}

export default DriverDashboard
