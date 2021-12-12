const NFT = artifacts.require('NFT')
// const DutchAuction = artifacts.require('DutchAuction')
contract('Testing NFT marketplace',(accounts)=>{

    let nft,Dutchauction
    it('Deploying the NFT contract',async()=>{
        nft = await NFT.deployed()
        console.log('Deplyed NFT address is : ',nft.address)
    })

    // it('set base url for the nft',async()=>{

    //     await nft._baseURI('ajayyadav').then(function(res){
    //         console.log("The base url of the token is : ",res)
    //     })
    // })

    it('minting NFT',async()=>{

        for(let i = 0; i < 5; ++i){

            await nft.createNFT("account 1 url",{from : accounts[1]})

        }

        for(let i = 0; i < 5; ++i){

            await nft.createNFT("account 2 url",{from : accounts[2]})

        }


    })
    it('getting tokenURL of minited tokens',async()=>{

        await nft.tokenURI(1).then(console.log)
        await nft.tokenURI(2).then(console.log)
        await nft.tokenURI(3).then(console.log)

    })
    it('burning NFT',async()=>{

        await nft.burnTokens(1,{from : accounts[1]})

        await nft.burnTokens(6,{from : accounts[2]})

        await nft.burnTokens(3,{from : accounts[3]})
    })

    


    

    
})