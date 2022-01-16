import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";


const initialState = {
  modalOpen: false
}

describe('Tests on uiReducer', () => {
  
  test('should return default state', () => {
    
    const state = uiReducer( initialState, {});

    expect( state ).toEqual(initialState);
  });

  test('should open modal', () => {
    const modalOpen = uiOpenModal();
    const state = uiReducer( initialState, modalOpen );

    expect( state ).toEqual({ modalOpen: true });
  });

  test('should close modal', () => {
    const modalClose = uiCloseModal();
    const state = uiReducer( initialState, modalClose );

    expect( state ).toEqual({ modalOpen: false });
  });
  

});
