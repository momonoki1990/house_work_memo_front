import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TopPage from '../TopPage';
import HomePage from '../HomePage';
import MonthlyPage from '../MonthlyPage';
import DailyPage from '../DailyPage';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    color: 'white',
    textDecoration: 'none',
    //marginRight: theme.spacing(3),
    fontWeight: 'bold'
  },
  links: {
    marginLeft: 'auto',
    marginRight: theme.spacing(6),
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginRight: theme.spacing(4),
    fontWeight: 'bold'
  }
}));

const Header: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              <Link to='/' className={classes.logo}>House Work Memo</Link>
            </Typography>
            <Typography variant="subtitle1" className={classes.links}>
              <Link to='/top' className={classes.link}>トップ</Link>
              <Link to='/' className={classes.link}>ホーム</Link>
              <Link to='/monthly' className={classes.link}>月別</Link>
              <Link to='/daily' className={classes.link}>日別</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/top' component={TopPage} />
        <Route exact path='/monthly' component={MonthlyPage} />
        <Route exact path='/daily' component={DailyPage} />
      </Switch>
    </div>
  )
}

export default Header;