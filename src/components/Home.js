import React, {Component} from 'react';
import {Auth} from 'aws-amplify';

export default class Home extends Component {
  render(){
  return  (<div>

      <div>
        <button onClick={(args) => console.log('oAuthSignIn',args) || this.props.OAuthSignIn(args)}>
          Sign in with AWS
        </button>
      </div>

    </div>
  )
  }
}
