import { createTheme } from "@material-ui/core/styles";

export default createTheme({
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
  overrides: {
    MuiDialog: {
      paperWidthSm: {
        maxWidth: "1500px",
      },
    },
  },
});
