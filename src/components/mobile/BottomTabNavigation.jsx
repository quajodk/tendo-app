import React from "react";
import MobileTapNav from "./mobileNavTap";

const BottomTabNavigation = () => {
  return (
    <MobileTapNav>
      <NavItem
        icon={<BsFillGrid1X2Fill size={24} />}
        title={"Home"}
        active={currentScreen === 0 ? true : false}
        index={0}
      />
      <NavItem
        icon={<AiFillHdd size={24} />}
        title={"Categories"}
        active={currentScreen === 1 ? true : false}
        index={1}
      />
      <NavItem
        icon={<BsFillGridFill size={24} />}
        title={"Explore"}
        active={currentScreen === 2 ? true : false}
        index={2}
      />
      <NavItem
        icon={<BsFillTagFill size={24} />}
        title={"Promos"}
        active={currentScreen === 3 ? true : false}
        index={3}
      />
      <NavItem
        icon={<FaHeadphonesAlt size={24} />}
        title={"Help"}
        active={currentScreen === 4 ? true : false}
        index={4}
      />
    </MobileTapNav>
  );
};

export default BottomTabNavigation;
