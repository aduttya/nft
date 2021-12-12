import React, { Component } from "react";
import Web3 from "web3"
import "./App.css";
import NFT from "./contracts/NFT.json";
import { create } from 'ipfs-http-client'
import detectEthereumProvider from '@metamask/detect-provider';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import walletConnect from "./WalletConnect"

// import Connect from "./getWeb3"



// // defining provider
// const provider = new Web3('https://rinkeby.infura.io/v3/d4a66e7b489f494ebd6ccdcdc0f91253')
// defining contract instance
let address = '0xF2Cd04d6448cdf229861C5871Af53067196b5e6A'
let url = 'https://speedy-nodes-nyc.moralis.io/892dbb9dd161fd10dd842f4f/polygon/mumbai'

// defining ipfs
const projectId = 'd4a66e7b489f494ebd6ccdcdc0f91253'
const projectSecret = '1f047933fc0a4c4eba83c97135a47834'
const auth = 'Basic' + Buffer.from(projectId + ':' + projectSecret).toString('base64')
const {ethereum} = window


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      web3 : null,
      contract : null,
      ethereum : null,
      accounts : null,
      network : null,
      error : null,
      isOpen : false,
      isClosed : false
    }
  }

  componentDidMount = async () => {
    
    const provider = new Web3(url)
    const w3 = new Web3(provider)
    let contract = new w3.eth.Contract(NFT.abi,address)
    $("#mint").hide();

    // defining ethereum variable
      const {ethereum} = window
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{ chainId: 80001, rpcUrl: 'https://matic-mumbai.chainstacklabs.com/'}],
        });
      } catch (addError) {
        console.log(addError)
      }
      // getting connected accounts
      const accounts = await ethereum.request({method: 'eth_accounts'});

      // getting the chain id of the connected account
      const chainId = await ethereum.request({ method: 'eth_chainId' });

      // checking accounts
      if (accounts && accounts.length > 0){

        // checking user is connected to mainnet
        if(chainId === '0x80001'){
          console.log("user is connected to Polygon test net");
          await ethereum.request({method: 'eth_requestAccounts'});
           $("#mint").show();
           $("#connectWallet").hide();
      }
      else{
            await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x80001'}],
        });

        await ethereum.request({method: 'eth_accounts'});
      }
    }
      else{
         $("#mint").hide();
         $("#connectWallet").show();
      }
    
     this.setState({web3 : w3,contract : contract,ethereum:ethereum})

  };


connectWallet = async()=>{

  const {ethereum} = this.state
  console.log('connect wallet is clicked')

    let web3,accounts

    if(typeof window.ethereum !== 'undefined') {
       console.log('MetaMask is installed!');
      accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x80001' }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await ethereum.
            request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x80001'}],
            });
            await ethereum.request({method: 'eth_accounts'});
          } catch (addError) {
          }
        }
      }
      }
    else{
      console.log('MetaMask not installed!');
    }

    if (accounts && accounts.length > 0){
      console.log("user is connected");
       $("#mint").show();
       $("#connectWallet").hide();
    }

      this.setState({ethereum : ethereum})

}

mint = async() =>{
  console.log('mint button clicked')
  const {ethereum,contract} = this.state
  let error
    await contract.methods.owner().call().then(console.log)
    let val = await contract.methods.createNFT('ajayyadavdarshannager').encodeABI()

  const transactionparams = {
    to: address,
    from : ethereum.selectedAddress,
    data : val
  }

  try
    {await ethereum.request(
    {method: 'eth_sendTransaction',
    params : [transactionparams]
  }).then(console.log)}
    catch(err){
      console.log('The error is : ',err.code)
      error = err.code
    }


  if(error === 4001){
    console.log('Signature denied by user')
  }
  console.log('mint function ended')
  
  this.setState({contract : contract,error : error})

}




  render() {
    return(
      <div className="App">
        <h1>This is my first react app</h1>
        <br/>
         <br/>
        <button id = "connectWallet" type = "button" className = "btn btn-warning" onClick = {this.connectWallet}>Connect wallet</button>
        <br/>
         <br/>
        <br/>
        <button id = "mint" type = "button" onClick = {this.mint} className = "btn btn-warning">
        mint
         </button>
         <br/>
         <br/>
         <p>{this.state.error === 4001 ? <p>Transaction is rejected by user</p> : null}</p>
         <p>{(this.state.error !== 4001 && this.state.error !== null) ? <p>Transaction is confirmed by user</p> :null }</p>
      </div>
    );
  }
}



export default App;
