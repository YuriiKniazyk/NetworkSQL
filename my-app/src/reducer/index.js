import { REGISTER, LOGIN, AUTHORIZATION, LOGOUT, PROFILE, FINDBYNAME, FORGOTEPASSWORD, SENDCODEANDEMAIL, UPDATEPASSWORD } from "../action-types";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
    name: '',
    surname: '',
    email: '',
    password: '',
    token: null,
    accessUser: {
        id: '',
        name: '',
        surname: ''
    },
    text: '',
    allUser: [],
    succses: true,
    msg: '',
    forgotecodes: '',
    passwordVerify: ''
        
}; 

const persistConfig = {
    key: 'token',
    storage,
    whitelist: ['token'],
};

const reducer = (state = initialState, action) => {
    const payload = action.payload;

    switch(action.type){
        case REGISTER: 
            return {...state, ...payload};

        case LOGIN: 
            return {...state, ...payload};

        case AUTHORIZATION: 
            return {...state, ...payload};

        case LOGOUT: 
            return {...state, token: null};

        case PROFILE: 
            return {...state, ...payload};
        
        case FINDBYNAME: 
            return {...state, ...payload};

        case FORGOTEPASSWORD: 
            return {...state, ...payload};

        case SENDCODEANDEMAIL:
            return {...state, ...payload};

        case UPDATEPASSWORD:
            return {...state, ...payload};



        default: return state;
    }
};
  
export default persistReducer(persistConfig, reducer)