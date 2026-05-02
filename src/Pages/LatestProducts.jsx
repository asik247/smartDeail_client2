import React, { use } from 'react';
import Product from './product';
import { Link } from 'react-router';

const LatestProducts = ({ fetchPromise }) => {
    const latestPromeseData = use(fetchPromise);
    console.log(latestPromeseData);
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5'>
            {
                latestPromeseData.map(singleP => <Product key={singleP._id} singleP={singleP}></Product>)
            }
            {/* //!All Products btn; */}
            <div className='btn btn-primary col-span-full flex justify-center'>
                <Link to={'/allProducts'}>  <button>All Products</button></Link>
            </div>
        </div>

    );
};

export default LatestProducts;