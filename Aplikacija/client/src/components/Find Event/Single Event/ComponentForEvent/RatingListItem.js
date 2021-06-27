import React, { useEffect, useState } from 'react'
import {
  Button,
  Typography,
  Avatar,
  TextField,
  Container,
  Select,
  MenuItem,
} from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { rateUser } from '../../../../actions/event'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { green } from '@material-ui/core/colors'
import useStyles from '../../style'
import { BootstrapInput } from '../../style'
export const RatingListItem = ({
  idToProfile,
  event,
  userId,
  name,
  userImg,
}) => {
  const history = useHistory()
  const [mark, setMark] = useState('')
  const dispatch = useDispatch()
  const [canRate, setCanRate] = useState(true)
  const classes = useStyles()
  const arrayOfNumbers = [0, 1, 2, 3, 4, 5]
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

  console.log(mark)
  return (
    <>
      <Container className={classes.rateInfo}>
        <Avatar
          src={
            userImg ||
            'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png'
          }
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
            <Select
              labelId='demo-customized-select-label'
              name='mark'
              id='demo-customized-select'
              value={mark}
              onChange={(ev) => {
                ev.preventDefault()
                setMark(ev.target.value)
              }}
              input={<BootstrapInput />}
            >
              {arrayOfNumbers.map((el) => {
                return (
                  <MenuItem value={el}>
                    <em>{el}</em>
                  </MenuItem>
                )
              })}
            </Select>
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
