import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const LastItemComponent = React.forwardRef((props, ref) => (
  <div ref={ref} {...props}>
    {props.children}
  </div>
));

function DataPagination({ data, RenderComponent, dataLimit }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [paginatedData, setPaginatedData] = React.useState([]);
  const init = React.useRef({ data, dataLimit });

  const observer = React.useRef();
  const lastItem = React.useCallback(
    (node) => {
      if (paginatedData.length === 0) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data.length !== paginatedData.length) {
          setCurrentPage((prevPageNumber) => prevPageNumber + 1);
          console.log("visible");
        }
      });
      if (node) observer.current.observe(node);
    },
    [data.length, paginatedData.length]
  );

  React.useEffect(() => {
    const { data, dataLimit } = init.current;
    function getPaginatedData() {
      const startIndex = currentPage * dataLimit - dataLimit;
      const endIndex = startIndex + dataLimit;
      return data.slice(startIndex, endIndex);
    }

    setPaginatedData((data) => [...data, ...getPaginatedData()]);
  }, [currentPage]);

  if (data === null && paginatedData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AiOutlineLoading className="animate-spin text-tendo-active text-lg" />
      </div>
    );
  }

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
