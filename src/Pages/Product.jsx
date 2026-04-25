import React from 'react';
import { Link } from 'react-router';

const Product = ({ singleP }) => {
    const { title, price_min, price_max, image,_id } = singleP;

    return (
        <div style={{
            background: '#fff',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
            maxWidth: '360px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        }}>
            <img
                src={image}
                alt={title}
                style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
            />

            <div style={{ padding: '14px 16px' }}>
                <h3 style={{
                    margin: '0 0 8px',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#111827',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {title}
                </h3>

                <p style={{ margin: '0 0 14px', fontSize: '16px', fontWeight: 700, color: '#15803d' }}>
                    ৳{price_min.toLocaleString()} – ৳{price_max.toLocaleString()}
                </p>

                <Link to={`/details2/${_id}`} style={{
                    width: '100%',
                    padding: '10px',
                    background: '#1d4ed8',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                }}>
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default Product;