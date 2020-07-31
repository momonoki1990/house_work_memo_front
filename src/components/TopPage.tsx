import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CopyrightIcon from '@material-ui/icons/Copyright';
import Paper from '@material-ui/core/Paper';
import FaceIcon from '@material-ui/icons/Face';
import CreateIcon from '@material-ui/icons/Create';

// スタイル
const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
  top: {
    /*paddingTop: theme.spacing(36),
    paddingBottom: theme.spacing(36),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },*/
    borderBottom: '1px solid #000',
    backgroundImage: `url(${process.env.PUBLIC_URL}/Background.jpg)`,
    backgroundPosition: 'center 40%',
    //backgroundColor: 'rgba(255,255,255,0.5)',
    //backgroundBlendMode: 'lighten',
    backgroundSize: 'cover'
  },
  cover: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  cover2: {
    paddingTop: theme.spacing(36),
    paddingBottom: theme.spacing(36),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(20),
    },
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
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(10),
    },
    backgroundColor: '#3F51B5',
    color: '#fff',
  },
  grid_item: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
  },
  paper: {
    width: '80%',
    margin: ' 0 auto',
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(0),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(0),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }
  },
  try: {
    paddingTop: theme.spacing(16),
    paddingBottom: theme.spacing(16),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10),
    },
    backgroundColor: '#fff'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  copyright: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
    backgroundColor: '#E6E6E6',
    color: '#000'
  }
}));


// コンポーネント関数
const TopPage: React.FC = () => {

  const classes = useStyles();


  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.cover}>
          <div className={classes.cover2}>
            <Container maxWidth='lg'>
              <Typography variant='h1' className={classes.logo}>
                House Work Memo
              </Typography>
              <Typography variant='h4' className={classes.subtitle}>
                毎日の家事を記録しよう
              </Typography>
            </Container>
          </div>
        </div>
      </div>
      <div className={classes.use}>
        <Container maxWidth='lg'>
          <Typography variant='h3'>
            <Box mb={5} fontWeight="fontWeightBold" letterSpacing={0.1} ><span >こんなことができます</span></Box>
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={4} className={classes.grid_item}>
              <Paper className={classes.paper}>
                <CreateIcon style={{ fontSize: 120, color: '#f37053' }} />
                <Typography variant="h5">
                  <Box mt={1} mb={2} fontWeight="fontWeightBold"><span style={{ borderBottom: '2px solid #f37053' }}>記録に残す</span></Box>
                </Typography>
                <Box pr={2} pl={2}>
                  <Typography variant="body1">いつ・何の家事をどれだけやったか、記録に残すことができます。</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.grid_item}>
              <Paper className={classes.paper}>
                <FaceIcon style={{ fontSize: 120, color: '#f37053' }} />
                <Typography variant="h5">
                  <Box mt={1} mb={2} fontWeight="fontWeightBold"><span style={{ borderBottom: '2px solid #f37053' }}>振り返る</span></Box>
                </Typography>
                <Box pr={2} pl={2}>
                  <Typography variant="body1">月別・分類別に作業時間を振り返ることができます。</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4} className={classes.grid_item}>
              <Paper className={classes.paper}>
                <FavoriteIcon style={{ fontSize: 120, color: '#f37053' }} />
                <Typography variant="h5">
                  <Box mt={1} mb={2} fontWeight="fontWeightBold"><span style={{ borderBottom: '2px solid #f37053' }}>思い出になる</span></Box>
                </Typography>
                <Box pr={2} pl={2}>
                  <Typography variant="body1">ひとつひとつの何でもない家事が、見返してみると思い出になります。</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
      <div className={classes.try}>
        <Typography variant='h4'>
          <Box mb={2} fontWeight="fontWeightBold">さっそく試してみる</Box>
        </Typography>
        <Button variant="contained" color='secondary' size="large">
          <Box fontWeight="fontWeightBold"><Link to='/home' className={classes.link}>デモ版を使ってみる</Link></Box>
        </Button>
      </div>
      <div className={classes.copyright}><Typography variant='body2'>Copyright <CopyrightIcon fontSize='small' style={{ verticalAlign: 'middle' }} /> naoya kumasegawa 2020</Typography></div>
    </div>
  )

}

export default TopPage;