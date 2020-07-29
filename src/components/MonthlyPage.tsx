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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { fetchMonthlyHoursPerCategory, MonthlyActions } from '../actions';

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

// stateセレクター
const monthOfMonthlySelector = (state: any) => state.monthly.month;

const hoursPerCategoryOfMonthlySelector = (state: any) => state.monthly.hours_per_category;

const MonthlyPage = (props: any) => {
  const classes = useStyles();

  // グローバルstate
  const hours_per_category_of_monthly = useSelector(hoursPerCategoryOfMonthlySelector);

  const month_of_monthly = useSelector(monthOfMonthlySelector);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("毎回実行");
    // 非同期通信してmonth_of_monthly月のhours_per_categoryを取得、stateを更新
    dispatch(fetchMonthlyHoursPerCategory(month_of_monthly));
  }, []);

  // 月遷移ボタンの処理
  const handleAddMonth = () => {
    dispatch(MonthlyActions.addMonth());
    let month = new Date(month_of_monthly);
    month.setMonth(month.getMonth() + 1);
    dispatch(fetchMonthlyHoursPerCategory(month));
  }

  const handleSubMonth = () => {
    dispatch(MonthlyActions.subMonth());
    let month = new Date(month_of_monthly);
    month.setMonth(month.getMonth() - 1);
    dispatch(fetchMonthlyHoursPerCategory(month));
  }

  let listItem = hours_per_category_of_monthly.map((category: any) => (
    <TableRow key={category.id}>
      <TableCell align='center'>{category.name}</TableCell>
      <TableCell align='center'>{category.hours}時間</TableCell>
      <TableCell align='center'>{category.rate}％</TableCell>
    </TableRow>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.detail}>
        <Typography variant='h5'><Box fontWeight='fontWeightBold' style={{ borderBottom: '2px solid #f37053' }}>分類別詳細</Box></Typography>
        <Box display='flex' justifyContent='space-between' mt={2}>
          <Button variant='contained' onClick={handleSubMonth}><ArrowBackIosIcon /></Button>
          <Typography variant='h6'>{format(month_of_monthly, 'yyyy年MM月')}</Typography>
          <Button variant='contained' onClick={handleAddMonth}><ArrowForwardIosIcon /></Button>
        </Box>
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