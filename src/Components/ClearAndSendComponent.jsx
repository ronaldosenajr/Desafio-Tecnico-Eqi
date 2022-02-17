import PropTypes from 'prop-types';
import React from 'react';
import {
  Button, ButtonGroup, Box,
} from '@mui/material';

export default function ClearAndSendComponent({ clearFields, isMobile,
  status, onClick }) {
  const minLenth = 4;
  return (
    <Box
      style={ !isMobile ? {
        display: 'flex',
        alignItems: 'center',
        marginTop: '5px',
        flexWrap: 'wrap',
        marginLeft: '1%',
      } : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      } }
    >
      <div
        style={ {
          display: 'flex',
          marginRight: '1%',
          justifyItems: 'center',
          alignItems: 'center',
          minWidth: '236px',
        } }
      >
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          sx={ {
            marginBottom: '15%',
            width: '100%',
          } }
        >
          <Button
            variant="outlined"
            onClick={ clearFields }
            size="large"
            style={ { minWidth: '100%' } }
            name="clearFields"
          >
            Limpar Campos
          </Button>
        </ButtonGroup>
      </div>
      <div
        style={ {
          display: 'flex',
          marginRight: '1%',
          marginLeft: '0',
          justifyItems: 'center',
          alignItems: 'center',
          minWidth: '236px',
        } }
      >
        <ButtonGroup
          variant="outlined"
          aria-label="outlined button group"
          sx={ {
            marginBottom: '15%',
            width: '100%',
          } }
        >
          <Button
            variant="contained"
            color="warning"
            size="large"
            style={ { minWidth: '100%' } }
            disabled={ status.length < minLenth }
            onClick={ onClick }
            name="simulate"
          >
            Simular
          </Button>
        </ButtonGroup>
      </div>
    </Box>
  );
}

ClearAndSendComponent.propTypes = {
  clearFields: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  status: PropTypes.arrayOf(PropTypes.bool).isRequired,
  onClick: PropTypes.func.isRequired,
};
