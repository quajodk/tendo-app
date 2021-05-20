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

const MobileLayer = () => {
  const screens = useSelector((state) => state.mobileScreens);
  const currentScreen = useSelector((state) => state.currentMobileScreen);
  const selectedMobileItem = useSelector((state) => state.mobileProductSelect);
  const productName = useSelector((state) => state.productName);
  const showOrderForm = useSelector((state) => state.showOrderForm);
  const categorySelected = useSelector((state) => state.categorySelected);
  return (
    <Fragment>
      {/* Header Goes here */}
      <Header />
      {/* Body Goes here */}
      <div className="h-auto flex-1 bg-gray-800">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut eum aliquam dolorem sunt odit aperiam reiciendis consequatur at quae id illo provident sint, officia ipsam. Maiores nesciunt cumque quia quae soluta laboriosam dolorum voluptas ullam ducimus atque corporis alias iure voluptates quod fugit illo, esse animi, vel quidem neque? Possimus!
      </div>
      {/* Bottom Tab navigator */}
      <BottomTabNavigation />
    </Fragment>
  );
};

export default MobileLayer;
