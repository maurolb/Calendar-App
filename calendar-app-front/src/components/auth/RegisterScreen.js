import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './auth.css';

export const RegisterScreen = () => {

  const dispatch = useDispatch();

  const [ formRegisterValues, handleRegisterInputChange ] = useForm({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formRegisterValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if( name === ''){
      return Swal.fire('Error', 'El nombre es requerido', 'error');
    }
    if( password !== password2 ){
      return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error');
    }
    dispatch( startRegister( email, password, name ) )
  }

  return (
    <div className='auth-container'>
      <div className="login-form-2">
        <h3>Registro</h3>
        <form onSubmit={handleRegister}>
          <div className="form-group">
              <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  name="name"
                  value={name}
                  onChange={handleRegisterInputChange}
              />
          </div>
          <div className="form-group">
              <input
                  type="email"
                  className="form-control"
                  placeholder="Correo"
                  name="email"
                  value={email}
                  onChange={handleRegisterInputChange}
              />
          </div>
          <div className="form-group">
              <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="password"
                  value={password}
                  onChange={handleRegisterInputChange}
              />
          </div>

          <div className="form-group">
              <input
                  type="password"
                  className="form-control"
                  placeholder="Confirmar contraseña"
                  name="password2"
                  value={password2}
                  onChange={handleRegisterInputChange}
              />
          </div>

          <div className="form-group">
              <input 
                  type="submit" 
                  className="btnSubmit" 
                  value="Crear cuenta" />
          </div>
          <Link to="/auth/login" className="link">Ya estas registrado?</Link>
        </form>
      </div>
    </div>
  )
}
