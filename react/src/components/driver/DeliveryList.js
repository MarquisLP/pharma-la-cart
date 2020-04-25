import React from 'react'
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, ListItemAvatar, Tooltip, ListItemSecondaryAction, Button, CardActions, Grid, IconButton } from '@material-ui/core'
import { LocalShipping as InDeliveryIcon, KeyboardArrowLeft as PreviousPageIcon, KeyboardArrowRight as NextPageIcon } from '@material-ui/icons'

class DeliveryList extends React.Component {
  render() {
    return (
      <>
        <Card
          style={{
            minWidth: 360,
            maxWidth: '100%'
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
              <ListItem>
                <ListItemAvatar>
                  <Tooltip
                    title='Being Delivered'
                  >
                    <InDeliveryIcon
                      style={{
                        fill: 'blue'
                      }}
                    />
                  </Tooltip>
                </ListItemAvatar>
                <ListItemText
                  primary='Delivery 1'
                />
                <ListItemSecondaryAction>
                  <Button
                    color='primary'
                  >
                    OPEN
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
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
                  <IconButton>
                    <PreviousPageIcon
                      color='primary'
                    />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip
                title='Next Page'
              >
                <span>
                  <IconButton>
                    <NextPageIcon
                      color='primary'
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

export default DeliveryList
