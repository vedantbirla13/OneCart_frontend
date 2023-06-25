import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import EventCard from '../components/Route/Events/EventCard'
import { useSelector } from 'react-redux'

const EventsPage = () => {
  const { allEvents  } = useSelector((state) => state.events)

  // const [data, setData] = useState()

  return (
    <div>
        <Header activeHeading={4} />
        <EventCard data={allEvents && allEvents[0]} />
    </div>
  )
}

export default EventsPage
