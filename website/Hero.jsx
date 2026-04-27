// Hero.jsx - Crazy Electric website hero section
// Load with: <script type="text/babel" src="Hero.jsx"></script>

const Hero = ({ onCTAClick }) => {
 return (
 <section style={{
 position: 'relative',
 background: '#0A0A0A',
 minHeight: 580,
 display: 'flex', alignItems: 'center',
 overflow: 'hidden',
 }}>
 {/* Background photo collage */}
 <div style={{
 position: 'absolute', inset: 0,
 backgroundImage: 'url(../../assets/photos/header-collage.jpg)',
 backgroundSize: 'cover', backgroundPosition: 'center',
 opacity: 0.35,
 }} />
 {/* Dark overlay so text stays readable */}
 <div style={{
 position: 'absolute', inset: 0,
 background: 'linear-gradient(90deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.55) 100%)',
 }} />
 {/* Teal slash accent */}
 <div style={{
 position: 'absolute', right: 0, top: 0, bottom: 0, width: 6,
 background: '#1AD8C0',
 }} />

 {/* Content */}
 <div style={{
 position: 'relative', zIndex: 2,
 maxWidth: 1200, margin: '0 auto', padding: '80px 32px',
 width: '100%',
 }}>
 <div style={{
 fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700,
 letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1AD8C0',
 marginBottom: 16,
 }}>Phoenix Metro Electrical Contractor</div>

 <h1 style={{
 fontFamily: "'Barlow Condensed', sans-serif",
 fontWeight: 900, fontSize: 'clamp(32px, 4vw, 56px)',
 lineHeight: 1, letterSpacing: '-0.01em',
 textTransform: 'uppercase', color: '#fff',
 marginBottom: 8, maxWidth: 700,
 }}>
 Electrical Issues?<br />
 <span style={{ color: '#1AD8C0' }}>We Fix Them</span><br />
 The Right Way.
 </h1>

 <p style={{
 fontFamily: "'Barlow', sans-serif",
 fontSize: 18, color: '#999', lineHeight: 1.6,
 marginTop: 24, marginBottom: 36, maxWidth: 460,
 }}>
 Clean installs. No shortcuts. Licensed, bonded, and insured in Arizona.
 </p>

 <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
 <a href="tel:4809793353" onClick={onCTAClick} style={{
 fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 15,
 letterSpacing: '0.1em', textTransform: 'uppercase',
 background: '#1AD8C0', color: '#0A0A0A',
 padding: '15px 36px', textDecoration: 'none',
 borderRadius: 2, transition: 'background 0.15s', display: 'inline-block',
 }}
 onMouseEnter={e => e.currentTarget.style.background = '#0FA898'}
 onMouseLeave={e => e.currentTarget.style.background = '#1AD8C0'}
 >Call Now - (480) 979-3353</a>

 <a href="#services" style={{
 fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 15,
 letterSpacing: '0.1em', textTransform: 'uppercase',
 background: 'transparent', color: '#fff',
 border: '2px solid rgba(255,255,255,0.25)',
 padding: '13px 32px', textDecoration: 'none',
 borderRadius: 2, transition: 'border-color 0.15s, color 0.15s', display: 'inline-block',
 }}
 onMouseEnter={e => { e.currentTarget.style.borderColor = '#1AD8C0'; e.currentTarget.style.color = '#1AD8C0'; }}
 onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff'; }}
 >View Services</a>
 </div>

 {/* Trust badges */}
 <div style={{ display: 'flex', gap: 20, marginTop: 40, flexWrap: 'wrap' }}>
 {['✓ Licensed', '✓ Bonded', '✓ Insured', 'ROC #342950'].map(t => (
 <span key={t} style={{
 fontFamily: "'Barlow', sans-serif", fontSize: 12, fontWeight: 700,
 letterSpacing: '0.1em', textTransform: 'uppercase',
 color: t.startsWith('✓') ? '#1AD8C0' : '#555',
 }}>{t}</span>
 ))}
 </div>
 </div>
 </section>
 );
};

Object.assign(window, { Hero });
