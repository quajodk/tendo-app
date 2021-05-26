import { createStore } from "redux";
import reducer from './reducers/shopReducer';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'tendo-root-app',
    storage,
}



const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer);


export default store;