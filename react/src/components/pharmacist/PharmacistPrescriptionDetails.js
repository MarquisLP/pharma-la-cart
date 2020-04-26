import React from 'react'
import { CssBaseline, Card, CardHeader, Typography, Grid, CardContent, Button, Divider, CardMedia } from '@material-ui/core'
import { HourglassFull as LoadingIcon, NotificationImportant as PendingIcon, Cancel as RejectedIcon, CheckCircle as AcceptedIcon, LocalShipping as ReadyForDeliveryIcon } from '@material-ui/icons'
import axios from 'axios'
import { withCookies, Cookies } from "react-cookie";

const apiUrl = 'http://localhost:8080'

class PharmacistPrescriptionDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pharmacy: null,
      prescription: {
        user_name: '',
        pharmacy_id: '',
        status: -1,
        file_uri: '',
        description: ''
      }
    }

    this.fetchPrescriptionDetails = this.fetchPrescriptionDetails.bind(this)
    this.updatePrescriptionStatus = this.updatePrescriptionStatus.bind(this)
    this.handleRejectPrescriptionButtonClick = this.handleRejectPrescriptionButtonClick.bind(this)
    this.handleReopenPrescriptionButtonClick = this.handleReopenPrescriptionButtonClick.bind(this)
    this.handleAcceptPrescriptionButtonClick = this.handleAcceptPrescriptionButtonClick.bind(this)
    this.handleDropPrescriptionButtonClick = this.handleDropPrescriptionButtonClick.bind(this)
    this.handleDeliverPrescriptionButtonClick = this.handleDeliverPrescriptionButtonClick.bind(this)
  }

  componentDidMount() {
    const { cookies } = this.props
    const userName = cookies.get('username')
    axios.get(
      `${apiUrl}/api/pharmacies/user/${userName}`
    )
      .then((response) => {
        this.setState({
          pharmacy: response.data
        }, () => {
          this.fetchPrescriptionDetails()
        })
      })
  }

  fetchPrescriptionDetails() {
    axios.get(
      `${apiUrl}/api/prescriptions/${this.props.match.params.prescriptionId}`
    )
      .then((response) => {
        this.setState({
          prescription: response.data
        })
      })
  }

  updatePrescriptionStatus(newStatus) {
    axios.patch(
      `${apiUrl}/api/prescriptions/${this.props.match.params.prescriptionId}`,
      {
        pharmacy_id: this.state.pharmacy._id,
        status: newStatus
      }
    )
      .then((response) => {
        this.setState({
          prescription: response.data
        })
      })
  }

  handleRejectPrescriptionButtonClick (e) {
    this.updatePrescriptionStatus(1)
  }

  handleAcceptPrescriptionButtonClick (e) {
    this.updatePrescriptionStatus(2)
  }

  handleReopenPrescriptionButtonClick (e) {
    this.updatePrescriptionStatus(0)
  }

  handleDropPrescriptionButtonClick (e) {
    this.updatePrescriptionStatus(0)
  }

  handleDeliverPrescriptionButtonClick (e) {
    this.updatePrescriptionStatus(3)
  }

  render() {
    let statusIcon
    let statusLabel
    let statusButtons

    switch (this.state.prescription.status) {
      case 0:
        statusIcon = (
          <PendingIcon
            style={{
              fill: 'orange',
              fontSize: '64px'
            }}
          />
        )
        statusLabel = 'Pending'
        statusButtons = (
          <>
            <Grid
              item
            >
              <Button
                color='primary'
                onClick={this.handleAcceptPrescriptionButtonClick}
              >
                ACCEPT
              </Button>
            </Grid>
            <Grid
              item
            >
              <Button
                color='primary'
                onClick={this.handleRejectPrescriptionButtonClick}
              >
                REJECT
              </Button>
            </Grid>
          </>
        )
        break
      case 1:
        statusIcon = (
          <RejectedIcon
            style={{
              fill: 'red',
              fontSize: '64px'
            }}
          />
        )
        statusLabel = 'Rejected'
        statusButtons = (
          <Grid
            item
          >
            <Button
              color='primary'
              onClick={this.handleReopenPrescriptionButtonClick}
            >
              CANCEL
            </Button>
          </Grid>
        )
        break
      case 2:
        statusIcon = (
          <AcceptedIcon
            style={{
              fill: 'green',
              fontSize: '64px'
            }}
          />
        )
        statusLabel = 'Delivered'
        statusButtons = (
          <>
            <Grid
              item
            >
              <Button
                color='primary'
                onClick={this.handleDeliverPrescriptionButtonClick}
              >
                DELIVER
              </Button>
            </Grid>
            <Grid
              item
            >
              <Button
                color='primary'
                onClick={this.handleDropPrescriptionButtonClick}
              >
                DROP
              </Button>
            </Grid>
          </>
        )
        break
      case 3:
        statusIcon = (
          <ReadyForDeliveryIcon
            style={{
              fill: 'blue',
              fontSize: '64px'
            }}
          />
        )
        statusLabel = 'Ready for Delivery'
        statusButtons = null
        break
      case -1:
      default:
        statusIcon = (
          <LoadingIcon
            style={{
              fill: 'yellow',
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
              <CardMedia
                image={(this.state.prescription.image_uri && this.state.prescription.image_uri !== '') ? this.state.prescription.image_uri : 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Placeholder-image.png'}
                style={{
                  height: 300
                }}
              />
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
                            {'Prescription ' + this.props.match.params.prescriptionId.substring(
                              this.props.match.params.prescriptionId.length - 8,
                              this.props.match.params.prescriptionId.length
                            )}
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
                { /* =================== PRESCRIPTION ITEMS ======================= */ }
                <Typography
                  variant='h5'
                >
                  Items
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default withCookies(PharmacistPrescriptionDetails)
