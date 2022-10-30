import React from 'react';
import logo from './logo.png';
import './App.css';
import {handleApiErrors} from "./lib/api-call";
import {googleAnalytics, firebaseApp} from "./state/firebase";

function App() {
  const firebase = firebaseApp;
  const analytics = googleAnalytics
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => sayHello()}>Click to do stuff</button>
      </header>
    </div>
  );

  async function sayHello() {
    try{
      const response = await fetch("/api/hello?name=user");
      handleApiErrors(response, handleResponse);
    } catch (e) {
      console.error(e);
      alert('Request error.')
    }
  }

  async function handleResponse(response: Response) {
    const body = await response.json();
    alert(body?.message)

  }
}

export default App;
