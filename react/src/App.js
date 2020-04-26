import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Register from './components/Register';
import DriverDashboard from './components/driver/DriverDashboard'
import DeliveryDetails from './components/driver/DeliveryDetails';
import PharmacistDashboard from './components/pharmacist/PharmacistDashboard'

function App() {
  return (
      <BrowserRouter>
        <Switch>
        <Route exact path='/' component={Register} />
        <Route path='/driver/dashboard/' component={DriverDashboard} />
        <Route path='/driver/deliveries/:deliveryId' component={DeliveryDetails} />
        <Route path='/pharmacist/dashboard' component={PharmacistDashboard} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
