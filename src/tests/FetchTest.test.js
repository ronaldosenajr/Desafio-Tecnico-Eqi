import { screen, act, fireEvent } from '@testing-library/react';
import React from 'react';
import TelaInicial from '../Pages/TelaInicial';
import renderWithRouter from './renderWithRouter';

const { simulation, indicators } = require('./mockApi');

describe('Testa o App', () => {
  describe(`Se ao iniciar faz uma chamada pra API e seta os valores dos campos 
  "IPCA (ao ano) e "CDI (ao ano)`, () => {
    beforeEach(() => {
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(indicators),
      }));
    });
    afterEach(() => {
      jest.fn().mockReset();
    });
    test('Se o valor de CDI é "10"', async () => {
      await act(async () => renderWithRouter(<TelaInicial />));
      const cdi = await screen.findByLabelText(/CDI/i);

      expect(cdi.value).toBe('10');
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    test('Se o valor de IPCA é "15"', async () => {
      await act(async () => renderWithRouter(<TelaInicial />));
      const ipca = await screen.findByLabelText(/IPCA/i);

      expect(ipca.value).toBe('15');
      expect(fetch).toHaveBeenCalledTimes(1);
    });
    describe('Testa se a API retorna error', () => {
      beforeEach(() => {
        global.fetch = jest.fn(async () => Promise.reject(new Error('API is Down')));
        renderWithRouter(<TelaInicial />);
      });
      afterEach(() => {
        jest.fn().mockReset();
      });
      test('Se os valores não são setados', async () => {
        const ipca = await screen.findByLabelText(/IPCA/i);
        const cdi = await screen.findByLabelText(/CDI/i);

        expect(ipca.value).toBe('');
        expect(cdi.value).toBe('');
      });
    });
  });
  describe('Testa se a API é chamada quando clicado em "SIMULAR"', () => {
    let aporteInicial = '';
    let prazoInput = '';
    let aporteMensal = '';
    let rentabilidade = '';
    const sendValues = () => {
      const simulate = screen.getByRole('button', { name: /SIMULAR/i });
      fireEvent.click(simulate);
    };
    const putValues = () => {
      const value = 10;
      fireEvent.change(aporteInicial, { target: { value } });
      fireEvent.change(prazoInput, { target: { value } });
      fireEvent.change(aporteMensal, { target: { value } });
      fireEvent.change(rentabilidade, { target: { value } });
      sendValues();
    };
    beforeEach(() => {
      renderWithRouter(<TelaInicial />);
      aporteInicial = screen.getByLabelText('Aporte Inicial');
      prazoInput = screen.getByLabelText('Prazo (em meses)');
      aporteMensal = screen.getByLabelText('Aporte Mensal');
      rentabilidade = screen.getByLabelText('Rentabilidade');
      global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(simulation),
      }));
    });
    afterEach(() => {
      jest.fn().mockReset();
    });

    test('Se acha o card "Valor Final Bruto"', async () => {
      putValues();
      const h3 = await screen.findByText(/Resultado da Simulação/i);
      const card = await screen.findByText(/Valor Final Bruto/i);
      const cardValue = await screen.findByText('R$ 2048');

      expect(h3).toBeInTheDocument();
      expect(card).toBeInTheDocument();
      expect(cardValue).toBeInTheDocument();
    });
    test('Se acha o card "Valor Final Líquido', async () => {
      putValues();
      const card = await screen.findByText(/Valor Final Líquido/i);
      const cardValue = await screen.findByText('R$ 2000');

      expect(card).toBeInTheDocument();
      expect(cardValue).toBeInTheDocument();
    });
    test('Se acha o card "Alíquota do IR', async () => {
      putValues();
      const card = await screen.findByText(/Alíquota do IR/i);
      const cardValue = await screen.findByText('10%');

      expect(card).toBeInTheDocument();
      expect(cardValue).toBeInTheDocument();
    });
    test('Se acha o card "Valor Pago em IR', async () => {
      putValues();
      const card = await screen.findByText(/Valor Pago em IR/i);
      const cardValue = await screen.findByText('R$ 20');

      expect(card).toBeInTheDocument();
      expect(cardValue).toBeInTheDocument();
    });
    test('Se acha o card "Valor Total Investido', async () => {
      putValues();
      const card = await screen.findByText(/Valor Total Investido/i);
      const cardValue = await screen.findByText('R$ 1000');

      expect(card).toBeInTheDocument();
      expect(cardValue).toBeInTheDocument();
    });
    test('Se acha o card "Ganho Líquido', async () => {
      putValues();
      const card = await screen.findByText(/Ganho Líquido/i);
      const cardValue = await screen.findByText('R$ 1048');

      expect(card).toBeInTheDocument();
      expect(cardValue).toBeInTheDocument();
    });
  });
});
