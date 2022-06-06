import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getnfts } from '../data/api'
import audio from '../../src/Assets/audio.jpg';
import './DetailNFT.css'
import { listOnMarket, buyNsale, removeFromMarket } from './SmartContracts';

// Function for detailNft
export default function DetailNFT(props) {
  // 

  const params = useParams();
  // State for managing all nft list
  const [nft, setNft] = useState([])
  useEffect(() => {
    async function fetchData() {
      const data = await getnfts(params.id);
      setNft(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='container-fluid ' style={{ 'backgroundColor': 'black', 'height': '100vh ', 'marginTop': '-7.8px' }}>
        <div >
          {nft ? (<div className=' row d-flex'>
            <div className='col-7 mx-0'>
              {nft.files ? nft.files.map(file => {
                return nft.Category === 'art' ?
                  <><div className='pt-2'>
                    <h3 style={{ 'color': 'white' }}>
                      {nft.NFTname}
                    </h3>
                    <h5 style={{ 'color': 'white' }} >
                      {nft.Category}
                    </h5>
                    <h6 style={{ 'color': 'white' }}>
                      {nft.Amount} MATIC
                    </h6>
                  </div>
                    <img class="card-img-top" src={`http://localhost:8080/${file.filePath}`} alt="NO Preview available" style={{ 'height': '40rem' }} />
                  </>
                  : <> <div >
                    <div className='pt-2' id='topimage'>
                      <h4 style={{ 'color': 'white' }}>
                        {nft.NFTname}
                      </h4>
                      <h5 style={{ 'color': 'white' }} >
                        {nft.Category}
                      </h5>
                      <h5 style={{ 'color': 'white' }}>
                        {nft.Amount} MATIC
                      </h5>
                    </div>
                    <img class=" card-img-top p-2" src={audio} alt="My MUSIC" style={{ 'width': '800px', 'height': '580px' }} />
                    <audio controls controlsList="nodownload" style={{ 'width': '88%' }}>
                      <source src={`http://localhost:8080/${file.filePath}`} type="audio/mpeg" />
                    </audio> </div></>
              }) : ''}
            </div>
            <div className='col-5  text-uppercase ' style={{ 'color': 'white', 'paddingTop': '115px', 'paddingLeft': '35px' }}>
              <div className='row' id='detailtable'>
                <div className='col-7' id='data'  >
                  <div className='description'>
                    <h4>
                      Description
                      <span className='tooltip1 px-4'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg><span className="tooltiptext"> message</span></span>
                    </h4>
                    <span>
                      {nft.Description}
                    </span>

                  </div>
                  <div className='royalty'>
                    <h4>
                      Royalty
                      <span className='tooltip1 px-4'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg><span className="tooltiptext"> message</span></span>
                    </h4>
                    <span>
                      {nft.Royalty} %
                    </span>
                  </div>
                  <div className='creatorName'>
                    <h4>
                      CreatorName
                    </h4>
                    <span>
                      {nft.CreatorName}
                    </span>
                  </div>

                </ div>
                <div className='col-4' id='data'>
                  <div className='tags'>
                    <h4>
                      Tags
                      <span className='tooltip1 px-4'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                      </svg><span className="tooltiptext"> message</span></span>
                    </h4>
                    <span>
                      {nft.Tags}
                    </span>
                  </div>
                  <div className='createdAt'>
                    <h4>
                      createdAt
                    </h4>
                    <span>
                      {nft.createdAt}
                    </span>
                  </div>
                  <div className='updatedAt'>
                    <h4>
                      updatedAt
                    </h4>
                    <span>
                      {nft.updatedAt}
                    </span>
                  </div>
                </div>
              </div>

              <div className='pt-5'>
                <hr ></hr>
                <div className='pt-3'>
                  {(nft.Owner == window.ethereum.selectedAddress && nft.Listed == true) ? (<button style={{ 'height': '4rem', 'width': '8rem', 'fontSize': '10px' }} id='list' onClick={() => {
                    removeFromMarket(nft.tokenId, nft.itemId);
                  }} class="btn btn-primary ">REMOVE FROM NFTMARKET</button>) : (nft.Owner == window.ethereum.selectedAddress && nft.Listed == false) ? (<button id='list' onClick={() => {
                    listOnMarket(nft.tokenId, nft.Amount);
                  }} class="btn btn-primary" style={{ 'height': '4rem', 'width': '8rem', 'fontSize': '10px' }}>SELL ON MARKETPLACE</button>) : (<button style={{ 'height': '4rem', 'width': '8rem', 'fontSize': '10px' }} id='list' onClick={() => {
                    buyNsale(nft.tokenId, nft.itemId, nft.Amount);
                  }} class="btn btn-primary">BUY</button>)}
                </div>
              </div>

            </div>

          </div >)
            :
            (<div>
              <p>no record</p>
            </div>)
          }
        </div>
      </div>
    </>
  )
}
