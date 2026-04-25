import React, { use } from 'react';
import Product from './product';

const LatestProducts = ({fetchPromise}) => {
    const latestPromeseData = use(fetchPromise);
    console.log(latestPromeseData);
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                latestPromeseData.map(singleP=><Product key={singleP._id} singleP={singleP}></Product>)
            }
        </div>
    );
};

export default LatestProducts;