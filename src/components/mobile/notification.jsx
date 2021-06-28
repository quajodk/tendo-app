import React from "react";
import ScreenWrapper from "../ScreenWrapper";
import { ReactComponent as AnimatedSvg } from "../../assets/push-notifications-animate.svg";

const NotificationsPage = () => {
  return (
    <ScreenWrapper showBackBtn title="Notifications">
      <div className="flex flex-col justify-center items-center w-full h-screen">
        <AnimatedSvg className="lg:w-1/2 lg:h-1/2 w-80 h-80 my-6" />
        <div className="onesignal-customlink-container"></div>
      </div>
    </ScreenWrapper>
  );
};

export default NotificationsPage;
