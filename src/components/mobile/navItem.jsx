import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const NavItem = ({ active, icon, title, index, path }) => {
  const dispatch = useDispatch();

  const onNavItemTap = () => {
    dispatch({
      type: "setScreen",
      payload: index,
    });
  };
  return (
    <>
      <Link
        to={`/${title.toLowerCase()}`}
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
          <div className="w-full text-xs overflow-ellipsis whitespace-nowrap">
            {title}
          </div>
        </div>
      </Link>
    </>
  );
};

export default NavItem;
