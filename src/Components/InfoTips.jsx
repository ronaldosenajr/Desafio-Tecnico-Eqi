import PropTypes from 'prop-types';
import React from 'react';
import { InputLabel } from '@mui/material';
import { Info } from '@mui/icons-material';

export default function InfoTips({ value }) {
  return (
    <div
      style={ {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: '5px',
      } }
    >
      <InputLabel
        style={ { textAlign: 'left' } }
      >
        {value}
      </InputLabel>
      <Info />
    </div>
  );
}

InfoTips.propTypes = {
  value: PropTypes.string.isRequired,
};
