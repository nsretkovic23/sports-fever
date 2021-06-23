import React, { useEffect, useRef, useState } from 'react'
import { Paper, Container, TextField, Button } from '@material-ui/core'
import { Message } from './Message'
import useStyles from '../../style'
import classNames from 'classnames'
import { io } from 'socket.io-client'
import { sendMessage } from '../../../../actions/event'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const ENDPOINT = 'localhost:5000'
let socket
var connectionOptions = {
  'force new connection': true,
  reconnectionAttempts: 'Infinity',
  timeout: 10000,
  transports: ['websocket'],
}

export const Conversation = ({ messages, user, conversationID }) => {
  const classes = useStyles()
  const scrollRef = useRef()
  const [socketMessages, setSocketMessages] = useState([])
  const dispatch = useDispatch()
  const location = useLocation()
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [socketMessages])

  useEffect(() => {
    socket = io(ENDPOINT)
    if (conversationID) {
      socket.emit(
        'join',
        {
          name: user?.result?.name,
          room: conversationID,
        },
        (error) => {
          if (error) {
            console.log(error)
          }
        }
      )
    }
    if (messages) {
      setSocketMessages(messages)
      console.log('HEY')
    }
    return () => {
      socket.disconnect()
      socket.off()
    }
  }, [ENDPOINT, location.search, conversationID])

  useEffect(() => {
    socket.on('message', (message) => {
      let temp = socketMessages
      temp?.push({ ...message })
      setSocketMessages(temp)
      console.log('newMessage')
    })
  }, [socket])

  const sendNewMessage = (ev) => {
    ev.preventDefault()
    if (newMessage) {
      socket.emit('sendMessage', {
        conversationId: conversationID,
        senderId: user?.result?._id,
        senderName: user?.result?.name,
        text: newMessage,
      })
      dispatch(
        sendMessage({
          conversationId: conversationID,
          senderId: user?.result?._id,
          senderName: user?.result?.name,
          text: newMessage,
        })
      )
      setNewMessage('')
    }
  }

  return (
    <>
      <Paper className={classNames(classes.paperMessage)} elevation={10}>
        <Container className={classes.chatBox}>
          <Container className={classes.chatBoxWeapper}>
            <Container className={classes.chatBoxTop}>
              {socketMessages?.map((m, i) => (
                <Container
                  ref={scrollRef}
                  key={i}
                  className={classes.messageHolder}
                >
                  <Message
                    message={m}
                    own={m?.senderId === user?.result?._id}
                    key={i}
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
