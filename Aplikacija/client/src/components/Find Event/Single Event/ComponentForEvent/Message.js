import React from 'react'
import { Container, Avatar, Typography } from '@material-ui/core'
import { format } from 'timeago.js'
import classNames from 'classnames'
import { useHistory } from 'react-router-dom'
import useStyles from '../../style'

export const Message = ({ message, own }) => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Container className={own === true ? classes.own : classes.message}>
      <Container>
        <Typography className={classes.messageSenderName}>
          {message.senderName}
        </Typography>
      </Container>
      <Container className={classes.messageTop}>
        <Avatar
          className={classes.messageImg}
          src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
          alt=''
          onClick={() => {
            history.push(`/userProfile/${message?.senderId}`)
          }}
        />
        <Typography
          className={
            own === true ? classes.messageTextOwn : classes.messageText
          }
        >
          {message?.text}
        </Typography>
      </Container>
      <Container className={classes.messageBottom}>
        {format(message?.createdAt)}
      </Container>
    </Container>
  )
}
