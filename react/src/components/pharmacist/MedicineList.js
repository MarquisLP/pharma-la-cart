import React from 'react'
import { Card, CardHeader, Grid, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button, CardContent, CardActions, Tooltip, IconButton } from '@material-ui/core'
import { Healing as MedicineIcon, Add as AddMedicineIcon } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import AddMedicineDialog from './AddMedicineDialog'

const apiUrl = ''

class MedicineList extends React.Component {
  constructor(props) {
    super(props)

    this.history = this.props.history

    this.state = {
      medicines: [],
      addDialogIsOpen: false
    }

    this.fetchMedicines = this.fetchMedicines.bind(this)
    this.handleViewMedicineButtonClick = this.handleViewMedicineButtonClick.bind(this)
    this.handleClickOpenAddDialogButton = this.handleClickOpenAddDialogButton.bind(this)
    this.handleCloseAddDialog = this.handleCloseAddDialog.bind(this)
    this.handleAddMedicineSuccess = this.handleAddMedicineSuccess.bind(this)
  }

  componentDidMount() {
    this.fetchMedicines()
  }

  fetchMedicines() {
    axios.get(
      // TODO: Replace Mocky call once backend is integrated.
      // `${apiUrl}/api/medicines`
      'http://www.mocky.io/v2/5ea505fa3000008150ce2e2a'
    )
      .then((response) => {
        this.setState({
          medicines: response.data
        })
      })
  }

  handleViewMedicineButtonClick(medicineId) {
    this.history.push(`${apiUrl}/api/medicines/${medicineId}`)
  }

  handleClickOpenAddDialogButton(e) {
    this.setState({
      addDialogIsOpen: true
    })
  }

  handleCloseAddDialog() {
    this.setState({
      addDialogIsOpen: false
    })
  }

  handleAddMedicineSuccess() {
    this.setState({
      addDialogIsOpen: false
    })
    this.fetchMedicines()
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
                  <MedicineIcon
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
                    Medicine Inventory
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
                      <ListItemSecondaryAction>
                        <Button
                          color='primary'
                          onClick={() => this.handleViewMedicineButtonClick(medicine._id)}
                        >
                          VIEW
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
              <Grid
                item
              >
                <Tooltip
                  title='Add a new medicine'
                >
                  <IconButton
                    onClick={this.handleClickOpenAddDialogButton}
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
        <AddMedicineDialog
          open={this.state.addDialogIsOpen}
          onClose={this.handleCloseAddDialog}
          onSuccess={this.handleAddMedicineSuccess}
        />
      </>
    )
  }
}

export default withRouter(MedicineList)
