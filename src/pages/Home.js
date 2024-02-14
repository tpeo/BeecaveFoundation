import React, { useState, useEffect } from 'react';
import Gallery from '../Gallery';
import Exhibition from './Exhibition.js';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='container'>
            <h1> Beecave </h1>
            <h1> <Link to="/Exhibition">Current Exhibition</Link> </h1>
        </div>
    )

}
export default Home;
