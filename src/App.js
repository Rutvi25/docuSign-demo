import './App.css';

import Home from './components/Home';
import Signin from './components/Signin';
import { Route, Routes } from 'react-router-dom';

function App() {
   return (
    localStorage.token ? <Home /> : <Signin />
  );
}

export default App;
