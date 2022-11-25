if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
module.exports = {
    NODE_ETHEREUM_SOCKET: process.env.NODE_ETHEREUM_SOCKET,
    NODE_ETHEREUM_HTTPS: process.env.NODE_ETHEREUM_HTTPS,
    LIQUID_ADDRESS: process.env.LIQUID_ADDRESS,
    WEI_UNIT: process.env.WEI_UNIT,
    PORT: process.env.PORT,
    APY_PSCAN_TOKEN: process.env.APY_PSCAN_TOKEN
}