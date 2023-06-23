import React from 'react'
import DashboardHeader from '../../components/Dashboard/Layout/DashboardHeader'
import DashboardSidebar from '../../components/Dashboard/Layout/DashboardSidebar'
import CreateProduct from '../../components/Dashboard/CreateProduct.jsx'

const ShopCreateProduct = () => {
  return (
    <div>
        <DashboardHeader />
        <div className='flex items-center justify-between w-full'>
            <div className=" w-[70px] 800px:w-[330px]">
                <DashboardSidebar active={4} />
            </div>
            <div className="w-full justify-center flex">
                <CreateProduct />
            </div>
        </div>
    </div>
  )
}

export default ShopCreateProduct