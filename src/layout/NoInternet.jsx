import React from "react";
import { ReactComponent as NoInternetImg } from "../assets/no-internet.svg";
import ScreenWrapper from "../components/ScreenWrapper";

function NoInternet() {
  return (
    <ScreenWrapper>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex flex-col">
          <NoInternetImg className="w-96 h-96" />
          <p className="my-6 mx- text-sm text-white">
            Sorry no internet. Check your connection and try again
          </p>
        </div>
      </div>
    </ScreenWrapper>
  );
}

export default NoInternet;
