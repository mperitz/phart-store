'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import Signup from './components/Signup'
import WhoAmI from './components/WhoAmI'

import App from './containers/AppContainer'
import ItemsListContainer from './containers/ItemsListContainer'
import ItemContainer from './containers/ItemContainer'
import ShoppingCartContainer from './containers/ShoppingCartContainer'

import {item, receiveItems} from './action-creators/items'
import {receiveAllGenres} from './action-creators/genres'
import { fetchCart } from './action-creators/cart'




// const ExampleApp = connect(
//   ({ auth }) => ({ user: auth })
// )(
//   ({ user, children }) =>
//     <div>
//       <nav>
//         {user ? <WhoAmI /> : <Login />}
//       </nav>
//       {children}
//     </div>
// )


const onAppEnter = () => {
  //axios needs to be here beacuse its async and fixes the lag
  const allItems = axios.get('/api/items')
  const allGenres = axios.get('/api/genres')

  Promise.all([allItems, allGenres])
  .then(responses => responses.map(response =>
    response.data
    ))
  .then(([itemsArr, genresArr]) => {
    store.dispatch(receiveItems(itemsArr))
    store.dispatch(receiveAllGenres(genresArr))
  }
    )

}

// this doesnt work.  see orders route.
const onCartEnter = (nextRouterState) => {
  store.dispatch(fetchCart(nextRouterState.params.userId))
}

const onItemEnter = (nextRouterState) =>{
  const Itemid = nextRouterState.params.Itemid

  store.dispatch(item(Itemid))
}


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={onAppEnter}>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path ="/items" component={ ItemsListContainer } />
        <Route path ="/items/:Itemid" component={ ItemContainer } onEnter={ onItemEnter } />
        <Route path="/cart/:userId" component={ ShoppingCartContainer } onEnter= { onCartEnter } />
        <IndexRedirect to="/items" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
