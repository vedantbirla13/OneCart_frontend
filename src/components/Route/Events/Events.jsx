import React, { useEffect } from 'react'
import EventCard from "./EventCard.jsx"
import styles from '../../../styles/styles'
import { useSelector } from 'react-redux'

const Events = () => {
  const { allEvents , isLoading } = useSelector((state) => state.events)

  // useEffect(() => {
  //   const data = allEvents && allEvents.find((a,b) => a.sold_out - b.sold_out)
  // }, [])
  
  return (
    <div>
      {
        !isLoading && (
          <div className={`${styles.section}`}>
            <div className={`${styles.heading}`}>
                <h1>Popular events</h1>
            </div>

            <div className='w-full grid'>
              {
                allEvents?.length !== 0 && (
                  <EventCard data={allEvents && allEvents[0]} />
                )
              }

              {
                allEvents?.length === 0 && (
                  <h4 className='text-2xl font-Poppins tracking-wider'>No Events yet!!</h4>
                )
              }
            </div>
        </div> 
        )
      }
    </div>
  )
}

export default Events