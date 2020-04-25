import React from 'react'
import { CssBaseline, Card, CardHeader, Typography, Grid, CardContent, Button, Divider } from '@material-ui/core'
import { HourglassFull as LoadingIcon, NotificationImportant as ReadyForDeliveryIcon,  LocalShipping as BeingDeliveredIcon, CheckCircle as DeliveredIcon, Person as PatientIcon, LocalPharmacy as PharmacyIcon } from '@material-ui/icons'
import axios from 'axios'
import AddressDisplay from './AddressDisplay'

const apiUrl = ''

class DeliveryDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: -1,
      pharmacyAddress: {
        line1: '',
        city: '',
        province: '',
        country: ''
      },
      patientAddress: {
        line1: '',
        city: '',
        province: '',
        country: ''
      }
    }

    this.fetchDeliveryDetails = this.fetchDeliveryDetails.bind(this)
    this.handleAcceptDeliveryButtonClick = this.handleAcceptDeliveryButtonClick.bind(this)
    this.handleCancelDeliveryButtonClick = this.handleCancelDeliveryButtonClick.bind(this)
    this.handleCompleteDeliveryButtonClick = this.handleCompleteDeliveryButtonClick.bind(this)
    this.handleReopenDeliveryButtonClick = this.handleReopenDeliveryButtonClick.bind(this)
  }

  componentDidMount() {
    this.fetchDeliveryDetails()
  }

  fetchDeliveryDetails() {
    axios.get(
      // TODO: Replace Mocky call once backend is integrated.
      // `${apiUrl}/api/delivery_requests/${this.props.deliveryId}`
      'http://www.mocky.io/v2/5ea49a503000006100ce2d95'
    )
      .then((deliveryResponse) => {
        this.setState({
          status: deliveryResponse.data.status,
        })
        axios.get(
          // TODO: Replace Mocky call once backend is integrated.
          // `${apiUrl}/api/pharmacies/${deliveryResponse.data.pharmacy_id}`
          'http://www.mocky.io/v2/5ea49b433000002b14ce2d97'
        )
          .then((pharmacyResponse) => {
            this.setState({
              pharmacyAddress: pharmacyResponse.data.address
            })
          })
        axios.get(
          // TODO: Replace Mocky call once backend is integrated.
          // `${apiUrl}/api/users/${deliveryResponse.data.recipient}`
          'http://www.mocky.io/v2/5ea49b053000002b14ce2d96'
        )
          .then((patientResponse) => {
            this.setState({
              patientAddress: patientResponse.data.address
            })
          })
      })
  }

  updateDeliveryStatus(newStatus) {
    // TODO: Replace Mocky call once backend is integrated.
    let mockUrl
    switch (newStatus) {
      case 0:
        mockUrl = 'http://www.mocky.io/v2/5ea49a503000006100ce2d95'
        break
      case 1:
        mockUrl = 'http://www.mocky.io/v2/5ea4a2183000006100ce2da4'
        break
      case 2:
        mockUrl = 'http://www.mocky.io/v2/5ea4a2253000002c00ce2da5'
        break
    }
    axios.patch(
      // `${apiUrl}/api/delivery_requests/${this.props.deliveryId}`,
      mockUrl,
      {
        status: newStatus
      }
    )
      .then((response) => {
        this.setState({
          status: response.data.status
        })
      })
  }

  handleAcceptDeliveryButtonClick (e) {
    this.updateDeliveryStatus(1)
  }

  handleCancelDeliveryButtonClick (e) {
    this.updateDeliveryStatus(0)
  }

  handleCompleteDeliveryButtonClick (e) {
    this.updateDeliveryStatus(2)
  }

  handleReopenDeliveryButtonClick (e) {
    this.updateDeliveryStatus(1)
  }

  render() {
    let statusIcon
    let statusLabel
    let statusButtons

    switch (this.state.status) {
      case 0:
        statusIcon = (
          <ReadyForDeliveryIcon
            style={{
              fill: 'red',
              fontSize: '64px'
            }}
          />
        )
        statusLabel = 'Ready for Delivery'
        statusButtons = (
          <Grid
            item
          >
            <Button
              color='primary'
              onClick={this.handleAcceptDeliveryButtonClick}
            >
              ACCEPT
            </Button>
          </Grid>
        )
        break
      case 1:
        statusIcon = (
          <BeingDeliveredIcon
            style={{
              fill: 'blue',
              fontSize: '64px'
            }}
          />
        )
        statusLabel = 'Being Delivered'
        statusButtons = (
          <>
            <Grid
              item
            >
              <Button
                color='primary'
                onClick={this.handleCompleteDeliveryButtonClick}
              >
                COMPLETE
              </Button>
            </Grid>
            <Grid
              item
            >
              <Button
                color='primary'
                onClick={this.handleCancelDeliveryButtonClick}
              >
                CANCEL
              </Button>
            </Grid>
          </>
        )
        break
      case 2:
        statusIcon = (
          <DeliveredIcon
            style={{
              fill: 'green',
              fontSize: '64px'
            }}
          />
        )
        statusLabel = 'Delivered'
        statusButtons = (
          <Grid
            item
          >
            <Button
              color='primary'
              onClick={this.handleReopenDeliveryButtonClick}
            >
              REOPEN
            </Button>
          </Grid>
        )
        break
      case -1:
      default:
        statusIcon = (
          <LoadingIcon
            style={{
              fill: 'orange',
              fontSize: '64px'
            }}
          />
        )
        statusLabel = 'Loading...'
        statusButtons = null
        break
    }

    return (
      <>
        <CssBaseline />
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
        >
          <Grid
            item
          >
            <Card
              style={{
                maxWidth: 1000,
                marginTop: 30
              }}
            >
              <CardHeader
                title={
                  <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                    spacing={3}
                  >
                    <Grid
                      item
                    >
                      {statusIcon}
                    </Grid>
                    <Grid
                      item
                    >
                      <Grid
                        container
                        direction='column'
                        spacing={1}
                      >
                        <Grid
                          item
                        >
                          <Typography
                            variant='h3'
                            align='center'
                          >
                            Delivery 1
                          </Typography>
                        </Grid>
                        <Grid
                          item
                        >
                          <Typography
                            variant='h5'
                            align='center'
                          >
                            {statusLabel}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                }
              />
              <CardContent>
                { /* ====================== STATUS BUTTONS ======================= */ }
                <Grid
                  container
                  direction='row-reverse'
                  justify='space-between'
                >
                  {statusButtons}
                </Grid>
                <Divider
                  style={{
                    marginTop: 15,
                    marginBottom: 30
                  }}
                />
                { /* ========================= PHARMACY ========================= */ }
                <Grid
                  container
                  direction='row'
                  spacing={2}
                >
                  <Grid
                    item
                  >
                    <PharmacyIcon
                      color='primary'
                      style={{
                        marginTop: 3
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                  >
                    <Typography
                      variant='h6'
                    >
                      Pharmacy
                    </Typography>
                  </Grid>
                </Grid>
                <AddressDisplay
                  address={this.state.pharmacyAddress}
                />
                <Divider
                  style={{
                    marginTop: 30,
                    marginBottom: 30
                  }}
                />
                { /* ========================= PATIENT ========================= */ }
                <Grid
                  container
                  direction='row'
                  spacing={2}
                >
                  <Grid
                    item
                  >
                    <PatientIcon
                      color='primary'
                      style={{
                        marginTop: 3
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                  >
                    <Typography
                      variant='h6'
                    >
                      Patient
                    </Typography>
                  </Grid>
                </Grid>
                <AddressDisplay
                  address={this.state.patientAddress}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default DeliveryDetails
