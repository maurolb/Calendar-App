import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { AppRouter } from "../../router/AppRouter";

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

// store.dispatch = jest.fn();

describe('Tests on AppRouter component', () => {

  test('should show espere...', () => {
  
    const initialState = {
      auth: {
        checking: true
      }
    }
    
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )

    expect( wrapper ).toMatchSnapshot();
  });

  test('should show public route', () => {
  
    const initialState = {
      auth: {
        checking: false
      }
    }
    
    const store = mockStore(initialState);
    
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    )

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find('.auth-container').exists() ).toBe(true);
  });

  test('should show private route', () => {
  
    const initialState = {
      ui: {
        modalOpen: false
      },
      calendar: {
        events: []
      },
      auth: {
        checking: false,
        uid: 'testingUid',
        name: 'testing name'
      }
    }
    
    const store = mockStore(initialState);
    
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    )

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find('.calendar-screen').exists() ).toBe(true);
  });
  

});
