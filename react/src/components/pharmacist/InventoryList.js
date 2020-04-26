import React from 'react'
import { Card, CardHeader, Grid, Typography, CardContent, List, ListItem, ListItemText, CardActions, Tooltip, IconButton } from '@material-ui/core'
import { AllInbox as InventoryIcon, Add as AddMedicineIcon } from '@material-ui/icons'
import axios from 'axios'

class InventoryList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      medicines: [
        {
          '_id': '1',
          'name': 'Tylenol'
        }
      ]
    }

    this.fetchInventory = this.fetchInventory.bind(this)
  }

  componentDidMount() {
    this.fetchInventory()
  }

  fetchInventory() {
    axios.get(
      // TODO: Replace Mocky call once backend is integrated.
      // `${apiUrl}/api/pharmacies/${this.props.pharmacyId}/inventory/medicines`
      'http://www.mocky.io/v2/5ea505fa3000008150ce2e2a'
    )
      .then((response) => {
        this.setState({
          medicines: response.data
        })
      })
  }

  render() {
    return (
      <>
        <Card>
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
                  <InventoryIcon
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
                    Inventory
                  </Typography>
                </Grid>
              </Grid>
            }
          />
          <CardContent>
            <List>
              {
                this.state.medicines.map((medicine) => {
                  return (
                    <ListItem
                      key={medicine._id}
                    >
                      <ListItemText
                        primary={medicine.name}
                      />
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
              <Grid
                item
              >
                <Tooltip
                  title='Add medicine to stock'
                >
                  <IconButton>
                    <AddMedicineIcon
                      color='primary'
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </>
    )
  }
}

export default InventoryList
