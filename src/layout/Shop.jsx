/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment } from "react";
import ShopContent from "./ShopContent";
import { Offline, Online } from "react-detect-offline";
import NoInternet from "./NoInternet";

const Shop = () => {
  return (
    <Fragment>
      <Online>
        <ShopContent />
      </Online>
      <Offline>
        <NoInternet />
      </Offline>
    </Fragment>
  );
};

export default Shop;
