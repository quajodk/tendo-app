import React from "react";
import { useDispatch, useSelector } from "react-redux";

const NavItem = ({ active, icon, title, index }) => {
  const dispatch = useDispatch();

  const onNavItemTap = () => {
    dispatch({
      type: "setScreen",
      payload: index,
    });
  };
  return (
    <>
      <div
        className="relative flex justify-end flex-col items-center flex-grow flex-shrink-0 p-0 m-0 text-center text-xs font-medium"
        style={{
          height: 49,
          color:
            typeof active !== undefined && active
              ? "rgb(33, 150, 243)"
              : "rgb(108, 108, 108)",
        }}
        onClick={onNavItemTap}
      >
        <div className="flex flex-col justify-center items-center text-center pt-2">
          <div>{icon}</div>
          <div className="w-full overflow-ellipsis whitespace-nowrap">
            {title}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavItem;
