import { screen, act } from '@testing-library/react';
import React from 'react';
import TelaInicial from '../Pages/TelaInicial';
import renderWithRouter from './renderWithRouter';

const { indicators } = require('./mockApi');

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
  });
});
