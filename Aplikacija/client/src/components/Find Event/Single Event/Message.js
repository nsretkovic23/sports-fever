import React from 'react'
import { Container, Avatar, Typography } from '@material-ui/core'
import { format } from 'timeago.js'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import useStyles from '../style'

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
            history.push(`/userProfile/${message.senderId}`)
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
