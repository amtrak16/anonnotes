import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom'
import './ui-toolkit/css/nm-cx/main.css'
import AddNotes from './addnotes';
// import Results from './results';
// import Rankings from './rankings'
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <h1 id="title">Anonymous Notes</h1>
            <ul className="heading-nav">
              <li className="heading-nav-entry"><NavLink exact to="/" activeStyle={{ fontWeight: 'bold', color: 'red' }}>Add Notes</NavLink></li>
              {/* <li className="heading-nav-entry"><NavLink exact to="/rankings" activeStyle={{ fontWeight: 'bold', color: 'red' }}>Rankings</NavLink></li> */}
            </ul>
          </header>
          <main>
            <Route exact path="/" component={AddNotes} />
            {/* <Route exact path="/results" component={Results} />
            <Route exact path="/rankings" component={Rankings} /> */}
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
