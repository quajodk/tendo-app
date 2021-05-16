import React from "react";
import AppBar from "../../components/mobile/appBar";
import MobileBody from "../../components/mobile/mobileBody";
import MobileTapNav from "../../components/mobile/mobileNavTap";
import useSheetData from "../../hooks/useSheetData";
import ProductListing from "./ProductListing";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  BsFillGrid1X2Fill,
  BsFillGridFill,
  BsFillTagFill,
} from "react-icons/bs";
import { FaHeadphonesAlt } from "react-icons/fa";

import { AiFillHdd } from "react-icons/ai";
import { useSelector } from "react-redux";
import NavItem from "../../components/mobile/navItem";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const MobileLayer = () => {
  const [data, loading] = useSheetData();

  const screens = useSelector((state) => state.mobileScreens);
  const currentScreen = useSelector((state) => state.currentMobileScreen);
  return (
    <>
      <div
        className="h-screen"
        style={{ position: "relative", backgroundColor: "rgb(21, 24, 30)" }}
      >
        {loading && data.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <Spin indicator={antIcon} />
          </div>
        ) : (
          <>
            <AppBar title={screens[currentScreen]["title"]} />
            <MobileBody>
              {React.cloneElement(screens[currentScreen]["component"], {
                items: data,
              })}
            </MobileBody>
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
          </>
        )}
      </div>
    </>
  );
};

export default MobileLayer;
