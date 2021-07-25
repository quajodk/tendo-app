/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react";
import ShopContent from "./ShopContent";
import { Offline, Online } from "react-detect-offline";
// import NoInternet from "./NoInternet";
import { message } from "antd";

const Shop = () => {
  return (
    <Fragment>
      <Online>
        <ShopContent />
      </Online>
      <Offline>
        {message.info("Check your internet, you're currently offline")}
        <ShopContent />
      </Offline>
    </Fragment>
  );
};

export default Shop;
