import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


let initialState = {
  checking: true
}

describe('Tests on uiReducer', () => {

  test('should return default state', () => {
    const state = authReducer( initialState, {});

    expect( state ).toEqual(initialState);
  });

  test('case authLogin', () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: 'testUid',
        name: 'testName'
      } 
    }

    const state = authReducer(initialState, action);

    expect( state ).toEqual( {checking: false, uid: 'testUid', name: 'testName'} );
  });

  test('case finishChecking', () => {
    const action = {
      type: types.authFinishChecking
    }

    const state = authReducer(initialState, action);

    expect(state).toEqual({ checking: false });
  });
  
  
  test('case logout', () => {
    const action = {
      type: types.authLogout
    }

    const state = authReducer(initialState, action);

    expect(state).toEqual({ checking: false });
  });
  

});
