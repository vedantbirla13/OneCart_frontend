import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`max-sm:flex max-sm:flex-col max-sm:items-start max-md:flex max-md:flex-col max-md:items-start max-lg:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i, index) => (
          <Link
            to={i.url}
            className={`${
              active === index + 1 ? "text-[#17dd1f] " : "text-black 800px:text-[#fff]"
            } pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer font-Poppins `}
          >
            {i.title}
          </Link>
        ))}
    </div>
  );
};

export default Navbar;
