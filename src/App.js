import React, { Component } from 'react';
import './App.css';
import './firebase/firebase';
import RouterComponent from './component/router';


class App extends Component {
  render() {
    return (
      <div className="App">
          
           <RouterComponent/>

      </div>
    );
  }
}

export default App;
