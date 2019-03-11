import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import Lambda from 'aws-sdk/clients/lambda';
import ReactTable from "react-table";
import 'react-table/react-table.css';

const columns = [
  {
    Header: 'Function Name',
    accessor: 'FunctionName'
  },
  {
    Header: 'ARN',
    accessor: 'FunctionArn' // String-based value accessors!
  },
  {
    Header: 'Runtime',
    accessor: 'Runtime'
  }
];

export class LambdaList extends Component {

  state = {
    lambdaFunctions: [],
    errorMessage: '',
    isFetching: false
  }

  componentDidMount() {
    console.log('Lambda componentDidMount');
    Auth.currentCredentials().then(credentials => {
      this.setState({isFetching: true})
      const lambda = new Lambda({credentials: Auth.essentialCredentials(credentials), region: 'ap-southeast-2'});
      return lambda.listFunctions().promise();

    }).then(res => {
      console.log('RES', res);
      const functions = res.Functions;
      this.setState({lambdaFunctions: functions, errorMessage: '', isFetching: false})
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
         <h3>Lambda Functions</h3>
         <ReactTable data={this.state.lambdaFunctions} filterable={true} defaultFilterMethod={(filter, row) =>
           String(row[filter.id]).match(filter.value)} minRows={5} columns={columns} style={{
             width: '80%',
             marginRight: 'auto',
             marginLeft: 'auto'
           }}/>
       </div>
 }
}
