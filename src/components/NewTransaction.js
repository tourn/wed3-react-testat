import React from 'react'
import {Button, Form} from "semantic-ui-react";
import {getAccountDetails, getAccount, transfer} from '../api';

export default class extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sourceAccount: {},
      targetAccount: {},
      targetNr: "",
      amount: "",
      loading:false,
        success: undefined,
        error: undefined

    }
    this.loadMyAccount();
  }

  loadMyAccount = () => {
    getAccountDetails(this.props.token)
      .then(account => {
        this.setState({ sourceAccount: account})
      });
  }

  changeTo = (e) => {
    this.setState({
      targetNr: e.target.value
    })
    getAccount(e.target.value, this.props.token)
      .then(account => {
        if(account.accountNr != this.state.sourceAccount.accountNr){
            this.setState({targetAccount: account})
        }
      })
      .catch(()=>{
          this.setState({targetAccount: {}})
      })
  }

  submit = (e) => {
    e.preventDefault();
    transfer(this.state.targetNr, this.state.amount, this.props.token)
      .then(() => {
        this.props.onNewTransaction();
        this.loadMyAccount(); //to update account balance, maybe a bit much traffic, could be done clientside
          this.setState({amount: ""})
          this.setState({success: "Transaktion erfolgreich"})
      }).catch(()=> "Ein Fehler ist aufgetreten!")

  }

  changeAmount = (e) => {
    this.setState({
      amount: e.target.value
    })
  }

  isValid = () => {
    return this.state.targetAccount.owner && (this.state.amount <= this.state.sourceAccount.amount);
  }

  render = () => {
    const source = this.state.sourceAccount;
    const target = this.state.targetAccount;

    const {error, success} = this.state;

    return (
      <Form onSubmit={this.submit} loading={this.state.loading}>
        <Form.Input label="Von" value={`${source.accountNr} [${source.amount} chf.]`} readOnly/>
        <Form.Input label="Zu" placeholder="account nr." onChange={this.changeTo} value={this.state.targetNr} type="number"/>
        <p>{ target.owner && `${target.owner.firstname} ${target.owner.lastname}` }</p>
        <Form.Input label="CHF" value={this.state.amount} onChange={this.changeAmount} type="number"/>
        <Button type='submit' disabled={!this.isValid()}>Submit</Button>
        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </Form>
    )
  }

}