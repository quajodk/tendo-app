import React, { useEffect, useState, Fragment } from "react";
import ScreenWrapper from "../ScreenWrapper";
import { ImageWithLoading } from "../../layout/mobile/ProductListing";
import { gDriveFileId, isSafari, request } from "../../utils/utils";
import { FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import { HiOutlineX } from "react-icons/hi";
import { useSelector } from "react-redux";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const reasons = [
  {
    name: "Wrong details",
    description: "I entered wrong details for the order",
  },
  {
    name: "Customer request",
    description: "My customer cancelled his/her order with me",
  },
  {
    name: "Testing",
    description: "I was testing out the app 😊",
  },
  {
    name: "Others",
    description: "You will be redirected to WhatsApp, to talk to our agent.",
  },
];

const OrderDetails = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  let [cancelling, setCancelling] = useState(false);
  const [selected, setSelected] = useState(reasons[0]);
  const auth = useSelector((state) => state.auth);

  const { orderNumber } = useParams();

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetGhana/newAppOrders?filter[orderNumber]=${orderNumber.toUpperCase()}`,
      headers: {
        Authorization: "Bearer VGVuZG8gUmVzZWxsZXIkIDIwMjE=",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setLoading(false);
        setOrder(res?.data?.newAppOrders[0]);
        axios({
          method: "GET",
          url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoGhanaGlide/evansHome?filter[skUs]=${res?.data?.newAppOrders[0].sku}`,
          headers: {
            Authorization: "Bearer VGVuZG8gUmVzZWxsZXIkIDIwMjE=",
            Accept: "application/json",
          },
        })
          .then((res) => {
            console.log(res?.data?.evansHome[0]);
            setProduct(res?.data?.evansHome[0]);

            setImageSrc(
              isSafari()
                ? `https://drive.google.com/thumbnail?id=${gDriveFileId({
                    gURL: res?.data?.evansHome[0]?.titleImage,
                  })}`
                : `https://drive.google.com/uc?id=${gDriveFileId({
                    gURL: res?.data?.evansHome[0]?.titleImage,
                  })}`
            );
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }, [orderNumber]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  const confirmOrderCancel = () => {
    const message = `Hi I am ${
      auth && auth?.fullName
    }, a reseller on TendoGh 🇬🇭 App. I want to cancel an my order with order number ${
      order?.orderNumber
    }`;
    window.open(`https://wa.me/+2349014992643/?text=${message}`, "blank");
    closeModal();
  };

  const cancelOrder = async (id) => {
    setCancelling(true);

    try {
      if (selected.name.toLowerCase() === "others") {
        setCancelling(false);
        return confirmOrderCancel();
      } else {
        order.remarks = selected.description;
        order.orderStatus = "CANCELLED";
        const newAppOrder = order;

        const result = await request({
          url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetGhana/newAppOrders/${id}`,
          method: "PUT",
          data: { newAppOrder },
        });
        const slackMsg = {
          text: `Order Cancellation\n\nOrder Number: ${order?.orderNumber}\n\nOrder Status: ${order?.orderStatus}\nProduct SKU: ${order?.sku}\n\nReseller Name: ${order?.resellerName}\nReseller Number: ${order?.resellerPhoneNumber}\n\nRemarks: ${order.remarks}`,
        };

        fetch(process.env.REACT_APP_SLACK_WEBHOOK, {
          method: "POST",
          credentials: "omit",
          body: JSON.stringify(slackMsg),
        })
          .then((res) => res.json())
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
        setCancelling(false);

        if (result.newAppOrder.id) closeModal();
      }
    } catch (error) {
      console.log(error);
      setCancelling(false);
    }
  };

  if (loading && !order) {
    return (
      <ScreenWrapper title="orders" showBackBtn>
        <div className="flex justify-center items-center h-screen">
          <Spin indicator={antIcon} />
        </div>
      </ScreenWrapper>
    );
  }

  const message = `Hi I would like to confirm my order with product SKU ${order?.sku} on TendoGh 🇬🇭 App.`;

  return (
    <>
      <ScreenWrapper
        title={`Order - #${orderNumber.toUpperCase()}`}
        showBackBtn
      >
        <div className="min-h-max lg:grid lg:grid-cols-2 overflow-y-scroll">
          <div className="px-5 py-5">
            <div className="mx-2 my-4 relative rounded-lg overflow-hidden">
              <ImageWithLoading src={product?.newImageServerLink} />
            </div>
          </div>
          <div>
            <div
              className="px-2 py-4 mx-4"
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
                  className="text-sm font-normal text-gray-500"
                  style={{
                    textOverflow: "inherit",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflow: "visible",
                  }}
                >
                  Order Details
                </p>

                <div className="flex justify-between">
                  <p className="text-sm font-medium text-white">
                    Order Number:
                  </p>
                  <p className="text-sm font-bold text-white">
                    {" "}
                    #{order?.orderNumber.toUpperCase()}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-white">Order Total:</p>
                  <p className="text-sm font-bold text-white">
                    {" "}
                    GHS{" "}
                    {parseFloat(
                      order?.totalAmountToCollectFromCustomer
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-white">
                    Order Quantity:
                  </p>
                  <p className="text-sm font-bold text-white">
                    {" "}
                    {order?.productQty}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-white">
                    Order Status:
                  </p>
                  <p className="text-sm font-bold text-white">
                    {" "}
                    {order?.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="px-2 py-4 mx-4"
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
                  className="text-sm font-normal text-gray-500"
                  style={{
                    textOverflow: "inherit",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflow: "visible",
                  }}
                >
                  Customer Details
                </p>

                <div className="flex justify-between">
                  <p className="text-sm font-medium text-white">
                    Customer Name:
                  </p>
                  <p className="text-sm font-bold text-white">
                    {order?.customerName}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-white">
                    Customer Tel:
                  </p>
                  <p className="text-sm font-bold text-white">
                    {" "}
                    {order?.customerPhoneNumber}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="px-2 py-4 mx-4"
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
                  className="text-sm font-normal text-gray-500"
                  style={{
                    textOverflow: "inherit",
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                    overflow: "visible",
                  }}
                >
                  Product Details
                </p>

                <div className="flex justify-between">
                  <p className="text-sm font-medium text-white">
                    Product Name:
                  </p>
                  <p className="text-sm font-bold text-white">
                    {product?.product ?? ""}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-white">Product SKU:</p>
                  <p className="text-sm font-bold text-white"> {order?.sku}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-white">
                    Product Price:
                  </p>
                  <p className="text-sm font-bold text-white">
                    {" "}
                    GH&cent;{" "}
                    {![NaN, undefined, "", null].includes(
                      parseFloat(product?.wholesale)
                    )
                      ? parseFloat(product?.wholesale).toFixed(2)
                      : 0.0}
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-4 mt-5 mb-20">
              <div className="flex flex-col lg:flex-row">
                <a
                  className="w-full flex justify-center items-center py-4 px-4 border border-transparent text-base font-medium rounded-md blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-blue-500"
                  style={{
                    backgroundColor: "rgba(33, 150, 243, 0.118)",
                    borderColor: "rgba(33, 150, 243, 0.118)",
                  }}
                  href={`https://wa.me/+233503247275/?text=${message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check Order Status
                  <FiCheckCircle className="mx-2" />
                </a>

                {order?.orderStatus.toLowerCase() === "pending" && (
                  <button
                    type="button"
                    className="w-full flex justify-center items-center py-4 px-4  border-transparent text-base font-medium rounded-md text-red-500"
                    onClick={openModal}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
            <div className="h-24 lg:h-0 mt-16 lg:mt-0"></div>
          </div>
        </div>
      </ScreenWrapper>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-tendo-bg"
          onClose={closeModal}
          open={isOpen}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl bg-">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                >
                  Cancel order?{" "}
                  <HiOutlineX onClick={closeModal} className="cursor-pointer" />
                </Dialog.Title>

                <div className="w-full px-4 py-4">
                  <div className="w-full max-w-md mx-auto">
                    <RadioGroup value={selected} onChange={setSelected}>
                      <RadioGroup.Label className="sr-only">
                        Cancel order?
                      </RadioGroup.Label>
                      <div className="space-y-2">
                        {reasons.map((plan) => (
                          <RadioGroup.Option
                            key={plan.name}
                            value={plan}
                            className={({ active, checked }) =>
                              `${
                                active
                                  ? "ring-2 ring-offset-2 ring-offset-tendo-active ring-tendo-active ring-opacity-60"
                                  : ""
                              }
                  ${
                    checked
                      ? "bg-blue-900 bg-opacity-75 text-white"
                      : "bg-white"
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-medium  ${
                                          checked
                                            ? "text-white"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {plan.name}
                                      </RadioGroup.Label>
                                      <RadioGroup.Description
                                        as="span"
                                        className={`inline ${
                                          checked
                                            ? "text-sky-100"
                                            : "text-gray-500"
                                        }`}
                                      >
                                        <span>{plan.description}</span>{" "}
                                      </RadioGroup.Description>
                                    </div>
                                  </div>
                                  {checked && (
                                    <div className="flex-shrink-0 text-white">
                                      <CheckIcon className="w-6 h-6" />
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    No, close
                  </button>
                  <button
                    type="button"
                    className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 ${
                      cancelling ? "disabled" : null
                    }`}
                    onClick={async () => {
                      await cancelOrder(order.id);
                    }}
                  >
                    {cancelling ? "Cancelling ..." : "Yes, cancel order!"}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default OrderDetails;

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
