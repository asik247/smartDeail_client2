import React, { use, useRef } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const DetailsPages = () => {
    const detailsData = useLoaderData();
    //Todo: get currentUser
    const { user } = use(AuthContext);

    const {
        title,
        price_min,
        price_max,
        image,
        description,
        location,
        condition,
        usage,
        seller_name,
        seller_image,
        seller_contact,
        category,
        _id: productId
    } = detailsData;

    //? handleRef using modal relative code here;
    const handleModalRef = useRef(null);
    //? modal open using ref;
    const handleModalOpen = () => {
        handleModalRef.current.showModal()
    }
    //?handleBidPostDb code here;
    const handleBidPostDb = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        // console.log('handleBidPostDb send data db',name,email,bid,productId);
        const newBids = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            bid_price: bid,
            status: 'pending'
        }
        // console.log(newBids);
        // Todo:post bids in DB;
        fetch('http://localhost:5000/bids2', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBids)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    return (
        <div className="max-w-6xl mx-auto p-4">

            {/* Product Section */}
            <div className="grid md:grid-cols-2 gap-8 bg-base-100 shadow-xl rounded-2xl p-6">

                {/* Image */}
                <div>
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-[350px] object-cover rounded-xl"
                    />
                </div>

                {/* Info */}
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold">{title}</h2>

                    <p className="text-xl text-primary font-semibold">
                        ৳ {price_min} - {price_max}
                    </p>

                    <div className="badge badge-outline">{category}</div>

                    <p className="text-gray-600">{description}</p>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <p><span className="font-semibold">📍 Location:</span> {location}</p>
                        <p><span className="font-semibold">📦 Condition:</span> {condition}</p>
                        <p><span className="font-semibold">⏳ Usage:</span> {usage}</p>
                    </div>
                    {/* Modal cod hre */}
                    <button onClick={handleModalOpen} className="btn btn-primary w-full mt-4">
                        I Want to Buy This Product!
                    </button>
                    <dialog ref={handleModalRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Give the best offer!</h3>
                            <form onSubmit={handleBidPostDb}>
                                <fieldset className="fieldset">
                                    {/* Name */}
                                    <label className="label">Name</label>
                                    <input type="text" name='name' readOnly defaultValue={user?.displayName} className="input" placeholder="Name" />
                                    {/* Email */}
                                    <label className="label">Email</label>
                                    <input type="email" className="input"
                                        name='email'
                                        readOnly
                                        defaultValue={user?.email}
                                        placeholder="Email" />
                                    {/* Bids */}
                                    <label className="label">Bids</label>
                                    <input type="text" name='bid' className="input" placeholder="Bids" />

                                    <button className="btn btn-neutral mt-4">Place Your Bids!</button>
                                </fieldset>
                            </form>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>

            {/* Seller Section */}
            <div className="mt-8 bg-base-100 shadow-xl rounded-2xl p-6 flex items-center gap-4">
                <img
                    src={seller_image}
                    alt={seller_name}
                    className="w-16 h-16 rounded-full border"
                />

                <div>
                    <h3 className="text-lg font-bold">{seller_name}</h3>
                    <p className="text-gray-500">{seller_contact}</p>
                </div>
            </div>

        </div>
    );
};

export default DetailsPages;