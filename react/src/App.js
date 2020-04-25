import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import Register from './components/Register';

const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#f45d48',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0a8080',
      contrastText: '#fff',
    },
  },
});

function App() {
  return (
      <BrowserRouter>
        <Switch>
        <Route exact path='/' component={Register} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
