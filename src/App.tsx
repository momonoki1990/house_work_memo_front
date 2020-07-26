import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/shared/Header';

// axiosインスタンス作成
const client = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? "https://house-work-memo-back.herokuapp.com" : "http://localhost:5000"
});

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
