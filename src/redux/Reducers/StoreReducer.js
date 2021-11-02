import Constants from '../../constants';

let initialState={
    offlineData:[]
}

export function StoreReducer(state=initialState,action){
switch(action.type){
    case Constants.ActionTypes.STORE_DATA:
        return {...state,offlineData:action.payload,type:action.type}
    default:
        return state;
}
}