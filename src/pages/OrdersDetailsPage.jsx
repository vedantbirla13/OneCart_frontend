import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import UserOrderDetails from "../components/UserOrderDetails.jsx"

const OrdersDetailsPage = () => {
  return (
    <div>
        <Header />
            <UserOrderDetails />
        <Footer />
    </div>
  )
}

export default OrdersDetailsPage