import React, { useState /*, useEffect */ } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Switch, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import { serverURL } from "./SignIn.jsx";

const useStyles = makeStyles(() => ({
  rootStyle: {
    width: "950px",
    height: "600px",
    padding: "40px 30px 40px 40px",
  },
}));

function Profile(props) {
  const classes = useStyles();
  const data = props.userData;
  const id = sessionStorage.getItem("id");
  /* connection details */
  const [emailAddress, setEmailAddress] = useState(data.email);
  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [phone, setPhone] = useState(data.phone);
  const [company, setCompany] = useState(data.company);
  const [birthday, setBirthday] = useState(data.birthday);
  const [description, setDescription] = useState(data.description);
  const [vip, setVip] = useState(data.vip);

  function clearInfo() {
    setEmailAddress("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setCompany("");
    setBirthday("");
    setDescription("");
    setVip(false);
  }

  function postConnection() {
    axios
      .patch(`${serverURL}/api/users/${id}`, {
        userId: id,
        emailAddress: emailAddress,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone,
        company: company,
        birthday: birthday,
        description: description,
        Vip: vip,
      })
      .then((res) => {
        if (res.data.status === "success") {
          console.log(res.data);
          clearInfo();
          props.onClose();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handlerClose = () => {
    clearInfo();
    props.onClose();
  };
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <Grid container direction="row" className={classes.rootStyle}>
        <Grid container item>
          <Grid item xs={11}>
            <h2 id="simple-modal-title">{`${firstName} ${lastName}`}</h2>
          </Grid>
          <Grid item>
            <Button onClick={handlerClose}>
              <CloseIcon />
            </Button>
          </Grid>
        </Grid>
        <Grid container item alignItems="center">
          <Grid item xs={4}>
            <h3>Email Address</h3>
          </Grid>
          <TextField
            InputProps={{ disableUnderline: true }}
            placeholder="example@email.com"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </Grid>
        <Grid container item alignItems="center">
          <Grid item xs={4}>
            <h3>Phone Number</h3>
          </Grid>
          <TextField
            placeholder="+61 XXX XXX XXX"
            InputProps={{ disableUnderline: true }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid container item alignItems="center">
          <Grid item xs={4}>
            <h3>Company</h3>
          </Grid>
          <TextField
            placeholder="Monsters Inc."
            InputProps={{ disableUnderline: true }}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Grid>
        <Grid container item alignItems="center">
          <Grid item xs={4}>
            <h3>Birthday</h3>
          </Grid>
          <TextField
            InputProps={{ disableUnderline: true }}
            value={birthday}
            type="date"
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Grid>
        <Grid container item alignItems="center">
          <Grid item xs={4}>
            <h3>Description</h3>
          </Grid>
          <TextField
            InputProps={{ disableUnderline: true }}
            placeholder="Description."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
    {/*     <Grid container item alignItems="center">
          <Grid item xs={4}>
            <h3>VIP</h3>
          </Grid>
          <Switch checked={vip} onChange={() => setVip(!vip)} />
        </Grid> */}
        <Button
          variant="contained"
          style={{
            backgroundColor: "#478562",
            color: "#DEE2E3",
          }}
          onClick={postConnection}
        >
          Save
        </Button>
      </Grid>
    </Dialog>
  );
}

export default Profile;
