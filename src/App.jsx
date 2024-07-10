import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import LoginPage from './components/LoginPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUpForm} />
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={SignUpForm} /> {/* Default route */}
      </Switch>
    </Router>
  );
};

export default App;
