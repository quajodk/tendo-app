import React from "react";
import { useSelector } from "react-redux";

const Header = ({ title }) => {
  const screens = useSelector((state) => state.mobileScreens);
  const currentScreen = useSelector((state) => state.currentMobileScreen);
  return (
    <div className="bg-tendo-bg py-3">
      <div className="flex w-screen ">
        <div className="w-20 "></div>
        <div className="flex-1 text-center">
          <span className="text-white font-medium text-xl">
            {screens[currentScreen]["title"]}
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
