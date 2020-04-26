import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Register from "./components/auth/Register";
import PrescriptionDetails from "./components/patient/prescription/PrescriptionDetails";
import DriverDashboard from './components/driver/DriverDashboard'
import DeliveryDetails from './components/driver/DeliveryDetails';
import PrescriptionList from "./components/patient/prescription/PrescriptionList";
import Login from "./components/auth/Login";
import Dashboard from "./components/patient/Dashboard";
import NavigationBar from "./components/shared/NavigationBar";
function App() {
  return (
    <BrowserRouter>
    <NavigationBar/>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/prescriptions" component={PrescriptionList} />
        <Route
          exact
          path="/prescriptions/:id"
          component={PrescriptionDetails}
        />
        <Route exact path="/patient/dashboard" component={Dashboard} />
        <Route path='/driver/dashboard/' component={DriverDashboard} />
        <Route path='/driver/deliveries/:deliveryId' component={DeliveryDetails} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
