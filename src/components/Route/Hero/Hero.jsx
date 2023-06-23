import React from 'react'
import styles from '../../../styles/styles'
import { Link } from 'react-router-dom'


const Hero = () => {
  return (
    <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex} relative`}
        style={{ 
            backgroundImage: "url(https://www.lsretail.com/hubfs/BLOG_6-technology-trends-reshaping-luxury-fashion-industry.jpg)",
            height:'100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity:0.9,
            // backgroundAttachment: "fixed",
            backgroundPosition: "center right ",
            // paddingTop: "20px"
         }}
    >

        <div className={`${styles.section} w-[90%] 800px:w-[60%] absolute max-md:bottom-20 max-sm:bottom-10 left-10`}>
            <h1 className={`text-[45px] max-xs:text-[35px] font-bold leading-[1.2] 800px:text-[55px] text-white font-Poppins capitalize`}>
                Shop our latest <br/> collection
            </h1>
            <Link to="/products" className='inline-block'>
                <div className={`${styles.hero_button} hover:bg-[#201668]  transition-all duration-300 mt-5 relative `}>
                    <span className='text-[#fff] font-Poppins text-[18px] tracking-widest  '>Shop Now</span>
                </div>
            </Link>
        </div>
        
    </div>
  )
}

export default Hero