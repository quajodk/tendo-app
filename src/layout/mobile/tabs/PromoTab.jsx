import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import MobilePromoProducts from "../../../components/mobile/mobilePromoProducts";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PromoTab = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let { promoName } = useParams();

  const { originalPromoProducts, promoProducts } = useSelector(
    (state) => state
  );

  const init = useRef({ dispatch });

  promoName =
    promoName.toLowerCase() === "popular products"
      ? "Popular"
      : promoName.toLowerCase() === "flash sales"
      ? "Flash Sale"
      : promoName;

  useEffect(() => {
    const { dispatch } = init.current;
    dispatch({
      type: "setPromoProducts",
      payload: promoName,
    });
    setLoading(false);
  }, [promoName]);

  const productSearch = (text) => {
    if (promoProducts.length !== 0) {
      const filteredProduct = originalPromoProducts.filter(
        (x) =>
          x.glideStatus === "TRUE" &&
          (x?.product?.toLowerCase().includes(text.toLowerCase()) ||
            x?.skUs?.toLowerCase().includes(text.toLowerCase()))
      );

      dispatch({
        type: "updatePromoProducts",
        payload: filteredProduct,
      });
    } else {
      dispatch({
        type: "updatePromoProducts",
        payload: originalPromoProducts,
      });
    }
  };

  return (
    <ScreenWrapper title={promoName} showBackBtn searchFunction={productSearch}>
      <div className="overflow-y-scroll mb-24">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Spin indicator={antIcon} />
          </div>
        ) : (
          <MobilePromoProducts />
        )}
      </div>
    </ScreenWrapper>
  );
};

export default PromoTab;
