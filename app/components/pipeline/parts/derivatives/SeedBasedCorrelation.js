import React, { Component } from 'react';

import { withStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'


class SeedBasedCorrelation extends Component {

  static styles = theme => ({
  });

  render() {
    const { classes, configuration, onChange } = this.props

    return (
      <Grid container spacing={8}>
        <Grid item lg={6} xs={12}>
          <Typography variant="h6">
            Seed-based Correlation
          </Typography>
          <Grid container spacing={8}>
            <Grid item xs={6}>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={6} xs={12} style={{ padding: 20 }}>
          <Typography paragraph></Typography>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(SeedBasedCorrelation.styles)(SeedBasedCorrelation);
