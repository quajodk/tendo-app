import React from "react";
import ScreenWrapper from "../ScreenWrapper";
import { ReactComponent as AnimatedSvg } from "../../assets/push-notifications-animate,svg";

const NotificationsPage = () => {
  return (
    <ScreenWrapper showBackBtn>
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <AnimatedSvg className="w-80 h-80 my-6" />
        <div className="onesignal-customlink-container"></div>
      </div>
    </ScreenWrapper>
  );
};

return NotificationsPage;
