import React from 'react'

export const CalendarEvent = ({event}) => {
  
  const { title, notes, user } = event;

  return (
    <div>
      <strong>{title}</strong><br/>
      <span>{notes} </span>
      <i>- {user.name}</i>
    </div>
  )
}
