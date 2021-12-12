// var SimpleStorage = artifacts.require("./SimpleStorage.sol");
let NFT = artifacts.require("./NFT.sol")
module.exports = async (deployer)=>{
  // deployer.deploy(SimpleStorage);
  await deployer.deploy(NFT,"MonkeyToken","MKY",1000)
};
