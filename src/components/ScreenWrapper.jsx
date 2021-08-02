import React from "react";
import Header from "./Header";
import BottomTabNavigation from "./mobile/BottomTabNavigation";

const ScreenWrapper = ({
  title,
  showBackBtn,
  searchFunction,
  children,
  backFunction,
  clearSearchFunction,
}) => {
  return (
    <div className="h-screen flex-1 flex flex-col">
      {/* Header component */}
      <Header
        goBack={backFunction}
        search={searchFunction}
        title={title}
        showBack={showBackBtn}
        onSearchClearFn={clearSearchFunction}
      />
      <div className="flex-1 h-full lg:py-6 overflow-y-scroll bg-tendo-bg">
        {children}
      </div>
      <BottomTabNavigation />
    </div>
  );
};

export default ScreenWrapper;
