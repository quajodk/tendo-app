import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import BottomTabNavigation from "../../components/mobile/BottomTabNavigation";
import Header from "../../components/mobile/Header";

import { routes } from "./routes";
const MobileLayer = () => {
  return (
    <div className="flex h-screen flex-1  flex-col">
      {/* Handle when a product is selected */}
      <div className="h-screen flex-1 flex flex-col">
        {/* Header Goes here */}
        <Header />
        {/* Body Goes here */}
        <div className="flex-1 overflow-y-scroll bg-tendo-bg">
          <Switch>
            {routes.map((screen, screenID) => (
              <Route
                key={screenID}
                path={`/${screen.title?.toLowerCase()}`}
                component={screen.component ?? null}
                exact
              />
            ))}
            <Redirect from="/" to="/home" />
          </Switch>
        </div>
      </div>

      {/* Bottom Tab navigator */}
      <BottomTabNavigation />
    </div>
  );
};

export default MobileLayer;
