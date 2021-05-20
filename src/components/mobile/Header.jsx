import React from "react";
import { useSelector } from "react-redux";

const Header = ({ title }) => {
  const screens = useSelector((state) => state.mobileScreens);
  const currentScreen = useSelector((state) => state.currentMobileScreen);
  return (
    <div className="bg-tendo-bg py-3">
      <div className="text-center">
        <span>{screens[currentScreen]["title"]}</span>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
