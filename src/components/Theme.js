import { createTheme } from "@material-ui/core/styles";

//Default Global Theme - Define reusable palettes, styles and MUI overrides
export default createTheme({
  //Main font
  typography: {
    fontFamily: ["Poppins"].join(","),
    h1: {
      fontWeight: "400",
      fontSize: "5.85vh",
      lineHeight: "9vh",
      fontStyle: "normal",
      letterSpacing: "0",
    },
    h2: {
      fontWeight: "400",
      fontSize: "7vh",
      lineHeight: "11vh",
      fontStyle: "normal",
      letterSpacing: "0",
      color: '#4B5766',
    },
    caption: {
      textDecoration: "none",
      color: '#1E1E1E',
      fontWeight: "400",
      fontSize: "2vh",
      lineHeight: "3vh",
    }
  },
  //Colour palette that all components will use
  palette: {
    blackish: {
      main: '#1E1E1E',
    },
    greyBackground: {
      main: '#DEE2E3',
    },
    greyForms: {
      main: '#E6E6E6',
      light: '#F9F9F9',
    },
    blueblack: {
      main: '#252B42',
      light: '#BEC0C7',
    },
    greyblueBackground: {
      main: '#B9C7C8',
    },
    steelForms: {
      dark: '#4B5766',
      main: '#6F7985',
      light: '#939AA3',
    },
    greyredBackground: {
      dark: '#CEC4C4',
      main: '#D8D0D0',
      light: '#E2DCDC',
    },
    olive: {
      main: '#95937D',
    },
    maroon: {
      main: '#944646',
    },
    redpurple: {
      main: '#834F69',
    },
    oceanPrimary: {
      main: '#4F7E83',
    },
    banana: {
      main: '#DEB525',
      light: '#E8CC67',
    },
    white: {
      main: '#FFFFFF',
    },
    redExit: {
      main: '#CE7171',
      light: '#F5E3E3',
    },
    greenStatus: {
      main: '#478562',
      light: '#DAE7E0',
    },
    yellowStatus: {
      main: '#F6C721',
      light: '#E8DFBE',
    },
    redStatus: {
      main: '#C91C00',
      light: '#F4D2CC',
    },
  },
  overrides: {
    MuiDialog: {
      paperWidthSm: {
        maxWidth: "1500px",
      },
    },
  },
});