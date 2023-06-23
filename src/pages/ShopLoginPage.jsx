import React, { useEffect } from 'react'
import ShopLogin from "../components/shop/ShopLogin.jsx"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ShopLoginPage = () => {
    const navigate = useNavigate()
        const { isSellerAuthenticated, isLoading } = useSelector((state) => state.seller)
        useEffect(() => {
            if(isSellerAuthenticated === true){
                navigate(`/dashboard`)
        }
  }, [isLoading,isSellerAuthenticated])

  return (
    <div>
        <ShopLogin />
    </div>
  )
}

export default ShopLoginPage