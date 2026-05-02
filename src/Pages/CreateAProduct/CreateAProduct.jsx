import React from 'react';
import useMyHook from '../../Hooks/useMyHook';
// import { minimum } from 'firebase/firestore/pipelines';
// import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

// import useAxios from '../../Hooks/useAxios';

const CreateAProduct = () => {
    const {user} = useAuth()
    // const axiosInstance = useAxios();
    const instance = useAxiosSecure()
    
    const [nameValue, handleNameChange] = useMyHook('');
    const [imageValue, handleImageChange] = useMyHook('');
    const [minimumValue, handleMinimumValueChange] = useMyHook('');
    const [maximumValue, handleMaximumValueChange] = useMyHook('');
    const [numberValue, handleNumberChange] = useMyHook('');
    const [descriptionValue, handleDesChange] = useMyHook('');
    const handleCreateAProduct = e => {
        e.preventDefault();
        const creatNewProduct = { nameValue, imageValue, minimumValue, maximumValue, numberValue, descriptionValue,email:user.email,seller_name:user.displayName };
        //!useAxiosSecure hook;
        instance.post('/createProductColl',creatNewProduct)
        .then(data=>{
            console.log(data.data);
        })

    }
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">

            <div className="w-full max-w-2xl bg-base-100 shadow-2xl rounded-2xl p-8">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold">Add New Product</h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Fill all product information
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleCreateAProduct} className="space-y-5">

                    {/* Name + Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Product Name
                                </span>
                            </label>

                            <input
                                type="text"
                                value={nameValue}
                                onChange={handleNameChange}
                                placeholder="Enter product name"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Category
                                </span>
                            </label>

                            <select className="select select-bordered w-full">
                                <option disabled selected>
                                    Select Category
                                </option>
                                <option>Electronics</option>
                                <option>Fashion</option>
                                <option>Furniture</option>
                                <option>Mobile</option>
                                <option>Laptop</option>
                            </select>
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">
                                Image URL
                            </span>
                        </label>

                        <input
                            type="text"
                            value={imageValue}
                            onChange={handleImageChange}
                            placeholder="Paste image URL"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Min + Max Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Min Price
                                </span>
                            </label>

                            <input
                                type="number"
                                value={minimumValue}
                                onChange={handleMinimumValueChange}
                                placeholder="Minimum price"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-medium">
                                    Max Price
                                </span>
                            </label>

                            <input
                                type="number"
                                value={maximumValue}
                                onChange={handleMaximumValueChange}
                                placeholder="Maximum price"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">
                                Quantity
                            </span>
                        </label>

                        <input
                            type="number"
                            value={numberValue}
                            onChange={handleNumberChange}
                            placeholder="Available quantity"
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="label">
                            <span className="label-text font-medium">
                                Description
                            </span>
                        </label>

                        <textarea
                            className="textarea textarea-bordered w-full h-24"
                            value={descriptionValue}
                            onChange={handleDesChange}
                            placeholder="Write product description..."
                        ></textarea>
                    </div>

                    {/* Button */}
                    <button className="btn btn-neutral w-full rounded-xl text-base">
                        Add Product
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateAProduct;