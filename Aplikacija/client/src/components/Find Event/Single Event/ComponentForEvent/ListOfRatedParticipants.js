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
import useStyles from '../../style'

export const ListOfRatedParticipants = ({ event, user }) => {
  const history = useHistory()
  const classes = useStyles()

  return (
    <>
      {event ? (
        <Paper elevation={10} className={classes.paperRated}>
          <Typography variant='h5' className={classes.ratedTitle}>
            Average rate of participants in this event
          </Typography>
          {event?.participants?.map((el, i) => (
            <>
              <Container key={i} className={classes.ratedParticipant}>
                <Avatar
                  src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
                  alt=''
                  onClick={() => {
                    history.push(`/userProfile/${el.id}`)
                  }}
                  key={i + 'a'}
                />
                <Typography key={i + 'b'} className={classes.ratedInfo}>
                  {el.name || 'Ime'} -
                </Typography>
                <Typography key={i + 'c'} className={classes.ratedInfo}>
                  Avg Rate: {el.avgrate}
                </Typography>
              </Container>
            </>
          ))}
        </Paper>
      ) : null}
    </>
  )
}
