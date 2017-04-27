// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'

import { Container, Form, Input, Button } from 'semantic-ui-react'

import { signup } from '../api'

export type Props = {
  authenticate: (login: string, password: string, callback: (error: ?Error) => void) => void
}

class Signup extends React.Component {

  props: Props
    
  state: {
    login: string,
    firstname: string,
    lastname: string,
    password: string,
    passwordConfirmation: string,
    error: string,
    formError?: string,
    redirectToReferrer: boolean,
  }
  
  state = {
    login: "",
    firstname: "",
    lastname: "",
    password: "",
    passwordConfirmation: "",
    error: null,
    formError: undefined,
    redirectToReferrer: false,
  }

  handleLoginChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({login: event.target.value})
    }
  }
  
  handleFirstNameChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({firstname: event.target.value})
    }
  }

  handleLastNameChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({lastname: event.target.value})
    }
  }
  
  handlePasswordChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({password: event.target.value})
    }
  }

  handlePasswordConfirmationChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({passwordConfirmation: event.target.value})
    }
  }

  validateForm = (login, password, lastname, firstname, passwordConfirmation) => {
    if(login === "" || login.length < 3){
      this.setState({formError: "Login braucht mindestens 3 Zeichen"});
      return false;
    }

    if(firstname === "" || firstname.length < 3){
      this.setState({formError: "Vorname braucht mindestens 3 Zeichen"});
      return false;
    }

    if(lastname === "" || lastname.length < 3){
      this.setState({formError: "Nachname braucht mindestens 3 Zeichen"});
      return false;
    }

    if(password === "" || password.length < 3){
      this.setState({formError: "Passwort braucht mindestens 3 Zeichen"});
      return false;
    }

    if(passwordConfirmation === "" || passwordConfirmation.length < 3){
      this.setState({formError: "Passwort-Bestätigung braucht mindestens 3 Zeichen"});
      return false;
    }

    if(password != passwordConfirmation){
      this.setState({formError: "Passwort und Passwort-Bestätigung stimmen nicht überein"});
      return false;
    }

    return true;
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { login, firstname, lastname, password, passwordConfirmation } = this.state

    if(!this.validateForm(login, password, lastname, firstname, passwordConfirmation)){
      return;
    }

    signup(login, firstname, lastname, password).then(result => {
      console.log("Signup result ", result)
      this.props.authenticate(login, password, (error) => {
        if (error) {
          this.setState({error: error, formError: undefined})
        } else {
          this.setState({redirectToReferrer: true, error: null, formError: undefined})
        }
      })
    }).catch(error =>
      this.setState({error: error, formError: undefined})
    )
  }

  render() {    
    const { redirectToReferrer, error, formError } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to='/dashboard'/>
      )
    }
    
    return (
      <Container>
        <h1>Bank of Rapperswil</h1>
        <Form>
          <h2>Registrieren</h2>
          <Input onChange={this.handleLoginChanged} placeholder='Login' value={this.state.login} />
          <Input onChange={this.handleFirstNameChanged} placeholder='Vorname' value={this.state.firstname} />
          <Input onChange={this.handleLastNameChanged} placeholder='Nachname' value={this.state.lastname} />
          <Input onChange={this.handlePasswordChanged} placeholder='Passwort' type="password" value={this.state.password} />
          <Input onChange={this.handlePasswordConfirmationChanged} placeholder='Passwort Bestätigung' type="password" value={this.state.passwordConfirmation} />
          <Button onClick={this.handleSubmit}>Account eröffnen</Button>
        </Form>
        { formError && <p>{formError}</p>}
        { error && <p>Es ist ein Fehler aufgetreten!</p> }
      </Container>
    )
  }
}

export default Signup
