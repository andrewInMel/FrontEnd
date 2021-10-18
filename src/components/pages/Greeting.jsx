import logo from "../../imgs/Logo.svg";
import { Link } from "react-router-dom";
import { Typography, Container, Grid, Button } from "@material-ui/core";
import { getExtClasses} from "../Style.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  logoStyle: {
    position: "absolute",
    left: "4vw",
    top: "7vh",
    maxWidth: "28%",
  },
  subtitle: {
    fontWeight: "300",
    fontSize: "1.75vh",
    lineHeight: "4.5vh",
    fontStyle: "italic",
    color: '#4F7E83',
  },
  centreContainer: {
    position: "absolute",
    top: "33%",
  },
});

function Greating() {
  const intClasses = useStyles();
  const extClasses = getExtClasses();
  return (
    <div className = {extClasses.backgroundLanding} >
      <img className = {intClasses.logoStyle} src={logo} alt="Logo" />
      <Container className = {intClasses.centreContainer}>
        <div style={{marginBottom: "10vh" }}>
          <Typography variant = "h1" align="center">
            Personal CRM
          </Typography>
          <Typography className = {intClasses.subtitle} align="center">
            Our goal is to make staying connected easy.
          </Typography>
        </div>
        <Grid 
        container 
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        >
          <Grid item>
            <Button className = {extClasses.btnLandingLogIn} component={Link} to="/Signin">
                Login
            </Button>
          </Grid>
          <Grid item>
            <Button className={extClasses.btnLandingRegister} component={Link} to="/SignUp">
                Sign Up
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Greating;
