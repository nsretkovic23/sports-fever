import { makeStyles } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'

export default makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    flexGrow: '1',
    alignSelf: 'center',
    width: '100%',
    textAlign: 'center',
    padding: '20px 20px',
    margin: '20px 40px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chatContainer:{
    display:'flex',
    flexDirection:'row',
  },

  paperMessage: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    flexGrow: '1',
    margin: '20px 0px',
  },
  chatBox: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    flexGrow: '1',
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
    marginBottom: '10px',
  },
  chatBoxWeapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    position: 'relative',
    //backgroundColor: 'red',
  },
  info: {
    backgroundColor: 'aqua',
    borderRadius:'10%',
    boxShadow:'0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    fontSize: '20px',
    padding: '5px',
  },
  subtitle:{
    fontSize: '20px',
  },
  infoContainer:{
    display: 'flex',
    justifyContent:'space-evenly',
    flexDirection: 'row',
    padding:'10px',
    backgroundColor:'#04ECF0'
  },
  infoTitle: {
    fontSize: '60px',
    fontWeight: 'bold',
    padding: '5px',
    
  },
  chatBoxTop: {
    height: '100%',
    overflowY: 'scroll',
    paddingRight: '10px',
    maxHeight: '400px',
    width: '90%',
    marginBottom: '20px',
    marginTop: '20px',
    border: 'solid 5px hsla(0, 95%, 35%, 1)',
    borderRadius: '255px 15px 225px 15px/15px 225px 15px 255px',
    background: 'hsla(67, 95%, 95%, 1)',
  },
  chatBoxBottom: {
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    width: '100%',
  },
  chatMessageInput: {
    width: '80%',
    height: '90px',
    padding: '10px',
  },
  chatSubmitButton: {
    width: '70px',
    height: '40px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#04ECF0',
    '&:hover': {
      backgroundColor: '#04ECF0',
      boxShadow:
        '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    },
  },
  messageSenderName: {
    textAlign: 'left',
    fontSize: '12px',
  },
  messageHolder: {
    display: 'flex',
    flexDirection: 'column',
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  messageTop: {
    display: 'flex',
  },

  messageImg: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '10px',
  },
  

  messageTextOwn: {
    padding: '10px',
    borderTadius: '20px',
    backgroundColor: '#1877f2',
    color: 'white',
    maxWidth: '300px',
  },

  messageText: {
    padding: '10px',
    borderTadius: '20px',
    backgroundColor: '#696969	',
    color: 'white',
    maxWidth: '300px',
  },

  messageBottom: {
    fontSize: '12px',
    marginTop: '10px',
  },

  own: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    backgroundColor: 'rgb(245, 241, 241)',
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },

  ownMessageText: {
    backgroundColor: 'rgb(245, 241, 241)',
    color: 'black',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paperForm: {
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(3),
    backgroundColor: '#04D4F0',
  },
  findFrom: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  fileInput: {
    width: '100%',
    margin: '10px 0',
    alignSelf: 'center',
  },
  buttonSubmitForm: {
    marginBottom: 10,
  },
  tField: {
    alignSelf: 'center',
    backgroundColor: '#04ECF0',
    color: 'black',
  },
  buttonsForm: {
    backgroundColor: '#04ECF0',
    alignSelf: 'center',
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
  buttonGroupForm: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '20px',
    alignSelf: 'center',
  },
  ratedParticipant: {
    display: 'flex',
    flexDirection: 'row',
    height: '50px',
    marginBottom: '20px',
  },
  ratedInfo: {
    marginLeft: '15px',
    textAlign: 'center',
  },
  paperRated: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    padding: '20px 20px',
    margin: '20px 40px',
  },
  ratedTitle: {
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  rateInfo: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '15px',
  },
  rateUserName: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginLeft: '20px',
  },
  rateInput: {
    width: '70%',
  },
  rateButton: {
    backgroundColor: '#04ECF0',
    '&:hover': {
      backgroundColor: '#04ECF0',
      boxShadow:
        '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)',
    },
    marginLeft: '30px',
  },

}))

export const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

export const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

export const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)
