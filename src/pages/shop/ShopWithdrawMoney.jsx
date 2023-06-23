import React from 'react'
import WithdrawMoney from "../../components/shop/WithdrawMoney.jsx"
import DashboardHeader from '../../components/Dashboard/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/Layout/DashboardSidebar'

const ShopWithdrawMoney = () => {
  return (
    <div>
        <DashboardHeader />
      <div className="flex items-center justify-between  w-full">
        <div className="w-[80px] 800px:w-[330px] ">
          <DashboardSidebar active={7} />
        </div>
        <WithdrawMoney />
      </div>
    </div>
  )
}

export default ShopWithdrawMoney