import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CategoryProductsScreen from "../../../components/mobile/categoriesProducts";
import ScreenWrapper from "../../../components/ScreenWrapper";
// import MobileCategories from "../MobileCategories";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const CategoryTab = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const mobileSelectedCategory = useSelector(
    (state) => state.mobileSelectedCategory
  );

  const originalMobileSelectedCategory = useSelector(
    (state) => state.originalMobileSelectedCategory
  );
  const init = useRef({ dispatch });
  const { categoryName } = useParams();

  useEffect(() => {
    const { dispatch } = init.current;
    dispatch({
      type: "selectedMobileCategory",
      payload: categoryName,
    });
    setLoading(false);
  }, [categoryName]);

  const productSearch = (text) => {
    if (mobileSelectedCategory.length !== 0) {
      const filteredProduct = originalMobileSelectedCategory.filter(
        (x) =>
          x.glideStatus === "TRUE" &&
          (x?.product?.toLowerCase().includes(text.toLowerCase()) ||
            x?.skUs?.toLowerCase().includes(text.toLowerCase()))
      );

      dispatch({
        type: "updateSelectedMobileCategory",
        payload: filteredProduct,
      });
    } else {
      dispatch({
        type: "updateSelectedMobileCategory",
        payload: originalMobileSelectedCategory,
      });
    }
  };

  return (
    <ScreenWrapper
      title={categoryName}
      showBackBtn
      // backFunction={goBackHandler}
      searchFunction={productSearch}
    >
      <div className="overflow-y-scroll mb-24">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Spin indicator={antIcon} />
          </div>
        ) : (
          <CategoryProductsScreen />
        )}
      </div>
    </ScreenWrapper>
  );
};

export default CategoryTab;
