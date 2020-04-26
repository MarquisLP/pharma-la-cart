import React from 'react'
import { Card, CardHeader, Grid, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Button, CardContent, CardActions, Tooltip, IconButton } from '@material-ui/core'
import { Healing as MedicineIcon, Add as AddMedicineIcon } from '@material-ui/icons'

class MedicineList extends React.Component {
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
                  >
                    Medicine Inventory
                  </Typography>
                </Grid>
              </Grid>
            }
          />
          <CardContent>
            <List>
              <ListItem>
                <ListItemText
                  primary='Tylenol'
                />
                <ListItemSecondaryAction>
                  <Button
                    color='primary'
                  >
                    VIEW
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            <Tooltip
              title='Add a new medicine'
            >
              <IconButton>
                <AddMedicineIcon
                  color='primary'
                />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </>
    )
  }
}

export default MedicineList
