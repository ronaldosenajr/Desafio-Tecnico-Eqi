import { screen, fireEvent } from '@testing-library/react';
import React from 'react';
import SimulationForms from '../Components/SimulationForms';
import renderWithRouter from './renderWithRouter';

describe('Testa o Simulation Forms', () => {
  const config = {
    tipoRendimento: (name) => name,
    tipoIndexacao: 'pre',
    setTipoRendimento: jest.fn()
      .mockImplementation((e) => ({ tipoIndexacao: e.target.name })),
    setTipoIndexacao: jest.fn().mockImplementation((e) => e.target.name),
    ipca: '10',
    cdi: '10',
    values: { aporteInicial: '', prazo: '', aporteMensal: '', rentabilidade: '' },
    handleChange: jest.fn((prop) => (event) => (
      { ...values, [prop]: event.target.value })),
    setCanSendValues: jest.fn(),
    status: [],
  };

  test('Se contem os botões "Bruto" e "Líquido"', () => {
    renderWithRouter(<SimulationForms { ...config } />);
    const bruto = screen.getByRole('button', { name: /bruto/i });
    const liquido = screen.getByRole('button', { name: /líquido/i });
    expect(bruto).toBeInTheDocument();
    expect(liquido).toBeInTheDocument();
  });
  test('Se contem os botões "PRÉ" "PÓS" E "FIXADO"', () => {
    renderWithRouter(<SimulationForms { ...config } />);
    const pre = screen.getByRole('button', { name: /pré/i });
    const pos = screen.getByRole('button', { name: 'POS' });
    const fixado = screen.getByRole('button', { name: /fixado/i });
    expect(pre).toBeInTheDocument();
    expect(pos).toBeInTheDocument();
    expect(fixado).toBeInTheDocument();
  });
  test(`Se ao clicar nos botões "Bruto", "Líquido" chama a função 
  setTipoRendimento 2 vezes`, () => {
    renderWithRouter(<SimulationForms { ...config } />);
    const bruto = screen.getByRole('button', { name: /bruto/i });
    const liquido = screen.getByRole('button', { name: /líquido/i });
    fireEvent.click(bruto);
    fireEvent.click(liquido);
    expect(config.setTipoRendimento).toBeCalledTimes(2);
  });
  test(`Se ao clicar nos botões "PRE", "POS", "Fixado"
  chama a função setTipoIndexacao 3 vezes`, () => {
    renderWithRouter(<SimulationForms { ...config } />);
    const timesCalled = 3;
    const pre = screen.getByRole('button', { name: /pré/i });
    const pos = screen.getByRole('button', { name: 'POS' });
    const fixado = screen.getByRole('button', { name: /fixado/i });
    fireEvent.click(pre);
    fireEvent.click(pos);
    fireEvent.click(fixado);
    expect(config.setTipoIndexacao).toBeCalledTimes(timesCalled);
  });
  describe('Testa o Input Field "Aporte Inicial"', () => {
    let aporteInicial = '';
    beforeEach(() => {
      renderWithRouter(<SimulationForms { ...config } />);
      aporteInicial = screen.getByLabelText('Aporte Inicial');
      expect(aporteInicial).toBeInTheDocument();
    });
    test(`Se ao iniciar o "Aporte Inicial" está mostrando uma mensagem de erro
     e está vazio`, () => {
      const labelError = screen.getAllByText(/Aporte deve ser um número/i);
      expect(labelError).toHaveLength(2);
      expect(aporteInicial.value).toBe('');
    });
    test('Se o Input Field "Aporte Inicial" chama a função de handleChange', () => {
      fireEvent.change(aporteInicial, { target: { value: '10' } });
      expect(config.handleChange).toBeCalled();
    });
  });
  describe('Testa o Input Field "Prazo (em meses)"', () => {
    let prazoInput = '';
    const ariaInvalid = 'aria-invalid';
    beforeEach(() => {
      renderWithRouter(<SimulationForms { ...config } />);
      prazoInput = screen.getByLabelText('Prazo (em meses)');
    });
    test(`Se o Input Field "Prazo (em meses) está vazio e
    mostra uma mensagem de error ao iniciar"`, () => {
      expect(prazoInput.value).toBe('');
      const labelError = screen.getByText(/Prazo deve ser um número/i);
      expect(labelError).toBeInTheDocument();
      expect(prazoInput).toHaveAttribute(ariaInvalid, 'true');
    });
    test('Se o Input Field "Prazo (em meses)" chama a função de handleChange', () => {
      expect(prazoInput.value).toBe('');
      fireEvent.change(prazoInput, { target: { value: 20 } });
      expect(config.handleChange).toBeCalled();
    });
  });
  describe('Testa o Input Field "Aporte Mensal"', () => {
    let aporteMensal = '';
    beforeEach(() => {
      renderWithRouter(<SimulationForms { ...config } />);
      aporteMensal = screen.getByLabelText('Aporte Mensal');
    });
    test(`Se ao iniciar o "Aporte Mensal" está mostrando uma mensagem de erro
     e está vazio`, () => {
      const labelError = screen.getAllByText(/Aporte deve ser um número/i);
      expect(labelError).toHaveLength(2);
      expect(aporteMensal.value).toBe('');
    });
    test('Se o Input Field "Aporte Mensal" chama a função de handleChange', () => {
      expect(aporteMensal.value).toBe('');
      fireEvent.change(aporteMensal, { target: { value: 20 } });
      expect(config.handleChange).toBeCalled();
    });
  });
  describe('Testa o Inpunt Field "Rentabilidade"', () => {
    let rentabilidade = '';
    const ariaInvalid = 'aria-invalid';
    const msg = 'Rentabilidade deve ser um número';
    beforeEach(() => {
      renderWithRouter(<SimulationForms { ...config } />);
      rentabilidade = screen.getByLabelText('Rentabilidade');
    });
    test(`Se o Input Field "Rentabilidade" está vazio e
    mostra uma mensagem de error ao iniciar"`, () => {
      expect(rentabilidade.value).toBe('');
      const labelError = screen.getByText(msg);
      expect(labelError).toBeInTheDocument();
      expect(rentabilidade).toHaveAttribute(ariaInvalid, 'true');
    });
    test('Se o Input Field "Aporte Mensal" chama a função de handleChange', () => {
      expect(rentabilidade.value).toBe('');
      fireEvent.change(rentabilidade, { target: { value: 20 } });
      expect(config.handleChange).toBeCalled();
    });
  });
});
