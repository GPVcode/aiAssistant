import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from './components/chat';
import Login from './components/login';
import Header from "./components/header";

function App() {
  const [user, setUser] = useState(null);
  const [secret, setSecret] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const isAuth = Boolean(user) && Boolean(secret);

  return (
    <div className="app">
      <BrowserRouter>
      
      <Header isAuth={isAuth}/>
        <Routes>
          <Route 
            path='/'
            element={ isAuth ? ( <Navigate to="/chat" /> ) : ( <Login setUser={setUser} setSecret={setSecret} isRegister={isRegister} setIsRegister={setIsRegister}/> ) }
          />
          <Route 
            path="/chat" 
            element={ isAuth ? ( <Chat user={user} secret={secret} /> ) : ( <Navigate to='/' /> ) }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
