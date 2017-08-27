/* eslint-disable */

import React, { Component } from 'react';
import Header from './Header';
import TokenForm from './TokenForm';
import './styles/App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      token: '',
    }

    this.requestToken = this.requestToken.bind(this);
    this.handleShowForm = this.handleShowForm.bind(this);
  }

  requestToken(body) {
    fetch('/api/v1/auth/request_token', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(({ token }) => this.setState({ token }));
  }

  handleShowForm() {
    this.setState({ showForm: !this.state.showForm });
  }

  render() {
    const { token, showForm } = this.state;

    return (
      <section className="App">
        <Header handleShowForm={this.handleShowForm} />
        <main className="main">
          <TokenForm token={token} showForm={showForm} requestToken={this.requestToken} />
        </main>
      </section>
    )
  }
}

export default App;
