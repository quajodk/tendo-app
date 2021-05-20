import React from "react";
import AppBar from "../../components/mobile/appBar";
import MobileBody from "../../components/mobile/mobileBody";
import MobileTapNav from "../../components/mobile/mobileNavTap";
import {
  BsFillGrid1X2Fill,
  BsFillGridFill,
  BsFillTagFill,
} from "react-icons/bs";
import { FaHeadphonesAlt } from "react-icons/fa";
import { AiFillHdd } from "react-icons/ai";
import { useSelector } from "react-redux";
import NavItem from "../../components/mobile/navItem";
import ProductDetailsBody from "../../components/mobile/mobileProductDetail";
import ProductAppBar from "../../components/mobile/detailsAppBar";
import OrderForm from "../../components/mobile/orderForm";
import CategoryProductsScreen from "../../components/mobile/categoriesProducts";

const MobileLayer = () => {
  const screens = useSelector((state) => state.mobileScreens);
  const currentScreen = useSelector((state) => state.currentMobileScreen);
  const selectedMobileItem = useSelector((state) => state.mobileProductSelect);
  const productName = useSelector((state) => state.productName);
  const showOrderForm = useSelector((state) => state.showOrderForm);
  const categorySelected = useSelector((state) => state.categorySelected);
  return (
    <>
      
    </>
  );
};

export default MobileLayer;
