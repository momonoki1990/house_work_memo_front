import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

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

const MonthlyPage = () => {
  const classes = useStyles();

  let listItem = (
    <TableRow>
      <TableCell align='center'>料理</TableCell>
      <TableCell align='center'>5時間</TableCell>
      <TableCell align='center'>割合</TableCell>
    </TableRow>
  );

  return (
    <div className={classes.root}>
      <div className={classes.detail}>
        <Typography variant='h5'><Box fontWeight='fontWeightBold' style={{ borderBottom: '2px solid #f37053' }}>分類別詳細</Box></Typography>
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

export default MonthlyPage;