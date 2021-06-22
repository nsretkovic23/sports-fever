import React, { useEffect, useState } from 'react'
import {
  Paper,
  Container,
  TextField,
  Button,
  Typography,
  Avatar,
} from '@material-ui/core'

import { RatingListItem } from './RatingListItem'

export const RatingList = ({ event, user }) => {
  const [filteredParticipants, setFilteredParticipants] = useState([])

  useEffect(() => {
    setFilteredParticipants(
      event?.participants?.filter((el) => el.id != user?.result?._id)
    )
  }, [event])

  return (
    <>
      <Paper elevation={10}>
        {filteredParticipants?.map((el, i) => (
          <RatingListItem
            idToProfile={el.id}
            event={event}
            userId={user?.result?._id}
            key={i}
            name={el.name}
          ></RatingListItem>
        ))}
      </Paper>
    </>
  )
}
