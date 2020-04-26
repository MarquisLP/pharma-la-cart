import React from 'react'
import { Grid, CssBaseline } from '@material-ui/core'
import MedicineCatalog from './MedicineCatalog'
import InventoryList from './InventoryList'
import axios from 'axios'

const apiUrl = ''

class PharmacistDashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // TODO: Get user data from further up in component hierarchy (probably using Redux)
      user: {
        user_name: 'PharmacistThree'
      },
      isLoadingPharmacy: true,
      pharmacy: {}
    }

    this.fetchPharmacyData = this.fetchPharmacyData.bind(this)
  }

  componentDidMount() {
    this.fetchPharmacyData()
  }

  fetchPharmacyData() {
    axios.get(
      // TODO: Replace Mocky call once backend is integrated.
      // `${apiUrl}/pharmacies/user/user/${this.state.user.user_name}`
      'http://www.mocky.io/v2/5ea51f273000006100ce2e4a'
    )
      .then((response) => {
        this.setState({
          isLoadingPharmacy: false,
          pharmacy: response.data
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
                <MedicineCatalog />
              </Grid>
              <Grid
                item
              >
                <InventoryList
                  pharmacyId={this.state.pharmacy._id}
                />
              </Grid>
            </Grid>
         )
       }
      </>
    )
  }
}

export default PharmacistDashboard
