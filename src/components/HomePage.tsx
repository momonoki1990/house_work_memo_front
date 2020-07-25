import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { DailyActions, fetchHomeWorks } from '../actions';

const useStyles = makeStyles(theme => ({
  root: {
    //textAlign: 'center'
  },
  simpleForm: {
    padding: '4rem 2rem 2rem 2rem',
    margin: '0 auto',
    maxWidth: '1200px'
  },
  select: {
    minWidth: '120px',
    marginRight: '2rem'
  },
  calender: {
    minWidth: '200px',
    marginRight: '2rem'
  },
  input: {
    minWidth: '200px',
    marginRight: '0.5rem'
  },
  input2: {
    minWidth: '300px',
  },
  recent: {
    padding: '4rem 2rem 2rem 2rem',
    margin: '0 auto',
    maxWidth: '1200px'
  },
  table: {
    minWidth: 650,
  }

}));

const categorySelector = (state: any) => state.form.category;
const monthSelector = (state: any) => state.daily.month;
const homeWorksSelector = (state: any) => state.home.works;

const HomePage: React.FC = (props: any) => {
  const classes = useStyles();
  const today = new Date();
  const today_str = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`
  let listItem = (
    <TableRow>
      <TableCell component='th' scope='row'>2020年7月22日</TableCell>
      <TableCell align='center'>料理</TableCell>
      <TableCell align='center'>スパイスカレー</TableCell>
      <TableCell align='center'>5時間</TableCell>
    </TableRow>
  );
  
  const category = useSelector(categorySelector);
  const daily_month = useSelector(monthSelector);
  const home_works = useSelector(homeWorksSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("毎回実行");
    dispatch(fetchHomeWorks());
  }, []);

  let works = home_works.map((work: any) => (
    <div>{work.note}</div>
  ))

  return (
    <div className={classes.root}>
      <div className={classes.simpleForm}>
        <Typography variant='h5'><Box fontWeight='fontWeightBold' style={{ borderBottom: '2px solid #f37053' }}>カンタン入力{daily_month}</Box></Typography>
        <Box mt={2} p={3} style={{ backgroundColor: '#f6f6f6' }}>
          <TextField label='日付' type='date' defaultValue={today_str} InputLabelProps={{ shrink: true }} className={classes.calender} />
          <FormControl variant='outlined' className={classes.select}>
            <InputLabel id="demo-simple-select-label">分類</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField label='時間を入力してください' variant='outlined' className={classes.input} />
          <Box display='inline-block' mr={3} style={{ padding: '1rem 0', fontSize: '1rem' }}>時間</Box>
          <TextField label='内容を入力してください(任意)' variant='outlined' className={classes.input2} style={{ marginRight: '2rem' }}/>
          <Button variant="contained" color='secondary' size="large">
            <Box fontWeight="fontWeightBold" onClick={() => { dispatch(DailyActions.addMonth()) }}>保存</Box>
          </Button>
        </Box>
      </div>
      <div>{works}</div>
      <div className={classes.recent}>
        <Typography variant='h5'><Box fontWeight='fontWeightBold' style={{ borderBottom: '2px solid #f37053' }}>最新の入力</Box></Typography>
        <Box mt={2} p={3} style={{ backgroundColor: '#f6f6f6' }}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableBody>
                {[listItem, listItem, listItem, listItem, listItem, listItem, listItem, listItem, listItem, listItem]}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </div>
    
  )

}

export default HomePage;