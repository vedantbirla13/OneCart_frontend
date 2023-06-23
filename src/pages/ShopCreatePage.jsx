import React, { useEffect } from 'react'
import ShopCreate from "../components/shop/ShopCreate.jsx"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ShopCreatePage = () => {

  const navigate = useNavigate()
  const { isSellerAuthenticated, seller } = useSelector((state) => state.seller)

        useEffect(() => {
            if(isSellerAuthenticated === true){
                navigate(`/dashboard`)
        }
  }, [])

  return (
    <div>
        <ShopCreate />
    </div>
  )
}

export default ShopCreatePage