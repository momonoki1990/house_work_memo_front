import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// axiosインスタンス作成
const client = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? "https://sample-express-ts-app.herokuapp.com" : "http://localhost:5000"
});

class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      text: null
    }
  }
  componentDidMount() {
    client.get('/')
      .then(response => console.log(response.data));
      //.catch (err => console.log('非同期通信がエラー'));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Respnse: Sample</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
  
}

export default App;
