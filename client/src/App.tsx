import React from 'react';
import logo from './logo.png';
import './App.css';
import {handleApiErrors} from "./lib/api-call";
import {googleAnalytics} from "./state/firebase";
import {authWithGoogle} from "./lib/login";

function App() {
  const analytics = googleAnalytics;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button id="access" onClick={() => access()}>Access</button>
      </header>
    </div>
  );

  async function access() {
    const credential = await authWithGoogle();
    await sayHello(credential?.user?.displayName || 'Buddy');
  }

  async function sayHello(name: string) {
    try{
      const response = await fetch(`/api/hello?name=${name}`);
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
