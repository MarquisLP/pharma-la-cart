import React from 'react'
import { Card, CardHeader, Grid, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button, CardContent, Tooltip, ListItemAvatar } from '@material-ui/core'
import { Note as PrescriptionIcon, NotificationImportant as PendingIcon, Cancel as CancelIcon, CheckCircle as AcceptedIcon, LocalShipping as ReadyForDeliveryIcon } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const apiUrl = ''

class PrescriptionList extends React.Component {
  constructor(props) {
    super(props)

    this.history = this.props.history

    this.state = {
      prescriptions: [],
    }

    this.fetchPrescriptions = this.fetchPrescriptions.bind(this)
    this.handleOpenPrescriptionButtonClick = this.handleOpenPrescriptionButtonClick.bind(this)
  }

  componentDidMount() {
    this.fetchPrescriptions()
  }

  fetchPrescriptions() {
    axios.get(
      // TODO: Replace Mocky call once backend is integrated.
      // `${apiUrl}/api/prescriptions/${this.props.pharmacyId}`
      'http://www.mocky.io/v2/5ea530693000005900ce2e6b'
    )
      .then((response) => {
        this.setState({
          prescriptions: response.data
        })
      })
  }

  handleOpenPrescriptionButtonClick(prescriptionId) {
    this.history.push(`${apiUrl}/api/prescriptions/${prescriptionId}`)
  }

  render() {
    return (
      <>
        <Card
          style={{
            maxWidth: 1000
          }}
        >
          <CardHeader
            title={
              <Grid
                container
                direction='row'
                justify='center'
                alignItems='center'
                spacing={2}
              >
                <Grid
                  item
                >
                  <PrescriptionIcon
                    style={{
                      fontSize: '48px'
                    }}
                  />
                </Grid>
                <Grid
                  item
                >
                  <Typography
                    variant='h4'
                    align='center'
                  >
                    Prescriptions
                  </Typography>
                </Grid>
              </Grid>
            }
          />
          <CardContent
            style={{
              minWidth: 300
            }}
          >
            <List>
              {
                this.state.prescriptions.map((prescription) => {
                  let statusIcon
                  switch (prescription.status) {
                    case 0:
                      statusIcon = (
                        <Tooltip
                          title='Pending'
                        >
                          <PendingIcon
                            style={{
                              fill: 'orange'
                            }}
                          />
                        </Tooltip>
                      )
                      break
                    case 2:
                      statusIcon = (
                        <Tooltip
                          title='Accepted'
                        >
                          <AcceptedIcon
                            style={{
                              fill: 'green'
                            }}
                          />
                        </Tooltip>
                      )
                      break
                    case 3:
                      statusIcon = (
                        <Tooltip
                          title='Ready for Delivery'
                        >
                          <ReadyForDeliveryIcon
                            style={{
                              fill: 'blue'
                            }}
                          />
                        </Tooltip>
                      )
                      break
                    case 1:
                    default:
                      statusIcon = (
                        <Tooltip
                          title='Rejected'
                        >
                          <CancelIcon
                            style={{
                              fill: 'red'
                            }}
                          />
                        </Tooltip>
                      )
                      break
                  }

                  return (
                    <ListItem
                      key={prescription._id}
                    >
                      <ListItemAvatar>
                        {statusIcon}
                      </ListItemAvatar>
                      <ListItemText
                        primary={prescription._id.substring(
                          prescription._id.length - 8,
                          prescription._id.length,
                        )}
                        secondary={prescription.user_name}
                      />
                      <ListItemSecondaryAction>
                        <Button
                          color='primary'
                          onClick={() => this.handleOpenPrescriptionButtonClick(prescription._id)}
                        >
                          OPEN
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )
                })
              }
            </List>
          </CardContent>
        </Card>
      </>
    )
  }
}

export default withRouter(PrescriptionList)
