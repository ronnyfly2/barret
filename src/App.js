import React from 'react';
import './App.css';
import Routes from "./Routes";
import Header from './components/layouts/Header';


function App() {
  return (
    <div className="App">
			<Header></Header>
			<Routes />
    </div>
  );
}

export default App;
