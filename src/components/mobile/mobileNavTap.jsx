import React from "react";

const MobileTapNav = ({ children }) => {
  return (
    <>
      <div
        className="w-screen  overflow-y-hidden  left-0 bottom-0 inset-x-0 z-10 flex flex-col items-center"
        style={{
          height: "calc(49px + env(safe-area-inset-bottom))",
          backgroundColor: "rgba(0, 0, 0, 0.976)",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px -1px 0px 0px",
          transition:
            "transform 0.2s ease 0s, height 0.2s ease 0s, opacity 0.2s ease 0s",
        }}
      >
        <div className="flex w-full justify-start">{children}</div>
      </div>
    </>
  );
};

export default MobileTapNav;
