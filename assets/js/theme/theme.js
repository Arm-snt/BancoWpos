import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "#27C497"
    },
    common: {
      white: "white"
    },
    secondary: {
      main: "#e8E8E8"
    }
  },
  spacing: 10
});

export default theme;