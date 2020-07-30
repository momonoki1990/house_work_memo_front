import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import TopPage from '../TopPage';
import HomePage from '../HomePage';
import MonthlyPage from '../MonthlyPage';
import DailyPage from '../DailyPage';

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  logo: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  links: {
    marginLeft: 'auto',
    marginRight: theme.spacing(6),
    fontWeight: 'bold'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginRight: theme.spacing(4),
    fontWeight: 'bold'
  },
  links_menu: {
    marginLeft: 'auto',
    marginRight: 0,
    fontWeight: 'bold'
  },
  link_menu: {
    color: '#000',
    textDecoration: 'none',
    //fontWeight: 'bold'
  }
}));

const Header: React.FC = () => {
  const classes = useStyles();

  // メディアクエリ
  const theme = useTheme();
  
  const window_over_sm = useMediaQuery(theme.breakpoints.up('sm'));


  // メニュー関連
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              <Link to='/' className={classes.logo}>House Work Memo</Link>
            </Typography>
            {window_over_sm ? (
              <Typography variant="subtitle1" className={classes.links}>
                <Link to='/top' className={classes.link}>トップ</Link>
                <Link to='/' className={classes.link}>ホーム</Link>
                <Link to='/monthly' className={classes.link}>月別</Link>
                <Link to='/daily' className={classes.link}>日別</Link>
              </Typography>) : (
                <Box className={classes.links_menu}>
                  <div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}><MenuIcon style={{ color: '#fff'}}/></Button>
                    <Menu id="header-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                      <MenuItem onClick={handleClose}><Link to='/top' className={classes.link_menu}>トップ</Link></MenuItem>
                      <MenuItem onClick={handleClose}><Link to='/' className={classes.link_menu}>ホーム</Link></MenuItem>
                      <MenuItem onClick={handleClose}><Link to='/monthly' className={classes.link_menu}>月別</Link></MenuItem>
                      <MenuItem onClick={handleClose}><Link to='/daily' className={classes.link_menu}>日別</Link></MenuItem>
                    </Menu>
                  </div>
                </Box>
              )}
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