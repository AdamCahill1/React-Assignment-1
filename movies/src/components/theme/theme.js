import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#002F7F',
    },
    secondary: {
      main: '#FF4081',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '4.0rem',
    },
    h2: {
      fontSize: '3.5rem',
    },
    h3: {
      fontSize: '3.0rem',
    },
    h4: {
      fontSize: '2.5rem',
    },
    h5: {
      fontSize: '2.0rem',
    },
    h6: {
      fontSize: '1.5rem',
    },
    h7: {
      fontSize: '1.2rem',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#161616',
    },
    secondary: {
      main: '#404040',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '4.0rem',
    },
    h2: {
      fontSize: '3.5rem',
    },
    h3: {
      fontSize: '3.0rem',
    },
    h4: {
      fontSize: '2.5rem',
    },
    h5: {
      fontSize: '2.0rem',
    },
    h6: {
      fontSize: '1.5rem',
    },
    h7: {
      fontSize: '1.2rem',
    },
  },
});

export { lightTheme, darkTheme };
