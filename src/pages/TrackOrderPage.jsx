import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import TrackOrder from "../components/TrackOrder.jsx"

const OrdersDetailsPage = () => {
  return (
    <div>
        <Header />
            <TrackOrder />
        <Footer />
    </div>
  )
}

export default OrdersDetailsPage