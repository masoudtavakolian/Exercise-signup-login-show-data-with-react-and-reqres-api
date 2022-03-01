import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import * as boot from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Preferences from './component/Preferences';
import Dashboard from './component/Dashboard';
import Login from './component/login/Login';
import { BrowserRouter, Route, Routes,Link,useNavigate } from 'react-router-dom';
import Signup from './component/signup/Signup';

function App() {
  const [token, refreshToken] = useState("");
  const setToken=(token)=>{
    sessionStorage.setItem('token', JSON.stringify(token));
    refreshToken(token);
  }
    
  if (!token){
    return (
      <>
      <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          </ul>
        </nav>
          
            <Routes>
              <Route path='/signup' element={<Signup setToken={setToken} />} />
              <Route path='/login' element={<Login setToken={setToken} />} />
            </Routes>
          </BrowserRouter>
        
      </>
    );
    }
  return (
    <div className="container">
      {/* {token?token:"hi"} */}
      <span>{token.token}</span>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='Preferences' element={<Preferences />} />
          <Route path='/signup' element={<Dashboard />} />
          <Route path='/login' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
