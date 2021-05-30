import React from "react";
import { BiShare } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import PromoBg from "../../assets/tendongInvite.jpeg";
import ScreenWrapper from "../../components/ScreenWrapper";

const PromoMobile = () => {
  const auth = useSelector((state) => state.auth);
  const url = window.location.host;
  const protocol = window.location.protocol;
  const dispatch = useDispatch();

  // console.log(`${protocol}//${url}?refCode=${auth ? auth?.username : null}`);

  const shareInvite = async () => {
    if (!auth) {
      dispatch({
        type: "toggleMobileSignUp",
      });
    }
    const data = {
      title: "Tendo Invite",
      text: `You can start an e-commerce store with zero capital and. Join me and hundreds of people who are earning money from home using the Tendo App.\n\nYou can start selling products without investing any money. Just find products at wholesale products, add your profit, and share on social media. Tendo will handle deliveries for you and send you your profit.\n\nGet free delivery on your 1st order, if you enter my referral code.\nAccess TendoGh Now - ${protocol}//${url}?refCode=${
        auth ? auth?.username : null
      }\n\nLearn more about Tendo here: http://tendo.app`,
    };
    try {
      const shared = await navigator.share(data);
      if (shared) console.log("done");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScreenWrapper title="Promotions">
      <div className="flex lg:justify-center">
        <div className="flex lg:w-1/2 flex-col relative min-h-max">
          <div className="relative h-72">
            <img
              src={PromoBg}
              alt=""
              className="object-cover w-full h-full bg-transparent"
            />
            <div className="absolute flex flex-col overflow-hidden h-full w-full justify-end left-0 top-0">
              <div
                className="text-white p-4 -m-b-1"
                style={{
                  backgroundImage:
                    "linear-gradient(transparent, rgba(0, 0, 0, 0.9))",
                }}
              >
                <div className="text-xl font-bold">
                  Invite a friend and earn &#8358; 800 when they place their
                  first order
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="mx-4 my-5 w-full">
              <button
                type="button"
                className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white"
                onClick={shareInvite}
              >
                <BiShare size={24} className="mr-2" />
                Share Invite Link
              </button>
            </div>
          </div>
          {auth && (
            <span className="text-sm text-white my-9 text-center font-bold">
              Referral Code: {auth?.username}
            </span>
          )}
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default PromoMobile;
