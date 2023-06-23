import React from 'react'
import DashboardHeader from '../../components/Dashboard/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/Layout/DashboardSidebar'
import AllCoupons from '../../components/shop/AllCoupons.jsx'


const ShopAllCoupons = () => {
  return (
    <div>
        <DashboardHeader />
        <div className='flex justify-between w-full'>
            <div className=" w-[70px] 800px:w-[330px]">
                <DashboardSidebar active={9} />
            </div>
            <div className="w-full justify-center flex">
               <AllCoupons />
            </div>
        </div>
    </div>
  )
}

export default ShopAllCoupons