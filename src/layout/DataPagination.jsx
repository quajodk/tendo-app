import _ from "lodash";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router";

const LastItemComponent = React.forwardRef((props, ref) => (
  <div ref={ref} {...props}>
    {props.children}
  </div>
));

function DataPagination({ data, RenderComponent, dataLimit }) {
  const getCurrentScreenInfo = JSON.parse(
    window.localStorage.getItem("currentScreenInfo" ?? null)
  );

  const [loading, setLoading] = React.useState(false);
  const [scrollPosition, setPosition] = React.useState(
    getCurrentScreenInfo ? getCurrentScreenInfo.scrollY : 0
  );
  const [currentPage, setCurrentPage] = React.useState(
    getCurrentScreenInfo ? getCurrentScreenInfo.currentPage : 1
  );
  const [paginatedData, setPaginatedData] = React.useState([]);
  const isSearch = useSelector((state) => state.isSearch);
  const { path } = useRouteMatch();
  const isLocalStorageDate =
    getCurrentScreenInfo &&
    path === getCurrentScreenInfo?.path &&
    !isSearch &&
    paginatedData.length === 0;

  const init = React.useRef({
    dataLimit,
    getCurrentScreenInfo,
  });

  const observer = React.useRef();
  const lastItem = React.useCallback(
    (node) => {
      if (paginatedData.length === 0 || !node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.length !== paginatedData.length) {
          setCurrentPage((prevPageNumber) => prevPageNumber + 1);

          setPosition(node.offsetTop);
          console.log("visible");
        }
      });
      if (node) observer.current.observe(node);
    },
    [data.length, paginatedData.length]
  );

  React.useEffect(() => {
    const { dataLimit } = init.current;

    setLoading(true);

    function getPaginatedData() {
      const startIndex = currentPage * dataLimit - dataLimit;
      const endIndex = startIndex + dataLimit;
      return data.slice(isLocalStorageDate ? 0 : startIndex, endIndex);
    }

    if (isSearch) {
      setPaginatedData(getPaginatedData());
      setLoading(false);
    }
    setPaginatedData((data) => [
      ..._.uniqBy([...data, ...getPaginatedData()], "id"),
    ]);

    setLoading(false);
  }, [currentPage, data, isLocalStorageDate, isSearch]);

  if (paginatedData.length === 0 && loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AiOutlineLoading className="animate-spin text-tendo-active text-lg" />
      </div>
    );
  }

  const pageInfo = {
    currentPage,
    path,
    scrollY: scrollPosition,
  };

  localStorage.setItem("currentScreenInfo", JSON.stringify(pageInfo));

  return (
    <>
      {paginatedData?.map((item, index) =>
        item?.glideStatus === "TRUE" ? (
          paginatedData.length === index + 1 ? (
            <LastItemComponent
              ref={lastItem}
              key={index + 1}
              children={<RenderComponent key={item} item={item} />}
            />
          ) : (
            <RenderComponent key={index} item={item} />
          )
        ) : null
      )}
    </>
  );
}

export default DataPagination;
