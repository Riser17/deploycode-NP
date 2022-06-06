import React, { useState, useEffect } from 'react';
import { multipleFilesUpload } from '../data/api';
import Spinner from 'react-bootstrap/Spinner';
import { createNFT } from '../component/SmartContracts';
import { pinJSONToIPFS, pinFileToIPFS } from "./pinata.js";
import '../component/file.css'


const FileUploadScreen = () => {
  // States on FileUploadScreen    
  const [multipleFiles, setMultipleFiles] = useState('');
  const [Category, setCategory] = useState('art');
  const [NFTname, setNFTname] = useState('');
  const [Tags, setTags] = useState('');
  const [Royalty, setRoyalty] = useState(5);
  const [Amount, setAmount] = useState('');
  const [Description, setDescription] = useState('');
  const [CreatorName, setCreatorName] = useState('');
  const [multipleProgress, setMultipleProgress] = useState(0);
  const [status, setStatus] = useState("");
  let [loading, setLoading] = useState(false);
  const [Listed, setListed] = useState(false);
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const [isSucces, setSuccess] = useState(null);

  const MultipleFileChange = async (e) => {
    setMultipleFiles(e.target.files);
    setMultipleProgress(0);
    setuserInfo({
      ...userInfo,
      file: e.target.files[0],
      filepreview: URL.createObjectURL(e.target.files[0]),
    });
  }

  const mulitpleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    }
  }
  // Appending metadata in formData  
  const UploadMultipleFiles = async () => {
    setLoading(true)
    const pinataImageResponse = await pinFileToIPFS(multipleFiles[0]);
    //Creating Metadata
    const data = {
      'file': pinataImageResponse.pinataUrl,
      'Category': Category,
      'NFTname': NFTname,
      'Tags': Tags,
      'Royalty': Royalty,
      'Amount': Amount,
      'Description': Description,
      'CreatorName': CreatorName,
    }
    const { success, status, signerAddress, tokenId } = await createNFT(data, Royalty);
    const Owner = signerAddress;
    const itemId = 0;
    const formData = new FormData();
    formData.append('Category', Category);
    formData.append('NFTname', NFTname);
    formData.append('Tags', Tags);
    formData.append('Royalty', Royalty);
    formData.append('Amount', Amount);
    formData.append('Description', Description);
    formData.append('CreatorName', CreatorName);
    formData.append('files', multipleFiles);
    formData.append('Owner', Owner);
    formData.append('tokenId', tokenId);
    formData.append('itemId', itemId);
    formData.append('Listed', Listed);
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append('files', multipleFiles[i]);
    }
    if (success) {
      await multipleFilesUpload(formData, mulitpleFileOptions);
      alert('Asset successfully minted');
    }
    else {
      alert('Something went wrong !!!')
    }
    setStatus(status);
    setLoading(false)
  }

  async function RoyaltyFun(Royalty) {
    var subTotalFormatted = parseFloat(Royalty).toFixed(2)
    setRoyalty(subTotalFormatted)
    console.log(subTotalFormatted);
    if (Royalty < 0) {
      setRoyalty(0)
    }
    if (Royalty > 10) {
      setRoyalty(10)
    }
  }


  return (
    <>
      
        
          
    {isSucces !== null ? <h4> {isSucces} </h4> : null}
    <div className=" container-fluid mt-3 " style={{'height':'100vh'}}>
    <div className='row ' >
    <div className=" col-6 mx-0"  style={{  'color': 'white'}}>
    <span  id='base'>Base price</span>
        <input type="number" id='form' onChange={(e) => setAmount(e.target.value)} placeholder='MATIC' className="mx-3" />
        
     
     
    <div id='previewdiv' className='mt-3'>
       {/* previw      */}
{userInfo.filepreview !== null ?
<img className="previewimg"  src={userInfo.filepreview} alt="UploadImage" style={{'width':'800px','height':'500px'}} />
: null}
{/* previw      */}
       <div className='vertical-center'> 
      <input type='file' name="upload_file" onChange={(e) => MultipleFileChange(e)} single accept="image/png, image/jpeg" />
      </div>
      </div>
    </div>
<div className='col-6' text-uppercase  style={{  'color': 'white','paddingTop':'25px','paddingLeft':'55px' }}>
    <div className='row ' id='createform'>
      <div className='col-7'>
<div className='art'>
      <h4>
      Category
      </h4>
      <span>
      <input type="text"  id='form' onChange={(e) => setCategory(e.target.value)}  value="Art" className="form-control" readonly />
      </span>
      </div>
      <div className='Tags'>
        <h4>
        Tags <span className='tooltip1 px-4'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg><span className="tooltiptext"> Maximum 20 words allow with separated comma</span></span>
        </h4>
        <span>
        <input type="text" id='form' onChange={(e) => setTags(e.target.value)} maxLength='16' className="form-control" />
        </span>
        </div>
        <div className='CreatorName'>
        <h4>
        Enter CreatorName
          </h4>
        <span>
        <input type="text" id='form' onChange={(e) => setCreatorName(e.target.value)}  className="form-control" />
        </span>
        </div>

        <div>
        {loading ? (
      <button
        type="button"
        id='createnow'
        className=" btn  btn-block w-20"
      >
        <Spinner animation="border" variant="white" />
      </button>
    ) : (
      <button
      id='createnow'
        onClick={() => UploadMultipleFiles()}
        type="button"
        className=" btn  btn-block"
      >
        CREATE MY NFT NOW
      </button>
    )}
        </div>
        </div>
         
      <div className='col-4'>
      <div className='NFTname'>
      <h4>
      NFT name
      </h4>
      <span>
        <input type="text" id='form' onChange={(e) => setNFTname(e.target.value)} placeholder="NFT name" className="form-control" />
        </span>
        </div>
        <div className='Royalty'>
        <h4>
        Royalty <span className='tooltip1 px-4'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
<path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg><span className="tooltiptext" > % of sales you get paid whenever your asset get sold</span></span>
        </h4>
        <span>
        <input type="number" id='form' onChange={(e) => RoyaltyFun(e.target.value)} placeholder="Enter %" className="form-control" />
        </span>
        </div>
        
        <div className='Description'>
        <h4>Enter Description</h4>               
        <span>
        <textarea id='form' onChange={(e) => setDescription(e.target.value)} style={{ height: '150px' }}  className="form-control form-control-lg" ></textarea>
        </span>
        </div>
      </div>
     
      <div className='row'>
        <div className='col-4'>
      <p style={{ "color": "white", "fontSize": "14px" }}>{status}</p>
      </div>
        </div>  
    </div>


    
    </div>
    
  </div>
  



</div>
</>
  );
}

export default FileUploadScreen;