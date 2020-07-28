import React, { Component } from 'react';
import './App.css';
import Header from './components/shared/Header';

class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      text: null
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
      </div>
    );
  }
  
}

export default App;
