import React from "react";
import ScreenWrapper from "../ScreenWrapper";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../../utils/utils";
import { BsFillPersonFill } from "react-icons/bs";

function Earning() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const numOfUserOrders = useSelector((state) => state.numOfUserOrders);
  const numOfCancelledUserOrders = useSelector(
    (state) => state.numOfCancelledUserOrders
  );
  const numOfSuccessUserOrders = useSelector(
    (state) => state.numOfSuccessUserOrders
  );
  const totalEarned = useSelector((state) => state.totalEarned);

  const init = React.useRef({ dispatch });

  React.useEffect(() => {
    const { dispatch } = init.current;
    // all orders
    request({
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetNigeria/nigeriaOrders?filter[username]=${auth?.username}`,
      method: "GET",
    })
      .then((res) => {
        dispatch({
          type: "getNumOfUserOrders",
          payload: res.nigeriaOrders.length,
        });
      })
      .catch((e) => console.log(e));

    // all cancelled orders
    request({
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetNigeria/nigeriaOrders?filter[username]=${auth?.username}&filter[orderStatus]=CANCELLED`,
      method: "GET",
    })
      .then((res) => {
        dispatch({
          type: "getNumOfCancelledUserOrders",
          payload: res.nigeriaOrders.length,
        });
      })
      .catch((e) => console.log(e));

    // all successful orders
    request({
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetNigeria/nigeriaOrders?filter[username]=${
        auth?.username
      }&filter[orderStatus]=${"PROFIT PAID"}`,
      method: "GET",
    })
      .then((res) => {
        dispatch({
          type: "getNumOfSuccessfulUserOrders",
          payload: res.nigeriaOrders.length,
        });
      })
      .catch((e) => console.log(e));

    // all successful orders
    request({
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetNigeria/nigeriaOrders?filter[username]=${
        auth?.username
      }&filter[orderStatus]=${"PROFIT PROCESSING"}`,
      method: "GET",
    })
      .then((res) => {
        const amtEarned = res.nigeriaOrders.reduce((acc, cur) => {
          return (
            acc +
            parseInt(
              cur?.totalAmountToCollectFromCustomer -
                (parseInt(cur?.deliveryCost.replace("GHC ", "")) +
                  parseInt(cur?.productPrice))
            )
          );
        }, 0);

        dispatch({
          type: "getUserEarning",
          payload: amtEarned,
        });
      })
      .catch((e) => console.log(e));
  }, [auth?.username, dispatch]);

  const login = () => {
    dispatch({
      type: "toggleMobileLogin",
    });
  };

  return (
    <ScreenWrapper title="Wallet" showBackBtn>
      <div className="flex lg:justify-center justify-start w-full mx-4">
        <div className="flex-1 lg:w-1/2 w-full p-4">
          <div className="flex flex-col justify-start mb-4">
            <span className="text-2xl font-bold text-white">
              GH&cent; {isNaN(totalEarned) ? 0.0 : totalEarned.toFixed(2)}
            </span>
            <span className="text-sm font-medium text-gray-600 flex items-center">
              Total Earned
            </span>
          </div>

          <div className="my-10 flex justify-between items-center">
            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl font-bold text-white">
                {numOfUserOrders}
              </span>
              <span className="text-sm font-medium text-gray-600 flex items-center">
                Orders
              </span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl font-bold text-white">
                {numOfCancelledUserOrders}
              </span>
              <span className="text-sm font-medium text-gray-600 flex items-center">
                Cancelled Orders
              </span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl font-bold text-white">
                {numOfSuccessUserOrders}
              </span>
              <span className="text-sm font-medium text-gray-600 flex items-center">
                Successful Orders
              </span>
            </div>
          </div>

          {!auth && (
            <div className="flex">
              <div className="my-5 w-full">
                <button
                  type="button"
                  className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white"
                  onClick={login}
                >
                  <BsFillPersonFill size={24} className="mr-2" /> Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ScreenWrapper>
  );
}

export default Earning;
