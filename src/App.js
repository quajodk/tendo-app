import "./App.css";
import Shop from "./layout/Shop";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";
import { BrowserRouter } from "react-router-dom";
import ScrollRestoration from "react-scroll-restoration";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ScrollRestoration />
            <Shop />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
