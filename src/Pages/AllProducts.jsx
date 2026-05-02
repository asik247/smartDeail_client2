import React, { useEffect, useState } from 'react';

const AllProducts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/products2')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingText}>Loading products...</div>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.headerTitle}>Marketplace</h1>
                <p style={styles.headerSub}>{data.length} items available</p>
            </div>

            <div style={styles.grid}>
                {data.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

const ProductCard = ({ product }) => {
    const [imgError, setImgError] = useState(false);

    const conditionColor = {
        new: { bg: '#e8f5e9', text: '#2e7d32' },
        used: { bg: '#fff3e0', text: '#e65100' },
        refurbished: { bg: '#e3f2fd', text: '#1565c0' },
    };

    const condition = conditionColor[product.condition] || conditionColor.used;

    const formatPrice = (min, max) => {
        if (min === max) return `৳${min.toLocaleString()}`;
        return `৳${min.toLocaleString()} – ৳${max.toLocaleString()}`;
    };

    const timeAgo = (dateStr) => {
        const diff = Math.floor((new Date() - new Date(dateStr)) / 86400000);
        if (diff === 0) return 'Today';
        if (diff === 1) return 'Yesterday';
        if (diff < 30) return `${diff} days ago`;
        return `${Math.floor(diff / 30)} months ago`;
    };

    return (
        <div style={styles.card}>
            <div style={styles.imageWrap}>
                {!imgError ? (
                    <img
                        src={product.image}
                        alt={product.title}
                        style={styles.image}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div style={styles.imageFallback}>
                        <span style={{ fontSize: 40 }}>📦</span>
                    </div>
                )}

                <span style={{ ...styles.conditionBadge, background: condition.bg, color: condition.text }}>
                    {product.condition}
                </span>

                {product.status === 'active' && (
                    <span style={styles.activeDot} />
                )}
            </div>

            <div style={styles.body}>
                <div style={styles.categoryRow}>
                    <span style={styles.category}>{product.category}</span>
                    <span style={styles.time}>{timeAgo(product.created_at)}</span>
                </div>

                <h2 style={styles.title}>{product.title}</h2>

                {product.usage && (
                    <p style={styles.usage}>{product.usage}</p>
                )}

                <p style={styles.description}>{product.description}</p>

                <div style={styles.priceRow}>
                    <span style={styles.price}>{formatPrice(product.price_min, product.price_max)}</span>
                    <span style={styles.location}>📍 {product.location}</span>
                </div>
            </div>

            <div style={styles.footer}>
                <div style={styles.sellerInfo}>
                    <img
                        src={product.seller_image}
                        alt={product.seller_name}
                        style={styles.avatar}
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div>
                        <p style={styles.sellerName}>{product.seller_name}</p>
                        <p style={styles.sellerEmail}>{product.email}</p>
                    </div>
                </div>

                <a href={`tel:${product.seller_contact}`} style={styles.contactBtn}>
                    Call
                </a>
            </div>
        </div>
    );
};

const styles = {
    page: {
        minHeight: '100vh',
        backgroundColor: '#f8f7f4',
        padding: '2rem 1.5rem',
        fontFamily: "'Segoe UI', sans-serif",
    },
    header: {
        marginBottom: '2rem',
        borderBottom: '2px solid #e0ddd6',
        paddingBottom: '1rem',
    },
    headerTitle: {
        fontSize: '2rem',
        fontWeight: 700,
        color: '#1a1a1a',
        margin: 0,
        letterSpacing: '-0.5px',
    },
    headerSub: {
        margin: '4px 0 0',
        color: '#888',
        fontSize: '0.9rem',
    },
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
    },
    loadingText: {
        fontSize: '1.1rem',
        color: '#888',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid #ece9e1',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    },
    imageWrap: {
        position: 'relative',
        height: '200px',
        overflow: 'hidden',
        backgroundColor: '#f3f1ec',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    imageFallback: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f1ec',
    },
    conditionBadge: {
        position: 'absolute',
        top: '10px',
        left: '10px',
        padding: '3px 10px',
        borderRadius: '20px',
        fontSize: '0.72rem',
        fontWeight: 600,
        textTransform: 'capitalize',
        letterSpacing: '0.3px',
    },
    activeDot: {
        position: 'absolute',
        top: '12px',
        right: '12px',
        width: '10px',
        height: '10px',
        backgroundColor: '#22c55e',
        borderRadius: '50%',
        border: '2px solid white',
    },
    body: {
        padding: '1rem 1.1rem 0.75rem',
        flex: 1,
    },
    categoryRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '6px',
    },
    category: {
        fontSize: '0.72rem',
        fontWeight: 600,
        color: '#9b6b2f',
        backgroundColor: '#fef3dc',
        padding: '2px 9px',
        borderRadius: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    time: {
        fontSize: '0.72rem',
        color: '#aaa',
    },
    title: {
        fontSize: '1rem',
        fontWeight: 600,
        color: '#1a1a1a',
        margin: '0 0 4px',
        lineHeight: 1.4,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    usage: {
        fontSize: '0.78rem',
        color: '#e65100',
        margin: '0 0 6px',
        fontStyle: 'italic',
    },
    description: {
        fontSize: '0.82rem',
        color: '#666',
        lineHeight: 1.5,
        margin: '0 0 12px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    priceRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: '1.05rem',
        fontWeight: 700,
        color: '#1a1a1a',
    },
    location: {
        fontSize: '0.78rem',
        color: '#888',
    },
    footer: {
        borderTop: '1px solid #f0ece4',
        padding: '0.75rem 1.1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sellerInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    avatar: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid #ece9e1',
    },
    sellerName: {
        fontSize: '0.82rem',
        fontWeight: 600,
        color: '#1a1a1a',
        margin: 0,
    },
    sellerEmail: {
        fontSize: '0.72rem',
        color: '#aaa',
        margin: 0,
    },
    contactBtn: {
        backgroundColor: '#1a1a1a',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '6px 16px',
        fontSize: '0.82rem',
        fontWeight: 600,
        cursor: 'pointer',
        textDecoration: 'none',
        letterSpacing: '0.3px',
    },
};

export default AllProducts;