import React from 'react'
import styles from '../../styles/styles'
import ShopInfo from '../../components/ShopInfo'
import ShopProfileData from '../../components/ShopProfileData'

const ShopPreviewPage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
        <div className='w-full flex justify-between py-20'>
            <div className="w-[25%] bg-[#fff] rounded-[4px] shadow  h-screen sticky top-2 left-0 z-10 ">
              <ShopInfo isOwner={false} />
            </div>

            <div className='w-[72%] rounded-[4px] '>
                <ShopProfileData isOwner={false} />
            </div>
        </div>
    </div>
  )
}

export default ShopPreviewPage