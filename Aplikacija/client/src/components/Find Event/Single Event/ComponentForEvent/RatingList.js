import React, { useEffect, useState } from 'react'
import {
  Paper,
  Container,
  TextField,
  Button,
  Typography,
  Avatar,
} from '@material-ui/core'
import useStyles from '../../style'
import { RatingListItem } from './RatingListItem'

export const RatingList = ({ event, user }) => {
  const [filteredParticipants, setFilteredParticipants] = useState([])
  const classes = useStyles()

  useEffect(() => {
    setFilteredParticipants(
      event?.participants?.filter((el) => el.id != user?.result?._id)
    )
  }, [event])

  return (
    <>
      <Paper elevation={10} className={classes.paperRated}>
        <Typography variant='h5' className={classes.ratedTitle}>
          Rate participant
        </Typography>
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
