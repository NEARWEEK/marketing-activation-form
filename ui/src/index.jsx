import { colors } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StoreProvider } from 'easy-peasy';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import { Initializer } from './providers/Initializer/Initializer';
import { setupResponseInterceptor } from "./services/apiService";
import { store } from './store';

const history = createBrowserHistory();
setupResponseInterceptor(history);

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0, // small phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1_200, // desktop
      xl: 1_536, // large screens
    },
  },
  palette: {
    primary: {
      main: colors.deepPurple[500],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          backgroundColor: '#005Fff',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#448aff',
            color: '#fff',
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0,
          '@media screen  and (max-width: 600px)': {
            minHeight: '56px',
            paddingLeft: 0,
            paddingRight: 0,
          },
          '@media screen  and (min-width: 601px)': {
            minHeight: '72px',
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'filled', InputProps: { disableUnderline: true } },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          fontWeight: '600',
          fontSize: '14px',
          color: 'rgba(0, 0, 0, 0.6)',
          '&::before': {
            width: '0px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: '700',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          fontWeight: '700',
          borderRadius: '12px',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <Initializer history={history} store={store}>
          <Router>
            <App history={history} />
          </Router>
        </Initializer>
      </StoreProvider>
    </ThemeProvider>
  </React.StrictMode>
);
