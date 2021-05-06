import { types } from "../types/types";


export const calendarEventAddNewAction = (event) => ({
  type: types.calendarEventAddNew,
  payload: event
});

export const calendarEventSetActiveAction = (event) => ({
  type: types.calendarEventSetActive,
  payload: event
});

export const calendarEventClearActiveEventAction = () => ({
  type: types.calendarEventClearActiveEvent
});

export const calendarEventUpdatedAction = (event) => ({
  type: types.calendarEventUpdated,
  payload: event
});