import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startEventDelete } from "../../../actions/events";
import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";

jest.mock('../../../actions/events', () => ({
  startEventDelete: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {}

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
)

describe('Tests on DeleteEventFab component', () => {
  
  test('should show correctly', () => {
    expect( wrapper ).toMatchSnapshot();
  });
  
  test('should call startEventDelete on click', () => {
    wrapper.find('button').simulate('click');
    
    expect(startEventDelete).toHaveBeenCalled();
  })
  
});
