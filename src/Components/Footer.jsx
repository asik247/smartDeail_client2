import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>

                {/* Top section */}
                <div style={styles.top}>
                    {/* Brand */}
                    <div style={styles.brand}>
                        <div style={styles.logo}>
                            <span style={styles.logoIcon}>🛒</span>
                            <span style={styles.logoText}>BazaarBD</span>
                        </div>
                        <p style={styles.tagline}>
                            Bangladesh's trusted marketplace for buying and selling — new, used & everything in between.
                        </p>
                        <div style={styles.socials}>
                            {[
                                { label: 'Facebook', href: '#', icon: 'f' },
                                { label: 'Instagram', href: '#', icon: 'in' },
                                { label: 'YouTube', href: '#', icon: 'yt' },
                            ].map((s) => (
                                <a key={s.label} href={s.href} style={styles.socialBtn} title={s.label}>
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div style={styles.linksGrid}>
                        <div style={styles.linkGroup}>
                            <p style={styles.groupTitle}>Marketplace</p>
                            <ul style={styles.linkList}>
                                {['Browse Products', 'Post an Ad', 'Categories', 'Featured Listings'].map(l => (
                                    <li key={l}><a href="#" style={styles.link}>{l}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div style={styles.linkGroup}>
                            <p style={styles.groupTitle}>Support</p>
                            <ul style={styles.linkList}>
                                {['Help Center', 'Safety Tips', 'Report a Problem', 'Contact Us'].map(l => (
                                    <li key={l}><a href="#" style={styles.link}>{l}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div style={styles.linkGroup}>
                            <p style={styles.groupTitle}>Company</p>
                            <ul style={styles.linkList}>
                                {['About Us', 'Careers', 'Blog', 'Press'].map(l => (
                                    <li key={l}><a href="#" style={styles.link}>{l}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div style={styles.divider} />

                {/* Bottom section */}
                <div style={styles.bottom}>
                    <p style={styles.copy}>© {year} BazaarBD. All rights reserved.</p>
                    <div style={styles.legal}>
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
                            <React.Fragment key={item}>
                                <a href="#" style={styles.legalLink}>{item}</a>
                                {i < 2 && <span style={styles.dot}>·</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        backgroundColor: '#111110',
        color: '#fff',
        fontFamily: "'Segoe UI', sans-serif",
        marginTop: 'auto',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 1.5rem 1.5rem',
    },
    top: {
        display: 'flex',
        gap: '3rem',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: '2.5rem',
    },

    /* Brand */
    brand: {
        flex: '1 1 220px',
        maxWidth: '280px',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
    },
    logoIcon: {
        fontSize: '22px',
    },
    logoText: {
        fontSize: '1.3rem',
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '-0.3px',
    },
    tagline: {
        fontSize: '0.82rem',
        color: '#888',
        lineHeight: 1.6,
        marginBottom: '20px',
    },
    socials: {
        display: 'flex',
        gap: '8px',
    },
    socialBtn: {
        width: '34px',
        height: '34px',
        borderRadius: '8px',
        backgroundColor: '#222',
        color: '#ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.7rem',
        fontWeight: 700,
        textDecoration: 'none',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        transition: 'background 0.2s',
    },

    /* Links */
    linksGrid: {
        display: 'flex',
        gap: '3rem',
        flexWrap: 'wrap',
    },
    linkGroup: {
        minWidth: '120px',
    },
    groupTitle: {
        fontSize: '0.72rem',
        fontWeight: 700,
        color: '#555',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '14px',
    },
    linkList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    link: {
        fontSize: '0.85rem',
        color: '#aaa',
        textDecoration: 'none',
    },

    /* Bottom */
    divider: {
        borderTop: '1px solid #222',
        marginBottom: '1.25rem',
    },
    bottom: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px',
    },
    copy: {
        fontSize: '0.78rem',
        color: '#555',
    },
    legal: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    legalLink: {
        fontSize: '0.78rem',
        color: '#555',
        textDecoration: 'none',
    },
    dot: {
        color: '#333',
        fontSize: '0.9rem',
    },
};

export default Footer;