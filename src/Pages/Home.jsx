import React from 'react';
import LatestProducts from './LatestProducts';

const fetchPromise = fetch('http://localhost:5000/latestProducts2').then(res => res.json());

/* ── Floating orb decoration ── */
const Orb = ({ style }) => (
    <div style={{
        position: 'absolute', borderRadius: '50%',
        filter: 'blur(72px)', opacity: 0.18, pointerEvents: 'none',
        ...style,
    }} />
);

/* ── Stat pill ── */
const Stat = ({ value, label }) => (
    <div style={{ textAlign: 'center' }}>
        <div style={{
            fontSize: 28, fontWeight: 800, color: '#fff',
            fontFamily: "'Syne', sans-serif", lineHeight: 1,
        }}>{value}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 4, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
    </div>
);

/* ── Tag chip ── */
const Tag = ({ children }) => (
    <span style={{
        display: 'inline-block', padding: '5px 14px',
        borderRadius: 999, border: '1px solid rgba(255,255,255,0.18)',
        fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(6px)', background: 'rgba(255,255,255,0.07)',
        letterSpacing: '0.04em',
    }}>{children}</span>
);

/* ── Hero Banner ── */
const Banner = () => (
    <section style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1f3c 50%, #091624 100%)',
        minHeight: '88vh',
        display: 'flex', alignItems: 'center',
    }}>
        <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Nunito:wght@400;500;600&display=swap');

      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50%       { transform: translateY(-22px) rotate(4deg); }
      }
      @keyframes floatB {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-14px); }
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes shimmer {
        0%   { background-position: -200% center; }
        100% { background-position:  200% center; }
      }
      @keyframes pulse-ring {
        0%   { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(245,158,11,0.5); }
        70%  { transform: scale(1);    box-shadow: 0 0 0 18px rgba(245,158,11,0); }
        100% { transform: scale(0.95); box-shadow: 0 0 0 0   rgba(245,158,11,0); }
      }
      .banner-headline {
        font-family: 'Syne', sans-serif;
        font-size: clamp(38px, 6vw, 74px);
        font-weight: 800;
        line-height: 1.08;
        color: #fff;
        animation: fadeUp 0.7s ease both;
      }
      .banner-sub {
        font-family: 'Nunito', sans-serif;
        font-size: clamp(15px, 2vw, 18px);
        color: rgba(255,255,255,0.58);
        line-height: 1.75;
        max-width: 480px;
        animation: fadeUp 0.7s 0.15s ease both;
        opacity: 0;
        animation-fill-mode: forwards;
      }
      .shimmer-text {
        background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 2.8s linear infinite;
      }
      .hero-cta-primary {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 15px 34px;
        background: linear-gradient(135deg, #f59e0b, #d97706);
        color: #0a0f1e; border: none; border-radius: 14px;
        font-size: 15px; font-weight: 800; cursor: pointer;
        font-family: 'Nunito', sans-serif;
        box-shadow: 0 8px 28px rgba(245,158,11,0.35);
        transition: transform 0.2s, box-shadow 0.2s;
        animation: fadeUp 0.7s 0.3s ease both; opacity: 0; animation-fill-mode: forwards;
        animation: pulse-ring 2.5s ease-in-out infinite, fadeUp 0.7s 0.3s ease both;
      }
      .hero-cta-primary:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(245,158,11,0.5); }
      .hero-cta-secondary {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 15px 28px;
        background: rgba(255,255,255,0.06); color: #fff;
        border: 1px solid rgba(255,255,255,0.15); border-radius: 14px;
        font-size: 15px; font-weight: 600; cursor: pointer;
        font-family: 'Nunito', sans-serif;
        backdrop-filter: blur(8px);
        transition: background 0.2s, border-color 0.2s;
        animation: fadeUp 0.7s 0.4s ease both; opacity: 0; animation-fill-mode: forwards;
      }
      .hero-cta-secondary:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.3); }
      .float-card {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        backdrop-filter: blur(12px);
        border-radius: 20px;
        padding: 20px 24px;
      }
      .grid-dot {
        position: absolute; inset: 0; pointer-events: none;
        background-image:
          radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
        background-size: 36px 36px;
      }
    `}</style>

        {/* Grid dot texture */}
        <div className="grid-dot" />

        {/* Orbs */}
        <Orb style={{ width: 600, height: 600, background: '#1d4ed8', top: '-10%', left: '-12%' }} />
        <Orb style={{ width: 400, height: 400, background: '#f59e0b', bottom: '-8%', right: '8%' }} />
        <Orb style={{ width: 300, height: 300, background: '#7c3aed', top: '20%', right: '20%' }} />

        {/* Floating decorative cards */}
        <div className="float-card" style={{
            position: 'absolute', top: '14%', right: '6%', width: 170,
            animation: 'floatB 4s ease-in-out infinite',
            display: 'none',
        }} />

        <div style={{
            maxWidth: 1200, margin: '0 auto', padding: '80px 24px',
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: 60, alignItems: 'center', width: '100%',
        }}>
            {/* Left: copy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 640 }}>

                {/* eyebrow */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, animation: 'fadeUp 0.5s ease both' }}>
                    <Tag>🛒 Marketplace</Tag>
                    <Tag>✨ Curated Deals</Tag>
                    <Tag>🔥 Live Auctions</Tag>
                </div>

                {/* headline */}
                <h1 className="banner-headline">
                    Discover &amp; Bid on<br />
                    <span className="shimmer-text">Premium Finds</span>
                </h1>

                {/* subtext */}
                <p className="banner-sub">
                    Explore thousands of unique products — from electronics to collectibles.
                    Place bids, grab great deals, and sell with confidence in our
                    trusted community marketplace.
                </p>

                {/* CTAs */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    <button className="hero-cta-primary">
                        Browse Products <span style={{ fontSize: 18 }}>→</span>
                    </button>
                    <button className="hero-cta-secondary">
                        How It Works
                    </button>
                </div>

                {/* Divider */}
                <div style={{ width: 60, height: 2, background: 'rgba(255,255,255,0.12)', borderRadius: 2 }} />

                {/* Stats */}
                <div style={{
                    display: 'flex', gap: 36, flexWrap: 'wrap',
                    animation: 'fadeUp 0.7s 0.5s ease both', opacity: 0, animationFillMode: 'forwards',
                }}>
                    <Stat value="12K+" label="Products" />
                    <Stat value="3.4K+" label="Active Bids" />
                    <Stat value="98%" label="Satisfaction" />
                    <Stat value="24/7" label="Support" />
                </div>
            </div>

            {/* Right: floating visual card stack */}
            <div style={{
                display: 'flex', flexDirection: 'column', gap: 16,
                animation: 'floatB 5s ease-in-out infinite',
                flexShrink: 0,
            }} className="hero-visual">
                <style>{`.hero-visual { @media (max-width: 768px) { display: none !important; } }`}</style>

                {/* Top card — trending */}
                <div className="float-card" style={{ width: 240 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                        }}>🔥</div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: "'Syne', sans-serif" }}>Trending Now</div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>Updated just now</div>
                        </div>
                    </div>
                    {['iPhone 15 Pro', 'Vintage Rolex', 'Gaming Chair'].map((item, i) => (
                        <div key={item} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '7px 0',
                            borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                        }}>
                            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontFamily: "'Nunito', sans-serif" }}>{item}</span>
                            <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700 }}>
                                {['৳45K', '৳120K', '৳28K'][i]}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Bottom card — live bid */}
                <div className="float-card" style={{ width: 240, animation: 'float 4.5s 1s ease-in-out infinite' }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: '#22c55e',
                            boxShadow: '0 0 0 4px rgba(34,197,94,0.25)',
                            flexShrink: 0,
                        }} />
                        <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 700, letterSpacing: '0.05em' }}>LIVE BID</div>
                    </div>
                    <div style={{ marginTop: 10, fontSize: 13, color: '#fff', fontWeight: 600, fontFamily: "'Syne', sans-serif" }}>
                        Sony WH-1000XM5
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#f59e0b', fontFamily: "'Syne', sans-serif", margin: '6px 0 4px' }}>
                        ৳ 18,500
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>14 bids · ends in 2h 18m</div>
                </div>
            </div>
        </div>

        {/* Bottom wave */}
        <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 60, background: '#f6f7fb',
            clipPath: 'ellipse(55% 100% at 50% 100%)',
        }} />
    </section>
);

/* ── Section divider ── */
const SectionHeader = () => (
    <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '64px 24px 32px',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
    }}>
        <div>
            <div style={{
                fontSize: 12, fontWeight: 700, color: '#f59e0b',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                fontFamily: "'Nunito', sans-serif", marginBottom: 8,
            }}>
                Fresh Listings
            </div>
            <h2 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(24px, 4vw, 38px)',
                fontWeight: 800, color: '#0a0f1e',
                lineHeight: 1.1, margin: 0,
            }}>
                Latest Products
            </h2>
        </div>
        <p style={{
            fontSize: 14, color: '#64748b',
            fontFamily: "'Nunito', sans-serif",
            maxWidth: 340, lineHeight: 1.65, margin: 0,
        }}>
            Hand-picked listings updated in real time. Bid early, bid smart.
        </p>
    </div>
);

/* ── Home ── */
const Home = () => {
    return (
        <div style={{ background: '#f6f7fb', minHeight: '100vh' }}>
            <Banner />
            <SectionHeader />
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px' }}>
                <LatestProducts fetchPromise={fetchPromise} />
            </div>
        </div>
    );
};

export default Home;