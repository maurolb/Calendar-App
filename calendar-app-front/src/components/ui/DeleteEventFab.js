import React from 'react'
import { useDispatch } from 'react-redux';
import { startEventDelete } from '../../actions/events';

export const DeleteEventFab = () => {

  const dispatch = useDispatch();

  const clickFabButton = () => {
    dispatch( startEventDelete() )
  }

  return (
    <button
      className="btn btn-danger delete"
      onClick={clickFabButton}
    >
      <i className="fas fa-trash"></i> Borrar Evento
    </button>
  )
}
