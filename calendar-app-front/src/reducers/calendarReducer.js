import { types } from "../types/types";
// {
//   _id: 12321321321,
//   title: 'Navidad',
//   start: moment().minutes(0).seconds(0).add(1, 'hours').toDate(),
//   end: moment().minutes(0).seconds(0).add(3, 'hours').toDate(),
//   notes: ' comprar pan dulce',
//   user: {
//     _id: 1232132132,
//     name: 'mauro'
//   }
// }

const initialState   = {
  events: [],
  activeEvent: null
}

export const calendarReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case types.eventAddNew:
      return {
        ...state,
        events: [
          ...state.events,
          payload
        ]
      }

    case types.eventSetActive:
      return {
        ...state,
        activeEvent: {
          ...payload
        }
      }

    case types.eventClearActive:
      return {
        ...state,
        activeEvent: null
      }

    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map(
          event => (event._id === payload._id) ? payload : event
        )
      }

    case types.eventDeleted:
      return {
        ...state,
        events: state.events.filter(
          event => (event._id !== state.activeEvent._id)
        ),
        activeEvent: null
      }

    case types.eventLoaded:
      return {
        ...state,
        events: [ ...payload ]
      }

    case types.eventLogout:
      return {
        ...initialState,
      }

    default:
      return state
  }
}
