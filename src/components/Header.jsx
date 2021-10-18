import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Profile from "./pages/Profile.jsx";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "900px",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    paddingLeft: "20px",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dropdown, setDropdown] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeDropdown = (e) => {
    setDropdown(e.target.value);
    props.filterTasks(e);
  };

  const handleVipToggle = (e) => {
    props.filterConnections(e.target.checked);
  };

  const path = props.location.pathname;

  const taskHeader = () => {
    return (
      <AppBar position="static">
        <Toolbar>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={10} className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search by task name…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => props.filterTasks(e)}
              />
            </Grid>
            <Grid item xs={1}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleChangeDropdown}
                  value={dropdown}
                  label="priority"
                >
                  <MenuItem value={""}>All</MenuItem>
                  <MenuItem value={"high"}>High</MenuItem>
                  <MenuItem value={"low"}>Low</MenuItem>
                  <MenuItem value={"medium"}>Medium</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item cs={1} className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleClickOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  };

  const connectionHeader = () => {
    return (
      <AppBar position="static">
        <Toolbar>
          {/*search bar*/}
          <Grid container direction="row" alignItems="center">
            <Grid item xs={10} className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search by  connection or company or location"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => props.filterConnections(e.target.value)}
              />
            </Grid>
            {/* VIP switch */}
            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={<Switch onChange={handleVipToggle} />}
                  label="VIP"
                />
              </FormGroup>
            </Grid>
            {/* profile */}
            <Grid item className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleClickOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <div>
      {path === "/Dashboard/task" ? taskHeader() : connectionHeader()}
      {/*copied taskHeader for now*/}
      <Profile open={open} onClose={handleClose} userData={props.data} />
    </div>
  );
}
