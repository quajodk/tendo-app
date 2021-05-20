import React, { Fragment } from "react";
import AppBar from "../../components/mobile/appBar";
import MobileBody from "../../components/mobile/mobileBody";
import MobileTapNav from "../../components/mobile/mobileNavTap";

import { useSelector } from "react-redux";
import NavItem from "../../components/mobile/navItem";
import ProductDetailsBody from "../../components/mobile/mobileProductDetail";
import ProductAppBar from "../../components/mobile/detailsAppBar";
import OrderForm from "../../components/mobile/orderForm";
import CategoryProductsScreen from "../../components/mobile/categoriesProducts";
import BottomTabNavigation from "../../components/mobile/BottomTabNavigation";
import Header from "../../components/mobile/Header";
import ProductListing from "./ProductListing";

const MobileLayer = () => {
  const screens = useSelector((state) => state.mobileScreens);
  const currentScreen = useSelector((state) => state.currentMobileScreen);
  const selectedMobileItem = useSelector((state) => state.mobileProductSelect);
  const productName = useSelector((state) => state.productName);
  const showOrderForm = useSelector((state) => state.showOrderForm);
  const categorySelected = useSelector((state) => state.categorySelected);
  return (
    <div className="flex h-screen flex-1  flex-col">
      {/* Header Goes here */}
      <Header />
      {/* Body Goes here */}
      <div className="flex-1 overflow-y-scroll bg-tendo-bg">
        <ProductListing />
      </div>
      {/* Bottom Tab navigator */}
      <BottomTabNavigation />
    </div>
  );
};

export default MobileLayer;
