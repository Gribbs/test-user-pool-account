import React, {Component} from 'react';
import logo from './logo.svg';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import {Route, NavLink as Link, Redirect} from 'react-router-dom';
import Home from './components/Home';
import Signin from './components/Signin';
import Signout from './components/Signout';
import {LambdaList} from './components/LambdaList';
import {CognitoUserList} from './components/CognitoUserList';
import './App.css';
import oauth from './lib/oAuthOptions';
import {withOAuth} from 'aws-amplify-react';
import {Hub, Logger} from 'aws-amplify';
import Protected from './components/Protected';

const authOptions = Object.assign({
  identityPoolId: 'ap-southeast-2:0c6ab9e6-fb2d-4fcb-91d9-fb69cda9dcd0',
  region: awsmobile.aws_cognito_region,
  userPoolId: awsmobile.aws_user_pools_id,
  userPoolWebClientId: awsmobile.aws_user_pools_web_client_id
}, {oauth: oauth});

console.log({Auth: authOptions});
Amplify.configure({Auth: authOptions})

// Optionally add Debug Logging
//Amplify.Logger.LOG_LEVEL = 'DEBUG';

class App extends Component {
  constructor(props) {
    super(props);
    Hub.listen('auth', this, 'App');
    this.state = {
      authState: ''
    };
  }

  setAuthState = (authEvt) => {
    this.setState({authState: authEvt})
  }

  onHubCapsule = (capsule) => {
    console.log('App onHubCapsule()');
    const {channel, payload} = capsule;
    console.log('inside onHubCapsule()', channel, payload);
    const authEvent = capsule.payload.event;
    switch (authEvent) {

      case 'signIn':
        //'user signed in'
        this.setAuthState(authEvent);
        break;
      case 'signUp':
        // 'user signed up'
        this.setAuthState(authEvent);
        break;
      case 'signOut':
        // 'user signed out'
        this.setAuthState(authEvent);
        break;
      case 'signIn_failure':
        //'user sign in failed'
        this.setAuthState(authEvent);
        break;
      case 'configured':
        //'the Auth module is configured'
        this.setAuthState(authEvent);
      default:
        console.log(`unexpected auth state ${authEvent}`);
        this.setAuthState(authEvent);
    }
  }
  render() {
    console.log(this.props);
    const loggedin = '';
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <div>
        <Link to="/">Home</Link>
        <Link activeClassName="active" to="/lambda">Lambda</Link>
        <Link activeClassName="active" to="/cognitousers">Cognito Users</Link>
        <Link to="/protected">Protected</Link>
        <Link to="/signout">Sign out</Link>
      </div>
      <Route exact={true} path="/" render={() => <Home OAuthSignIn={this.props.OAuthSignIn}/>}/>
      <Route exact={true} path="/signin" component={Signin}/>
      <Route exact={true} path="/signout" component={Signout}/>
      <Route exact={true} path="/lambda" component={LambdaList}/>
      <Route exact={true} path="/cognitousers" component={CognitoUserList}/>
      <Route path="/protected" render={(
      ) => this.state.authState === 'signIn'
          ? (<Protected/>)
          : (<Redirect to="/"/>)}/>

    </div>);
  }
}
//export default App;
export default withOAuth(App);
