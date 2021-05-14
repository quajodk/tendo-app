/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react";
import ShopContent from "./ShopContent";
import ShopNavbar from "./ShopNavbar";
import { useMediaQuery } from "react-responsive";
import MobileLayer from "./mobile/MobileLayout";

const Shop = () => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  return (
    <Fragment>
      {isTabletOrMobile ? (
        <MobileLayer />
      ) : (
        <div className="relative min-h-screen flex flex-col">
          <ShopNavbar />
          <ShopContent />
        </div>
      )}
    </Fragment>
  );
};

export default Shop;
