import React from 'react';
import LatestProducts from './LatestProducts';
const fetchPromise = fetch('http://localhost:5000/latestProducts2')
.then(res=>res.json())
const Home = () => {
    return (
        <div>
            <h2>Home Pages</h2>
            <LatestProducts fetchPromise={fetchPromise} ></LatestProducts>
            
        </div>
    );
};

export default Home;