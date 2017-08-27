/* eslint-disable */

import React, { Component } from 'react';
import './styles/TokenForm.scss';

class TokenForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      app: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, app } = this.state;

    this.props.requestToken({ email, app });
    this.setState({ email: '', app: '' });
  }

  render() {
    const { email, app } = this.state;
    const { showForm, token } = this.props;
    const tokenClass = showForm ? 'token-form-wrapper' : 'token-form-wrapper token-hidden';
    const tokenText = token.length ? 'token' : 'token token-text-hidden';
    const tokenTitle = token.length ? 'token-text-title' : 'token-text-hidden';

    return (
      <section className={tokenClass}>
        <h2 className="token-title">Request Token</h2>
        <form onSubmit={this.handleSubmit} className="token-form">
          <input onChange={this.handleOnChange} id="email" type="text" className="token-input" value={email} placeholder="Enter email" />
          <input onChange={this.handleOnChange} id="app" type="text" className="token-input" value={app} placeholder="Enter app name" />
          <button className="token-submit">Submit</button>
        </form>
        <h2 className={tokenTitle}>Token:</h2>
        <p className={tokenText}>{token}</p>
      </section>
    )
  }
}

export default TokenForm;
