import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducers/shopReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["auth", "currentMobileScreen"],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;
