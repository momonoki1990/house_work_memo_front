import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { defaultHomeAction } from '../actions';

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

const worksSelectorOfHome = (state: any) => state.home.works;
const categorySelectorOfForm = (state: any) => state.form.category;
const categoriesSelectorOfHome = (state: any) => state.home.categories; 

const HomePage: React.FC = (props: any) => {
  const classes = useStyles();
  const today = new Date();
  const today_str = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`
  
  const works_of_home = useSelector(worksSelectorOfHome);
  const category_of_form = useSelector(categorySelectorOfForm);
  const categories_of_home = useSelector(categoriesSelectorOfHome);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("毎回実行");
    dispatch(defaultHomeAction());
  }, []);

  // React Hook Form関連
  const { register, handleSubmit, errors } = useForm();
  //const onSubmit = data => console.log(data);

  let works = works_of_home.map((work: any) => (
    <TableRow>
      <TableCell component='th' scope='row'>{format(new Date(work.done_date), 'yyyy年MM月dd日')}</TableCell>
      <TableCell align='center'>{work.Category.name}</TableCell>
      <TableCell align='center'>{work.note}</TableCell>
      <TableCell align='center'>{work.done_hours}時間</TableCell>
    </TableRow>
  ))

  let categories = categories_of_home.map((category: any) => (
    <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.simpleForm}>
        <Typography variant='h5'><Box fontWeight='fontWeightBold' style={{ borderBottom: '2px solid #f37053' }}>カンタン入力{category_of_form}</Box></Typography>
        <Box mt={2} p={3} style={{ backgroundColor: '#f6f6f6' }}>
          <form onSubmit={handleSubmit(data => console.log(data))}>

            <TextField label='日付' type='date' defaultValue={today_str} InputLabelProps={{ shrink: true }} className={classes.calender}
              name="date"
              inputRef={register({ required: true })}
              error={Boolean(errors.title)}
              helperText={errors.title && "選択してください"}
            />

            <TextField
              id="category-select"
              select
              label="分類"
              value='料理'
              //onChange={handleChange}
              variant="outlined"
              inputRef={register({ required: true })}
              error={Boolean(errors.title)}
              helperText={errors.title && "選択してください"}
            >
              {categories}
            </TextField>

            <TextField label='時間を入力してください' variant='outlined' className={classes.input}
              name="hours"
              inputRef={register({ required: true })}
              error={Boolean(errors.title)}
              helperText={errors.title && "入力してください"}
            />
            <Box display='inline-block' mr={3} style={{ padding: '1rem 0', fontSize: '1rem' }}>時間</Box>

            <TextField label='内容を入力してください(任意)' variant='outlined' className={classes.input2} style={{ marginRight: '2rem' }}
              name="note"
              inputRef={register({ required: true, maxLength: 3 })}
              error={Boolean(errors.title)}
              helperText={errors.title && "メモは20文字以内にしてください。"} />

            <Button type='submit' variant="contained" color='secondary' size="large">
              <Box fontWeight="fontWeightBold">保存</Box>
            </Button>

          </form>
        </Box>
      </div>

      <div className={classes.recent}>
        <Typography variant='h5'><Box fontWeight='fontWeightBold' style={{ borderBottom: '2px solid #f37053' }}>最新の入力</Box></Typography>
        <Box mt={2} p={3} style={{ backgroundColor: '#f6f6f6' }}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableBody>
                {works}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </div>
    
  )

}

export default HomePage;