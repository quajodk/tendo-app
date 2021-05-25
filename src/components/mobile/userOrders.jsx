import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { HiOutlineTicket } from "react-icons/hi";
import axios from "axios";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const UserOrders = () => {
  const auth = useSelector((state) => state.auth);
  const userOrders = useSelector((state) => state.userOrders);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const init = useRef({ dispatch, setLoading });

  useEffect(() => {
    const { dispatch, setLoading } = init.current;
    axios({
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer TEST_TOKEN",
      },
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/productCatalogueGhana/orders?filter[username]=${auth?.username}`,
    })
      .then(({ data }) => {
        setLoading(false);
        dispatch({
          type: "getUserOrders",
          payload: data?.orders,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [auth?.username]);

  console.log(userOrders, "orders");
  console.log(auth?.username, "username");

  if (loading && userOrders.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  if (userOrders.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg text-white font-medium text-center">
          No order(s) yet. Your list of orders will appear here
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 p-4">
        {userOrders.length &&
          userOrders.map((order, idx) => (
            <OrderCard order={order} key={idx + 1} />
          ))}
      </div>
    </>
  );
};

export default UserOrders;

const OrderCard = ({ order }) => {
  return (
    <>
      <div className="w-full rounded-lg flex p-4 justify-start bg-gray-800">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex justify-center items-center bg-tendo-active rounded-lg mr-2">
            <HiOutlineTicket size={52} />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between">
              <div>
                <span className="text-sm text-white font-medium">
                  {order?.productSku}
                </span>
              </div>
              <div>
                <span className="text-sm text-white font-medium">
                  GHS {order?.totalAmountToCollectFromCustomer}
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                <span className="text-xs text-gray-400">
                  {order?.orderedOn}
                </span>
              </div>
              <div>
                <span className="text-xs text-gray-400">
                  {order?.orderStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
