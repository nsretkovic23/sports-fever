import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    alignSelf: 'center',
  },
  sideBar: {
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    margin: '20px 20px',
    backgroundColor: '#6af2f0',
    height: '100%',
  },
  buttons: {
    backgroundColor: '#04ECF0',
    alignSelf: 'center',
    '&:hover': {
      backgroundColor: '#04ECF0',
      boxShadow:
        '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    },
    alignSelf: 'flex-end',
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    alignSelf: 'flex-end',
    marginBottom: '20px',
  },
  content: {
    margin: '20px 20px',
    height: '100%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    backgroundColor: '#BEBEBE',
  },
  sideBarButtons: {
    marginTop: '10px',
    alignSelf: 'center',
    padding: '5px',
    backgroundColor: '#6af2f0',
  },

  sideBarAvatar: {
    alignSelf: 'center',
    padding: '5px',
    backgroundColor: '#6af2f0',
    borderBottom: '1px solid grey',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  button: {
    width: '250px',
    alignSelf: 'center',
    margin: '10px 10px',
  },
  paper: {
    height: '100%',
    width: '100%',
  },
  paperEvents: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    flexGrow: '1',
    alignSelf: 'center',
    width: '100%',
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  bannedTag: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  containerEvents: {
    marginTop: '50px',
  },
  avgRateIcon:{
    marginTop:'0px'
  },
  userInfoContainers:{
    backgroundColor: '#6AF2F0',
    borderRadius: '5%',
    boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    fontSize: '15px',
    padding: '5px',
    marginTop: '10px',
  },
}))
