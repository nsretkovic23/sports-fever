import React, { useEffect, useState } from 'react'
import {
  Paper,
  Container,
  Button,
  Typography,
  Avatar,
  TextField,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { rateUser } from '../../../actions/event'

export const RatingListItem = ({ idToProfile, event, userId }) => {
  const history = useHistory()
  const [mark, setMark] = useState('')
  const dispatch = useDispatch()
  const [canRate, setCanRate] = useState(true)

  const rateUserr = (ev) => {
    ev.preventDefault()
    const ratingInfo = {
      eventId: event._id,
      graderId: userId,
      gradedId: idToProfile,
      rate: mark,
    }
    dispatch(rateUser(ratingInfo))
  }

  useEffect(() => {
    let temp = event?.ratings?.filter(
      (el) =>
        el.graderid.localeCompare(userId) === 0 && el.gradedid === idToProfile
    )
    if (temp.length > 0) setCanRate(false)
  }, [])

  return (
    <>
      <Avatar
        src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
        alt=''
        onClick={() => {
          history.push(`/userProfile/${idToProfile}`)
        }}
      />
      <TextField
        name='mark'
        id='marks'
        type='number'
        variant='outlined'
        label='Mark'
        fullWidth
        value={mark}
        onChange={(ev) => {
          ev.preventDefault()
          setMark(ev.target.value)
        }}
      />
      {canRate ? (
        <Button
          variant='contained'
          onClick={(ev) => {
            rateUserr(ev)
          }}
        >
          Rate
        </Button>
      ) : null}
    </>
  )
}
