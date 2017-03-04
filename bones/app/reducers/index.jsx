import { combineReducers } from 'redux'
import itemReducer from './items'
import genreReducer from './genres'
const auth = require('./auth').default
// import auth from './auth'


const rootReducer = combineReducers({
  auth: auth,
  items: itemReducer,
  genres: genreReducer
})

export default rootReducer
