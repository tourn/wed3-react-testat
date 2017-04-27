// @flow

import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Container, Form, Input, Button } from 'semantic-ui-react'

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (login: string, password: string, callback: (error: ?Error) => void) => void,
  /* We need to know what page the user tried to access so we can 
     redirect after logging in */
  location: {
    state?: {

      from: string,
    }
  }
}

class Login extends React.Component {
  
  props: Props
  
  state: {
    login: string,
    password: string,
    error?: Error,
    formError?: string,
    redirectToReferrer: boolean,
  }
  
  state = {
    login: "",
    password: "",
    error: undefined,
    formError: undefined,
    redirectToReferrer: false,
  }

  handleLoginChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({login: event.target.value})
    }
  }

  handlePasswordChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      this.setState({password: event.target.value})
    }
  }

  validateForm = (login, password) => {
    if(login === "" || login.length < 3){
      this.setState({formError: "Login braucht mindestens 3 Zeichen"});
      return false;
    }

    if(password === "" || password.length < 3){
      this.setState({formError: "Passwort braucht mindestens 3 Zeichen"});
      return false;
    }

    return true;
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { login, password } = this.state

    if(!this.validateForm(login, password)){
      return;
    }

    this.props.authenticate(login, password, (error) => {
      if(error) {
        this.setState({error: error, formError: undefined})
      } else {
        this.setState({redirectToReferrer: true, error: null})
      }
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
    const { redirectToReferrer, error, formError } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
        
    return (
      <Container>
        <h1>Bank of Rapperswil</h1>
        <Form>
          <h2>Login</h2>
          <Input onChange={this.handleLoginChanged} placeholder='Login' value={this.state.login} />
          <Input onChange={this.handlePasswordChanged} placeholder='Password' type="password" value={this.state.password} />
          <Button onClick={this.handleSubmit}>Log-in</Button>
        </Form>
        { formError && <p>{formError}</p>}
        { error && <p>Login Daten sind nicht korrekt!</p> }
        <Link to="/signup">Noch keinen Account?</Link>
      </Container>
    )
  }
}

export default Login
