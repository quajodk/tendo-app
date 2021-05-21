<div className="h-screen" style={{ backgroundColor: "rgb(21, 24, 30)" }}>
        <>
          {showOrderForm ? (
            <OrderForm item={selectedMobileItem} />
          ) : (
            <>
              (
              {categorySelected ? (
                <CategoryProductsScreen />
              ) : selectedMobileItem !== null &&
                (currentScreen === 0 ||
                  currentScreen === 1 ||
                  currentScreen === 2) ? (
                <ProductAppBar title={productName} />
              ) : (
                <AppBar title={screens[currentScreen]["title"]} />
              )}
              <MobileBody>
                {selectedMobileItem !== null &&
                (currentScreen === 0 ||
                  currentScreen === 1 ||
                  currentScreen === 2) ? (
                  <ProductDetailsBody item={selectedMobileItem} />
                ) : (
                  screens[currentScreen]["component"]
                )}
              </MobileBody>
              <MobileTapNav>
                <NavItem
                  icon={<BsFillGrid1X2Fill size={24} />}
                  title={"Home"}
                  active={currentScreen === 0 ? true : false}
                  index={0}
                />
                <NavItem
                  icon={<AiFillHdd size={24} />}
                  title={"Categories"}
                  active={currentScreen === 1 ? true : false}
                  index={1}
                />
                <NavItem
                  icon={<BsFillGridFill size={24} />}
                  title={"Explore"}
                  active={currentScreen === 2 ? true : false}
                  index={2}
                />
                <NavItem
                  icon={<BsFillTagFill size={24} />}
                  title={"Promos"}
                  active={currentScreen === 3 ? true : false}
                  index={3}
                />
                <NavItem
                  icon={<FaHeadphonesAlt size={24} />}
                  title={"Help"}
                  active={currentScreen === 4 ? true : false}
                  index={4}
                />
              </MobileTapNav>
            </>
          )}
        </>
      </div>