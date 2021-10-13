import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Avatar, Typography, Switch } from "@material-ui/core";
// import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import { serverURL } from "./SignIn.jsx";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Button from "@material-ui/core/Button";
import AddSocialMedia from "../AddSocialMedia.jsx";

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    width: "900px",
    height: "600px",
    padding: "20px 30px 0 50px",
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  buttonStyle: {
    padding: "10px",
  },
  iconStyle: {
    margin: "0 10px 0 0",
  },
  sectionGap: {
    paddingBottom: "50px",
  },
  btnColor: {
    backgroundColor: "#c0f0c9",
  },
  bottomStyle: {
    margin: "0 0 -10px 20px",
  },
}));

function AddConnection(props) {
  const classes = useStyles();
  /* connection infomation state */
  const [name, setName] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [occupation, setOccupation] = useState("");
  const [vip, setVip] = useState(false);
  const [twitter, setTwitter] = useState(null);
  const [instagram, setInstagram] = useState(null);
  const [github, setGithub] = useState(null);
  const [linkedIn, setLinkedIn] = useState(null);
  /* helper states */
  const [photoSrc, setPhotoSrc] = useState(null);
  const [linkOpen, setLinkOpen] = useState([false, false, false, false]);
  const myRef = useRef(null);

  /* dialog to set social media link */
  const handleLinkClose = () => {
    setLinkOpen([false, false, false, false]);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleOccupation = (event) => {
    setOccupation(event.target.value);
  };

  const handleVip = () => {
    setVip(!vip);
  };

  /* File upload operation */
  const handleFileSelect = (event) => {
    if (event.target.files[0] != null) {
      setUserPhoto(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (userPhoto !== null) {
      setPhotoSrc(URL.createObjectURL(userPhoto));
      const fd = new FormData();
      fd.append("userPhoto", userPhoto, userPhoto.name);
      axios
        .post(`${serverURL}/abc`, fd)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => {
      setUserPhoto(null);
    };
  }, [userPhoto]);

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <div className={classes.rootStyle}>
        <Grid container direction="row">
          {/* left section */}
          <Grid
            item
            container
            direction="column"
            justifyContent="space-around"
            xs={4}
            style={{ height: "570px" }}
          >
            {/* top seciton */}
            <Grid item container direction="row" alignItems="center">
              {/* photo */}
              <Grid item xs={6}>
                <Avatar
                  alt="user photo"
                  src={photoSrc}
                  className={classes.large}
                  onClick={() => myRef.current.click()}
                >
                  <Typography align="center">Upload Your Image</Typography>
                </Avatar>
                <input
                  type="file"
                  ref={myRef}
                  onChange={handleFileSelect}
                  hidden
                />
              </Grid>
              {/* name and VIP switch */}
              <Grid item container direction="column" xs={6}>
                <Grid item>
                  <TextField
                    value={name}
                    onChange={handleName}
                    InputProps={{ disableUnderline: true }}
                    placeholder="New Contact"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    value={occupation}
                    onChange={handleOccupation}
                    InputProps={{ disableUnderline: true }}
                    placeholder="Occupation"
                  />
                </Grid>
                <Grid item container alignItems="center">
                  <Grid item xs={2}>
                    <Typography variant="subtitle1">VIP</Typography>
                  </Grid>
                  <Switch checked={vip} onChange={handleVip} />
                </Grid>
              </Grid>
            </Grid>
            {/* middle section */}
            <Grid
              item
              container
              direction="column"
              className={`${classes.sectionGap}`}
            >
              {/* twitter */}
              <Grid
                item
                container
                direction="row"
                className={classes.buttonStyle}
              >
                <Grid item className={classes.iconStyle}>
                  <TwitterIcon />
                </Grid>

                <Grid item>
                  {twitter === null ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setLinkOpen([true, false, false, false]);
                      }}
                    >
                      Add Twitter Link
                    </Button>
                  ) : (
                    <a href={twitter}>Twitter</a>
                  )}
                </Grid>
              </Grid>
              {/* instagram */}
              <Grid
                item
                container
                direction="row"
                className={classes.buttonStyle}
              >
                <Grid item className={classes.iconStyle}>
                  <InstagramIcon />
                </Grid>

                <Grid item>
                  {instagram === null ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setLinkOpen([false, true, false, false]);
                      }}
                    >
                      Add Instagram Link
                    </Button>
                  ) : (
                    <a href={instagram}>Instagram</a>
                  )}
                </Grid>
              </Grid>
              {/* github */}
              <Grid
                item
                container
                direction="row"
                className={classes.buttonStyle}
              >
                <Grid item className={classes.iconStyle}>
                  <GitHubIcon />
                </Grid>

                <Grid item>
                  {github === null ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setLinkOpen([false, false, true, false]);
                      }}
                    >
                      Add Github Link
                    </Button>
                  ) : (
                    <a href={github}>Github</a>
                  )}
                </Grid>
              </Grid>
              {/* linkedIn */}
              <Grid
                item
                container
                direction="row"
                className={classes.buttonStyle}
              >
                <Grid item className={classes.iconStyle}>
                  <LinkedInIcon />
                </Grid>
                <Grid item>
                  {linkedIn === null ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setLinkOpen([false, false, false, true]);
                      }}
                    >
                      Add LinkedIn Link
                    </Button>
                  ) : (
                    <a href={linkedIn}>LinkedIn</a>
                  )}
                </Grid>
              </Grid>
              <AddSocialMedia
                open={linkOpen[0]}
                onClose={handleLinkClose}
                setLink={setTwitter}
              />
              <AddSocialMedia
                open={linkOpen[1]}
                onClose={handleLinkClose}
                setLink={setInstagram}
              />
              <AddSocialMedia
                open={linkOpen[2]}
                onClose={handleLinkClose}
                setLink={setGithub}
              />
              <AddSocialMedia
                open={linkOpen[3]}
                onClose={handleLinkClose}
                setLink={setLinkedIn}
              />
            </Grid>
            {/* bottom section */}
            <Grid item className={classes.bottomStyle}>
              <Button classes={{ root: classes.btnColor }} variant="contained">
                Add
              </Button>
            </Grid>
          </Grid>
          {/* middle section */}
          <Grid item container direction="column" xs={7}></Grid>
          {/* right section */}
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    </Dialog>
  );
}

export default AddConnection;
