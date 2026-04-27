import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

const MyBids = () => {
    const { user } = use(AuthContext);
    const [myBid, setMyBid] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/bids2?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setMyBid(data);
                });
        }
    }, [user?.email]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Bids</h1>

            <div className="overflow-x-auto">
                <table className="table w-full border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Buyer Name</th>
                            <th>Email</th>
                            <th>Bid Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myBid.map((bid, index) => (
                                <tr key={bid._id}>
                                    <td>{index + 1}</td>
                                    <td>{bid.buyer_name}</td>
                                    <td>{bid.buyer_email}</td>
                                    <td>${bid.bid_price}</td>
                                    <td>
                                        <span className={
                                            bid.status === 'pending'
                                                ? 'text-yellow-500'
                                                : bid.status === 'accepted'
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                        }>
                                            {bid.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBids;