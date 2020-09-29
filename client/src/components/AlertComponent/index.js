import React from 'react';
import { useAlert } from 'react-alert'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import alertConstants from '../../redux/actionTypes/alert.types';

const AlertComponent = () => {
  const alertReducer = useSelector(state => state.alert);
  const alert = useAlert();

  useEffect( () => {
    switch (alertReducer.type) {
      case alertConstants.SUCCESS:
        alert.success(alertReducer.message);
      break;
      case alertConstants.ERROR:
        alert.error(alertReducer.message);
      break;
      case alertConstants.INFO:
        alert.info(alertReducer.message);
      break;
    }
  }, [alertReducer])

  return (
    null
  )
}

export default AlertComponent;