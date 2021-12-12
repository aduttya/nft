const Web3 = require("web3");
const {abi} = require("./utils");
let address = '0x6DEAEFe0dfBa7a709dc1428Aa5430EB872C2476E'

const provider = new Web3('https://rinkeby.infura.io/v3/d4a66e7b489f494ebd6ccdcdc0f91253')
const w3 = new Web3(provider)
let contract = new w3.eth.Contract(abi,address)

getPastData =  async()=>{

    let startBlock = 9788886
    let endBlock = 9791043

    await contract.getPastEvents("Transfer",{
        fromBlock : 9791043,
        toBlock : 9791043
    }).then(function(results){
        console.log(results.tx)
        // results = JSON.stringify(results)
        // console.log(results)
        for(let i = 0; i < results.length; ++i){
            console.log(results[i])
            console.log('we are iterating through results')
        }
        
    })

    
    // await contract.getPastEvents('Transfer', {
    //     // filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    //     fromBlock: 0,
    //     toBlock: 'latest'
    // }, function(error, events){ console.log(events); })
    // .then(function(events){
    //     console.log(events) // same results as the optional callback above
    // });



}

getPastData()