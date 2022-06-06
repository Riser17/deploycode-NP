import React from "react";
import { connectWallet } from './ConnectWallet'
import { updateDB } from '../data/api';
import { pinJSONToIPFS, pinFileToIPFS } from "../screens/pinata";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3('https://polygon-mumbai.g.alchemy.com/v2/TfY2Jppq1FeTBO6DHxTDke8pZdLVSI1z');
const MarketPlaceContractABI = require("./MarketPlace-abi.json");
const MarketPlaceContractAddress = "0x2C7492387F57Ad6E1203636480E7de1c770D174c";
const NFTsContractAddress = "0xb051cE8eB3aDAFDCf3b386D808758A0e73278717";
const contractABI = require("../screens/contract-abi.json");
const jjj = web3.utils.asciiToHex("ee");
// Function for connect crytocurrency wallet

export const createNFT = async (data, Royalty) => {
    //Sending metadata to IPFS and getting response
    const pinataResponse = await pinJSONToIPFS(data);
    console.log(pinataResponse)
    const tokenURI = await web3.utils.asciiToHex(pinataResponse.pinataUrl);
    //the transaction
    window.contract = await new web3.eth.Contract(contractABI, NFTsContractAddress);
    const transactionParameters = {
        to: NFTsContractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        data: window.contract.methods
            .create(1, tokenURI, jjj, Royalty * 100, window.ethereum.selectedAddress)
            .encodeABI(),
    };
    try {
        const txHash = await web3.eth.sendTransaction(transactionParameters)
        const tokenId = parseInt(web3.eth.abi.decodeParameter("uint256", txHash.logs[0].data));
        return {
            signerAddress: txHash.from,
            success: true,
            status:
                "✅ Check out your transaction on Polygonscan: https://mumbai.polygonscan.com/tx/" +
                txHash.blockHash,
            tokenId: tokenId,
        };
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message,
        };
    }
}

export const buyNsale = async (tokenId, itemId, Amount) => {
    if (window.ethereum.selectedAddress) {
        saleAsset(tokenId, itemId, Amount)
    }
    else {
        await connectWallet();
    }
}

export const listOnMarket = async (tokenId, price) => {
    window.contract = await new web3.eth.Contract(MarketPlaceContractABI, MarketPlaceContractAddress);
    const transactionParameters = {
        to: MarketPlaceContractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        data: window.contract.methods
            .createMarketItem(NFTsContractAddress, tokenId, price * 10 ** 9)
            .encodeABI(),
    };
    try {
        const txHash = await web3.eth.sendTransaction(transactionParameters)
        console.log(txHash)
        console.log(txHash.from)
        const itemId = parseInt(web3.eth.abi.decodeParameter("uint256", txHash.logs[0].topics[1]));
        await updateDB(tokenId, itemId, true, txHash.from);
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message,
        };
    }
}

export const saleAsset = async (tokenId, itemId, Amount) => {
    window.contract = await new web3.eth.Contract(MarketPlaceContractABI, MarketPlaceContractAddress);
    const transactionParameters = {
        to: MarketPlaceContractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        value: Amount * 10 ** 18,
        data: window.contract.methods
            .createMarketSale(NFTsContractAddress, itemId)
            .encodeABI(),
    };
    try {
        const txHash = await web3.eth.sendTransaction(transactionParameters)
        console.log(txHash);
        await updateDB(tokenId, itemId, false, txHash.from);
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message,
        };
    }
}

export const removeFromMarket = async (tokenId, itemId) => {

    window.contract = await new web3.eth.Contract(MarketPlaceContractABI, MarketPlaceContractAddress);
    const transactionParameters = {
        to: MarketPlaceContractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        data: window.contract.methods
            .deleteMarketItem(NFTsContractAddress, itemId)
            .encodeABI(),
    };
    try {
        const txHash = await web3.eth.sendTransaction(transactionParameters)
        await updateDB(tokenId, itemId, false, txHash.from);
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message,
        };
    }
}