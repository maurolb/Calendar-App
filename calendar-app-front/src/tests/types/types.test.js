import { types } from "../../types/types";

describe('Tests on types', () => {

  test('Types must be the same', () => {
    expect(types).toEqual({
      uiOpenModal: '[ui] open modal',
      uiCloseModal: '[ui] close modal',
    
      eventStartAddNew: '[event] start add new',
      eventAddNew: '[event] add new',
      eventSetActive: '[event] set active', 
      eventClearActive: '[event] clear active',
      eventUpdated: '[event] update event',
      eventDeleted: '[event] delete event',
      eventLoaded: '[event] event loaded',
      eventLogout: '[event] clear and logout',
    
      authFinishChecking: '[auth] finish checking login state',
      authStartLogin: '[auth] start login',
      authLogin: '[auth] login',
      authStartRegister: '[auth] start register',
      authStartTokenRenew: '[auth] start token renew',
      authLogout: '[auth] logout'
      
    });
  });
  

});
