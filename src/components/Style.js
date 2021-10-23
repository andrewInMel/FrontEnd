import { makeStyles } from "@material-ui/core/styles";
import Image from "../imgs/Banana.svg";
import theme from "./Theme.js";

const extStyles = {
  backgroundLanding: {
    width: "100vw",
    height: "100vh",
    backgroundImage: `url(${Image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "91vw 89vh",
    backgroundPosition: "right bottom",
  },
  btnLandingLogIn: {
    height: "5vh",
    width: "23vw",
    boxShadow: "0px 0.4vh 0.4vh rgba(0, 0, 0, 0.25)",
    color: `${theme.palette.greyBackground.main}`,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: "3vmin",
    fontSize: "2vmin",
    textTransform: "none",
    backgroundColor: `${theme.palette.oceanPrimary.main}`,
    "&:hover": {
      backgroundColor: "#734f83",
    },
  },
  btnLandingRegister: {
    height: "5vh",
    width: "23vw",
    boxShadow: "0px 0.4vh 0.4vh rgba(0, 0, 0, 0.25)",
    color: `${theme.palette.greyBackground.main}`,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: "3vmin",
    fontSize: "2vmin",
    textTransform: "none",
    backgroundColor: `${theme.palette.banana.main}`,
    "&:hover": {
      backgroundColor: "#de7525",
    },
  },
};

//MUI hook method of styling
const getExtClasses = makeStyles(extStyles);

export { extStyles, getExtClasses };
