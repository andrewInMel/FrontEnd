import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Grid, IconButton, TextField } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function AddSocialMedia(props) {
  const [onelink, setOneLink] = useState("");

  const handleOneLink = (event) => {
    setOneLink(event.target.value);
  };
  const addLink = () => {
    props.setLink(onelink);
    props.onClose();
  };
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <Grid container direction="row" alignItems="center">
        <Grid>
          <TextField
            id="Member Name"
            label="Member Name"
            variant="outlined"
            onChange={handleOneLink}
            value={onelink}
          />
        </Grid>
        <Grid>
          <IconButton onClick={addLink} style={{ margin: "5px" }}>
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default AddSocialMedia;
