import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLogin } from "../../../actions/auth";
import { LoginScreen } from "../../../components/auth/LoginScreen";

jest.mock('../../../actions/auth', () => ({
  startLogin: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {}

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <BrowserRouter>
      <LoginScreen />
    </BrowserRouter>
  </Provider>
)


describe('Tests on LoginScreen component', () => {
  
  beforeEach( () => {
    jest.clearAllMocks();
  });

  test('should show correctly', () => {
    expect( wrapper ).toMatchSnapshot();
  });

  test('should call login dispatch', () => {
    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        name: 'email',
        value: 'test@testing.com'
      }
    });

    wrapper.find('input[name="password"]').simulate('change', {
      target: {
        name: 'password',
        value: 'asd123'
      }
    });

    // cuando existen 2 forms se selecciona el primero con .at(0)
    wrapper.find('form').at(0).simulate('submit', {
      preventDefault(){}
    });

    expect( startLogin ).toHaveBeenCalledWith("test@testing.com", "asd123")
  });
  

});
