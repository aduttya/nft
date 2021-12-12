// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFT is ERC721,ERC721URIStorage,Ownable{

    using Counters for Counters.Counter;

    Counters.Counter private _tokenId;

    uint public MAX_SUPPLY;

    constructor(
    string memory _name,
    string memory _symbol,
    uint _MAX_SUPPLY) ERC721(_name,_symbol){

        MAX_SUPPLY = _MAX_SUPPLY;
        }
        
        function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
        }
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }


    function _generate(string memory _tokenUrl) private returns(uint256){
            _tokenId.increment();
            uint256 newtokenId = _tokenId.current();
            _safeMint(msg.sender,newtokenId);
             _setTokenURI(newtokenId,_tokenUrl);
            return newtokenId;
    }


    // function to mint nft for public users
    function createNFT(string memory _tokenUrl) public returns(uint256){
            if(_tokenId.current() < MAX_SUPPLY){
                return _generate(_tokenUrl);
            }
            else{
                revert("Token can not be generated");
            }
        }


// function to Burn Tokens


function burnTokens(uint tokenId)external onlyOwner{
    _burn(tokenId);
} 
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
}



// const ipfs = create({
    //   host : 'ipfs.infura.io',
    //   port : 5001,
    //   protocol  : 'https',
    //   headers : {
    //     authorization : auth
    //   }
    // })

    // const cid = await ipfs.add('welcome to neue world')
    // const addr = `https://cloudflare-ipfs.com/ipfs/${cid.path}`
    // console.log(addr)


      // Connect()
    // let contract = new w3.eth.Contract(NFT.abi,address)
    // await contract.methods.owner().call().then(console.log)
    // let  account = await ethereum.request({ method: 'eth_requestAccounts' });
    // console.log(account)