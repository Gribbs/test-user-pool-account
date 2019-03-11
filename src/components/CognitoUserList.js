import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import Cognito from 'aws-sdk/clients/cognitoidentityserviceprovider'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import awsmobile from '../aws-exports';
import jwt from 'jwt-decode'

const columns = [
  {
    Header: 'User Name', // String-based value accessors!
    accessor: 'Username'
  },
  {
    id: 'userEmail',
    Header: 'Email',
    accessor: user => user.Attributes[2].Value
  }
];

export class CognitoUserList extends Component {

  state = {
    cognitoUsers: [],
    errorMessage: '',
    isFetching: false
  }

  componentDidMount() {
    console.log('Lambda componentDidMount');
    // debugger
    // Auth.signOut()
    // .then(data => {
    //   console.log('Auth.signOut():')
    //   console.log(data);
    //
    // })
    // .catch(err => {
    //   console.log('Auth.signOut() error:');
    //   console.log(err);
    //
    // });
    //debugger;

    Auth.currentCredentials().then(credentials => {
      Auth.currentSession()
       .then(session => {

         console.log('session',jwt(session.accessToken.jwtToken))
       });
      this.setState({isFetching: true})
      const cognito = new Cognito({credentials: Auth.essentialCredentials(credentials), region: 'ap-southeast-2'});
      return cognito.listUsers({
            UserPoolId: awsmobile.aws_user_pools_id,
            Limit: '60'
          }).promise();
    }).then(res => {
      console.log('RES', res);
      const users = res.Users;
      this.setState({cognitoUsers: users, errorMessage: '', isFetching: false})
    }).catch(err => {
      this.setState({errorMessage: err.message, isFetching: false})
      console.log('error:', err.message);
    })
  }

 render(){
   return this.state.isFetching
     ? <h3>Loading...</h3>
     : this.state.errorMessage
       ? <div>
           <h3>Error Message: {this.state.errorMessage}</h3>
         </div>
       : <div>
         <h3>Cognito Users</h3>
         <ReactTable data={this.state.cognitoUsers} filterable={true} defaultFilterMethod={(filter, row) =>
           String(row[filter.id]).match(filter.value)} minRows={5} columns={columns} style={{
             width: '80%',
             marginRight: 'auto',
             marginLeft: 'auto'
           }}/>
       </div>
 }
}
