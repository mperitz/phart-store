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

import {item, receiveItems, fetchComments} from './action-creators/items'
import {receiveAllGenres} from './action-creators/genres'
import {receiveAllBands} from './action-creators/bands'




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
  const allBands = axios.get('/api/bands')

  Promise.all([allItems, allGenres, allBands])
  .then(responses => responses.map(response =>
    response.data
    ))
  .then(([itemsArr, genresArr, bandsArr]) => {
    store.dispatch(receiveItems(itemsArr))
    store.dispatch(receiveAllGenres(genresArr))
    store.dispatch(receiveAllBands(bandsArr))
  }
    )

}

const onItemEnter = (nextRouterState) => {
  const Itemid = nextRouterState.params.Itemid
  store.dispatch(item(Itemid))
  store.dispatch(fetchComments(Itemid))
}


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={onAppEnter}>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path ="/items" component={ ItemsListContainer } />
        <Route path ="/items/:Itemid" component={ ItemContainer } onEnter={ onItemEnter } />
        <IndexRedirect to="/items" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
