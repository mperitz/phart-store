'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import App from './containers/AppContainer'
import ItemsListContainer from './containers/ItemsListContainer'
import axios from 'axios'
import {receiveItems} from './action-creators/items'



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
 return axios.get('/api/items')
  .then(response => response.data)
  .then(itemsArr => {
    store.dispatch(receiveItems(itemsArr))
    console.log(itemsArr)
  })
}


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={onAppEnter}>
        <Route path ="/items" component={ ItemsListContainer } />
        <IndexRedirect to="/items" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
