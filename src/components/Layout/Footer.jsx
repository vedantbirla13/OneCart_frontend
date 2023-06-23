import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footerProductLinks,
  footerSupportLinks,
  footercompanyLinks,
} from "../../static/data";
import returnImage from "../../assets/returnImage.png"
import originalImage from "../../assets/originalImage.png"

const Footer = () => {
  return (
    <div className="text-white mt-20">
      <div className="md:flex justify-between md:items-center sm:px-12 px-4 bg-[#362a90fb] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5 font-Poppins ">
          <span className="text-[#17dd1f]">Subscribe</span> us to get latest
          updates  events and offers
        </h1>
        <div>
          <input
            type="email"
            name=""
            required
            placeholder="Enter your email..."
            className="text-gray-800 sm:w-72  w-full sm:mr-5 mr-1 lg:mb-0 mb-5 py-2.5 rounded px-2 focus:outline-none placeholder:font-Poppins"
          />
          <button className="bg-[#1cc321] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white font-Poppins md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-7 sm:px-8 px-5 py-16 sm:text-center justify-center bg-[#362a90fb] ">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <Link to="/">
            <h1 className="text-3xl font-FjallaOne tracking-wider text-[#fff] ">
              OneCart
            </h1>
          </Link>
          <br />
          <p>Everything you need under <br /> one roof.</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {footercompanyLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col justify-around items-center max-sm:hidden">
            <div className="flex  items-center">
            <img src={originalImage} alt="" width={30} />
            <p className="text-[14px]"> <span className="font-semibold ml-4">100% ORIGINAL</span>  guarantee for all products at OneCart.com</p>
            </div>
            <div className="flex items-center">
            <img src={returnImage} alt="" width={30} />
            <p className="text-[14px]"> <span className="font-semibold ml-4">Easy Return within 30 days</span>  of receiving your order</p>
            </div>
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2023 Vedant birla. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
