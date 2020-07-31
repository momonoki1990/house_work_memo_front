import React, { useEffect, MouseEvent } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { defaultHomeAction, createWork, deleteWorkOfHome } from '../actions';


// スタイル
const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    }
  },
  simpleForm: {
    
  },
  flex: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'start'
    }
  },
  date_picker: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2)
    },
  },
  category: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      width: '100%'
    }
  },
  hour: {
    marginRight: theme.spacing(1),
    width: '8rem',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
      width: '80%'
    }
  },
  hour_unit: {
    [theme.breakpoints.up('sm')]: {
      padding: '1rem 0',
      fontSize: '1rem'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '1.5rem 0',
    }
  },
  note: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  button: {
    textAlign: 'center',
    marginTop: theme.spacing(1)
  },
  detail: {

  },
  grid_row_form: {
    
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
const worksSelectorOfHome = (state: any) => state.home.works;

const categoriesSelectorOfHome = (state: any) => state.home.categories; 


// コンポーネント関数
const HomePage: React.FC = (props: any) => {
  
  // メディアクエリ
  const theme = useTheme();

  const window_over_sm = useMediaQuery(theme.breakpoints.up('sm'));

  const classes = useStyles();


  // フォーム用の日付
  const today = new Date();

  const today_str = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`
  

  // グローバルstate
  const works_of_home = useSelector(worksSelectorOfHome);
  
  const categories_of_home = useSelector(categoriesSelectorOfHome);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(defaultHomeAction());
  }, []);


  // React Hook Form関連
  const { register, handleSubmit, errors, control } = useForm();


  // フォームの処理(work作成)
  const onSubmit = (data: any) => {
    dispatch(createWork(data));
  };


  // 削除ボタンの処理
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteWorkOfHome(event.currentTarget.getAttribute('data-key')));
  }

  // worksリストの中身
  let listItem = works_of_home.map((work: any) => (
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
  ))

  // カテゴリー選択肢
  let categories = categories_of_home.map((category: any) => (
    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
  ));


  // フォームの中身
  const simple_form = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.flex}>
        <div>
          <TextField label='日付' type='date' defaultValue={today_str} InputLabelProps={{ shrink: true }} className={classes.date_picker}
            name="date" inputRef={register({ required: true })} error={Boolean(errors.title)} helperText={errors.title && "必須項目です。"} />
        </div>
        <div>
          <Controller as={<TextField id="category-select" select label="分類" variant="outlined" />}
            control={control} name='category' defaultValue='1' className={classes.category}>{categories}</Controller>
        </div>
        <div>
          <TextField label='時間を入力' variant='outlined' type='number' className={classes.hour} name="hours" inputRef={register({ required: true })}
            error={Boolean(errors.hours)} helperText={errors.hours && '必須項目です。'} />
          <Box display='inline-block' className={classes.hour_unit}>時間</Box>
        </div>
      </div>
      <TextField label='内容を入力(任意)' variant='outlined' className={classes.note}
        name="note" inputRef={register({ maxLength: 30 })} error={Boolean(errors.note)} helperText={errors.note && "メモは30文字以内にしてください。"} />
      <div className={classes.button}>
        <Button type='submit' variant="contained" color='secondary' size="large">
          <Box fontWeight="fontWeightBold">保存</Box>
        </Button>
      </div>
    </form>
  )


  return (
    <Container className={classes.container} maxWidth='lg'>
      <div className={classes.simpleForm}>
        <Typography variant='h5'><Box fontWeight='fontWeightBold' mt={6} style={{ borderBottom: '2px solid #f37053' }}>カンタン入力</Box></Typography>
        <Box mt={2} p={3} style={{ backgroundColor: '#f6f6f6' }}>
          {simple_form}
        </Box>
      </div>
      <div className={classes.detail}>
        <Typography variant='h5'><Box fontWeight='fontWeightBold' mt={6} style={{ borderBottom: '2px solid #f37053' }}>最新の入力</Box></Typography>
        {window_over_sm ? (
          <Box mt={2} p={3} style={{ backgroundColor: '#f6f6f6' }}>
            <Paper>
              {listItem}
            </Paper>
          </Box>
        ) : listItem
        }
      </div>
    </Container>
  )
}

export default HomePage;