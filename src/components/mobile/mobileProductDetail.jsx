import React from "react";
import { FiClipboard, FiImage, FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { gDriveFileId } from "../../utils/utils";

const ProductDetailsBody = ({ item }) => {
  const dispatch = useDispatch();
  const orderProduct = () => {
    dispatch({
      type: "toggleOrderForm",
      payload: item,
    });
  };

  return (
    <>
      <div>
        <div className="mx-2 my-4 relative rounded-lg overflow-hidden">
          <img
            src={`https://drive.google.com/thumbnail?id=${gDriveFileId({
              gURL: item?.titleImage,
            })}`}
            alt="productImage"
            className="w-full"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="px-2 py-4">
          <p className="text-white font-bold text-base">{item?.product}</p>
        </div>
        <div
          className="px-2 py-4"
          style={{
            position: "relative",
            transition: "background-color 250ms ease-out 0s",
            display: "flex",
            alignItems: "center",
            minHeight: "3.375rem",
          }}
        >
          <div
            style={{
              textDecoration: "none",
              flexGrow: 1,
              flexShrink: 1,
              width: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              className="text-sm font-medium text-gray-500"
              style={{
                textOverflow: "inherit",
                whiteSpace: "normal",
                wordBreak: "break-word",
                overflow: "visible",
              }}
            >
              Supplier Name
            </p>
            <p className="text-lg font-semibold text-white">
              {" "}
              {item?.supplierGenericNameGh}
            </p>
          </div>
        </div>
        <p className="px-2 py-4 text-base font-semibold text-white">
          {" "}
          GHS {item?.wholesale}
        </p>
        <hr className="my-4 mx-2" />
        <div
          style={{
            position: "relative",
            padding: "8px 16px",
            transition: "background-color 250ms ease-out 0s",
            display: "flex",
            alignItems: "center",
            minHeight: "3.375rem",
          }}
        >
          <div
            style={{
              textDecoration: "none",
              flexGrow: 1,
              flexShrink: 1,
              width: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              className="text-sm font-medium text-gray-500"
              style={{
                textOverflow: "inherit",
                whiteSpace: "normal",
                wordBreak: "break-word",
                overflow: "visible",
              }}
            >
              Description
            </p>
            <p
              className="text-base font-semibold text-white"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {" "}
              {`${item && item["cleanDescriptionWith\n\nSkUs"]}`}
            </p>
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              color: "rgb(33, 150, 243)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(33, 150, 243, 0.118)",
              minWidth: "40px",
              marginLeft: "10px",
              flexShrink: 0,
            }}
            onClick={() => {
              navigator.clipboard.writeText(
                item && item["cleanDescriptionWith\n\nSkUs"]
              );
            }}
          >
            <FiClipboard size={24} />
          </div>
        </div>
        <div className="mx-4 my-2">
          <button
            type="button"
            className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-blue-500"
            style={{
              backgroundColor: "rgba(33, 150, 243, 0.118)",
              borderColor: "rgba(33, 150, 243, 0.118)",
            }}
          >
            <a
              href={item?.imageLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-row"
            >
              <FiImage size={24} className="mr-2" />
              View Product Gallery
            </a>
          </button>
        </div>
        <div
          className=""
          style={{
            position: "relative",
            padding: "8px 16px",
            transition: "background-color 250ms ease-out 0s",
            display: "flex",
            alignItems: "center",
            minHeight: "3.375rem",
          }}
        >
          <div
            style={{
              textDecoration: "none",
              flexGrow: 1,
              flexShrink: 1,
              width: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              className="text-sm font-medium text-gray-500"
              style={{
                textOverflow: "inherit",
                whiteSpace: "normal",
                wordBreak: "break-word",
                overflow: "visible",
              }}
            >
              Jiji Price (Just for reference)
            </p>
            <p className="text-base font-semibold text-white">
              {" "}
              {item?.jijiPrice}
            </p>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            padding: "8px 16px",
            transition: "background-color 250ms ease-out 0s",
            display: "flex",
            alignItems: "center",
            minHeight: "3.375rem",
          }}
        >
          <div
            style={{
              textDecoration: "none",
              flexGrow: 1,
              flexShrink: 1,
              width: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              className="text-sm font-medium text-gray-500"
              style={{
                textOverflow: "inherit",
                whiteSpace: "normal",
                wordBreak: "break-word",
                overflow: "visible",
              }}
            >
              Product SKU
            </p>
            <p className="text-base font-semibold text-white">{item?.skUs}</p>
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              color: "rgb(33, 150, 243)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(33, 150, 243, 0.118)",
              minWidth: "40px",
              marginLeft: "10px",
              flexShrink: 0,
            }}
            onClick={() => {
              navigator.clipboard.writeText(item?.skUs);
            }}
          >
            <FiClipboard size={24} />
          </div>
        </div>
        <div className="mx-4 mt-5 mb-14">
          <button
            type="button"
            className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-blue-500"
            style={{
              backgroundColor: "rgba(33, 150, 243, 0.118)",
              borderColor: "rgba(33, 150, 243, 0.118)",
            }}
            onClick={orderProduct}
          >
            <FiShoppingCart size={24} className="mr-2" />
            Order Product
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsBody;
