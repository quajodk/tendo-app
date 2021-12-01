import "./App.css";
import Shop from "./layout/Shop";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Suspense } from "react";
import PageLoader from "./components/PageLoader";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          {/* <ScrollToTop /> */}
          <Suspense fallback={<PageLoader />}>
            <Shop />
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
