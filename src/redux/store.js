import { createStore } from "redux";
import reducer from './reducers/shopReducer';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
    key: 'tendo-root-app',
    storage,
}



const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer);
const persistor = persistStore(store);


export { store, persistor };