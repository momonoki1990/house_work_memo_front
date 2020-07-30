import React, { useEffect, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DeleteIcon from '@material-ui/icons/Delete';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { fetchDailyWorks, deleteWorkOfDaily, DailyActions } from '../actions';


// スタイル
const useStyles = makeStyles(theme => ({
  root: {
  },
  detail: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  grid_row: {
    textAlign: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderBottom: '1px solid #E0E0E0'
  }
}));

// stateセレクター
const worksOfDailySelector = (state: any) => state.daily.works;

const monthOfDailySelector = (state: any) => state.daily.month;

// コンポーネント関数
const DailyPage: React.FC = () => {

  // メディアクエリ
  const theme = useTheme();

  const window_over_sm = useMediaQuery(theme.breakpoints.up('sm'));

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
    <Grid container key={work.id} justify='space-around' className={classes.grid_row}>
      <Grid item xs={12} sm={2} >{format(new Date(work.done_date), 'yyyy年MM月dd日')}</Grid>
      <Grid item xs={2} sm={2}>{work.Category.name}</Grid>
      <Grid item xs={5} sm={2}>{work.note}</Grid>
      <Grid item xs={3} sm={2}>{work.done_hours}時間</Grid>
      <Grid item xs={2} sm={2}>
        {window_over_sm ?
          (<Button variant="contained" color="secondary" data-key={work.id} onClick={handleDelete} startIcon={<DeleteIcon />}>削除</Button>) :
          (<DeleteIcon color='secondary' />)
        }
      </Grid>
    </Grid>
  ));


  return (
    <div className={classes.root}>
      <Container className={classes.detail} maxWidth='lg'>
        <Typography variant='h5'><Box fontWeight='fontWeightBold' mt={6} style={{ borderBottom: '2px solid #f37053' }}>日別詳細</Box></Typography>
        <Box display='flex' justifyContent='space-between' mt={2}>
          <Button variant='contained' onClick={handleSubMonth}><ArrowBackIosIcon /></Button>
          <Typography variant='h6'>{format(month_of_daily, 'yyyy年MM月')}</Typography>
          <Button variant='contained' onClick={handleAddMonth}><ArrowForwardIosIcon /></Button>
        </Box>
        {window_over_sm ? (
          <Box mt={2} p={3} style={{ backgroundColor: '#f6f6f6' }}>
            <Paper>
              {listItem}
            </Paper>
          </Box>
        ) : listItem
        }
      </Container>
    </div>
  )
}

export default DailyPage;