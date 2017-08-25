/* eslint-disable */

import React, { Component } from 'react';
import Header from './Header';
import './styles/App.scss';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <section className="App">
        <Header />
      </section>
    )
  }
}

export default App;
