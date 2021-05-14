import { createStore } from "redux";
import reducer from './reducers/shopReducer';

const store = createStore(reducer);


export default store;