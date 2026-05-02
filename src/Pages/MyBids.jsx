import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const statusConfig = {
    pending: {
        label: 'Pending',
        bg: '#FAEEDA',
        color: '#854F0B',
        dot: '#EF9F27',
    },
    accepted: {
        label: 'Accepted',
        bg: '#EAF3DE',
        color: '#3B6D11',
        dot: '#639922',
    },
    rejected: {
        label: 'Rejected',
        bg: '#FCEBEB',
        color: '#A32D2D',
        dot: '#E24B4A',
    },
};

const getInitials = (name = '') =>
    name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

const avatarColors = [
    { bg: '#EEEDFE', color: '#3C3489' },
    { bg: '#E1F5EE', color: '#085041' },
    { bg: '#FAECE7', color: '#712B13' },
    { bg: '#E6F1FB', color: '#0C447C' },
    { bg: '#FAEEDA', color: '#633806' },
    { bg: '#FBEAF0', color: '#72243E' },
];

const getAvatarColor = (name = '') => {
    const idx = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[idx];
};

const Avatar = ({ name, photoURL, size = 40 }) => {
    const { bg, color } = getAvatarColor(name);
    const initials = getInitials(name);

    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: photoURL ? 'transparent' : bg,
                color: color,
                fontWeight: 600,
                fontSize: size * 0.36,
                letterSpacing: '0.02em',
                border: '2px solid rgba(0,0,0,0.07)',
            }}
        >
            {photoURL ? (
                <img
                    src={photoURL}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.background = bg;
                        e.target.parentNode.innerText = initials;
                    }}
                />
            ) : (
                initials
            )}
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const cfg = statusConfig[status] || statusConfig.pending;
    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 12px',
                borderRadius: 999,
                background: cfg.bg,
                color: cfg.color,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.03em',
                textTransform: 'capitalize',
            }}
        >
            <span
                style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: cfg.dot,
                    display: 'inline-block',
                    flexShrink: 0,
                }}
            />
            {cfg.label}
        </span>
    );
};

