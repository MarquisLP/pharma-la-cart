import React from 'react'
import { Grid, CssBaseline } from '@material-ui/core'
import MedicineCatalog from './MedicineCatalog'
import InventoryList from './InventoryList'
import PrescriptionList from './PrescriptionList'
import axios from 'axios'
import { withCookies, Cookies } from "react-cookie";

const apiUrl = 'http://localhost:8080'

class PharmacistDashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoadingPharmacy: true,
      pharmacy: {}
    }

    this.fetchPharmacyData = this.fetchPharmacyData.bind(this)
  }

  componentDidMount() {
    this.fetchPharmacyData()
  }

  fetchPharmacyData() {
    const { cookies } = this.props
    const userName = cookies.get('username')
    axios.get(
      `${apiUrl}/api/pharmacies/user/${userName}`
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

export default withCookies(PharmacistDashboard)
