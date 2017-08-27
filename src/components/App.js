/* eslint-disable */

import React, { Component } from 'react';
import Header from './Header';
import TokenForm from './TokenForm';
import SideNav from './SideNav';
import ReactMarkdown from 'react-markdown';
import text from '../../utils/text';
import './styles/App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      details: text.introduction,
      token: '',
    }

    this.requestToken = this.requestToken.bind(this);
    this.handleShowForm = this.handleShowForm.bind(this);
    this.handleLink = this.handleLink.bind(this);
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

  handleLink(e) {
    const details = text[e.target.id];

    this.setState({ details });
  }

  handleShowForm() {
    this.setState({ showForm: !this.state.showForm });
  }

  render() {
    const { token, showForm, details } = this.state;
    return (
      <section className="App">
        <Header handleShowForm={this.handleShowForm} />
        <main className="main">
          <TokenForm token={token} showForm={showForm} requestToken={this.requestToken} />
          <SideNav handleLink={this.handleLink} />
          <section className="details">
            <ReactMarkdown source={details} />
          </section>
        </main>
      </section>
    )
  }
}

export default App;
