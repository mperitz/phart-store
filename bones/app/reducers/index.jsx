import { combineReducers } from 'redux'
import itemReducer from './items'
import genreReducer from './genres'
import cartReducer from './cart'
import bandReducer from './bands'
import orderReducer from './orderHistory'
const auth = require('./auth').default
// import auth from './auth'


const rootReducer = combineReducers({
  auth: auth,
  items: itemReducer,
  genres: genreReducer,
  cart: cartReducer,
  bands: bandReducer,
  orders: orderReducer
})

export default rootReducer
