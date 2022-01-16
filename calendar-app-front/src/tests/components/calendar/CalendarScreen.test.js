import { mount } from "enzyme";
import { act } from "@testing-library/react";
import { Provider } from "react-redux";

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { eventSetActive } from "../../../actions/events";

import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { messages } from "../../../helpers/calendar-msg-es";
import { types } from "../../../types/types";

jest.mock('../../../actions/events', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn()
}));
Storage.prototype.setItem = jest.fn();

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initialState = {
  ui: {
    modalOpen: false
  },
  calendar: {
    events: []
  },
  auth: {
    uid: 'testinguid'
  }
}

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
)



describe('Tests on CalendarScreen component', () => {
  
  test('should show correctly', () => {  
    expect( wrapper ).toMatchSnapshot();
  });
  
  test('tests with Calendar interactions', () => {
    
    const calendar = wrapper.find('Calendar');

    const calendarMessages = calendar.prop('messages');
    expect( calendarMessages ).toEqual(messages)
    
    calendar.prop('onDoubleClickEvent')();
    expect( store.dispatch ).toHaveBeenCalledWith( {type: types.uiOpenModal} );
    
    calendar.prop('onSelectEvent')( {start: 'hola'} );
    expect( eventSetActive).toHaveBeenCalledWith( {start: 'hola'} );

    act( ()=> {
      calendar.prop('onView')('week');
      expect( localStorage.setItem ).toHaveBeenCalledWith('lastView', 'week');
    })
  });
  

});