const MyBids = () => {
    const { user } = use(AuthContext);
    const [myBid, setMyBid] = useState([]);
    const instance = useAxiosSecure()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        instance.get(`/bids2?email=${user.email}`)
            .then(data => {
                setMyBid(data.data)
                setLoading(false)
            })
    }, [user, instance])
    const stats = {
        total: myBid.length,
        accepted: myBid.filter((b) => b.status === 'accepted').length,
        pending: myBid.filter((b) => b.status === 'pending').length,
        rejected: myBid.filter((b) => b.status === 'rejected').length,
    };

    return (
        <div style={{ padding: '2rem', maxWidth: 1100, margin: '0 auto', fontFamily: 'inherit' }}>

            {/* Header */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    marginBottom: '2rem',
                }}
            >
                <Avatar
                    name={user?.displayName || user?.email || 'User'}
                    photoURL={user?.photoURL}
                    size={52}
                />
                <div>
                    <h1
                        style={{
                            margin: 0,
                            fontSize: 22,
                            fontWeight: 600,
                            color: 'var(--color-text-primary)',
                            lineHeight: 1.2,
                        }}
                    >
                        My Bids
                    </h1>
                    <p
                        style={{
                            margin: '2px 0 0',
                            fontSize: 14,
                            color: 'var(--color-text-secondary)',
                        }}
                    >
                        {user?.displayName || user?.email}
                    </p>
                </div>
            </div>

            {/* Stats Row */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: 12,
                    marginBottom: '1.75rem',
                }}
            >
                {[
                    { label: 'Total Bids', value: stats.total, color: '#378ADD', bg: '#E6F1FB' },
                    { label: 'Accepted', value: stats.accepted, color: '#3B6D11', bg: '#EAF3DE' },
                    { label: 'Pending', value: stats.pending, color: '#854F0B', bg: '#FAEEDA' },
                    { label: 'Rejected', value: stats.rejected, color: '#A32D2D', bg: '#FCEBEB' },
                ].map((s) => (
                    <div
                        key={s.label}
                        style={{
                            background: s.bg,
                            borderRadius: 12,
                            padding: '1rem 1.25rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 4,
                        }}
                    >
                        <span style={{ fontSize: 13, color: s.color, fontWeight: 500 }}>{s.label}</span>
                        <span style={{ fontSize: 26, fontWeight: 700, color: s.color, lineHeight: 1 }}>
                            {s.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* Table Card */}
            <div
                style={{
                    background: 'var(--color-background-primary)',
                    borderRadius: 16,
                    border: '0.5px solid var(--color-border-tertiary)',
                    overflow: 'hidden',
                }}
            >
                {loading ? (
                    <div
                        style={{
                            padding: '3rem',
                            textAlign: 'center',
                            color: 'var(--color-text-secondary)',
                            fontSize: 15,
                        }}
                    >
                        Loading your bids...
                    </div>
                ) : myBid.length === 0 ? (
                    <div
                        style={{
                            padding: '3rem',
                            textAlign: 'center',
                            color: 'var(--color-text-secondary)',
                            fontSize: 15,
                        }}
                    >
                        No bids found.
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table
                            style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                fontSize: 14,
                                tableLayout: 'auto',
                            }}
                        >
                            <thead>
                                <tr
                                    style={{
                                        background: 'var(--color-background-secondary)',
                                        borderBottom: '0.5px solid var(--color-border-tertiary)',
                                    }}
                                >
                                    {['#', 'Buyer', 'Email', 'Bid Price', 'Status'].map((h) => (
                                        <th
                                            key={h}
                                            style={{
                                                padding: '14px 16px',
                                                textAlign: 'left',
                                                fontWeight: 500,
                                                fontSize: 12,
                                                color: 'var(--color-text-secondary)',
                                                letterSpacing: '0.06em',
                                                textTransform: 'uppercase',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {myBid.map((bid, index) => (
                                    <tr
                                        key={bid._id}
                                        style={{
                                            borderBottom: '0.5px solid var(--color-border-tertiary)',
                                            transition: 'background 0.15s',
                                        }}
                                        onMouseEnter={(e) =>
                                        (e.currentTarget.style.background =
                                            'var(--color-background-secondary)')
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.background = 'transparent')
                                        }
                                    >
                                        <td
                                            style={{
                                                padding: '14px 16px',
                                                color: 'var(--color-text-secondary)',
                                                fontSize: 13,
                                                fontWeight: 500,
                                                width: 40,
                                            }}
                                        >
                                            {index + 1}
                                        </td>
                                        <td style={{ padding: '14px 16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <Avatar
                                                    name={bid.buyer_name || bid.buyer_email}
                                                    photoURL={bid.buyer_photo}
                                                    size={34}
                                                />
                                                <span
                                                    style={{
                                                        fontWeight: 500,
                                                        color: 'var(--color-text-primary)',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {bid.buyer_name || '—'}
                                                </span>
                                            </div>
                                        </td>
                                        <td
                                            style={{
                                                padding: '14px 16px',
                                                color: 'var(--color-text-secondary)',
                                                fontSize: 13,
                                            }}
                                        >
                                            {bid.buyer_email}
                                        </td>
                                        <td style={{ padding: '14px 16px' }}>
                                            <span
                                                style={{
                                                    fontWeight: 600,
                                                    color: '#185FA5',
                                                    fontSize: 14,
                                                    fontVariantNumeric: 'tabular-nums',
                                                }}
                                            >
                                                ${Number(bid.bid_price).toLocaleString()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '14px 16px' }}>
                                            <StatusBadge status={bid.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer */}
            {myBid.length > 0 && (
                <p
                    style={{
                        marginTop: 12,
                        fontSize: 12,
                        color: 'var(--color-text-secondary)',
                        textAlign: 'right',
                    }}
                >
                    {myBid.length} bid{myBid.length !== 1 ? 's' : ''} total
                </p>
            )}
        </div>
    );
};

export default MyBids;