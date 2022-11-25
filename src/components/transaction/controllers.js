const { getPastEvent, getLatestBlock, getPastTransaction, getPastTransactionByContracts, getTxsByAddress, lastTransactionApi, getPastTransactionByContractsApi } = require("../../services/Ethereum");

module.exports = {
    //SOLUTION FOR THE FIRST EXERCISE  N~1
    async findLastTransaction(
        _blockQuantity,
        _contractAddress,
        _type,
        _walletAddress
    ) {
        let _latestBlock;
        try {
            _latestBlock = await getLatestBlock();
        } catch (error) {
            console.error("[transaction.controllers] ERROR_GET_LASTEST_BLOCK");
            throw error;
        }

        try {
            if (!_blockQuantity) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field blockQuantity is required");
            }
            if (!_contractAddress) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field contractAddress is required");
            }
            if (!_type) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field type is required");
            }
            if (!_walletAddress) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field walletAddress is required");
            }
            if (!_latestBlock) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field latestBlock is required");
            }
            return getPastEvent(
                _blockQuantity,
                _contractAddress,
                _type,
                _walletAddress,
                _latestBlock
            );
        } catch (error) {
            throw Error(error);
        }
    },

    //SOLUTION FOR THE FIRST EXERCISE  N~2
    async findLastTransaction_(
        _contractAddress,
        _event,
        _walletAddress
    ) {
        let _latestBlock;
        try {
            _latestBlock = await getLatestBlock();
        } catch (error) {
            console.error("[transaction.controllers] ERROR_GET_LASTEST_BLOCK");
            throw error;
        }

        try {
            if (!_contractAddress) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field contractAddress is required");
            }
            if (!_event) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field event is required");
            }
            if (!_walletAddress) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field walletAddress is required");
            }
            if (!_latestBlock) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field latestBlock is required");
            }
            return getPastTransaction(
                _contractAddress,
                _event,
                _walletAddress,
                _latestBlock
            );
        } catch (error) {
            throw Error(error);
        }
    },


    //SOLUTION FOR THE FIRST EXERCISE  N~3
    async findLastTransactionApi(
        _contractAddress,
        _walletAddress
    ) {

        try {
            if (!_contractAddress) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field contractAddress is required");
            }
            if (!_walletAddress) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field walletAddress is required");
            }
            return lastTransactionApi(_contractAddress, _walletAddress);
        } catch (error) {
            throw Error(error);
        }
    },




    //SOLUTION FOR THE SECOND EXERCISE N~1
    async findLastTransactionByContracts(
        _contractAddress,
        _event,
        _walletAddresses
    ) {
        try {
            if (!_contractAddress) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field contractAddress is required");
            }
            if (!_event) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field event is required");
            }
            if (!_walletAddresses) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field wallet Addresses is required");
            }
            return getPastTransactionByContracts(
                _contractAddress,
                _event,
                _walletAddresses
            );
        } catch (error) {
            throw Error(error);
        }
    },



    //SOLUTION FOR THE SECOND EXERCISE N~2
    async findLastTransactionByContractsApi(
        _contractAddress,
        _walletAddresses
    ) {
        try {
            if (!_contractAddress) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field contractAddress is required");
            }
            if (!_walletAddresses) {
                console.error("[transaction.controllers] REQUIRED_FIELD");
                throw Error("The field walletAddresses is required");
            }
            return getPastTransactionByContractsApi(
                _contractAddress,
                _walletAddresses
            );
        } catch (error) {
            throw Error(error);
        }
    },


};


