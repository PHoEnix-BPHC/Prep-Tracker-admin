import React from 'react';
import './App.css';
import Toolbar from './Components/Toolbar';
import { Route, Routes } from 'react-router-dom';
import User from './Pages/User';
import Home from './Pages/Home';
import Usage from './Pages/Usage';
import Login from './Components/Login';
import HomeToolbar from './Components/HomeToolbar';
import PrivateRoute from './Components/PrivateRoute';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      userId: ""
    }
  }
  componentDidMount() {
    const user = localStorage.getItem("IDNumber")
    this.setState({ userId: user })
  }
  render() {
    return (
      <div className="App">
        {this.state.userId ? <Toolbar /> : <HomeToolbar />}
        <Routes>
          <Route path="/users" element={<PrivateRoute><User /></PrivateRoute>} />
          <Route path="/" exact element={<Home />} />
          <Route path="/usage" element={<PrivateRoute><Usage /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    );
  }
}

export default App;
