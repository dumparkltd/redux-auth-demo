import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  IndexRoute,
  createMemoryHistory,
  browserHistory
} from 'react-router';
import { configure, authStateReducer } from 'redux-auth';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer, syncHistoryWithStore } from 'react-router-redux';
import thunk from 'redux-thunk';
import Main from './containers/Main';
import Account from './containers/Account';
import SignIn from './containers/SignIn';
import Container from './components/Container';
import GlobalComponents from './components/GlobalComponents';

import { composeWithDevTools } from 'redux-devtools-extension';


class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <Container>
        <GlobalComponents />
        {this.props.children}
      </Container>
    );
  }
}

function requireAuth(store, nextState, replace, next) {
  if (!store.getState().auth.getIn(['user', 'isSignedIn'])) {
    replace('/login');
  }
  next();
}

export function initialize({ apiUrl, cookies, isServer, currentLocation } = {}) {
  const reducer = combineReducers({
    auth: authStateReducer,
    routing: routerReducer
  });

  let history = (isServer)
    ? createMemoryHistory(currentLocation)
    : browserHistory;

  // create the redux store
  const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );

  history = syncHistoryWithStore(history, store);

  // define app routes
  const routes = (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Main} />
        <Route path="login" component={SignIn} />
        <Route
          onEnter={requireAuth.bind(this, store)}
          component={Account}
          path="account"
        />
      </Route>
    </Router>
  );

  /**
   * The React Router 1.0 routes for both the server and the client.
   */
  return store.dispatch(
    configure(
      [
        {
          default: { apiUrl }
        }
      ],
      {
        cookies,
        isServer,
        currentLocation
      }
    )
  ).then(({ redirectPath, blank } = {}) => ({
    blank,
    store,
    redirectPath,
    routes,
    history,
    provider: (
      <Provider store={store} key="provider" children={routes} />
    )
  }));
}
