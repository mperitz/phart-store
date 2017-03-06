import { combineReducers } from 'redux'
import itemReducer from './items'
import genreReducer from './genres'
import cartReducer from './cart'
import bandReducer from './bands'
const auth = require('./auth').default
// import auth from './auth'


const rootReducer = combineReducers({
  auth: auth,
  items: itemReducer,
  genres: genreReducer,
  cart: cartReducer,
  bands: bandReducer
})

export default rootReducer
