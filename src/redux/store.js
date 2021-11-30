import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
// import localforage from "localforage";
import reducer from "./reducers/shopReducer";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["auth", "currentMobileScreen"],
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;
