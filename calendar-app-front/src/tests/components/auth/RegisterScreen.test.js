import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { startRegister } from "../../../actions/auth";
import Swal from "sweetalert2";

jest.mock('../../../actions/auth', () => ({
  startRegister: jest.fn()
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {}

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <BrowserRouter>
      <RegisterScreen />
    </BrowserRouter>
  </Provider>
)


describe('Tests on RegisterScreen component', () => {

  beforeEach( () => {
    jest.clearAllMocks();
  });

  test('should show correctly', () => {
    expect( wrapper ).toMatchSnapshot();
  });
  
  test('should fail if passwords are different', () => {
    wrapper.find('input[name="password"]').simulate('change', {
      target: {
        name: 'password',
        value: 'asd123'
      }
    });

    wrapper.find('input[name="password2"]').simulate('change', {
      target: {
        name: 'password2',
        value: 'asdasd'
      }
    });

    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect( startRegister ).toHaveBeenCalledTimes(0);
    expect( Swal.fire ).toHaveBeenCalledWith("Error", "Las contraseñas deben ser iguales", "error");
  });
  
  test('should pass if password are the same', () => {

    wrapper.find('input[name="name"]').simulate('change', {
      target: {
        name: 'name',
        value: 'testingname'
      }
    });

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

    wrapper.find('input[name="password2"]').simulate('change', {
      target: {
        name: 'password2',
        value: 'asd123'
      }
    });

    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect( Swal.fire ).toHaveBeenCalledTimes(0);
    expect( startRegister ).toHaveBeenCalledWith("test@testing.com", "asd123", "testingname");
  });
  
});
