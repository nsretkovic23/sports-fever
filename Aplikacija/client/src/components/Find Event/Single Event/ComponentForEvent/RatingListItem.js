import React, { useEffect, useState } from 'react'
import {
  Button,
  Typography,
  Avatar,
  TextField,
  Container,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { rateUser } from '../../../../actions/event'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { green } from '@material-ui/core/colors'
import useStyles from '../../style'

export const RatingListItem = ({ idToProfile, event, userId, name }) => {
  const history = useHistory()
  const [mark, setMark] = useState('')
  const dispatch = useDispatch()
  const [canRate, setCanRate] = useState(true)
  const classes = useStyles()

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
  }, [event])

  return (
    <>
      <Container className={classes.rateInfo}>
        <Avatar
          src='https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
          alt=''
          onClick={() => {
            history.push(`/userProfile/${idToProfile}`)
          }}
        />
        <Typography className={classes.rateUserName}>{name}</Typography>
      </Container>
      <Container className={classes.rateInfo}>
        {canRate ? (
          <>
            <TextField
              className={classes.rateInput}
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
            <Button
              className={classes.rateButton}
              variant='contained'
              onClick={(ev) => {
                rateUserr(ev)
              }}
            >
              Rate
            </Button>
          </>
        ) : (
          <Typography>
            Rated successfully{' '}
            <CheckCircleIcon style={{ color: green[500] }}></CheckCircleIcon>
          </Typography>
        )}
      </Container>
    </>
  )
}
