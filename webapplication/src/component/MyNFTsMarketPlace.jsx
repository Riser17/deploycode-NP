import React, { useState, useEffect } from 'react';
import audio from '../../src/Assets/audio.jpg'
import { removeFromMarket } from './SmartContracts';
// Function for NFT marketplace
export default function MyNFTsMarketPlace(props) {

  return (
    <>

      {/*  */}
      <h1 className='mt-3' style={{ 'color': 'white' }}>ART NFTs</h1>
      {/*  */}
      {/*  */}
      <div className='row col-12 d-flex  mt-5  p-auto px-5 '  >
        {props.table && props.table.length > 0 ? props.table.map((element, index) =>
          <div className='col-2  ' key={element._id} id='card'>
            <div className="row col-12 p-0" style={{ 'height': '40rem' }}>
              {element.files.map((file, index) =>
                <div className="p-0" style={{ 'width': '20rem', 'color': 'white' }}>
                  <a style={{ 'border': 'none' }} href={`/DetailNFT/${element._id} `} class="btn p-0">
                    <img id="example1" class="card-img-top p-0" src={`http://localhost:8080/${file.filePath}`} alt="NO Preview available" style={{ 'height': '23rem' }} />
                  </a>
                  <div class="card-body">
                    <h5 class="card-title">{element.NFTname}</h5>
                    <h5 class="card-title">{element.Amount} MATIC</h5>
                    {/* <a style={{ 'backgroundColor': "rgb(255, 35, 145)", 'border': 'none' }} href={`/DetailNFT/${element._id} `} class="btn btn-primary">view</a> */}
                    <button id='list' style={{ 'height': '4rem', 'width': '8rem', 'fontSize': '10px' }} onClick={() => {
                      removeFromMarket(element.tokenId, element.itemId);
                    }} class="btn btn-primary">REMOVE FROM NFTMARKET</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : 'NO RECORDS FOUNDS'}
      </div>

      {/*  */}
      <h1 className='mt-5' style={{ 'color': 'white' }}>MUSIC NFTs</h1>
      <div className='row col-12 d-flex mt-5 px-5' >
        {props.table1 && props.table1.length > 0 ? props.table1.map((element, index) =>
          <div className='col-2 my-3 p-0' key={element._id}>
            <div className="row col-12 p-0" style={{ 'height': '40rem' }}>
              {element.files.map((file, index) =>
                <div class="card  rounded p-0" style={{ 'height': '30rem', 'width': '30rem', 'color': 'white' }}>
                  <div id="example2">
                    <a style={{ 'border': 'none' }} href={`/DetailNFT/${element._id} `} class="btn p-0">
                      <img id="example2img" class="card-img-top p-0" style={{ 'height': '20rem', 'width': '100%' }} src={audio} alt="My MUSIC" />
                      <audio class="card-body p-0" style={{ 'width': '90%' }} controls controlsList="nodownload" >
                        <source src={`http://localhost:8080/${file.filePath}`} type="audio/mpeg" />
                      </audio></a></div>
                  <div class="card-body">
                    <h5 class="card-title">{element.NFTname}</h5>
                    <h5 class="card-title">{element.Amount} MATIC</h5>
                    {/* <a style={{ 'backgroundColor': "rgb(255, 35, 145)", 'border': 'none' }} href={`/DetailNFT/${element._id} `} class="btn btn-primary">view</a> */}
                    <button id='list' style={{ 'height': '4rem', 'width': '8rem', 'fontSize': '10px' }} onClick={() => {
                      removeFromMarket(element.tokenId, element.itemId);
                    }} class="btn btn-primary">REMOVE FROM NFTMARKET</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : 'NO RECORDS FOUNDS'}
      </div>

      {/*  */}

    </>

  );
}