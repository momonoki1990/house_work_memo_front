import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fetchDailyWorks } from '../actions';


const useStyles = makeStyles(theme => ({
  root: {
    //textAlign: 'center'
  },
  detail: {
    padding: '4rem 2rem 2rem 2rem',
    margin: '0 auto',
    maxWidth: '1200px'
  },
  table: {
    minWidth: 650,
  }
}));

const worksOfDailySelector = (state: any) => state.daily.works;

const monthOfDailySelector = (state: any) => state.daily.month;

const DailyPage = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const works_of_daily = useSelector(worksOfDailySelector);

  const month_of_daily = useSelector(monthOfDailySelector);
  
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("毎回実行");
    dispatch(fetchDailyWorks(month_of_daily));
  }, []);

  let listItem = works_of_daily.map((work: any) => (
    <TableRow>
      <TableCell component='th' scope='row'>{format(new Date(work.done_date), 'yyyy年MM月dd日')}</TableCell>
      <TableCell align='center'>{work.Category.name}</TableCell>
      <TableCell align='center'>{work.note}</TableCell>
      <TableCell align='center'>{work.done_hours}時間</TableCell>
      <TableCell align='right'>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Open Menu
      </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>編集する</MenuItem>
          <MenuItem onClick={handleClose}>削除する</MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.detail}>
        <Typography variant='h5'><Box fontWeight='fontWeightBold' style={{ borderBottom: '2px solid #f37053' }}>日別詳細</Box></Typography>
        <Box mt={2} p={3} style={{ backgroundColor: '#f6f6f6' }}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableBody>
                {listItem}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </div>
  )
}

export default DailyPage;