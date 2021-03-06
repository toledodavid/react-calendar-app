import React from 'react';
import { useDispatch } from 'react-redux';
import { uiOpenModalAction } from '../../actions/uiActions';


const AddNewFab = () => {

  const dispatch = useDispatch();

  const handleClickNew = () => {
    dispatch(uiOpenModalAction());
  }

  return(
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
}


export default AddNewFab;