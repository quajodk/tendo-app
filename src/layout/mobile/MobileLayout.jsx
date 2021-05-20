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
      <div
        className="h-screen"
        // style={{ position: "relative", backgroundColor: "rgb(21, 24, 30)" }}
      >
        <>
          {showOrderForm ? (
            <OrderForm item={selectedMobileItem} />
          ) : (
            <>
              (
              {categorySelected ? (
                <CategoryProductsScreen />
              ) : selectedMobileItem !== null &&
                (currentScreen === 0 ||
                  currentScreen === 1 ||
                  currentScreen === 2) ? (
                <ProductAppBar title={productName} />
              ) : (
                <AppBar title={screens[currentScreen]["title"]} />
              )}
              <MobileBody>
                {selectedMobileItem !== null &&
                (currentScreen === 0 ||
                  currentScreen === 1 ||
                  currentScreen === 2) ? (
                  <ProductDetailsBody item={selectedMobileItem} />
                ) : (
                  screens[currentScreen]["component"]
                )}
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
        </>
      </div>
    </>
  );
};

export default MobileLayer;
