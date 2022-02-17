import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';

const showMessageAporte = (setErrorMsg, state) => {
  const isValidAport = /^[0-9,.]*$/.test(state);
  const isNan = Number.isNaN(parseFloat(state));
  setErrorMsg('');
  if (!isValidAport || isNan) {
    setErrorMsg('Aporte deve ser um número');
  }
};

const showMessageRentabilidade = (setErrorMsg, state) => {
  const isValidRentabilidade = /^[0-9,.]*$/.test(state);
  const isNan = Number.isNaN(parseFloat(state));
  setErrorMsg('');
  if (!isValidRentabilidade || isNan) {
    setErrorMsg('Rentabilidade deve ser um número');
  }
};

const showMessagePrazo = (setErrorMsg, state) => {
  const isValidPrazo = /^[0-9]*$/.test(state);
  const isNan = Number.isNaN(parseFloat(state));
  setErrorMsg('');
  if (!isValidPrazo || isNan) {
    setErrorMsg('Prazo deve ser um número');
  }
  if (Number(state) <= 0 && state !== '') {
    setErrorMsg('Prazo deve ser um número maior que 0');
  }
};

function TextFieldComponent({ label, setState, state, name, setCanSendValues, status }) {
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (name === 'aporte') {
      showMessageAporte(setErrorMsg, state);
    }
    if (name === 'prazo') { showMessagePrazo(setErrorMsg, state); }
    if (name === 'rentabilidade') {
      showMessageRentabilidade(setErrorMsg, state);
    }
  }, [state]);

  useEffect(() => {
    if (errorMsg.length < 1) {
      setCanSendValues([...status, true]);
    } else if (status.length > 0) {
      status.pop();
      setCanSendValues([...status]);
    }
  }, [errorMsg]);

  const inputProps = () => {
    if (name === 'aporte') {
      return {
        startAdornment: (
          <InputAdornment position="start">
            R$
          </InputAdornment>
        ),
      };
    }
    if (name === 'rentabilidade' || name === 'cdi' || name === 'ipca') {
      return {
        endAdornment: (
          <InputAdornment position="end">
            %
          </InputAdornment>
        ),
      };
    }

    return {};
  };
  return (
    <TextField
      id={ label }
      label={ label }
      type="text"
      InputLabelProps={ {
        shrink: true,
      } }
      variant="standard"
      sx={ { marginBottom: '10%', minHeight: '71px', width: '100%' } }
      value={ state }
      onChange={ setState }
      error={ errorMsg.length > 1 }
      helperText={ errorMsg }
      InputProps={ inputProps() }
    />
  );
}

TextFieldComponent.propTypes = {
  label: PropTypes.string,
  setState: PropTypes.func,
  state: PropTypes.string,
  setCanSendValues: PropTypes.func,
  status: PropTypes.func,
}.isRequired;

export default TextFieldComponent;
