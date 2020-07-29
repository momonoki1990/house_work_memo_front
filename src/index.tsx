import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import createStore from './Store'
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';


const history = createBrowserHistory();
const store = createStore(history);

// responsiveFontSizesの適用
let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
