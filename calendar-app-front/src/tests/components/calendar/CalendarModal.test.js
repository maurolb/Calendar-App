import { mount } from "enzyme";
import moment from "moment";
import { act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startEventUpdate, eventClearActive, eventStartAddNew } from "../../../actions/events";
import { CalendarModal } from "../../../components/calendar/CalendarModal";
import Swal from "sweetalert2";

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));

jest.mock('../../../actions/events', () => ({
  startEventUpdate: jest.fn(),
  eventClearActive: jest.fn(),
  eventStartAddNew: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1Hour = now.clone().add(1, 'hours');

const initialState = {
  ui: {
    modalOpen: true
  },
  calendar: {
    events: [],
    activeEvent: {
      title: 'hola mundo',
      notes: 'Algunas notas',
      start: now.toDate(),
      end: nowPlus1Hour.toDate()
    }
  },
  auth: {
    uid: 'testinguid'
  }
}

const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
)
  
describe('Tests on CalendarModal component', () => {

  beforeEach( () => {
    jest.clearAllMocks();
  });
  
  test('should show the Modal', () => {
    expect( wrapper.find('Modal').prop('isOpen') ).toBe(true)
  })

  test('should call update action and close the modal', () => {
    
    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect( startEventUpdate ).toHaveBeenCalledWith(initialState.calendar.activeEvent);
    expect( eventClearActive ).toHaveBeenCalled();
  });
  
  test('should show error if title is empty', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect( wrapper.find('input[name="title"]').hasClass('is-invalid') ).toBe(true);
  });
  
  test('should create a new event', () => {
    const initialState = {
      ui: {
        modalOpen: true
      },
      calendar: {
        events: [],
        activeEvent:null
      },
      auth: {
        uid: 'testinguid',
        name: 'testingname'
      }
    }

    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'testingtitle'
      }
    }) 

    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect( eventStartAddNew ).toHaveBeenCalledWith({
      "end": expect.anything(),
      "notes": "",
      "start": expect.anything(),
      "title": "testingtitle"
    });
  });

  test('should validate dates', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'testingtitle'
      }
    });

    const hoy = new Date();

    act( () => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
    })

    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });
    
    expect( Swal.fire ).toHaveBeenCalledWith("Fecha inválida", "La fecha de fin debe ser mayor a la fecha de inicio", "error");
  });
  
});
