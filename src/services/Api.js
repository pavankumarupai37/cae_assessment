import NetInfo from '@react-native-community/netinfo';
import Constants from '../constants';

const baseUrl='https://rosterbuster.aero/';

export async function isNetworkAvailable() {
    try {
      return NetInfo.fetch().then(NetworkState => {
        if (NetworkState.isConnected) {
          return true;
        } else {
          return false;
        }
      });
    }
    catch (Exception) {
      //alert(Exception.message)
    }
  
  }
  

export async function callGetMethod(url) {
  
    let _isNetworkAvailable = false;
    _isNetworkAvailable = await isNetworkAvailable();
    
    if (!_isNetworkAvailable) {
      let obj = { status: 503, message: Constants.MessageString.NO_INTERNET}
      return obj;
    } else {
      return fetch(baseUrl+url, {
        method: "GET",
        headers: { 
            "Accept": "application/json", 
            "Content-Type": "application/json", 
            "Authorization": null },
      
      }).then(response =>response.json() 
        .then(responseJson => {
          if (responseJson != null) {
              let obj = { status: response.status, responseJson }
              return obj;
            }else {
            return null;
          }
        })).catch((err)=>{
          let obj={statusMessage:Constants.MessageString.API_ERROR}
          return obj;
        })
    }
  }
  