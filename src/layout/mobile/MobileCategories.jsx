import React, { useEffect, useRef } from "react";
import useSheetData from "../../hooks/useSheetData";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import EmptyImage from "../../assets/emptyImage.jpg";
import { gDriveFileId, isSafari } from "../../utils/utils";
import ScreenWrapper from "../../components/ScreenWrapper";
import { Link } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const MobileCategories = () => {
  const [data, loading] = useSheetData({ sheet: "categories", method: "GET" });
  const mobileCategories = useSelector((state) => state.mobileCategories);
  const categories = useSelector((state) => state.originalMobileCategories);
  const dispatch = useDispatch();
  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;
    mobileCategories.length === 0 &&
      dispatch({
        type: "getMobileCategory",
        payload: data,
      });
  }, [data, mobileCategories.length]);

  const search = (text) => {
    if (categories.length !== 0) {
      const filteredProduct = categories.filter((x) =>
        x?.categories?.toLowerCase().includes(text.toLowerCase())
      );

      dispatch({
        type: "updateMobileCategories",
        payload: filteredProduct,
      });
    } else {
      dispatch({
        type: "updateMobileCategories",
        payload: categories,
      });
    }
  };

  return (
    <ScreenWrapper title="Categories" searchFunction={search}>
      {loading && mobileCategories.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 mx-4">
          {mobileCategories &&
            mobileCategories.map((item, idx) => (
              <CategoryCard item={item} key={idx + 1} />
            ))}
        </div>
      )}
    </ScreenWrapper>
  );
};

export default MobileCategories;

const CategoryCard = ({ item }) => {
  const imageSrc = isSafari()
    ? `https://drive.google.com/thumbnail?id=${gDriveFileId({
        gURL: item.images,
      })}`
    : `https://drive.google.com/uc?id=${gDriveFileId({
        gURL: item.images,
      })}`;
  return (
    <Link
      className="cursor-pointer"
      style={{
        boxShadow: "rgba(255, 255, 255, 0) 0px 0px 1px",
        transition: "transform 0.2s ease 0s",
        color: "white",
      }}
      to={`/categories/${item.categories}`}
    >
      <div className="relative">
        <div className="h-32 relative rounded-lg overflow-hidden">
          <img
            src={imageSrc ?? EmptyImage}
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
              top: "50%",
              left: "8px",
              right: "8px",
              transform: "translateY(-50%)",
            }}
          >
            <div className="text-center mb-0">
              <div
                className=""
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
                {item.categories}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
