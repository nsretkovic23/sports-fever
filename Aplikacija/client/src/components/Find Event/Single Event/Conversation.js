import React, { useEffect, useRef } from 'react'
import { Paper, Container, TextField, Button } from '@material-ui/core'
import { Message } from './Message'
import useStyles from '../style'
import classNames from 'classnames'

export const Conversation = ({
  messages,
  setNewMessage,
  sendNewMessage,
  newMessage,
  user,
}) => {
  const classes = useStyles()
  const scrollRef = useRef()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <>
      <Paper
        className={classNames(classes.paper, classes.paperMessage)}
        elevation={10}
      >
        <Container className={classes.chatBox}>
          <Container className={classes.chatBoxWeapper}>
            <Container className={classes.chatBoxTop}>
              {messages?.map((m) => (
                <Container ref={scrollRef}>
                  <Message
                    message={m}
                    own={m?.senderId === user?.result?._id}
                  ></Message>
                </Container>
              ))}
            </Container>
            <Container className={classes.chatBoxBottom}>
              <TextField
                id='filled-multiline-static'
                label='Send message'
                multiline
                rows={4}
                variant='outlined'
                value={newMessage}
                onChange={(e) => {
                  e.preventDefault()
                  setNewMessage(e.target.value)
                }}
                className={classes.chatMessageInput}
              />
              <Button
                className={classes.chatSubmitButton}
                variant='contained'
                onClick={(ev) => {
                  sendNewMessage(ev)
                }}
              >
                Send
              </Button>
            </Container>
          </Container>
        </Container>
      </Paper>
    </>
  )
}
