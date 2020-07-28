import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { fetchMonthlyHoursPerCategory } from '../actions';

const useStyles = makeStyles(theme => ({
  root: {
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

const monthOfMonthlySelector = (state: any) => state.monthly.month;

const hoursPerCategoryOfMonthlySelector = (state: any) => state.monthly.hours_per_category;

const MonthlyPage = (props: any) => {
  const classes = useStyles();

  const hours_per_category_of_monthly = useSelector(hoursPerCategoryOfMonthlySelector);

  const month_of_monthly = useSelector(monthOfMonthlySelector);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("毎回実行");
    // 非同期通信してmonth_of_monthly月のhours_per_categoryを取得、stateを更新
    dispatch(fetchMonthlyHoursPerCategory(month_of_monthly));
  }, []);

  let listItem = hours_per_category_of_monthly.map((category: any) => (
    <TableRow>
      <TableCell align='center'>{category.name}</TableCell>
      <TableCell align='center'>{category.hours}時間</TableCell>
      <TableCell align='center'>{category.rate}％</TableCell>
    </TableRow>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.detail}>
        <Typography variant='h5'><Box fontWeight='fontWeightBold' style={{ borderBottom: '2px solid #f37053' }}>分類別詳細</Box></Typography>
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

export default MonthlyPage;