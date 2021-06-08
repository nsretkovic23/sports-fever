import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#059dc0',
    color: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: '10px',
    flexGrow: 1,
    fontWeight: 'bold',
  },
  headerOptions: {
    display: 'flex',

    justifyContent: 'space-evenly',
  },
  headerButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttons: {
    color: 'black',
    marginRight: theme.spacing(2),
    fontSize: '14px',
    textTransform: 'none',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  buttonSignIn: {
    backgroundColor: '#6AF2F0',
    '&:hover': {
      backgroundColor: '#6AF2F0',
      boxShadow:
        '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    },
  },
}))
