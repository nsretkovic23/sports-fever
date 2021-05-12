import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getEvents } from '../../actions/event'
import '../../styles.css'
import { FindForm } from './FindForm'

export const FindEventPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  return (
    <div className='divFindEventPage'>
      <FindForm />
    </div>
  )
}
