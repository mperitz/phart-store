import { combineReducers } from 'redux'
import itemReducer from './items'
const auth = require('./auth').default
// import auth from './auth'


const rootReducer = combineReducers({
  auth: auth,
  items: itemReducer
})

export default rootReducer
