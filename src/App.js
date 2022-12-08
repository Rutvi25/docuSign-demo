import './App.css';
import { useState } from 'react';
import Home from './components/Home';
import Signin from './components/Signin';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    loggedIn ? <Home /> : <Signin />
  );
}

export default App;
