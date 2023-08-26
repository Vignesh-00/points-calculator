import { combineReducers } from "redux";
import userReducer from "./userReducer";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
// import {encryptTransform} from "redux-persist-transform-encrypt"


// const encryptor = encryptTransform({
//   secretKey: "!t5-$3cr3t"
// })

const persistConfig = {
    key: "root",
    storage: storageSession,
    // transforms : [encryptor]
};

const allReducers = combineReducers({
    userRedux: userReducer,
});

export default persistReducer(persistConfig, allReducers);
