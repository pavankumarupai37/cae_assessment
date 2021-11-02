import { StoreReducer } from "./StoreReducer";
import { combineReducers } from "redux";

const appReducer=combineReducers({
    StoreReducer
})

const rootReducer=(state,action)=>{
    return appReducer(state,action)
}

export default rootReducer;