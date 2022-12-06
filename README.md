# Web3-Challenge

En este repositorio que se desarrolló un challenge web3

## Descripción del desafio

Lo que deberá hacer es diseñar y crear una API RESTful donde pueda obtener Informacion de las transacción

### Detalles:

- FIRST EXERCISE: Informar la última transacción realizada en la blockchain entre la dirección de un contrato dado y la dirección de una billetera en la red ethereum.
- SECOND EXERCISE: Informar qué dirección ha realizado más transacciones, dada la dirección de un contrato y una matriz de direcciones de billetera.

## Installation

To begin installing dependencies with the following command:

```bash
  npm install
```
Run the server with the :

```bash
  npm run dev
```

We should see the following message:
```sh
Connected to https://mainnet.infura.io/v3/dd0G8b5.....
Server run in  3000
```

## Dependencies used

| Dependencies               |
| -------------------------- |
| axios |
| body-parser|
| dotenv |
| express |
| mocha |
| mongoose |
| moment |
| nodemon |
| supertest |
| web3 |

## API Reference

#### IT'S SOLUTION FOR THE FIRST EXERCISE  N~1

```http
  GET /lastTransaction
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `blockQuantity` | `number` | **Required**. it is the amount of block you will traverse |
| `contractAddress` | `string` | **Required**. it is contract address  |
| `type` | `string` | **Required**. it is abi type for example : erc20, erc721, erc1155  |
| `walletAddress` | `string` | **Required**. it is wallet address  |

#### IT'S SOLUTION FOR THE FIRST EXERCISE  N~2

```http
  GET /lastTransaction_
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `contractAddress` | `string` | **Required**. it is contract address  |
| `event` | `string` | **Required**. it is event type for example: Transfer, Approval |
| `walletAddress` | `string` | **Required**. it is wallet address  |

#### IT'S SOLUTION FOR THE FIRST EXERCISE  N~3

```http
  GET /lastTransactionApi
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `contractAddress` | `string` | **Required**. it is contract address  |
| `walletAddress` | `string` | **Required**. it is wallet address  |

#### IT'S SOLUTION FOR THE SECOND EXERCISE  N~1

```http
  GET /IncreasedNumberTransactions
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `contractAddress` | `string` | **Required**. it is contract address  |
| `event` | `string` | **Required**. it is event type for example: Transfer, Approval |
| `walletAddresses` | `Array` | **Required**. It is an array of wallet addresses  |

#### IT'S SOLUTION FOR THE SECOND EXERCISE  N~2

```http
  GET /IncreasedNumberTransactionsApi
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `contractAddress` | `string` | **Required**. it is contract address  |
| `walletAddresses` | `Array` | **Required**. It is an array of wallet addresses  |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` - Port where the project will run.

`USD_UNIT`: Simple Unit Converter.

`WEI_UNIT`: Simple Unit Converter.

`APY_PSCAN_TOKEN`:  It's Api token.

`NODE_ETHEREUM_SOCKET` - The Websocket provider is the standard for usage in legacy browsers.

`NODE_ETHEREUM_HTTPS` -   HTTP provider, does not support subscriptions.
