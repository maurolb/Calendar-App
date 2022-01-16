import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './auth.css';

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const [ formLoginValues, handleLoginInputChange ] = useForm({
    email: '',
    password: ''
  });

  const { email, password } = formLoginValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch( startLogin(email, password) )
  }

  return (
    <div className="auth-container">
      <div className="login-form-1">
        <h3>Ingreso</h3>
        <form onSubmit={handleLogin}>
            <div className="form-group">
                <input 
                    type="text"
                    className="form-control"
                    placeholder="Correo"
                    name="email"
                    value={email}
                    onChange={handleLoginInputChange}
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    name="password"
                    value={password}
                    onChange={handleLoginInputChange}
                />
            </div>
            <div className="form-group">
                <input 
                    type="submit"
                    className="btnSubmit"
                    value="Login"
                />
            </div>
            <Link to="/auth/register" className="link">Registrate</Link>
          </form>
      </div>
    </div>
  )
}
