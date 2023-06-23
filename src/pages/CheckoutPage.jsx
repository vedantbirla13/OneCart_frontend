import React from 'react'
import Header from '../components/Layout/Header'
import Checkout from '../components/Checkout/Checkout'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Footer from '../components/Layout/Footer'

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <CheckoutSteps active={1} />
      <Checkout />
      <Footer />
    </div>
  )
}

export default CheckoutPage