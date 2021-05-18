import React, { useEffect } from "react";
import useSheetData from "../../hooks/useSheetData";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const MobileCategories = () => {
  const [data, loading] = useSheetData({ sheet: "glideCategories" });
  const mobileCategories = useSelector((state) => state.mobileCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "getMobileCategory",
      payload: data,
    });
  }, [data, dispatch]);

  return (
    <>
      {loading && mobileCategories.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mx-4">
          {mobileCategories &&
            mobileCategories.map((item) => (
              <CategoryCard item={item} key={item.id} />
            ))}
        </div>
      )}
    </>
  );
};

export default MobileCategories;

const CategoryCard = ({ item }) => {
  const dispatch = useDispatch();
  const onCategoryTap = () => {
    dispatch({
      type: "selectedMobileCategory",
      payload: item.categories,
    });
  };
  return (
    <>
      <div
        style={{
          boxShadow: "rgba(255, 255, 255, 0) 0px 0px 1px",
          transition: "transform 0.2s ease 0s",
          color: "white",
        }}
        onClick={onCategoryTap}
      >
        <div className="relative">
          <div className="h-32 relative rounded-lg overflow-hidden">
            <img
              src={item.images}
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
      </div>
    </>
  );
};
