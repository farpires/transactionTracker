const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./controllers");

router.get("/lastTransaction", async function (req, res) {
  try {
    const { 
      blockQuantity,
      contractAddress,
      type,
      walletAddress } = req.body;
    result = await controller.findLastTransaction(blockQuantity,contractAddress,type,walletAddress);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, error.message, 400, "Controlled Error");
  }
});

router.get("/lastTransaction_", async function (req, res) {
  try {
    const {
      contractAddress,
      event,
      walletAddress } = req.body;
    result = await controller.findLastTransaction_( contractAddress, event, walletAddress);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, error.message, 400, "Controlled Error");
  }
});
// findLastTransactionApi
router.get("/lastTransactionApi", async function (req, res) {
  try {
    const {
      contractAddress,
      walletAddress } = req.body;
    result = await controller.findLastTransactionApi( contractAddress, walletAddress);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, error.message, 400, "Controlled Error");
  }
});

router.get("/IncreasedNumberTransactions", async function (req, res) {
  try {
    const {
      contractAddress,
      event,
      walletAddresses } = req.body;
    result = await controller.findLastTransactionByContracts( contractAddress, event, walletAddresses);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, error.message, 400, "Controlled Error");
  }
});

router.get("/IncreasedNumberTransactionsApi", async function (req, res) {
  try {
    const {
      contractAddress,
      walletAddresses } = req.body;
    result = await controller.findLastTransactionByContractsApi( contractAddress, walletAddresses);
    response.success(req, res, result, 200);
  } catch (error) {
    response.error(req, res, error.message, 400, "Controlled Error");
  }
});


module.exports = router;
