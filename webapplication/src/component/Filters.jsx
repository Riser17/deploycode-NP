
import React, { useState, useEffect } from 'react';
import './priceslider.css';
import axios from 'axios';

// API url
const apiUrl = 'http://localhost:8080/api/';

// Function for filters
export default function Filters(props) {



    return (
        <div className="container-fluid mt-0 pt-5" >

            <div className='row '>

                <div className='col-12 form-group has-search p-2' id='searchDiv' style={{ "margin": "auto", 'width': '32%' }}>
                    <span class="fa fa-search form-control-feedback"></span>
                    <input
                        className='form-control'

                        id='searchInput'
                        type='search'
                        placeholder='SEARCH MY NFTs'
                        aria-label='Search'
                        name='search'
                        onChange={(event) => { props.onsearch(event) }} // Getting data using props
                    />

                </div>


                <div className="dropdown row">
                    <div className='col-3 mt-3' >
                        <strong style={{ 'color': 'white' }}>SORT BY PRICE : </strong>
                        <button
                            style={{ backgroundColor: "rgb(0, 0, 0)" }}
                            className="btn dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton2"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"

                        >
                            <span style={{ 'color': 'white' }} >PRICE</span>
                        </button>
                        <ul
                            id='pricesort'
                            className="dropdown-menu dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                            style={{ 'backgroundColor': 'black' }}
                        >
                            <li >
                                {/*  Getting ascending data using props */}
                                <a className="dropdown-item" id='sortprice' href="#" onClick={(event) => { props.onsort(1) }}  >
                                    LOW TO HIGH
                                </a>
                            </li>
                            <li >
                                {/*  Getting descending data using props */}
                                <a className="dropdown-item" id='sortprice' href="#" onClick={(event) => { props.onsort(-1) }} >
                                    HiGH TO LOW
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-8 m-5' id='minmax1' >

                        <div className="minmax p-2">
                            <span className='p-2' style={{ 'color': 'white' }}>FROM</span>
                            <input type="text" onChange={(e) => { props.MinimumPrice(e.target.value) }} id="price_prod" name="price_prod" />
                            <span className='p-2' style={{ 'color': 'white' }}>To</span>
                            <input type="text" onChange={(e) => { props.MaximumPrice(e.target.value) }} id="price_prod" name="price_prod" />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
