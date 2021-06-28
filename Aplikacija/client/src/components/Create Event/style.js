import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 1000px)': {
      flexDirection: 'column',
    },
  },
  formElement: {
    '@media (max-width: 1000px)': {
      width: '100%',
      maxWidth: '100%',
    },
  },
  mapElement: {
    '@media (max-width: 1000px)': {
      width: '100%',
      maxWidth: '100%',
    },
  },
  paperForCreate: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: '#04D4F0',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  paperForUpdate: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: '#04D4F0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  fileInput: {
    width: '100%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  tField: {
    alignSelf: 'center',
    backgroundColor: '#04ECF0',
    color: 'black',
  },
  buttonCreate: {
    backgroundColor: '#04ECF0',
    alignSelf: 'center',
    marginTop: '10px',
    width: '20%',
    '&:hover': {
      backgroundColor: '#04ECF0',
      boxShadow:
        '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    },
  },
  typography: {
    marginTop: '10px',
  },
  title: {
    marginBottom: '20px',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  buttonReport: {
    backgroundColor: '#04ECF0',
    alignSelf: 'center',
    marginTop: '10px',
    width: '55%',
    '&:hover': {
      backgroundColor: '#04ECF0',
      boxShadow:
        '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    },
  },
}))
