const {
  NODE_ETHEREUM_HTTPS,
  APY_PSCAN_TOKEN,
} = require("../../../config");
const Web3 = require("web3");
const web3 = new Web3(NODE_ETHEREUM_HTTPS);
console.log(`connected to ${NODE_ETHEREUM_HTTPS}`);
const standard = require("../standard/index");
const axios = require('axios');

function getContract(_abi, _contractAddress) {
  try {
    return new web3.eth.Contract(_abi, _contractAddress);
  } catch (error) {
    throw error;
  }
}

async function getLatestBlock() {
  try {
    return web3.eth.getBlockNumber();
  } catch (error) {
    throw error;
  }
}

async function getTransaction(hash) {
  try {
    return web3.eth.getTransaction(hash);
  } catch (error) {
    throw error;
  }
}

async function getPastEvent(
  _blockQuantity,
  _contractAddress,
  _type,
  _walletAddress,
  _latestBlock,
  _recursion = false
) {
  let blockNumber;
  let allEvents;
  let lastTransaction;
  let fromBlock;
  let toBlock;
  let myContract;
  try {
    if (!_recursion) {
      blockNumber = _latestBlock;
      fromBlock = blockNumber - _blockQuantity;
      toBlock = "latest";
    } else {
      fromBlock = _latestBlock - _blockQuantity;
      toBlock = _latestBlock;
    }
  } catch (error) {
    console.error('[services.Ethereum] ERROR_GET_LASTEST_BLOCK');
    throw error
  }

  try {
    myContract = await getContract(standard[`${_type}`], _contractAddress);
  } catch (error) {
    console.error('[services.Ethereum] ERROR_GET_CONTRACT');
    throw error;
  }

  try {

    allEvents = await myContract.getPastEvents(
      'AllEvents',
      {
        // filter:{_to:'0xB6909B960DbbE7392D405429eB2b3649752b4838'},
        fromBlock,
        toBlock
      }
    );
  } catch (error) {
    console.error('[services.Ethereum] ERROR_GET_PAST_EVENTS');
    throw error;
  }

  try {
    for (let i = 0; i < allEvents.length; i++) {
      const transaction = await getTransaction(allEvents[i].transactionHash);
      console.log('******* BUSCANDO TRANSACCION DE ***************');
      console.log(_walletAddress);
      console.log("ESTA TRANSACION SE PUEDE ENCONTRAR EN FROM: TO:");
      console.log('FROM:');
      console.log(transaction.from);
      console.log(transaction.from === _walletAddress);
      console.log('TO:');
      console.log(transaction.to);
      console.log(transaction.to === _walletAddress);
      console.log("************************************************");
      if (
        transaction.from === _walletAddress ||
        transaction.to === _walletAddress
      ) {
        lastTransaction = transaction;
        break;
      }
    }
  } catch (error) {
    console.error('[services.Ethereum] ERROR_GET_TRANSACTION');
    throw error;
  }

  try {
    if (lastTransaction) return lastTransaction;
    throw Error("STARTING RECURSION");
  } catch (error) {
    getPastEvent(
      _blockQuantity,
      _contractAddress,
      _type,
      _walletAddress,
      fromBlock,
      true
    );
  }
}


async function getPastTransaction(_contractAddress, _event, _walletAddress, _latestBlock, _recursion = false) {
  let lastTransaction;
  let blockNumber;
  let allEvents;
  let fromBlock;
  let toBlock;
  let event_hashed;
  try {
    if (!_recursion) {
      blockNumber = _latestBlock;
      fromBlock = blockNumber - 5;
      toBlock = "latest";
    } else {
      fromBlock = _latestBlock - 5;
      toBlock = _latestBlock;
    }
  } catch (error) {
    console.error('[services.Ethereum] ERROR_GET_LASTEST_BLOCK');
    throw error
  }


  try {
    const events = {
      Transfer: "Transfer(address,address,uint256)",
      Approval: "Approval(address,address,uint256)"
    }
    const event = events[`${_event}`];
    event_hashed = web3.utils.sha3(event);

  } catch (error) {
    console.error('[services.Ethereum] ERROR_SHA3');
    throw error
  }

  try {
    allEvents = await web3.eth.getPastLogs("logs", {
      fromBlock,
      toBlock,
      address: `${_contractAddress}`,
      topics: [event_hashed]
    });
  } catch (error) {
    console.error('[services.Ethereum] ERROR_GET_PAST_LOGS');
    throw error
  }
  try {
    for (let i = 0; i < allEvents.length; i++) {
      const transaction = await getTransaction(allEvents[i].transactionHash);
      console.log('****** BUSCANDO TRANSACCION DE *************');
      console.log(_walletAddress);
      console.log("ESTA TRANSACION SE PUEDE ENCONTRAR EN  FROM: TO:");
      console.log('FROM:');
      console.log(transaction.from);
      console.log(transaction.from === _walletAddress);
      console.log('TO:');
      console.log(transaction.to);
      console.log(transaction.to === _walletAddress);
      console.log('********************************************');
      if (
        transaction.from === _walletAddress ||
        transaction.to === _walletAddress
      ) {
        lastTransaction = transaction;
        break;
      }
    }
  } catch (error) {
    console.error('[services.Ethereum] ERROR_GET_TRANSACTION');
    throw error;
  }


  try {
    if (lastTransaction) return lastTransaction;
    throw Error("STARTING RECURSION");
  } catch (error) {

    getPastTransaction(
      _contractAddress,
      _event,
      _walletAddres,
      fromBlock,
      true
    );
  }
}

