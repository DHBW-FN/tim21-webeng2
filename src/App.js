import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [wikipedia, setWikipedia] = useState(["Waiting for article..."])

  function wikipediaLookup(city){
    fetch(`https://de.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${city}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setWikipedia(data.query.pages[Object.keys(data.query.pages)[0]].extract)
        })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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

export default App;
