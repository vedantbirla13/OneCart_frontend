import React, { useEffect } from 'react'
import ShopCreate from "../components/shop/ShopCreate.jsx"
import { useNavigate } from 'react-router-dom'

const ShopCreatePage = () => {

  const navigate = useNavigate()


  return (
    <div>
        <ShopCreate />
    </div>
  )
}

export default ShopCreatePage