import React from "react";

const MobileBody = ({ children }) => {
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",

          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
          paddingTop: "calc(env(safe-area-inset-top) + 96px)",
          overflowX: "hidden",
          overflowY: "scroll",
          overscrollBehavior: "contain",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100%",
            paddingBottom: "calc(49px + env(safe-area-inset-bottom))",
            "--bottom-bar-padding": 49,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div className="" style={{ marginBottom: "-16px" }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileBody;
