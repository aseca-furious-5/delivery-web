import React from 'react';
import './App.css';
import DeliveryList from './DeliveryList';

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <h1>Delivery App</h1>
        </header>
        <main>
          <DeliveryList />
        </main>
      </div>
  );
}

export default App;
