import React, { useEffect } from 'react'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component'

export const Notification = ({
  titelText,
  messageText,
  typeOfNotification,
}) => {
  useEffect(() => {
    store.addNotification({
      title: titelText,
      message: messageText,
      type: typeOfNotification,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 4000,
        onScreen: true,
      },
    })
  }, [])

  return (
    <div className='app-container'>
      <ReactNotification />
    </div>
  )
}
