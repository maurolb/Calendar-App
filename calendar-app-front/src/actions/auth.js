import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth', {email, password}, 'POST');
    const body = await resp.json();
    
    if( body.ok ){
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime() );
      dispatch( login( {uid: body.uid, name: body.name} ))
    } else {
      Swal.fire('Error', body.message, 'error')
    }

  }
};

const login = ( user ) => ({
  type: types.authLogin,
  payload: user 
});

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth/register', {email, password, name}, 'POST');
    const body = await resp.json();

    if( body.ok ){
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime() );
      dispatch( login( {uid: body.uid, name: body.name} ))
    } else {
      Swal.fire('Error', body.message, 'error')
    }

  }
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken('auth/renew');
    const body = await resp.json();

    if( body.ok ){
      localStorage.setItem('token', body.token);
      localStorage.setItem('token-init-date', new Date().getTime() );

      dispatch( login( {uid: body.uid, name: body.name} ))

    } else {
      dispatch( checkingFinish() )
    }

  }
};

const checkingFinish = () => ({
  type: types.authFinishChecking
})

export const startLogout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch( eventLogout() );
    dispatch( logout() );
  }
}

const logout = () => ({
  type: types.authLogout
})