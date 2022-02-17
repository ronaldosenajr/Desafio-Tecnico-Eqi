const simulationValues = () => [
  {
    tipoIndexacao: 'pre',
    tipoRendimento: 'bruto',
    valorFinalBruto: 2048,
    aliquotaIR: 10,
    valorPagoIR: 20,
    valorTotalInvestido: 1000,
    valorFinalLiquido: 2000,
    ganhoLiquido: 1048,
  },
];

const indicatorsValues = () => [
  {
    nome: 'cdi',
    valor: 10,
  },
  {
    nome: 'ipca',
    valor: 15,
  },
];

module.exports = { simulation: simulationValues(), indicators: indicatorsValues() };
