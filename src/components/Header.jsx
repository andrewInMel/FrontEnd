import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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
  Box,
} from "@material-ui/core";
import Alert from "./pages/Alert.jsx";

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
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
      "&:focus": {
        width: "40ch",
      },
    },
  },
  sectionDesktop: {
    display: "none",
    paddingLeft: "20px",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  btnStyle: {
    transform: "scale(1.5)",
    cursor: "pointer",
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

  const handleChangeDropdown = (event) => {
    setDropdown(event.target.value);
    props.filterTasks(event);
  };

  const handleVipToggle = (event) => {
    props.SetVip(event.target.checked);
  };

  const handleSearchValue = (event) => {
    props.setSearchValue(event.target.value);
  };

  const path = props.location.pathname;
  const taskHeader = () => {
    return (
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Box display="flex" flexGrow={10}>
            <Grid item className={classes.search}>
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
          </Box>

          <FormControl style={{ flexGrow: "0.75", paddingBottom: " 20px" }}>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChangeDropdown}
              value={dropdown}
              label="priority"
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"Critical"}>Critical</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Unknown"}>Unknown</MenuItem>
            </Select>
          </FormControl>

          <Box style={{ flexGrow: "0.5", paddingLeft: " 20px" }}>
            {props.taskData && (
              <Alert taskData={props.taskData} style={{ marginTop: "-10px" }} />
            )}
          </Box>
          <AccountCircle
            onClick={handleClickOpen}
            className={classes.btnStyle}
          />
        </Toolbar>
      </AppBar>
    );
  };

  const connectionHeader = () => {
    return (
      <AppBar color="transparent" position="static">
        <Toolbar>
          {/*search bar*/}
          <Grid container direction="row" alignItems="center">
            <Box display="flex" flexGrow={1}>
              <Grid item xs={8} className={classes.search}>
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
                  onChange={handleSearchValue}
                />
              </Grid>
            </Box>
            {/* VIP switch */}
            <Grid item>
              <FormGroup style={{ paddingTop: "10px" }}>
                <FormControlLabel
                  control={<Switch onChange={handleVipToggle} />}
                  label="VIP"
                />
              </FormGroup>
            </Grid>

            <Box style={{ paddingLeft: " 20px" }}>
              {props.taskData && <Alert taskData={props.taskData} />}
            </Box>
            {/* profile */}
            <Grid item className={classes.sectionDesktop}>
              <AccountCircle
                onClick={handleClickOpen}
                className={classes.btnStyle}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  };
  return (
    <div>
      {path === "/Dashboard/task" ? taskHeader() : connectionHeader()}
      {props.data.length !== 0 ? (
        <Profile open={open} onClose={handleClose} userData={props.data} />
      ) : (
        ""
      )}
    </div>
  );
}
