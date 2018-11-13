import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

class SliceTimingCorrection extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange, onValueChange } = this.props

    return (
      <Grid container>
        <Grid item sm={12}>

          <TextField
            select
            label="Slice Acquisition Pattern"
            name="functional.slice_timing_correction.pattern"
            value={configuration.functional.slice_timing_correction.pattern}
            onChange={onValueChange}
            fullWidth={true} margin="normal" variant="outlined"
            className={classes.textField} helperText=''
          >
            <MenuItem value={"header"}>Use NIFTI header</MenuItem>
            <MenuItem value={"alt+z"}>alt+z</MenuItem>
            <MenuItem value={"alt+z2"}>alt+z2</MenuItem>
            <MenuItem value={"alt-z"}>alt-z</MenuItem>
            <MenuItem value={"alt-z2"}>alt-z2</MenuItem>
            <MenuItem value={"seq+z"}>seq+z</MenuItem>
            <MenuItem value={"seq-z"}>seq-z</MenuItem>
          </TextField>

          <TextField
            label="Repetition Time (TR)"
            fullWidth={true} margin="normal" variant="outlined"
            name="functional.slice_timing_correction.repetition_time"
            value={configuration.functional.slice_timing_correction.repetition_time}
            onChange={onValueChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">sec</InputAdornment>,
            }}
            helperText=''
          />

          <TextField
            label="First Timepoint"
            name="functional.slice_timing_correction.first_timepoint"
            value={configuration.functional.slice_timing_correction.first_timepoint}
            onChange={onValueChange}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

          <TextField
            label="Last Timepoint"
            name="functional.slice_timing_correction.last_timepoint"
            value={configuration.functional.slice_timing_correction.last_timepoint}
            onChange={onValueChange}
            fullWidth={true} margin="normal" variant="outlined"
            helperText=''
          />

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(SliceTimingCorrection.styles)(SliceTimingCorrection);