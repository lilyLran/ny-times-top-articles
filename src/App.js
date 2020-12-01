import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import configureStore from './util/configureStore'
import {getSavedToken} from './util/token'
import {initTokens} from './actions/userActions'
import SignInForm from './component/SignInForm'
import CategorizedNews from './page/CategorizedNews'
import PageNotFound from './page/PageNotFound'
import Header from './component/Header'
import Search from './page/Search'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const store = configureStore();
  const token = getSavedToken();
  store.dispatch(initTokens(token));

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={CategorizedNews} />
          <Route exact path="/section/:category" component={CategorizedNews} />
          <Route path="/search" component={Search} />
          <Route exact path="/signIn" component={SignInForm} />
          <Route  path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App;
