const transaction = require("../components/transaction/network");

const routes = function (server) {
  console.log('SOY RUTER');
  server.use("/", transaction);
};

module.exports = routes;
