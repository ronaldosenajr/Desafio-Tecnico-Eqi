# [React](https://reactjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![CircleCI Status](https://circleci.com/gh/facebook/react.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/facebook/react) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

React is a JavaScript library for building user interfaces.

## Descrição

[Calculadora de Investimentos](https://github.com/ronaldosenajr/Desafio-Tecnico-Eqi) Repositório do Desafio Técnico Frontend da EQI Investimentos.

## Instalação

1. Clone o **repositório**

- `git@github.com:ronaldosenajr/Desafio-Tecnico-Eqi.git`.

2. Navegue entre a pasta do repositório que você acabou de clonar

- `cd Desafio-Tecnico-Eqi`

3. Entre na branch **tela-inicial**.

- Verifique que você está na branch `tela-inicial`
  - Exemplo: `git branch`
- Se não estiver, mude para a branch `tela-inicial`
  - Exemplo: `git checkout tela-inicial`

4. Instale as dependências do projeto

- `npm install`

## Utilização

⚠️ 1. Crie um arquivo `.env`

- Crie a variavel `REACT_APP_API_URL` com o valor sendo a `URL` da `API`
  - Exemplo: `REACT_APP_API_URL=http://localhost:3000`

2. Para rodar localmente o projeto, execute o script de start do `package.json`.

- `npm start`

### ⚠️ A Api de backend deve estar rodando para a aplicação funcionar corretamente

## Executando Testes Unitários
Utilize o jest para executar os testes, use o comando a seguir para executar todos os testes:
```
npm test
```
Caso queira executar só um arquivo de test use o seguinte comando, considerado que quer testar o arquivo `tests/App.test.js`:
```
npm test tests/App.test.js
```
ou

```
npm test App
```

Caso queria ver a cobertura de testes, execute o seguinte comando:
```
npm run test-coverage
```
## Executando teste de ESLint
Use o comando a seguir para executar os testes de ESLint:
```
npm run lint
```

## Tecnologias Utilizadas
- [React](https://reactjs.org/)
- [MUI: The React UI library you always wanted](https://mui.com/pt/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Jest](https://jestjs.io/pt-BR/)
- [ESLint](https://eslint.org/)
- [Git](https://git-scm.com/)
- [GitHub](https://github.com/)
