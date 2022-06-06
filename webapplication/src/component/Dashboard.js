import React from "react";
import "./dashboard.css";
import Gallery from './Gallery';
import MyMarketPlaceGallery from "./MyMarketPlaceGallery";
import video from '../../src/Assets/video.mp4'
import MyNFTBanner from '../../src/Assets/MY NFT GALLERY BANNER.jpg'


export default function Dashboard() {
//
const [showResults, setShowResults] = React.useState(true)
  const onClick = () => setShowResults(true)
  const onClicks = () => setShowResults(false)
  //

  const Results =()=>(
    <div id="results" className="search-results">
      
   <img className='banner w-100'  src={MyNFTBanner} alt='MY NFT GALLERY'  style={{'height':'592px'}} />
    </div>
   )
   //

const Data =()=>(
  <div id="results" className="search-results">
    
 
  <video autoPlay loop width={'100%'} height={'600'} style={{ 'marginTop': '-1%','marginBottom':'-5.8px', 'object-fit': 'fill' }}>
 
         <source src={video} type="video/mp4" />
 
       </video>
  </div>
 )

  return (
    <>
      { showResults ? <Results /> : <Data /> }
  
  {/* <img className='banner w-100' src={MyNFTBanner} alt='MY NFT GALLERY' /> */}
 
  
  <nav id="navtab">
      <div className="nav nav-tabs " id="nav-tabs" role="tablist">
        <button className="nav-link active" id="nav-home-tabs" data-bs-toggle="tab"  onClick={onClick} data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><strong>My NFT Collection</strong></button>
        <button className="nav-link" id="nav-profile-tabs" data-bs-toggle="tab" onClick={onClicks} data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><strong>My NFT SHOP</strong></button>

      </div>
    </nav>
    <div className="tab-content" id="nav-tabContent">
      <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"><Gallery /></div>
      <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><MyMarketPlaceGallery /></div>

    </div>
    </>
  );
}
