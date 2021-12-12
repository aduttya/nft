import React, { Component } from "react";
import Web3 from "web3"


class walletConnect extends Component{

    constructor(props){
        super(props);
        this.state = {
            ethereum : null
        }
    }

    
    connectWallet = async()=>{
        const {ethereum} = window
        console.log('connect wallet is clicked')
      
          let web3
          if(typeof window.ethereum !== 'undefined'){
             console.log('MetaMask is installed!');
             await ethereum.request({ method: 'eth_requestAccounts' });}
            // web3 = new Web3(window.ethereum)}
          else{
            console.log('MetaMask not installed!');
          }
          const ethereumButton = document.querySelector('.enableEthereumButton');
          const showAccount = document.querySelector('.showAccount');
      
          ethereumButton.addEventListener('click', () => {
            getAccount();
            });
      
            async function getAccount() {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            console.log(account)}
      
            this.setState({ethereum : ethereum})
      
      }

    render(){
        return(
            <div>
                <button id = "walletConnect" className = "enableEthereumButton btn btn-primary" onClick = {this.connectWallet}>Connect wallet</button>
            </div>
        )
    }
}

export default walletConnect;