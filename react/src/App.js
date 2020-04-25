import React from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
    <ThemeProvider theme={appTheme}>
      <HashRouter>
        <Switch>
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
