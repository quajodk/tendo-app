import React from "react";
import AppBar from "../../components/mobile/appBar";
import MobileBody from "../../components/mobile/mobileBody";
import MobileTapNav from "../../components/mobile/mobileNavTap";
import useSheetData from "../../hooks/useSheetData";
import ProductListing from "./ProductListing";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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
          <Spin indicator={antIcon} />
        ) : (
          <>
            <AppBar />
            <MobileBody>
              <ProductListing items={data} />
            </MobileBody>
            <MobileTapNav />
          </>
        )}
      </div>
    </>
  );
};

export default MobileLayer;
