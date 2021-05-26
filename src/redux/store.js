import { createStore } from "redux";
import reducer from './reducers/shopReducer';

const persistConfig = {
    key: 'tendo-root-app',
    storage,
}

const store = createStore(reducer);


export default store;