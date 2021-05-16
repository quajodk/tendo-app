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
import NavItem from "../../components/mobile/navItem";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const MobileLayer = () => {
  const [data, loading] = useSheetData();
  console.log(data, loading, "data from sheet");
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
            <AppBar title={"Home"} />
            <MobileBody>
              <ProductListing items={data} />
            </MobileBody>
            <MobileTapNav>
              <NavItem icon={<BsFillGrid1X2Fill size={24} />} title={"Home"} />
              <NavItem icon={<AiFillHdd size={24} />} title={"Categories"} />
              <NavItem icon={<BsFillGridFill size={24} />} title={"Explore"} />
              <NavItem icon={<BsFillTagFill size={24} />} title={"Promos"} />
              <NavItem icon={<FaHeadphonesAlt size={24} />} title={"Help"} />
            </MobileTapNav>
          </>
        )}
      </div>
    </>
  );
};

export default MobileLayer;