async function getPastTransactionByContracts(_contractAddress, _event, _walletAddresses) {
  let accumulator = 0;
  let position;
  let event_hashed;
  let allEvents;
  let TransactionQuantities = [];
  try {
    const events = {
      Transfer: "Transfer(address,address,uint256)",
      Approval: "Approval(address,address,uint256)"
    }
    const event = events[`${_event}`];
    event_hashed = web3.utils.sha3(event);

  } catch (error) {
    console.error('[services.Ethereum] ERROR_SHA3');
    throw error
  }

  try {
    allEvents = await web3.eth.getPastLogs("logs", {
      fromBlock: await getLatestBlock() - 5,
      toBlock: 'latest',
      address: `${_contractAddress}`,
      topics: [event_hashed]
    });
  } catch (error) {
    console.error('[services.Ethereum] ERROR_GET_PAST_LOGS');
    throw error
  }
  try {

    for (let i = 0; i < allEvents.length; i++) {
      const transaction = await getTransaction(allEvents[i].transactionHash);
      for (let j = 0; j < _walletAddresses.length; j++) {
        if (transaction.from.toLowerCase() === _walletAddresses[j].toLowerCase() || transaction.to.toLowerCase() === _walletAddresses[j].toLowerCase()) {
          TransactionQuantities[j] = (TransactionQuantities[j] ? TransactionQuantities[j] : 0) + 1;
        }
      }
    }
  } catch (error) {
    console.error('[services.Ethereum] ERROR_GET_TRANSACTION');
    throw error;
  }
  try {

    for (let k = 0; k < TransactionQuantities.length; k++) {
      if (TransactionQuantities[k] > accumulator) {
        accumulator = TransactionQuantities[k];
        position = k;
      }
    }
  } catch (error) {
    console.error('[services.Ethereum] ERROR_GET_POSITION');
    throw error;
  }

  if (TransactionQuantities.length > 0) {
    return {
      address: _walletAddresses[position]
    }
  } else {
    return {
      message: ' None of the addresses found'
    }
  }

}

async function getPastTransactionByContractsApi(_contractAddress, _walletAddresses) {
  let TransactionQuantities = [];
  let position;
  let amount = 0;
  let accumulator = 0;
  let latestBlock;
  try {
    latestBlock = await getLatestBlock()
  } catch (error) {
    console.error('[services.Ethereum] ERROR_GET_LATEST_BLOCK');
    throw error
  }

  try {
    for (let i = 0; i < _walletAddresses.length; i++) {
      console.log('ingrese nuevamente');
      TransactionQuantities[i] = 0;
      let request = await axios.get("https://api.etherscan.io/api", {
        params: {
          module: 'account',
          action: 'txlist',
          address: _walletAddresses[i],
          startblock: 0,
          endblock: latestBlock,
          sort: 'desc',
          apikey: APY_PSCAN_TOKEN
        }
      });
      let txs = request.data.result;
        for (let j = 0; j < txs.length; j++) {
        console.log(txs[j].hash);
        const transaction = await getTransaction(txs[j].hash);
        console.log(transaction);
        if (
          transaction.from.toLowerCase() === _walletAddresses[i].toLowerCase() ||
          transaction.to.toLowerCase() === _contractAddress[i].toLowerCase()
        ) {
          amount = amount + 1;
          TransactionQuantities[i] = amount;
        } 
      }
      amount = 0;
    }

  } catch (error) {
    console.error('[services.Ethereum] ERROR_GET_TRANSACTION');
    throw error
  }

  try {
    for (let k = 0; k < TransactionQuantities.length; k++) {
      if (TransactionQuantities[k] > accumulator) {
        accumulator = TransactionQuantities[k];
        position = k;
      }
    }
  } catch (error) {
    console.error('[services.Ethereum] ERROR_GET_VERIFICATION');
    throw error
  }



  if (TransactionQuantities.length > 0) {
    return {
      address: _walletAddresses[position]
    }
  } else {
    return {
      message: ' None of the addresses found'
    }
  }
}

const lastTransactionApi = async (_contractAddress, _walletAddress) => {
  try {
    let request = await axios.get("https://api.etherscan.io/api", {
      params: {
        module: 'account',
        action: 'txlist',
        address: _walletAddress,
        startblock: 0,
        endblock: await getLatestBlock(),
        sort: 'desc',
        apikey: APY_PSCAN_TOKEN
      }
    });
    let txs = request.data.result;

    for (let i = 0; i < txs.length; i++) {
      const transaction = await getTransaction(txs[i].hash);
      if (
        transaction.from === _walletAddress ||
        transaction.to === _contractAddress
      ) {
        return transaction;
      }
    }

  } catch (error) {
    console.log(error);
    throw (error);
  }
};



module.exports = {
  getPastEvent,
  getLatestBlock,
  getPastTransaction,
  getPastTransactionByContracts,
  lastTransactionApi,
  getPastTransactionByContractsApi
};
