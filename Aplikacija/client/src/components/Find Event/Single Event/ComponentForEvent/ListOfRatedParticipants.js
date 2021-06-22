import React, { useEffect, useState } from 'react'
import {
  Paper,
  Container,
  TextField,
  Button,
  Typography,
  Avatar,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

export const ListOfRatedParticipants = ({ event, user }) => {
  const history = useHistory()

  return (
    <>
      {event ? (
        <Paper elevation={10}>
          <Typography variant='h5'>
            Average rate of participants in this event
          </Typography>
          {event?.participants?.map((el, i) => (
            <>
              <Container key={i}>
                <Avatar
                  src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
                  alt=''
                  onClick={() => {
                    history.push(`/userProfile/${el.id}`)
                  }}
                  key={i + 'a'}
                />
                <Typography key={i + 'b'}>{el.name || 'Ime'}</Typography>
                <Typography key={i + 'c'}>{el.avgrate}</Typography>
              </Container>
            </>
          ))}
        </Paper>
      ) : null}
    </>
  )
}
