import React from "react";
import Header from "./Header";

const ScreenWrapper = ({ title, showBackBtn, searchFunction, children }) => {
  return (
    <div className="h-screen flex-1 flex flex-col">
      {/* Header component */}
      <Header search={searchFunction} title={title} showBack={showBackBtn} />
      <div className="flex-1 overflow-y-scroll bg-tendo-bg">{children}</div>
    </div>
  );
};

export default ScreenWrapper;
