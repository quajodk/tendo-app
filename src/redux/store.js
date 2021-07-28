import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducers/shopReducer";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["auth", "currentMobileScreen"],
  stateReconciler: autoMergeLevel1,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;
