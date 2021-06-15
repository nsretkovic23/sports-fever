import React, { useEffect } from 'react'
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component'

export const Notification = ({ notification, setNotification }) => {
  useEffect(() => {
    store.addNotification({
      title: notification.titleText,
      message: notification.messageText,
      type: notification.typeOfNotification,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 4000,
        onScreen: true,
      },
      onRemoval: () => {
        setNotification(false)
      },
    })
  }, [])

  return (
    <div className='app-container'>
      <ReactNotification />
    </div>
  )
}
