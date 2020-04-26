import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrescriptionDetails from "./components/patient/prescription/PrescriptionDetails";
import DriverDashboard from './components/driver/DriverDashboard'
import DeliveryDetails from './components/driver/DeliveryDetails';
import PrescriptionList from "./components/patient/prescription/PrescriptionList";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/prescriptions" component={PrescriptionList} />
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
