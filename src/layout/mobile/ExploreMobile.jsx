import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gDriveFileId } from "../../utils/utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { ImageWithLoading } from "./ProductListing";
import ScreenWrapper from "../../components/ScreenWrapper";
import axios from "axios";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ExploreMobile = () => {
  const [loading, setLoading] = useState(true);
  const mobileProducts = useSelector((state) => state.mobileProducts);
  const orginalMobileProducts = useSelector(
    (state) => state.orginalMobileProducts
  );
  const dispatch = useDispatch();

  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer TEST_TOKEN",
      },
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/productCatalogueGhana/resellerCatalog?filter[glideStatus]=TRUE`,
    })
      .then(({ data }) => {
        setLoading(false);
        dispatch({
          type: "getMobileProducts",
          payload: data?.resellerCatalog,
        });
      })
      .catch((e) => console.log(e));
  }, []);

  const search = (text) => {
    if (mobileProducts.length !== 0) {
      const filteredProduct = orginalMobileProducts.filter(
        (x) =>
          x.glideStatus === "TRUE" &&
          (x?.product?.toLowerCase().includes(text.toLowerCase()) ||
            x?.skUs?.toLowerCase().includes(text.toLowerCase()))
      );

      dispatch({
        type: "updateMobileProducts",
        payload: filteredProduct,
      });
    } else {
      dispatch({
        type: "updateMobileProducts",
        payload: orginalMobileProducts,
      });
    }
  };

  return (
    <ScreenWrapper title="Explore" searchFunction={search}>
      {loading && mobileProducts.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mx-4">
          {mobileProducts.map((item) =>
            item.glideStatus === "TRUE" ? (
              <ExploreCard item={item} key={item.id} />
            ) : null
          )}
        </div>
      )}
    </ScreenWrapper>
  );
};

export default ExploreMobile;

export const ExploreCard = ({ item }) => {
  const dispatch = useDispatch();

  const selectProduct = () => {
    dispatch({
      type: "selectMobileProduct",
      payload: item,
    });
  };

  const imageSrc = `https://drive.google.com/thumbnail?id=${gDriveFileId({
    gURL: item.titleImage,
  })}`;

  return (
    <>
      <Link to={`/${item.product.toLowerCase()}`} onClick={selectProduct}>
        <div onClick={selectProduct}>
          <div className="rounded-lg flex flex-col overflow-hidden">
            <div className="h-32">
              <ImageWithLoading src={imageSrc} />
            </div>
            <div
              className="flex flex-col p-3 flex-grow text-white"
              style={{ backgroundColor: "rgb(30, 34, 43)" }}
            >
              <div className="mb-1">
                <p className="text-xs font-bold text-blue-700 overflow-ellipsis uppercase whitespace-nowrap">
                  {item.supplierGenericNameGh}
                </p>
                <p className="font-normal text-sm overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {item.product}
                </p>
              </div>
              <div className="text-sm text-gray-400 font-normal">
                GHS {item.wholesale}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
