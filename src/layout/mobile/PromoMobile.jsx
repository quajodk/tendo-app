import React from "react";
import { BiShare } from "react-icons/bi";
import { useSelector } from "react-redux";
import PromoBg from "../../assets/inviteAfriend.png";

const PromoMobile = () => {
  const auth = useSelector((state) => state.auth);
  const url = window.location.host;
  const protocol = window.location.protocol;

  const shareInvite = async () => {
    const data = {
      title: "Tendo Invite",
      text: `You can Earn Ghc 200+ from home. Join me and hundreds people who are earning money from home using Tendo App. Get free delivery on your 1st order, if you enter my name and number under referral when placing an order.\nAccess TendoGh Now - ${
        protocol / url
      }?refCode=${
        auth ? auth?.username : null
      }\nKnow More about how to earn with Tendo: http://tendo.app`,
    };
    try {
      const shared = await navigator.share(data);
      if (shared) console.log("done");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col relative min-h-max">
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
                Invite a friend and earn GHc 10 when they place their first
                order
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
      </div>
    </>
  );
};

export default PromoMobile;
