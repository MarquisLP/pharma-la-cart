import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Register from "./components/auth/Register";
import PrescriptionDetails from "./components/patient/prescription/PrescriptionDetails";
import DriverDashboard from './components/driver/DriverDashboard'
import DeliveryDetails from './components/driver/DeliveryDetails';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Register} />
        <Route
          exact
          path="/prescriptions/:id"
          component={PrescriptionDetails}
        />
        <Route path='/driver/dashboard/' component={DriverDashboard} />
        <Route path='/driver/deliveries/:deliveryId' component={DeliveryDetails} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
