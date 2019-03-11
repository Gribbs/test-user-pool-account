import React, {Component} from 'react';
import {fetchToken} from '../lib/tokenService';
import {NavLink as Link} from 'react-router-dom';
import {Auth} from 'aws-amplify';

class Signin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idToken: '',
      credentials: ''
    };
  }

  componentDidMount() {
    const authorization_code = new URLSearchParams(this.props.location.search).get('code');
    console.log('componentDidMount()', authorization_code);
    
  }

  render() {
    return (<div>
      <div>
        <p>Token: {this.state.idToken}</p>
        <p>Creds:{this.state.credentials}</p>
      </div>
    </div>)
  }
}

export default Signin;
