import React, { useEffect, useRef } from "react";
import useSheetData from "../../hooks/useSheetData";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import EmptyImage from "../../assets/emptyImage.jpg";
import ScreenWrapper from "../../components/ScreenWrapper";
import { Link } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const PromoCard = ({ item }) => {
  const find = "tendo-images.s3.amazonaws.com";
  const newStr = "d3ug0vbiixnxyq.cloudfront.net";
  return (
    <Link
      className="cursor-pointer"
      style={{
        boxShadow: "rgba(255, 255, 255, 0) 0px 0px 1px",
        transition: "transform 0.2s ease 0s",
        color: "white",
      }}
      to={`/promotions/${item.promoName}`}
    >
      <div className="relative">
        <div className="h-32 relative rounded-lg overflow-hidden">
          <img
            src={item?.promoBanner.replaceAll(find, newStr) ?? EmptyImage}
            alt="category"
            className="object-cover h-full w-full"
          />
        </div>
        <div
          className="rounded-lg h-full w-full flex flex-col top-0 left-0 overflow-hidden pointer-events-none absolute"
          style={{ background: "rgba(0, 0, 0, 0.4)" }}
        >
          <div
            style={{
              position: "absolute",
              top: "70%",
              left: "8px",
              right: "8px",
              transform: "translateY(-50%)",
            }}
          >
            <div className="mb-0 flex flex-col">
              <div
                style={{
                  color: "white",
                  margin: "0px",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  lineHeight: "1.0625rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "unset",
                }}
              >
                {item?.promoName}
              </div>
              <p className="text-xs text-white font-light mt-2">
                {item?.promoDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const MobilePromo = () => {
  const [data, loading] = useSheetData({
    sheet: "prodHomePromotions",
    method: "GET",
  });
  const { promotions } = useSelector((state) => state);
  const dispatch = useDispatch();

  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;

    dispatch({
      type: "getPromotions",
      payload: data,
    });
  }, [data]);

  return (
    <ScreenWrapper title="Promotions">
      {loading && promotions.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mx-4 pb-16">
          {promotions &&
            promotions.map((item, idx) => (
              <PromoCard item={item} key={idx + 1} />
            ))}
        </div>
      )}
    </ScreenWrapper>
  );
};

export default MobilePromo;
