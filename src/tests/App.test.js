import { screen } from '@testing-library/react';
import React from 'react';
import TelaInicial from '../Pages/TelaInicial';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa a Tela Inicial', () => {
  test('Se contem o h1 com o texto "Simulador de Investimentos"', () => {
    renderWithRouter(<App />);
    const h1 = screen.getByRole('heading',
      { name: /Simulador de Investimentos/i });
    expect(h1).toBeInTheDocument();
  });
  test('Se contem os textos "Rendimento" e "Tipos de indexação"', () => {
    renderWithRouter(<TelaInicial />);
    const rendimento = screen.getByText(/Rendimento/i);
    const tiposIndexacao = screen.getByText(/Tipos de indexação/i);
    expect(rendimento).toBeInTheDocument();
    expect(tiposIndexacao).toBeInTheDocument();
  });
  test('Se contem os botões "Bruto" e "Líquido"', () => {
    renderWithRouter(<TelaInicial />);
    const bruto = screen.getByRole('button', { name: /bruto/i });
    const liquido = screen.getByRole('button', { name: /líquido/i });
    expect(bruto).toBeInTheDocument();
    expect(liquido).toBeInTheDocument();
  });
  test('Se contem os botões "PRÉ" "PÓS" E "FIXADO"', () => {
    renderWithRouter(<TelaInicial />);
    const pre = screen.getByRole('button', { name: /pré/i });
    const pos = screen.getByRole('button', { name: 'POS' });
    const fixado = screen.getByRole('button', { name: /fixado/i });
    expect(pre).toBeInTheDocument();
    expect(pos).toBeInTheDocument();
    expect(fixado).toBeInTheDocument();
  });
});
