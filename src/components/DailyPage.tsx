import React, { useEffect, MouseEvent } from 'react';
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
import DeleteIcon from '@material-ui/icons/Delete';
import { fetchDailyWorks, deleteWorkOfDaily, DailyActions } from '../actions';


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

// stateセレクター
const worksOfDailySelector = (state: any) => state.daily.works;

const monthOfDailySelector = (state: any) => state.daily.month;

const DailyPage = () => {
  const classes = useStyles();

  // グローバルstate
  const works_of_daily = useSelector(worksOfDailySelector);

  const month_of_daily = useSelector(monthOfDailySelector);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("毎回実行");
    dispatch(fetchDailyWorks(month_of_daily));
  }, []);

  // 月遷移ボタンの処理
  const handleAddMonth = () => {
    dispatch(DailyActions.addMonth());
    let month = new Date(month_of_daily);
    month.setMonth(month.getMonth() + 1);
    dispatch(fetchDailyWorks(month));
  }

  const handleSubMonth = () => {
    dispatch(DailyActions.subMonth());
    let month = new Date(month_of_daily);
    month.setMonth(month.getMonth() - 1);
    dispatch(fetchDailyWorks(month));
  }

  // 削除ボタンの処理
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteWorkOfDaily(month_of_daily, event.currentTarget.getAttribute('data-key')));
  }

  // worksリストの中身
  let listItem = works_of_daily.map((work: any) => (
    <TableRow key={work.id}>
      <TableCell component='th' scope='row'>{format(new Date(work.done_date), 'yyyy年MM月dd日')}</TableCell>
      <TableCell align='center'>{work.Category.name}</TableCell>
      <TableCell align='center'>{work.note}</TableCell>
      <TableCell align='center'>{work.done_hours}時間</TableCell>
      <TableCell align='right'>
          <Button variant="contained" color="secondary" data-key={work.id} onClick={handleDelete} startIcon={<DeleteIcon />}>削除</Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.detail}>
        <Typography variant='h5'><Box fontWeight='fontWeightBold' style={{ borderBottom: '2px solid #f37053' }}>日別詳細</Box></Typography>
        <Box display='flex' justifyContent='space-between' mt={2}>
          <Button variant='contained' onClick={handleSubMonth}><ArrowBackIosIcon /></Button>
          <Typography variant='h6'>{format(month_of_daily, 'yyyy年MM月')}</Typography>
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

export default DailyPage;