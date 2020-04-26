import React from 'react'
import { Card, CardHeader, Grid, Typography, CardContent, List, ListItem, ListItemText, CardActions, Tooltip, IconButton } from '@material-ui/core'
import { AllInbox as InventoryIcon, Add as AddMedicineIcon } from '@material-ui/icons'
import axios from 'axios'
import AddInventoryDialog from './AddInventoryDialog'

const apiUrl = 'http://localhost:8080'

class InventoryList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      medicines: [],
      addDialogIsOpen: false
    }

    this.fetchInventory = this.fetchInventory.bind(this)
    this.handleOpenAddDialogButtonClick = this.handleOpenAddDialogButtonClick.bind(this)
    this.handleAddDialogClose = this.handleAddDialogClose.bind(this)
    this.handleAddDialogSuccess = this.handleAddDialogSuccess.bind(this)
  }

  componentDidMount() {
    this.fetchInventory()
  }

  fetchInventory() {
    axios.get(
      `${apiUrl}/api/pharmacies/${this.props.pharmacyId}/inventory/medicines`
    )
      .then((response) => {
        this.setState({
          medicines: response.data
        })
      })
  }

  handleOpenAddDialogButtonClick() {
    this.setState({
      addDialogIsOpen: true
    })
  }

  handleAddDialogClose() {
    this.setState({
      addDialogIsOpen: false
    })
  }

  handleAddDialogSuccess() {
    this.setState({
      addDialogIsOpen: false
    })
    this.fetchInventory()
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
          <CardContent
            style={{
              minWidth: 300
            }}
          >
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
                  <IconButton
                    onClick={this.handleOpenAddDialogButtonClick}
                  >
                    <AddMedicineIcon
                      color='primary'
                    />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
        <AddInventoryDialog
          pharmacyId={this.props.pharmacyId}
          open={this.state.addDialogIsOpen}
          onClose={this.handleAddDialogClose}
          onSuccess={this.handleAddDialogSuccess}
        />
      </>
    )
  }
}

export default InventoryList
