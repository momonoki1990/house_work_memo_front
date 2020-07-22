import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CopyrightIcon from '@material-ui/icons/Copyright';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  top: {
    paddingTop: '20rem',
    paddingBottom: '22rem',
    borderBottom: '1px solid #000',
    backgroundImage: `url(${process.env.PUBLIC_URL}/Background.jpg)`,
    backgroundPosition: 'center 40%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    backgroundBlendMode: 'lighten'
  },
  logo: {
    fontWeight: 'bold',
    letterSpacing: '-2px'
  },
  subtitle: {
    fontWeight: 'bold',
    marginTop: '0.1rem',
  },
  use: {
    padding: '10rem 10rem',
    backgroundColor: '#3F51B5',
    color: '#fff',
  },
  try: {
    padding: '8rem 8rem',
    backgroundColor: '#fff'
  },
  copyright: {
    padding: '8rem 8rem',
    backgroundColor: '#6A6A6A',
    color: '#fff'
  }
}));

const TopPage: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <Typography variant='h1' className={classes.logo}>
          House Work Memo
        </Typography>
        <Typography variant='h4' className={classes.subtitle}>
          毎日の家事を記録しよう。
        </Typography>
      </div>
      <div className={classes.use}>
        <Typography variant='body1'>
          <Box mb={0} fontWeight="fontWeightBold" style={{color: '#f37053'}}>SERVICES</Box>
        </Typography>
        <Typography variant='h3'>
          <Box mb={5} fontWeight="fontWeightBold" letterSpacing={0.1}>House Work Memoではこんなことが可能です</Box>
        </Typography>
        <Grid container>
          <Grid item md={4}>
            <Box pr={3} pl={3}>
              <FavoriteIcon style={{ fontSize: 120 }} />
              <Typography variant="h5">
                <Box mb={1} fontWeight="fontWeightBold">口コミを投稿する</Box>
              </Typography>
              <Typography variant="body1">
                <Box>口コミを投稿する口コミを投稿する口コミを投稿する口コミを投稿する</Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box pr={3} pl={3}>
              <FavoriteIcon style={{ fontSize: 120 }} />
              <Typography variant="h5">
                <Box mb={1} fontWeight="fontWeightBold">口コミを投稿する</Box>
              </Typography>
              <Typography variant="body1">
                <Box>口コミを投稿する口コミを投稿する口コミを投稿する口コミを投稿する</Box>
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box pr={3} pl={3}>
              <FavoriteIcon style={{ fontSize: 120 }} />
              <Typography variant="h5">
                <Box mb={1} fontWeight="fontWeightBold">口コミを投稿する</Box>
              </Typography>
              <Typography variant="body1">
                <Box>口コミを投稿する口コミを投稿する口コミを投稿する口コミを投稿する</Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
      <div className={classes.try}>
        <Typography variant='h4'>
          <Box mb={2} fontWeight="fontWeightBold">さっそく試してみる</Box>
        </Typography>
        <Button variant="contained" color='secondary' size="large">
          <Box fontWeight="fontWeightBold">デモ版を使ってみる</Box>
        </Button>
        
      </div>
      <div className={classes.copyright}><Typography variant='body2'>Copyright <CopyrightIcon fontSize='small' style={{ verticalAlign:'middle'}}/> naoya kumasegawa 2020</Typography></div>
    </div>
  )

}

export default TopPage;