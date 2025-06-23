import React from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

const NavbarMenu = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Services", path: "#" },
  { id: 3, title: "About Us", path: "#" },
  { id: 4, title: "Quiz", path: "/quiz" },
  { id: 5, title: "Contact Us", path: "#" },
];

const Navbar = () => {
  return (
    <nav className="relative z-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-10 flex justify-between items-center"
      >
        {/* Logo section */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="w-24 h-24 object-contain rounded-full" />
          <div>
            <h1 className="font-bold text-2xl leading-snug">Trường Cao đẳng Kỹ Thuật Hải quân</h1>
            <h1 className="text-2xl leading-snug">Khoa Thông tin - Ra đa</h1>
            <h1 className="text-2xl leading-snug">Bộ môn Thông tin</h1>
          </div>
        </div>
        {/* Menu section */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-3">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                {menu.path.startsWith("#") ? (
                  <a
                    href={menu.path}
                    className="inline-block py-2 px-3 hover:text-secondary relative group"
                  >
                    <div className="w-2 h-2 bg-secondary absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
                    {menu.title}
                  </a>
                ) : (
                  <Link
                    to={menu.path}
                    className="inline-block py-2 px-3 hover:text-secondary relative group"
                  >
                    <div className="w-2 h-2 bg-secondary absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
                    {menu.title}
                  </Link>
                )}
              </li>
            ))}
            <button className="primary-btn">Sign In</button>
          </ul>
        </div>
        {/* Mobile Hamburger menu section */}
        <div className="lg:hidden">
          <IoMdMenu className="text-4xl" />
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
