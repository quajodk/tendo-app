import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import EmptyImage from "../../assets/emptyImage.jpg";
import useSheetData from "../../hooks/useSheetData";
import DataPagination from "../DataPagination";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ProductListing = () => {
  const [data, loading] = useSheetData({
    sheet: "evansHome?filter[glideStatus]=TRUE",
    method: "GET",
  });
  const mobileProducts = useSelector((state) => state.mobileProducts);
  const dispatch = useDispatch();
  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;

    dispatch({
      type: "getMobileProducts",
      payload: data,
    });
    data.length !== 0 &&
      dispatch({
        type: "saveCopyOfMobileProducts",
        payload: data,
      });
  }, [data]);

  if (loading && mobileProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  return (
    <>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 mt-4 lg:mb-12 mb-16">
        {/* @TODO: Testing pagination */}
        <DataPagination
          RenderComponent={ProductCard}
          data={mobileProducts}
          dataLimit={20}
        />
      </div>
    </>
  );
};

export default ProductListing;

export const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const selectProduct = () => {
    dispatch({
      type: "selectMobileProduct",
      payload: item,
    });
  };

  return (
    <Link
      to={`/product/${item.product?.replace("/", "$")}`}
      onClick={selectProduct}
    >
      <div className="mx-4">
        <div className="rounded-lg flex flex-col overflow-hidden">
          <div className="h-32">
            <ImageWithLoading src={item?.newImageServerLink} />
          </div>
          <div
            className="flex flex-col p-3 flex-grow text-white"
            style={{ backgroundColor: "rgb(30, 34, 43)" }}
          >
            <p className="text-xs font-normal text-blue-700 overflow-ellipsis uppercase whitespace-nowrap">
              {item.supplierGenericNameGh}
            </p>
            <p className="font-normal text-sm overflow-ellipsis overflow-hidden whitespace-nowrap">
              {item.product}
            </p>

            <div className="text-sm text-gray-400 font-light">
              GHS {item.wholesale}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
// export class ImageWithLoading extends React.Component {
//   state = { isLoaded: false };

//   componentDidMount() {
//     const image = new Image();
//     image.onload = () => this.setState({ isLoaded: true });
//     image.src = this.props.src;
//   }

//   render() {
//     const { src } = this.props;
//     const { isLoaded } = this.state;

//     const find = "tendo-images.s3.amazonaws.com";
//     const newStr = "d3ug0vbiixnxyq.cloudfront.net";

//     return isLoaded ? (
//       <img
//         className="w-full h-full lg:h-full object-cover"
//         src={src.replaceAll(find, newStr)}
//         alt="product"
//       />
//     ) : (
//       <img
//         className="w-full h-full object-cover"
//         src={EmptyImage}
//         alt="product"
//       />
//     );
//   }
// }

export const ImageWithLoading = ({ src }) => {
  const loadedImages = {};
  const [loaded, setLoaded] = React.useState(loadedImages[src]);

  const onLoad = () => {
    loadedImages[src] = true;
    setLoaded(true);
  };

  const find = "tendo-images.s3.amazonaws.com";
  const newStr = "d3ug0vbiixnxyq.cloudfront.net";

  return (
    <>
      {!loaded ? (
        <img
          className="w-full h-full lg:h-full object-cover"
          src={EmptyImage}
          alt="product"
        />
      ) : (
        <img
          className="w-full h-full lg:h-full object-cover"
          src={src.includes(find) ? src.replace(find, newStr) : src}
          alt="product"
          onLoad={onLoad}
        />
      )}
    </>
  );
};
