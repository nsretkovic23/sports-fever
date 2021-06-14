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
  const [filteredParticipants, setFilteredParticipants] = useState([])
  const history = useHistory()
  useEffect(() => {
    setFilteredParticipants(
      event?.participants?.filter((el) => el.id != user?.result?._id)
    )
  }, [])

  return (
    <>
      {filteredParticipants ? (
        <Paper elevation={10}>
          <Typography variant='h5'>
            Average rate of participants in this event
          </Typography>
          {filteredParticipants?.map((el, i) => (
            <>
              <Container>
                <Avatar
                  src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
                  alt=''
                  onClick={() => {
                    history.push(`/userProfile/${el.id}`)
                  }}
                />
                <Typography>{el.name || 'Ime'}</Typography>
                <Typography>{el.avgrate}</Typography>
              </Container>
            </>
          ))}
        </Paper>
      ) : null}
    </>
  )
}
