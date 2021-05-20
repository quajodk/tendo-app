import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";

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
      <div className="flex w-screen">
          <input type="text" className="bg-gray-400 py-2 rounded px-2" />
      </div>
    </div>
  );
};

export default Header;
