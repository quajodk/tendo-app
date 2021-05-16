import React from "react";

const AppBar = ({ children, title }) => {
  return (
    <>
      <div
        className="fixed flex flex-col items-stretch justify-items-stretch overflow-hidden z-20 top-0 left-0 right-0 pointer-events-none"
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
          height: "calc( env(safe-area-inset-top) + 96px )",
          transition: "height 0.1s ease 0s",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "auto",
            transform: "translateY(0px)",
            backgroundColor: "rgba(0, 0, 0, 0.976)",
            boxShadow: "rgba(255, 255, 255, 0.12) -1px 0px 0px inset",
          }}
        ></div>
        <div className="overflow-hidden" style={{ marginTop: 44 }}>
          <div className="flex flex-col items-stretch pointer-events-auto transform translate-y-0">
            <div className="h-0 w-full overflow-hidden flex">
              <div className="flex justify-center pt-0 pr-4 pl-4 pb-4">
                <div className="flex-1 flex justify-center">
                  <div className="w-full px-2 lg:px-6">
                    <label htmlFor="search" className="sr-only">
                      Search projects
                    </label>
                    <div className="relative text-gray-200 focus-within:text-gray-400">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white bg-opacity-25 text-gray-100 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              pointerEvents: "auto",
              left: "env(safe-area-inset-left)",
              right: "env(safe-area-inset-right)",
              top: "env(safe-area-inset-top)",
            }}
          >
            <div
              className="flex items-center relative flex-shrink-0"
              style={{ height: 44 }}
            >
              {children}
              <div
                className=""
                style={{
                  flexGrow: 1,
                  textAlign: "center",
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: 19,
                  color: "rgb(255, 255, 255)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  opacity: 1,
                  transition: "opacity 0.2s ease 0s",
                }}
              >
                {title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppBar;
