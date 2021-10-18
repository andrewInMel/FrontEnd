import { makeStyles } from "@material-ui/core/styles";
import Image from "../imgs/Banana.svg";
import theme from "./Theme.js";

const extStyles = {
    backgroundLanding: {
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "91% 88%",
        backgroundPosition: "right bottom",
    },
    btnLandingLogIn: {
        height: "5.25vh",
        width: "27.5vw",
        boxShadow: "0px 0.4vh 0.4vh rgba(0, 0, 0, 0.25)",
        color: `${theme.palette.greyBackground.main}`,
        fontWeight: "600",
        fontStyle: "normal",
        lineHeight: "3vh",
        fontSize: "2vh",
        textTransform: "none",
        backgroundColor: `${theme.palette.oceanPrimary.main}`, 
        "&:hover": {
            backgroundColor: "#734f83",
        },
    },
    btnLandingRegister: {
        height: "5.25vh",
        width: "27.5vw",
        boxShadow: "0px 0.4vh 0.4vh rgba(0, 0, 0, 0.25)",
        color: `${theme.palette.greyBackground.main}`,
        fontWeight: "600",
        fontStyle: "normal",
        lineHeight: "3vh",
        fontSize: "2vh",
        textTransform: "none",
        backgroundColor: `${theme.palette.banana.main}`, 
        "&:hover": {
            backgroundColor: "#de7525",
        },
    },
}

//MUI hook method of styling
const getExtClasses =  makeStyles(extStyles);

export { extStyles, getExtClasses}