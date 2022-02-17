import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import useWindowDimensions from '../hooks/GetWindowSize';
import ClearAndSendComponent from '../Components/ClearAndSendComponent';
import SimulationForms from '../Components/SimulationForms';
import SimulationResult from '../Components/SimulationResult';

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
  const [apiValues, setApiValues] = useState([]);
  const [showResult, setShowResult] = useState(false);

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

  const clearFields = () => {
    setValues({
      aporteInicial: '',
      aporteMensal: '',
      prazo: '',
      rentabilidade: '',
    });
    setShowResult(false);
  };

  const getDataFromApi = async () => {
    try {
      const baseUrl = process.env.REACT_APP_API_URL;
      const completeUrl = `${baseUrl}/simulacoes?
    tipoIndexacao=${tipoIndexacao}&tipoRendimento=${tipoRendimento}`;
      const result = await fetch(completeUrl).then((value) => value.json());
      setApiValues(result);
      setShowResult(true);
    } catch (error) {
      console.log('API FORA DO AR');
    }
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
          {showResult && <SimulationResult apiValues={ apiValues } />}
        </Box>
      </Box>
      <ClearAndSendComponent
        clearFields={ clearFields }
        isMobile={ isMobile }
        status={ status }
        onClick={ getDataFromApi }
      />
    </Box>
  );
}

export default TelaInicial;

//Criado por Ronaldo Sena Jr.
