import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

const Header = ({ title }) => {
  const screens = useSelector((state) => state.mobileScreens);
  const currentScreen = useSelector((state) => state.currentMobileScreen);
  return (
    <div className="bg-tendo-bg py-3">
      <div className="flex w-screen ">
        <div className="w-20 flex justify-center items-center ">
          <AiOutlineMenu size={25} className="text-tendo-active" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-white font-medium text-xl">
            {screens[currentScreen]["title"]}
          </span>
        </div>
      </div>
      <div className="flex w-screen px-3">
        <div className="bg-gray-400">
          <BiSearch />
        </div>
        <input
          type="text"
          className="bg-gray-400 flex-1 py-2 outline-none focus:outline-none w-100  w-auto px-2"
        />
      </div>
    </div>
  );
};

export default Header;
