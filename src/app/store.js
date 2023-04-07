import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import loginReducer from '../features/login/loginSlice'
import languageReducer from '../features/language/languageSlice'
import registerReducer from '../features/register/registerSlice'
export default configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    language: languageReducer,
    register: registerReducer
  }
})
