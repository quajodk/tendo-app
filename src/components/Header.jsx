import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import TendoLogo from "../assets/tendo-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { HiX } from "react-icons/hi";

const Header = ({ title, showBack, search, goBack, onSearchClearFn }) => {
  const history = useHistory();
  const _goBack = () => history.goBack();
  const dispatch = useDispatch();
  const isSearch = useSelector((state) => state.isSearch);
  const searchTerm = useSelector((state) => state.searchTerm);
  const searchInput = React.useRef(null);

  const clearSearch = () => {
    if (searchInput.current) {
      searchInput.current.value = "";
      searchInput.current?.blur();
      dispatch({ type: "onSearch", payload: searchInput.current.value });
    }
    dispatch({ type: "setIsSearch", payload: false });
    onSearchClearFn && onSearchClearFn();
  };

  return (
    <div className="bg-tendo-bg flex lg:items-center flex-col lg:flex-row py-3">
      <div className="flex w-screen ">
        <div className="w-20 flex justify-center items-center mr-2">
          {showBack ? (
            <div
              className="flex items-center text-lg text-tendo-active cursor-pointer"
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
        <div className="flex w-screen lg:w-96 mt-3 px-6">
          <div className="relative flex overflow-x-hidden bg-gray-400 rounded-lg w-auto flex-1">
            <div className="bg-gray-400 flex items-center px-3 justify-center">
              <BiSearch color="white" size={20} />
            </div>
            <input
              ref={searchInput}
              onFocus={() => dispatch({ type: "setIsSearch", payload: true })}
              type="search"
              name="search"
              placeholder="Search"
              className="bg-gray-400 placeholder-gray-200 text-white font-medium flex-1 py-1 outline-none focus:outline-none w-100  w-auto px-2 relative"
              onChange={(e) => {
                search();
                dispatch({ type: "onSearch", payload: e.target.value });
              }}
              value={searchTerm}
            />
            <span
              onClick={isSearch ? () => clearSearch() : null}
              className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 bg-transparent rounded text-base w-8 right-0 pr-3 py-3 flex items-center justify-center cursor-pointer"
            >
              {isSearch ? <HiX className="w-12 h12 text-white" /> : null}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
