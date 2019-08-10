//state -the last state/or onotial state,
//action - type - string, payload - anything
//state is from the store, because it fires from the first time, it will be undefined if we dont set an initial state (null is a value)
import {UserActionTypes} from './user.types';

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state = INITIAL_STATE,action) =>{
    switch(action.type){
         case UserActionTypes.SET_CURRENT_USER:
             return{
                 ...state,
                 currentUser: action.payload
             }
         
         default:
             return state;
    }
}
export default userReducer;