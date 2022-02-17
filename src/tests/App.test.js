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
  describe('Testa o Input Field "Prazo (em meses)"', () => {
    let prazoInput = '';
    const ariaInvalid = 'aria-invalid';
    beforeEach(() => {
      renderWithRouter(<TelaInicial />);
      prazoInput = screen.getByLabelText('Prazo (em meses)');
    });
    test(`Se o Input Field "Prazo (em meses) está vazio e
    mostra uma mensagem de error ao iniciar"`, () => {
      expect(prazoInput.value).toBe('');
      const labelError = screen.getByText(/Prazo deve ser um número/i);
      expect(labelError).toBeInTheDocument();
      expect(prazoInput).toHaveAttribute(ariaInvalid, 'true');
    });
    test(`Se o Input Field "Prazo (em meses) recebe os valores corretamente e
    deixa de mostrar a msg de erro`, () => {
      const value = '20';
      const msg = /Prazo deve ser um número/i || /Prazo deve ser um número maior que 0/i;
      expect(prazoInput.value).toBe('');
      const labelError = screen.getByText(msg);
      fireEvent.change(prazoInput, { target: { value: 20 } });
      expect(prazoInput.value).toBe(value);
      expect(prazoInput).toHaveAttribute(ariaInvalid, 'false');
      expect(labelError).not.toBeInTheDocument();
    });
    test(`Se o Input Field "Prazo (em meses) recebe valores incorretos
     e mostra a mensagem de erro`, () => {
      expect(prazoInput.value).toBe('');
      fireEvent.change(prazoInput, { target: { value: -5 } });
      expect(prazoInput).toHaveAttribute(ariaInvalid, 'true');
      const labelError = screen.getByText('Prazo deve ser um número maior que 0');
      expect(labelError).toBeInTheDocument();
      fireEvent.change(prazoInput, { target: { value: 'Prazo' } });
      expect(prazoInput).toHaveAttribute(ariaInvalid, 'true');
      const newLabelError = screen.getByText('Prazo deve ser um número');
      expect(newLabelError).toBeInTheDocument();
    });
  });
  describe('Testa o Input Field "Aporte Mensal"', () => {
    let aporteMensal = '';
    beforeEach(() => {
      renderWithRouter(<TelaInicial />);
      aporteMensal = screen.getByLabelText('Aporte Mensal');
    });
    test(`Se ao iniciar o "Aporte Mensal" está mostrando uma mensagem de erro
     e está vazio`, () => {
      const labelError = screen.getAllByText(/Aporte deve ser um número/i);
      expect(labelError).toHaveLength(2);
      expect(aporteMensal.value).toBe('');
    });
    test(`Se o Input Field "Aporte Mensal" recebe os valores 
    corretamente e deixa de mostrar a msg de Error`, () => {
      const value = '1500.00,25';
      const labelError = screen.getAllByText(/Aporte deve ser um número/i);
      expect(labelError).toHaveLength(2);
      expect(aporteMensal.value).toBe('');
      fireEvent.change(aporteMensal, { target: { value } });
      expect(aporteMensal.value).toBe(value);
      const newLabelError = screen.getByText(/Aporte deve ser um número/i);
      expect(newLabelError).not.toBe('array');
    });
    test(`Se o Input Field "Aporte Mensal" continua mostrando a msg de erro
    se o que foi digitado não for um número`, () => {
      const value = 'Aporte';
      const labelError = screen.getAllByText(/Aporte deve ser um número/i);
      expect(labelError).toHaveLength(2);
      expect(aporteMensal.value).toBe('');
      fireEvent.change(aporteMensal, { target: { value } });
      expect(aporteMensal.value).toBe(value);
      expect(labelError).toHaveLength(2);
    });
  });
  describe('Testa o Inpunt Field "Rentabilidade"', () => {
    let rentabilidade = '';
    const ariaInvalid = 'aria-invalid';
    const msg = 'Rentabilidade deve ser um número';
    beforeEach(() => {
      renderWithRouter(<TelaInicial />);
      rentabilidade = screen.getByLabelText('Rentabilidade');
    });
    test(`Se o Input Field "Rentabilidade" está vazio e
    mostra uma mensagem de error ao iniciar"`, () => {
      expect(rentabilidade.value).toBe('');
      const labelError = screen.getByText(msg);
      expect(labelError).toBeInTheDocument();
      expect(rentabilidade).toHaveAttribute(ariaInvalid, 'true');
    });
    test(`Se o Input Field "Rentabilidade" recebe os valores corretamente e
    deixa de mostrar a msg de erro`, () => {
      const value = '20';
      expect(rentabilidade.value).toBe('');
      const labelError = screen.getByText(msg);
      fireEvent.change(rentabilidade, { target: { value: 20 } });
      expect(rentabilidade.value).toBe(value);
      expect(rentabilidade).toHaveAttribute(ariaInvalid, 'false');
      expect(labelError).not.toBeInTheDocument();
    });
    test(`Se o Input Field "Rentabilidade" recebe valores incorretos
     e mostra a mensagem de erro`, () => {
      expect(rentabilidade.value).toBe('');
      expect(rentabilidade).toHaveAttribute(ariaInvalid, 'true');
      const labelError = screen.getByText(msg);
      expect(labelError).toBeInTheDocument();
      fireEvent.change(rentabilidade, { target: { value: 'Rentabilidade' } });
      expect(rentabilidade).toHaveAttribute(ariaInvalid, 'true');
      expect(labelError).toBeInTheDocument();
    });
  });
  describe('Testa preencher o forms com os dados requeridos', () => {
    let aporteInicial = '';
    let prazoInput = '';
    let aporteMensal = '';
    let rentabilidade = '';
    beforeEach(() => {
      renderWithRouter(<TelaInicial />);
      aporteInicial = screen.getByLabelText('Aporte Inicial');
      prazoInput = screen.getByLabelText('Prazo (em meses)');
      aporteMensal = screen.getByLabelText('Aporte Mensal');
      rentabilidade = screen.getByLabelText('Rentabilidade');
    });
    const putValues = (value) => {
      fireEvent.change(aporteInicial, { target: { value } });
      fireEvent.change(prazoInput, { target: { value } });
      fireEvent.change(aporteMensal, { target: { value } });
      fireEvent.change(rentabilidade, { target: { value } });
    };
    test('Se ao preencher com dados válidos o botão "SIMULATE" fica habilitado', () => {
      const value = 10;
      putValues(value);
      const simulate = screen.getByRole('button', { name: /SIMULAR/i });
      expect(simulate).not.toHaveAttribute('disabled', '');
    });
    test('Se ao preencher com dados inválidos o botão "SIMULATE" permance desabilitado',
      () => {
        const value = 'teste';
        putValues(value);
        const simulate = screen.getByRole('button', { name: /SIMULAR/i });
        expect(simulate).toHaveAttribute('disabled', '');
      });
    test('Se ao clicar no botão "LIMPAR CAMPOS" apaga os valores inseridos', () => {
      const value = 'teste';
      putValues(value);
      const clearFields = screen.getByRole('button', { name: /LIMPAR CAMPOS/i });
      fireEvent.click(clearFields);
      expect(aporteInicial.value).toBe('');
      expect(prazoInput.value).toBe('');
      expect(aporteMensal.value).toBe('');
      expect(rentabilidade.value).toBe('');
    });
  });
});
