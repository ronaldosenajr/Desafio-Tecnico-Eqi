import PropTypes from 'prop-types';
import React from 'react';
import useWindowDimensions from '../hooks/GetWindowSize';
import CardValues from './CardValues';

export default function SimulationResult({ apiValues }) {
  const { isMobile } = useWindowDimensions();
  return (
    <div
      style={ isMobile ? { width: '100%', display: 'flex' } : { display: 'flex',
        flexDirection: 'column',
        width: '60%',
        alignSelf: 'start' } }
    >
      <h3
        style={ isMobile ? { textAlign: 'center' }
          : { textAlign: 'left', marginLeft: '2%' } }
      >
        Resultado da Simulação
      </h3>
      <section
        style={ isMobile ? { justifyContent: 'center', display: 'flex', flexWrap: 'wrap' }
          : { display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginRight: '5%',
            marginLeft: '2%' } }
      >
        <CardValues
          title="Valor Final Bruto"
          value={ `R$ ${apiValues[0].valorFinalBruto}` }
        />
        <CardValues
          title="Alíquota do IR"
          value={ `${apiValues[0].aliquotaIR}%` }
        />
        <CardValues
          title="Valor Pago em IR"
          value={ `R$ ${apiValues[0].valorPagoIR}` }
        />
        <CardValues
          title="Valor Final Líquido"
          value={ `R$ ${apiValues[0].valorFinalLiquido}` }
        />
        <CardValues
          title="Valor Total Investido"
          value={ `R$ ${apiValues[0].valorTotalInvestido}` }
        />
        <CardValues
          title="Ganho Líquido"
          value={ `R$ ${apiValues[0].ganhoLiquido}` }
        />
      </section>
    </div>
  );
}

SimulationResult.propTypes = {
  apiValues: PropTypes.arrayOf(PropTypes.object).isRequired,
};
