import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { Chart } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-colorschemes';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { fetchMonthlyHoursPerCategory, MonthlyActions } from '../actions';


// スタイル
const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  detail: {
  },
  grid_row: {
    textAlign: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderBottom: '1px solid #E0E0E0'
  },
  table: {
    minWidth: 650,
  }
}));


// stateセレクター
const monthOfMonthlySelector = (state: any) => state.monthly.month;

const hoursPerCategoryOfMonthlySelector = (state: any) => state.monthly.hours_per_category;


// コンポーネント関数
const MonthlyPage: React.FC = (props: any) => {

  // メディアクエリ
  const theme = useTheme();

  const window_over_sm = useMediaQuery(theme.breakpoints.up('sm'));

  const classes = useStyles();


  // グローバルstate
  const hours_per_category_of_monthly = useSelector(hoursPerCategoryOfMonthlySelector);

  const month_of_monthly = useSelector(monthOfMonthlySelector);

  const dispatch = useDispatch();


  useEffect(() => {
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

  // リストの中身
  let listItem = hours_per_category_of_monthly.map((category: any) => (
    <Grid container key={category.id} justify='space-evenly' className={classes.grid_row}>
      <Grid item xs={2} sm={2} >{category.name}</Grid>
      <Grid item xs={2} sm={2}>{category.hours}時間</Grid>
      <Grid item xs={2} sm={2}>{category.rate}％</Grid>
    </Grid>
  ));

  // 円グラフの描画
  // ラベル用のカテゴリー名の配列
  let labels_for_doughnut_chart = hours_per_category_of_monthly.map((category: any) => {
    return category.name
  });

  // 最後の要素(合計)を削除
  labels_for_doughnut_chart.pop();

  // 表示するデータ用の割合の配列
  let rates_for_doughnut_chart = hours_per_category_of_monthly.map((category: any) => {
    return category.rate;
  });

  // 最後の要素(合計)を削除
  rates_for_doughnut_chart.pop();

  // 円グラフ用のデータ
  let data_for_doughnut_chart = {
    labels: labels_for_doughnut_chart,
    datasets: [
      {
        label: 'sample',
        data: rates_for_doughnut_chart,
      }
    ]
  };

  // 円グラフ用のオプション
  let options_for_doughnut_chart = {
    plugins: {
      colorschemes: {
        scheme: 'brewer.DarkTwo6'
      }
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem: any, data: any) {
          return data.labels[tooltipItem.index]
            + ":"
            + data.datasets[0].data[tooltipItem.index]
            + "％";
        }
      }
    }
  }

  return (
    <Container className={classes.container} maxWidth='lg'>
      <div className={classes.detail}>
        <Typography variant='h5'><Box fontWeight='fontWeightBold' mt={6} style={{ borderBottom: '2px solid #f37053' }}>分類別詳細</Box></Typography>
        <Box display='flex' justifyContent='space-between' mt={2}>
          <Button variant='contained' onClick={handleSubMonth}><ArrowBackIosIcon /></Button>
          <Typography variant='h6'>{format(month_of_monthly, 'yyyy年MM月')}</Typography>
          <Button variant='contained' onClick={handleAddMonth}><ArrowForwardIosIcon /></Button>
        </Box>
        { // undefined除けした上で、データ(合計値)がある場合に、円グラフと表を表示
          (hours_per_category_of_monthly.slice(-1)[0] !== undefined) && (hours_per_category_of_monthly.slice(-1)[0].hours !== 0) ? (
            <React.Fragment>
              <Box mt={2}>
                <Doughnut data={data_for_doughnut_chart} options={options_for_doughnut_chart} />
              </Box>
              {window_over_sm ? (
                <Box mt={2} p={3} style={{ backgroundColor: '#f6f6f6' }}>
                  <Paper>
                    {listItem}
                  </Paper>
                </Box>
              ) : listItem}
            </React.Fragment>
          ) : (
              <Typography variant='h6'><Box mt={3} style={{ textAlign: 'center'}}>登録データがありません</Box></Typography>
          )}
        
      </div>
    </Container>
  )
  
}

export default MonthlyPage;