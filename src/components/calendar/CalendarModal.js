import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModalAction } from '../../actions/uiActions';

import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { calendarEventAddNewAction, calendarEventClearActiveEventAction, calendarEventUpdatedAction } from '../../actions/calendarEventsActions';



const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlusOne = now.clone().add(1, 'hours');


const initEvent = {
  title: '',
  notes: '',
  start: now.toDate(),
  end: nowPlusOne.toDate()
}


const CalendarModal = () => {

  const {modalOpen} = useSelector(state => state.ui);
  const {activeEvent} = useSelector(state => state.calendar);

  const dispatch = useDispatch();

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlusOne.toDate());
  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const {title, notes, start, end} = formValues;


  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent]);



  const handleInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    });
  }

  //CLOSE MODAL
  const closeModal = () => {
    dispatch(uiCloseModalAction());
    dispatch(calendarEventClearActiveEventAction());
    setFormValues(initEvent);
  }

  const handleStartDateChange = (event) => {
    setDateStart(event);
    setFormValues({
      ...formValues,
      start: event
    });
  }

  const handleEndDateChange = (event) => {
    setDateEnd(event);
    setFormValues({
      ...formValues,
      end: event
    });
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if(momentStart.isSameOrAfter(momentEnd)) {
      Swal.fire('Error', 'La fecha 2 debe ser mayor a la fecha de inicio', 'error');
      return;
    }

    if (title.trim().length < 2) {
      setTitleValid(false);
      return;
    }

    if (activeEvent) {
      dispatch(calendarEventUpdatedAction(formValues));
    } else {
      dispatch(calendarEventAddNewAction({
        ...formValues,
        id: new Date().getTime(),
        user: {
          _id: '222',
          name: 'Alex'
        }
      }));
    }


    setTitleValid(true);
    closeModal();
  }

  return(
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >

      <h1> { (activeEvent) ? 'Actualizar evento' : 'Nuevo evento'} </h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>

          <div className="form-group">
              <label>Fecha y hora inicio</label>
              <DateTimePicker
                onChange={handleStartDateChange}
                value={dateStart}
                className="form-control"
              />
          </div>

          <div className="form-group">
              <label>Fecha y hora fin</label>
              <DateTimePicker
                onChange={handleEndDateChange}
                value={dateEnd}
                minDate={dateStart}
                className="form-control"
              />
          </div>

          <hr />
          <div className="form-group">
              <label>Titulo y notas</label>
              <input 
                  type="text" 
                  className={`form-control ${!titleValid && 'is-invalid'}`}
                  placeholder="Título del evento"
                  name="title"
                  value={title}
                  onChange={handleInputChange}
                  autoComplete="off"
              />
              <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
          </div>

          <div className="form-group">
              <textarea 
                  type="text" 
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={notes}
                  onChange={handleInputChange}
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>

          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
          >
              <i className="far fa-save"></i>
              <span> Guardar</span>
          </button>

      </form>
        
    </Modal>
  );
}


export default CalendarModal;