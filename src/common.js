import store from "./store";

function isValidSession(){
    const sessionUser = sessionStorage.getItem("loggedInUsername");
    if(sessionUser){
    store.dispatch('setLoginStatusAction', true);
    store.dispatch('setLoggedInUserAction', sessionUser)
    }    
    return !!sessionUser;
  }

export {isValidSession};