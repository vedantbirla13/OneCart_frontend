import React, { useEffect } from 'react'
import Signup from "../components/Signup/Signup.jsx"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SignupPage = () => {

  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.user)
  return (
    <div>
        <Signup />
    </div>
  )
}

export default SignupPage