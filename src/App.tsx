import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Container } from 'semantic-ui-react';
import Header from './component/Header';
import Thread from './component/Thread';
import Top from './component/Top';
import { authStateChanged } from './module/auth';
import store, { history } from './store';
import { auth } from './util/firebase';

// 認証状態が変わった際に呼び出されるハンドラー
auth.onAuthStateChanged(user => {
  store.dispatch(authStateChanged(user));
});

class App extends React.Component {
  public render() {
    return (
      <ConnectedRouter history={history}>
        <Container>
          <Header />
          <main>
            <Switch>
              <Route exact={true} path="/" component={Top} />
              <Route exact={true} path="/threads/:threadId" component={Thread} />
            </Switch>
          </main>
        </Container>
      </ConnectedRouter>
    );
  }
}

export default App;
