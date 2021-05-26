import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import TendoLogo from "../assets/tendo-logo.png";

const Header = ({ title, showBack, search, goBack }) => {
  const history = useHistory();
  const _goBack = () => history.goBack();

  return (
    <div className="bg-tendo-bg py-3">
      <div className="flex w-screen ">
        <div className="w-20 flex justify-center items-center mr-2">
          {showBack ? (
            <div
              className="flex items-center text-lg text-tendo-active"
              onClick={goBack ? goBack : _goBack}
            >
              <FiChevronLeft size={25} className="text-tendo-active" /> Back
            </div>
          ) : (
            <img
              src={TendoLogo}
              alt="tendo logo"
              height={25}
              width={25}
              className="rounded-sm"
            />
          )}
        </div>
        <div className="flex-1 text-center">
          <span className="text-white font-medium truncate text-lg">
            {title}
          </span>
        </div>
      </div>
      {search && (
        <div className="flex w-screen mt-3 px-6">
          <div className="flex overflow-x-hidden bg-gray-400 rounded-lg w-auto flex-1">
            <div className="bg-gray-400 flex items-center px-3 justify-center">
              <BiSearch color="white" size={20} />
            </div>
            <input
              type="text"
              name="search"
              placeholder="Search"
              className="bg-gray-400 placeholder-gray-200 text-white font-medium flex-1 py-1 outline-none focus:outline-none w-100  w-auto px-2"
              onChange={(e) => search(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
