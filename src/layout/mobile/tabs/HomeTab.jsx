import React from "react";

const HomeTab = () => {
  return (
    <div>
      {selectedMobileItem ? (
        <ProductDetailsBody item={selectedMobileItem} />
      ) : (
        <ProductListing />
      )}
    </div>
  );
};

export default HomeTab;
