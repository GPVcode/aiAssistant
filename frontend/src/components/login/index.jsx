// useState is used to store submitted credentials and will be sent to chat engine by triggering setUser and setSecret
import React, { useState, useEffect } from 'react'
import { usePostLoginMutation, usePostSignUpMutation } from '../../state/api';
import { setCredentials } from '../../state/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ setUser, setSecret, setIsRegister, isRegister }) => {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    triggerLogin({ username, password })
    dispatch(setCredentials({ username, password }));
  } catch (err) {
    toast.error(err?.data?.message || err.error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
    triggerSignUp({ username, password })
    dispatch(setCredentials({ username, password }))
    } catch(err){
        toast.error(err?.data?.message || err.error);
    }
  };

  // utilize useEffect to navigate after userInfo is authorized
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    } 
  }, [navigate, userInfo]);

  useEffect(() => {
    // set user and passwird if we have login response
    if (resultLogin.data?.response){
      setUser(username)
      setSecret(password)
    }
  }, [resultLogin.data]) // eslint-disable-line 

  return (
    <div className='login-page'>
      <div className='login-container'>
        <h2 className='title'>Welcome to my ChatGPT App</h2>
        <p className='register-change' onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already a user?" : "Are you a new user?"}
        </p>
        <div>
          <input 
            className='login-input'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input 
            className='login-input'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='login-actions'>
          {isRegister ? (
            <button type="button" className="login-button" onClick={handleRegister}>
              Register
            </button>
          ) : (
            <button type="button" className="login-button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login


