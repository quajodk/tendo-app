import React from "react";
import Header from "./Header";
import BottomTabNavigation from "./mobile/BottomTabNavigation";

const ScreenWrapper = ({
  title,
  showBackBtn,
  searchFunction,
  children,
  backFunction,
}) => {
  return (
    <div className="h-screen flex-1 flex flex-col">
      {/* Header component */}
      <Header
        goBack={backFunction}
        search={searchFunction}
        title={title}
        showBack={showBackBtn}
      />
      <div className="h-auto flex-1 lg:py-6 overflow-y-scroll pb-3 bg-tendo-bg">
        <div className="flex-1 h-full ">{children}</div>
      </div>
      <BottomTabNavigation />
    </div>
  );
};

export default ScreenWrapper;
