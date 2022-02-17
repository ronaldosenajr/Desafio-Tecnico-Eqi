import { screen, fireEvent } from '@testing-library/react';
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
  test('Se contem os botões "Limpar Campos" e "Simular', () => {
    renderWithRouter(<TelaInicial />);
    const clearFields = screen.getByRole('button', { name: /LIMPAR CAMPOS/i });
    const simulate = screen.getByRole('button', { name: /SIMULAR/i });
    expect(clearFields).toBeInTheDocument();
    expect(simulate).toBeInTheDocument();
  });
  test('Se ao abrir a página o botão "Bruto" está selecionado', () => {
    const selectedColor = 'rgb(237, 142, 83)';
    renderWithRouter(<TelaInicial />);
    const bruto = screen.getByRole('button', { name: /bruto/i });
    const liquido = screen.getByRole('button', { name: /líquido/i });
    expect(bruto).toHaveStyle({ backgroundColor: selectedColor });
    expect(liquido).not.toHaveStyle({ backgroundColor: selectedColor });
  });
  test('Se ao abrir a página o botão "PRÉ" está selecionado', () => {
    renderWithRouter(<TelaInicial />);
    const selectedColor = 'rgb(237, 142, 83)';
    const pre = screen.getByRole('button', { name: /pré/i });
    expect(pre).toHaveStyle({ backgroundColor: selectedColor });
  });
  test('Se ao abrir a página o botão "SIMULAR" está desabilitidado', () => {
    renderWithRouter(<TelaInicial />);
    const simulate = screen.getByRole('button', { name: /SIMULAR/i });
    expect(simulate).toHaveAttribute('disabled', '');
  });
  describe('Testa o Input Field "Aporte Inicial"', () => {
    let aporteInicial = '';
    beforeEach(() => {
      renderWithRouter(<TelaInicial />);
      aporteInicial = screen.getByLabelText('Aporte Inicial');
      expect(aporteInicial).toBeInTheDocument();
    });
    test(`Se ao iniciar o "Aporte Inicial" está mostrando uma mensagem de erro
     e está vazio`, () => {
      const labelError = screen.getAllByText(/Aporte deve ser um número/i);
      expect(labelError).toHaveLength(2);
      expect(aporteInicial.value).toBe('');
    });
    test(`Se o Input Field "Aporte Inicial" recebe os valores 
    corretamente e deixa de mostrar a msg de Error`, () => {
      const value = '1500.00,25';
      const labelError = screen.getAllByText(/Aporte deve ser um número/i);
      expect(labelError).toHaveLength(2);
      expect(aporteInicial.value).toBe('');
      fireEvent.change(aporteInicial, { target: { value } });
      expect(aporteInicial.value).toBe(value);
      const newLabelError = screen.getByText(/Aporte deve ser um número/i);
      expect(newLabelError).not.toBe('array');
    });
    test(`Se o Input Field "Aporte Inicial" continua mostrando a msg de erro
    se o que foi digitado não for um número`, () => {
      const value = 'Aporte';
      const labelError = screen.getAllByText(/Aporte deve ser um número/i);
      expect(labelError).toHaveLength(2);
      expect(aporteInicial.value).toBe('');
      fireEvent.change(aporteInicial, { target: { value } });
      expect(aporteInicial.value).toBe(value);
      expect(labelError).toHaveLength(2);
    });
  });
});
