import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import useWindowDimensions from '../hooks/GetWindowSize';
import SimulationForms from '../Components/SimulationForms';

function TelaInicial() {
  const [tipoRendimento, setTipoRendimento] = useState('bruto');
  const [tipoIndexacao, setTipoIndexacao] = useState('pre');
  const [values, setValues] = useState({
    aporteInicial: '',
    aporteMensal: '',
    prazo: '',
    rentabilidade: '',
  });
  const [ipca, setIpca] = useState('');
  const [cdi, setCdi] = useState('');
  const [status, setStatus] = useState([]);
  const { isMobile } = useWindowDimensions();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = process.env.REACT_APP_API_URL;
        const [cdiFromApi, ipcaFromApi] = await fetch(`${url}/indicadores`)
          .then((value) => value.json());
        setIpca(`${ipcaFromApi.valor}`);
        setCdi(`${cdiFromApi.valor}`);
      } catch (error) {
        console.log('API FORA DO AR');
      }
    };
    fetchData();
  }, []);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Box
      style={ {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '2%',
        marginRight: '2%',
        backgroundColor: '#EFEFEF',
        minHeight: '35rem',
        marginTop: '1%',
        alignSelf: 'center',
      } }
      sx={ {
        width: {
          xl: 500, // theme.breakpoints.up('xl')
        },
      } }
    >
      <h1>Simulador de Investimentos</h1>
      <Box style={ { display: 'flex' } }>
        <Box
          style={ !isMobile ? {
            display: 'flex',
            alignItems: 'center',
            marginTop: '5px',
            width: '100%',
            flexWrap: 'wrap',
          } : {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexWrap: 'wrap',
          } }
          component="form"
          mt="5%"
        >
          <SimulationForms
            tipoRendimento={ tipoRendimento }
            tipoIndexacao={ tipoIndexacao }
            setTipoIndexacao={ setTipoIndexacao }
            setTipoRendimento={ setTipoRendimento }
            ipca={ ipca }
            cdi={ cdi }
            handleChange={ handleChange }
            values={ values }
            setCanSendValues={ setStatus }
            status={ status }
          />
        </Box>
      </Box>

    </Box>
  );
}

export default TelaInicial;
