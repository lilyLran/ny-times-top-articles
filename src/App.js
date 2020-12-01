import React, {Profiler} from 'react'
import {Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import configureStore from './util/configureStore'
import {getSavedToken} from './util/token'
import {initTokens} from './actions/userActions'
import SignInForm from './component/SignInForm'
import CategorizedNews from './page/CategorizedNews'
import Header from './component/Header'
import Search from './page/Search'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  const store = configureStore();
  const token = getSavedToken();
  store.dispatch(initTokens(token));
  const callback = function onRenderCallback(
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) {
    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions)
  }
  return (
    <Provider store={store}>
      <Router>
      <Profiler id="Navigation" onRender={callback}>
        <Header />
        <Switch>
          <Route exact path="/" component={CategorizedNews} />
          <Route exact path="/section/:category" component={CategorizedNews} />
          <Route path="/search" component={Search} />
          <Route exact path="/signIn" component={SignInForm} />
        </Switch>
        </Profiler>
      </Router>
    </Provider>
  )
}

export default App;
