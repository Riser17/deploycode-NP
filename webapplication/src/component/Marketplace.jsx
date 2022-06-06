import React from "react";
import "./dashboard.css";
import MarketPlaceGallery from './MarketPlaceGallery';
import nftmarket from '../../src/Assets/nftmarket.mp4'
import MyMarketPlaceGallery from "./MyMarketPlaceGallery";

// Function for dashboard
export default function Dashboard() {
  return (
    <>
      <video autoPlay loop width={'100%'} height={'600'} style={{ 'marginTop': '-0.5%', 'marginBottom': '-0.5%', 'object-fit': 'fill' }}>
        <source src={nftmarket} type="video/mp4" />
      </video>

      <div className='mt-0' style={{ "backgroundColor": "black" }}>
        <MarketPlaceGallery /></div>

    </>
  );
}
