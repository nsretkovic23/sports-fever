import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { Container, TextField, Avatar, Typography } from '@material-ui/core'
import { format } from 'timeago.js'
import classNames from 'classnames'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
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

  messageText: {
    padding: '10px',
    borderTadius: '20px',
    backgroundColor: '#1877f2',
    color: 'white',
    maxWidth: '300px',
  },

  messageBottom: {
    fontSize: '12px',
    marginTop: '10px',
  },

  own: {
    alignItems: 'flex-end',
  },

  ownMessageText: {
    backgroundColor: 'rgb(245, 241, 241)',
    color: 'black',
  },
}))

export const Message = ({ message, own }) => {
  const classes = useStyles()
  const history = useHistory()

  console.log(message.senderId)
  return (
    <Container
      className={
        own === true
          ? classNames(classes.message, classes.own, classes.ownMessageText)
          : classes.message
      }
    >
      <Container className={classes.messageTop}>
        <Avatar
          className={classes.messageImg}
          src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
          alt=''
          onClick={() => {
            // history.push(`/userProfile/${message.senderId}`)
          }}
        />
        <Typography className={classes.messageText}>{message.text}</Typography>
      </Container>
      <Container className={classes.messageBottom}>
        {format(message?.createdAt)}
      </Container>
    </Container>
  )
}
