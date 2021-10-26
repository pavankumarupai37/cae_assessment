import { persistStore,persistReducer } from "redux-persist";
import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

import rootReducer from "../Reducers";

const persistConfig={
    key:'root',
    storage:AsyncStorage,
    timeout:null,
    whitelist:[
        'StoreReducer'
    ],
    blacklist:[]
}

const persistedReducer=persistReducer(persistConfig,rootReducer);
const store=createStore(persistedReducer,applyMiddleware(thunk));
const persistor=persistStore(store);
export {store,persistor};