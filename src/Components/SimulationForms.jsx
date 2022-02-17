import PropTypes from 'prop-types';
import React from 'react';
import {
  Button, ButtonGroup,
} from '@mui/material';
import { Check } from '@mui/icons-material';
import TextFieldComponent from './TextField';
import InfoTips from './InfoTips';
import useWindowDimensions from '../hooks/GetWindowSize';

export default function SimulationForms({
  tipoRendimento,
  setTipoRendimento,
  tipoIndexacao,
  setTipoIndexacao,
  ipca,
  cdi,
  handleChange,
  values,
  setCanSendValues,
  status,
}) {
  const { isMobile } = useWindowDimensions();

  return (
    <div
      style={ isMobile ? { width: '100%' } : { display: 'flex',
        flexDirection: 'column',
        width: '40%',
        alignSelf: 'start' } }
    >
      <h3
        style={ isMobile ? { textAlign: 'center' }
          : { textAlign: 'left', marginLeft: '2%' } }
      >
        Simulador
      </h3>
      <section
        style={ isMobile ? { justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }
          : { display: 'flex', flexWrap: 'wrap' } }
      >
        <div
          style={ {
            display: 'flex',
            marginRight: '2%',
            marginLeft: '2%',
            flexDirection: 'column',
            marginTop: '0',
            justifyItems: 'center',
            alignItems: 'start',
            marginBottom: '10px',
            minHeight: '393px',
          } }
        >
          <InfoTips value="Rendimento" />
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            sx={ {
              marginBottom: '15%',
              width: '100%',
            } }
          >
            <Button
              style={ tipoRendimento === 'bruto' ? { color: '#FEF9F7',
                backgroundColor: '#ED8E53',
                minWidth: '50%',
              } : { minWidth: '50%' } }
              size="small"
              startIcon={ tipoRendimento === 'bruto' && <Check /> }
              onClick={ (e) => setTipoRendimento(e.target.name) }
              name="bruto"
            >
              Bruto
            </Button>
            <Button
              style={ tipoRendimento === 'liquido' ? { color: '#FEF9F7',
                backgroundColor: '#ED8E53',
                minWidth: '50%',
              } : { minWidth: '50%' } }
              size="small"
              startIcon={ tipoRendimento === 'liquido' && <Check /> }
              onClick={ (e) => setTipoRendimento(e.target.name) }
              name="liquido"
            >
              Líquido
            </Button>
          </ButtonGroup>
          <TextFieldComponent
            label="Aporte Inicial"
            setState={ handleChange('aporteInicial') }
            state={ values.aporteInicial }
            name="aporte"
            setCanSendValues={ setCanSendValues }
            status={ status }
          />
          <TextFieldComponent
            label="Prazo (em meses)"
            setState={ handleChange('prazo') }
            state={ values.prazo }
            name="prazo"
            setCanSendValues={ setCanSendValues }
            status={ status }
          />
          <TextFieldComponent
            label="IPCA (ao ano)"
            state={ ipca }
            name="ipca"
            setCanSendValues={ setCanSendValues }
            status={ status }
          />
        </div>
        <div
          style={ {
            display: 'flex',
            marginRight: '2%',
            marginLeft: '2%',
            flexDirection: 'column',
            marginTop: '0',
            marginBottom: '10px',
            justifyItems: 'end',
            alignItems: 'start',
            minHeight: '393px',
          } }
        >
          <InfoTips value="Tipos de indexação" />
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            sx={ {
              marginBottom: '15%',
              marginTop: '0px',
              width: '100%',
            } }
          >
            <Button
              style={ tipoIndexacao === 'pre' ? { color: '#FEF9F7',
                backgroundColor: '#ED8E53',
                minWidth: '32%',
              } : { minWidth: '32%' } }
              size="small"
              startIcon={ tipoIndexacao === 'pre' && <Check fontSize="small" /> }
              onClick={ (e) => setTipoIndexacao(e.target.name) }
              name="pre"
            >
              PRÉ
            </Button>
            <Button
              style={ tipoIndexacao === 'pos' ? { color: '#FEF9F7',
                backgroundColor: '#ED8E53',
                minWidth: '32%',
              } : { minWidth: '32%' } }
              size="small"
              startIcon={ tipoIndexacao === 'pos' && <Check /> }
              onClick={ (e) => setTipoIndexacao(e.target.name) }
              name="pos"
            >
              POS
            </Button>
            <Button
              style={
                tipoIndexacao === 'ipca' ? { color: '#FEF9F7',
                  backgroundColor: '#ED8E53',
                  minWidth: '32%',
                } : { minWidth: '32%' }
              }
              size="small"
              startIcon={ tipoIndexacao === 'ipca' && <Check /> }
              onClick={ (e) => setTipoIndexacao(e.target.name) }
              name="ipca"
            >
              FIXADO
            </Button>
          </ButtonGroup>
          <TextFieldComponent
            label="Aporte Mensal"
            setState={ handleChange('aporteMensal') }
            state={ values.aporteMensal }
            name="aporte"
            setCanSendValues={ setCanSendValues }
            status={ status }
          />
          <TextFieldComponent
            label="Rentabilidade"
            setState={ handleChange('rentabilidade') }
            state={ values.rentabilidade }
            name="rentabilidade"
            setCanSendValues={ setCanSendValues }
            status={ status }
          />
          <TextFieldComponent
            label="CDI (ao ano)"
            state={ cdi }
            name="cdi"
            setCanSendValues={ setCanSendValues }
            status={ status }
          />
        </div>
      </section>
    </div>
  );
}

SimulationForms.propTypes = {
  cdi: PropTypes.string,
  handleChange: PropTypes.func,
  ipca: PropTypes.string,
  setTipoIndexacao: PropTypes.func,
  setTipoRendimento: PropTypes.func,
  tipoIndexacao: PropTypes.string,
  tipoRendimento: PropTypes.string,
  setCanSendValues: PropTypes.func,
}.isRequired;
