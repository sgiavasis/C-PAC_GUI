import * as React from 'react';
import { connect } from 'react-redux';
import { configLoad } from '../actions/main'
import { Link } from 'react-router-dom'

import classNames from 'classnames';
import { withStyles, typography } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Paper } from '@material-ui/core';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Slide from '@material-ui/core/Slide';

import {
  PipelineIcon,
  SubjectIcon,
  RunIcon,
  EnvironmentIcon,
  ProjectIcon,
  ProjectOpenIcon,
} from '../components/icons';

import Logo from '../resources/logo.png'


class App extends React.Component {

  static styles = (theme, drawerWidth=240) => ({
    app: {
      position: 'relative',
      height: '100vh'
    },
    header: {

    },
    root: {
      position: 'relative',
      height: '100vh'
    },

    drawer: {
      position: 'absolute'
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing.unit * 9,
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing.unit * 7,
      },
    },

    project: {
      backgroundColor: '#EEE',
      paddingBottom: theme.spacing.unit * 2,
    },
    projectItems: {
      marginLeft: theme.spacing.unit
    },

    content: {
      overflow: 'auto',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: theme.spacing.unit * 9,
      [theme.breakpoints.down('xs')]: {
        left: theme.spacing.unit * 7,
      },
      padding: theme.spacing.unit * 3,
      backgroundColor: theme.palette.background.default,
    }
  });

  componentDidMount() {
    this.props.configLoad()
  }

  state = {
    open: false,
  };

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { project, config: { environments = [] } = {} } = this.props.main
    const { classes, theme } = this.props

    return (
      <div className={classes.app}>
        <header className={classes.header}>
          <Link to={`/`}>
            <img src={Logo} />
          </Link>
        </header>

        <div className={classes.root}>
          <Drawer
            variant="permanent"
            className={classes.drawer}
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !this.state.open && classes.drawerPaperClose
              ),
            }}
            open={this.state.open}
            onMouseOver={this.handleDrawerOpen}
            onMouseOut={this.handleDrawerClose}
          >
            <List>
              <ListItem button component={Link} to={`/projects`}>
                <ListItemIcon>
                  <ProjectIcon />
                </ListItemIcon>
                <ListItemText primary="Projects" />
              </ListItem>

              <ListItem button component={Link} to={`/environments`}>
                <ListItemIcon>
                  <EnvironmentIcon />
                </ListItemIcon>
                <ListItemText primary="Environments" />
              </ListItem>
            </List>

            <Divider />

            { project ? (
            <Slide direction="left" in={!!project} mountOnEnter unmountOnExit>
              <List className={classes.project}>
                <ListItem button component={Link} to={`/projects/${project.id}`}>
                  <ListItemIcon>
                    <ProjectOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary={project.name} />
                </ListItem>

                <Paper className={classes.projectItems}>
                  <ListItem button component={Link} to={`/projects/${project.id}/subjects`}>
                    <ListItemIcon>
                      <SubjectIcon />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                  </ListItem>

                  <ListItem button component={Link} to={`/projects/${project.id}/pipelines`}>
                    <ListItemIcon>
                      <PipelineIcon />
                    </ListItemIcon>
                    <ListItemText primary="Pipelines" />
                  </ListItem>

                  <ListItem button component={Link} to={`/projects/${project.id}/runs`}>
                    <ListItemIcon>
                      <RunIcon />
                    </ListItemIcon>
                    <ListItemText primary="Runs" />
                  </ListItem>
                </Paper>
              </List>
            </Slide>
            ) : null }

          </Drawer>

          <main className={classes.content}>
            {
              environments.length === 0 ?
              null :
              this.props.children
            }
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  main: state.main,
})

const mapDispatchToProps = {
  configLoad,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(App.styles, { withTheme: true })(App))
