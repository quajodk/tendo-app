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

const MobileLayer = () => {
 
  const selectedMobileItem = useSelector((state) => state.mobileProductSelect);
  const productName = useSelector((state) => state.productName);
  const showOrderForm = useSelector((state) => state.showOrderForm);
  const categorySelected = useSelector((state) => state.categorySelected);
  return (
    <Fragment>
      {/* Header Goes here */}
      
      {/* Body Goes here */}
      <BottomTabNavigation />
    </Fragment>
  );
};

export default MobileLayer;
