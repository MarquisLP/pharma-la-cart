import React from 'react'
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, ListItemAvatar, Tooltip, ListItemSecondaryAction, Button, CardActions, Grid, IconButton } from '@material-ui/core'
import { NotificationImportant as ReadyForDeliveryIcon,  LocalShipping as BeingDeliveredIcon, CheckCircle as DeliveredIcon, KeyboardArrowLeft as PreviousPageIcon, KeyboardArrowRight as NextPageIcon } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const NUM_DELIVERIES_PER_PAGE = 10

const apiUrl = 'http://localhost:8080'

class DeliveryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deliveries: [],
      pageNumber: 1,
      hasMorePages: false
    }

    this.loadDeliveries = this.loadDeliveries.bind(this)
    this.handlePreviousPageButtonClick = this.handlePreviousPageButtonClick.bind(this)
    this.handleNextPageButtonClick = this.handleNextPageButtonClick.bind(this)
    this.handleOpenDeliveryButtonClick = this.handleOpenDeliveryButtonClick.bind(this)
  }

  loadDeliveries() {
    axios.get(
      `${apiUrl}/api/delivery_requests`
      // TODO: Replace with this when pagination is implemented.
      // `${apiUrl}/api/delivery_requests?page=${this.state.pageNumber}&size=${NUM_DELIVERIES_PER_PAGE}`
      // 'http://www.mocky.io/v2/5ea485713000005900ce2d57'
    )
      .then((response) => {
        this.setState({
          /*
          TODO: Replace with this when pagination is implemented.
          hasMorePages: response.data.hasMore,
          deliveries: response.data.delivery_requests
          */
          deliveries: response.data
        })
      })
  }

  componentDidMount() {
    this.loadDeliveries()
  }

  handlePreviousPageButtonClick (e) {
    this.setState({
      pageNumber: this.state.pageNumber - 1
    }, () => {
      this.loadDeliveries()
    })
  }

  handleNextPageButtonClick (e) {
    this.setState({
      pageNumber: this.state.pageNumber + 1
    }, () => {
      this.loadDeliveries()
    })
  }

  handleOpenDeliveryButtonClick (deliveryId) {
    this.props.history.push(`/driver/deliveries/${deliveryId}`)
  }

  render() {
    return (
      <>
        <Card
          style={{
            minWidth: 300,
            maxWidth: '100%',
            marginTop: 30
          }}
        >
          <CardHeader
            title='Deliveries'
            style={{
              textAlign: 'center'
            }}
          />
          <CardContent>
            <List>
              {
                this.state.deliveries.map((delivery) => {
                  let statusIcon
                  switch (delivery.status) {
                    case 0:
                      statusIcon = (
                        <Tooltip
                          title='Ready for Delivery'
                        >
                          <ReadyForDeliveryIcon
                            style={{
                              fill: 'red'
                            }}
                          />
                        </Tooltip>
                      )
                      break
                    case 1:
                      statusIcon = (
                        <Tooltip
                          title='Being Delivered'
                        >
                          <BeingDeliveredIcon
                            style={{
                              fill: 'blue'
                            }}
                          />
                        </Tooltip>
                      )
                      break
                    case 2:
                      statusIcon = (
                        <Tooltip
                          title='Delivered'
                        >
                          <DeliveredIcon
                            style={{
                              fill: 'green'
                            }}
                          />
                        </Tooltip>
                      )
                      break
                    default:
                      break
                  }

                  return (
                    <ListItem
                      key={delivery._id}
                    >
                      <ListItemAvatar>
                        {statusIcon}
                      </ListItemAvatar>
                      <ListItemText
                        primary={`Delivery ${delivery._id}`}
                      />
                      <ListItemSecondaryAction>
                        <Button
                          color='primary'
                          onClick={() => this.handleOpenDeliveryButtonClick(delivery._id)}
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
          <CardActions>
            <Grid
              container
              direction='row'
              justify='flex-end'
            >
              <Tooltip
                title='Previous Page'
              >
                <span>
                  <IconButton
                    disabled={this.state.pageNumber === 1}
                    onClick={this.handlePreviousPageButtonClick}
                  >
                    <PreviousPageIcon
                      color={(this.state.pageNumber > 1) ? 'primary' : 'disabled'}
                    />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip
                title='Next Page'
              >
                <span>
                  <IconButton
                    disabled={!this.state.hasMorePages}
                    onClick={this.handleNextPageButtonClick}
                  >
                    <NextPageIcon
                      color={this.state.hasMorePages ? 'primary' : 'disabled'}
                    />
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
          </CardActions>
        </Card>
      </>
    )
  }
}

export default withRouter(DeliveryList)
