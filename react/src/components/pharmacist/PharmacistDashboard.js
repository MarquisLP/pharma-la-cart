import React from 'react'
import { Grid, CssBaseline } from '@material-ui/core'
import MedicineCatalog from './MedicineCatalog'
import InventoryList from './InventoryList'
import PrescriptionList from './PrescriptionList'
import axios from 'axios'

const apiUrl = 'http://localhost:8080'

class PharmacistDashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // TODO: Get user data from further up in component hierarchy (probably using Redux)
      user: {},
      isLoadingPharmacy: true,
      pharmacy: {}
    }

    this.fetchPharmacyData = this.fetchPharmacyData.bind(this)
  }

  componentDidMount() {
    this.fetchPharmacyData()
  }

  fetchPharmacyData() {
    // TODO: Remove temporary login once authentication is done.
    axios.post(
      `${apiUrl}/api/sessions`,
      {
        user_name: 'PharmacistThree',
        password: 'clear'
      }
    )
      .then((response) => {
        this.setState({
          user: response.data
        }, () => {
          axios.get(
            `${apiUrl}/api/pharmacies/user/${this.state.user.user_name}`
          )
            .then((response) => {
              this.setState({
                isLoadingPharmacy: false,
                pharmacy: response.data
              })
            })
        })
      })
  }

  render() {
    return (
      <>
       <CssBaseline />
       {
         this.state.isLoadingPharmacy
         ? null
         : (
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
                <PrescriptionList
                  pharmacyId={this.state.pharmacy._id}
                />
              </Grid>
              <Grid
                item
              >
                <InventoryList
                  pharmacyId={this.state.pharmacy._id}
                />
              </Grid>
              <Grid
                item
              >
                <MedicineCatalog />
              </Grid>
            </Grid>
         )
       }
      </>
    )
  }
}

export default PharmacistDashboard
