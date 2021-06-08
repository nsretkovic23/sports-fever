import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  map: {
    marginTop: '30px',
    marginRight: '10px',
    marginBottom: '15px',
    boxShadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  buttons: {
    backgroundColor: '#04ECF0',
    marginTop: '20px',
    marginBottom: '5px',
    alignSelf: 'center',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#04ECF0',
      boxShadow:
        '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    },
  },
  paper: {
    padding: theme.spacing(3),
    alignSelf: 'center',
  },
  title: {
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  typography: {
    fontSize: '20px',
    padding: theme.spacing(1),
  },
  geolocation: {
    color: '#000000',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    zIndex: '10',
    right: '70px',
    top: '107px',
    width: '35px',
    height: '35px',
    boxShadow: '0 0 0 3px #a1a19f',
  },
  searchLocation: {
    position: 'absolute',
    zIndex: '10',
    left: '57%',
    marginTop: '5px',
  },
  searchLocationInput: {
    border: '4px solid #04ECF0',
    width: '200px',
    height: '25px',
    boxShadow: '0 8px 12px 0 rgba(0,0,0,0.24)',
    fontSize: '16px',
    padding: '2px',
  },
}))
