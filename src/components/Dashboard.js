// @flow

import React from 'react'
import NewTransaction from './NewTransaction'
import {Container, Header} from "semantic-ui-react";
import TransactionTable from "./TransactionTable";
import {getTransactions} from "../api"

/*
  Use the api functions to call the API server. For example, the transactions
  can be retrieved and stored in the state as follows:
  
  getTransactions(this.props.token)
    .then(({result: transactions}) => 
      this.setState({transactions})
    )
    
  import { getAccountDetails, getAccount, transfer, getTransactions } from '../api'
*/

export type Props = {
  token: string,
}

class Dashboard extends React.Component {

  props: Props

  constructor(props){
    super(props)
    this.state = {
      transactions: []
    }
    this.loadTransactions();
  }

  loadTransactions = () => {
    getTransactions(this.props.token)
      .then(transactions => this.setState({transactions: transactions.result}))
  }

  render = () => {

    return (
      <div>
        <Container>
          <Header as="h2">New Transaction</Header>
          <NewTransaction token={this.props.token} onNewTransaction={this.loadTransactions}/>
        </Container>
        <Container>
          <Header as="h2">Transaction History</Header>
          <TransactionTable transactions={this.state.transactions}/>
        </Container>
      </div>
    )
  }
}

export default Dashboard
