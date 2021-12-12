const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey = 'ff7bcae5edd4fd3f0e5cc10bd4ef61aa38570d538d1c2ddee0999462a21a100e'


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },

     rinkeby: {
      provider: () => new HDWalletProvider(privateKey,'https://rinkeby.infura.io/v3/d4a66e7b489f494ebd6ccdcdc0f91253'),
      network_id: 4,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
       confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
      },


     matic: {
      provider: () => new HDWalletProvider(privateKey,'https://speedy-nodes-nyc.moralis.io/892dbb9dd161fd10dd842f4f/polygon/mumbai'),
      network_id: 80001,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
       confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
      },

  },

  plugins: [
    'truffle-plugin-verify'
  ],

  api_keys: {
    etherscan: 'BWJ229TNXEXC5QYT14XYXTNG6JDVB7VXAC',
    polygonscan : 'AHPBY8XEIBYK11W5PKNQTAD3QX3UPS2SD7'
  },

  compilers : {
        solc :{ 
          version : "0.8.10"
        }
}

};
