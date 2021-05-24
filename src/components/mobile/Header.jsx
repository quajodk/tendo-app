import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";
import { FiChevronLeft } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { useHistory } from "react-router-dom";

const Header = ({ title }) => {
  const screens = useSelector((state) => state.mobileScreens);
  const currentScreen = useSelector((state) => state.currentMobileScreen);
  const mobileProductSelect = useSelector((state) => state.mobileProductSelect);
  const productName = useSelector((state) => state.productName);
  const categoryName = useSelector((state) => state.categoryName);
  const mobileSelectedCategory = useSelector(
    (state) => state.mobileSelectedCategory
  );
  const mobileProducts = useSelector((state) => state.orginalMobileProducts);
  const dispatch = useDispatch();
  let history = useHistory();
  const pop = () => {
    if (mobileProductSelect) {
      dispatch({
        type: "selectMobileProduct",
        payload: null,
      });
      history.goBack();
    }
    if (mobileSelectedCategory.length !== 0) {
      dispatch({
        type: "categorySelectedPop",
      });
    }
  };

  const search = (text) => {
    if (currentScreen === 0 && mobileProducts.length !== 0) {
      const filteredProduct = mobileProducts.filter(
        (x) =>
          x.glideStatus === "TRUE" &&
          (x?.product?.toLowerCase().includes(text.toLowerCase()) ||
            x?.skUs?.toLowerCase().includes(text.toLowerCase()))
      );
      console.log(filteredProduct, "search");
      dispatch({
        type: "updateMobileProducts",
        payload: filteredProduct,
      });
    } else {
      dispatch({
        type: "updateMobileProducts",
        payload: mobileProducts,
      });
    }
  };

  return (
    <div className="bg-tendo-bg py-3">
      <div className="flex w-screen ">
        <div className="w-20 flex justify-center items-center">
          {mobileProductSelect || mobileSelectedCategory.length !== 0 ? (
            <div
              className="flex items-center text-lg text-tendo-active"
              onClick={pop}
            >
              <FiChevronLeft size={25} className="text-tendo-active" /> Back
            </div>
          ) : (
            <AiOutlineMenu size={25} className="text-tendo-active" />
          )}
        </div>
        <div className="flex-1 text-center">
          <span className="text-white font-medium text-lg">
            {mobileProductSelect
              ? productName
              : mobileSelectedCategory.length !== 0
              ? categoryName
              : screens[currentScreen]["title"]}
          </span>
        </div>
      </div>
      {[0, 1, 2].includes(currentScreen) && !mobileProductSelect && (
        <div className="flex w-screen mt-3 px-6">
          <div className="flex overflow-x-hidden rounded-lg w-auto flex-1">
            <div className="bg-gray-400 flex items-center px-3 justify-center">
              <BiSearch color="white" size={20} />
            </div>
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="bg-gray-400 placeholder-gray-200 font-thin text-white font-medium flex-1 py-1 outline-none focus:outline-none w-100  w-auto px-2"
              onChange={(e) => search(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
