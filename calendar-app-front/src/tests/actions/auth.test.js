import configureSore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import { types } from "../../types/types";
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureSore( middlewares );

const initialState = {};
let store = mockStore(initialState);

Storage.prototype.setItem = jest.fn();

describe('Tests on auth actions', () => {
  
  beforeEach( () => {
    store = mockStore( initialState );
    jest.clearAllMocks();
  });

  test('startLogin should work', async () => {
    await store.dispatch( startLogin('mauro@mauro.com', 'asd123') );
    const actions = store.getActions();

    expect( actions[0] ).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String)
      }
    });

    expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
    expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));
  });

  test('startLogin shuldnt work', async () => {
    await store.dispatch( startLogin('mauro@mauro.com', 'estacontraseñanoexiste') );
    let actions = store.getActions();

    expect( actions ).toEqual([]);
    expect( Swal.fire ).toHaveBeenCalledWith("Error", "Wrong password", "error");

    await store.dispatch( startLogin('esteemailnoexiste@gmail.com', 'asd123') );
    actions = store.getActions();
    expect( Swal.fire ).toHaveBeenCalledWith("Error", "Wrong email", "error");

  });

  test('startRegister shuld work', async () => {
    
    fetchModule.fetchSinToken = jest.fn( () => ({
      json() {
        return {
          ok: true,
          uid: 'fakeUid',
          name: 'fakeName',
          token: 'sadsadsadtoken'
        }
      }
    }));

    await store.dispatch( startRegister('test@test.com', 'asd123', 'test') );

    const actions = store.getActions();

    expect( actions[0] ).toEqual({
      type: types.authLogin,
      payload: {
        uid: 'fakeUid',
        name: 'fakeName'
      }
    });

    expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'sadsadsadtoken');
    expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));
  });
  
  test('startChecking should work', async () => {
    
    fetchModule.fetchConToken = jest.fn( () => ({
      json() {
        return {
          ok: true,
          uid: 'fakeUid',
          name: 'fakeName',
          token: 'sadsadsadtoken'
        }
      }
    }));

    await store.dispatch( startChecking() );
    const actions = store.getActions();

    expect( actions[0] ).toEqual({
      type: types.authLogin,
      payload: {
        uid: 'fakeUid',
        name: 'fakeName'
      }
    });

    expect( localStorage.setItem ).toHaveBeenCalledWith("token", "sadsadsadtoken")
  });
  

});
