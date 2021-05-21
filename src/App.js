import "./App.css";
import Shop from "./layout/Shop";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Shop />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
