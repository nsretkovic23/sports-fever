import React from 'react'

import { FindEventPage } from './components/Find Event/FindEventPage'
import { CreateEvent } from './components/Create Event/CreateEvent'

const App = () => {
  return (
    <>
      <div>
        <FindEventPage />
        <CreateEvent />
      </div>
    </>
  )
}

export default App
