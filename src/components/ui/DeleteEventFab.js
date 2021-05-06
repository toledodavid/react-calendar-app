import React from 'react';
import { useDispatch } from 'react-redux';
import { calendarEventDeletedAction } from '../../actions/calendarEventsActions';



const DeleteEventFab = () => {

	const dispatch = useDispatch();

	
	const handleDeleteEvent = () => {
		dispatch(calendarEventDeletedAction());
	}

	return(
		<button className="btn btn-danger fab-danger" onClick={handleDeleteEvent}>
			<i className="fas fa-trash"></i>
			<span> Borrar evento</span>
		</button>
	);
}



export default DeleteEventFab;