// Services.jsx - Crazy Electric services grid
// Load with: <script type="text/babel" src="Services.jsx"></script>

const SERVICES = [
 {
 title: 'Panel Upgrades',
 desc: '200A service upgrades, sub-panels, breaker replacements. Keep your home or business safe and up to code.',
 icon: (
 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1AD8C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
 </svg>
 ),
 },
 {
 title: 'EV Charger Installs',
 desc: 'Level 2 home charger installation done clean and permitted. We work with all major EV brands.',
 icon: (
 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1AD8C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <rect x="5" y="2" width="14" height="20" rx="2"/>
 <line x1="12" y1="18" x2="12" y2="18.01"/>
 <path d="M9 7h6"/>
 </svg>
 ),
 },
 {
 title: 'Lighting Installs',
 desc: 'Recessed lighting, ceiling fans, commercial track lighting, and decorative fixtures installed right.',
 icon: (
 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1AD8C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="12" cy="12" r="5"/>
 <line x1="12" y1="1" x2="12" y2="3"/>
 <line x1="12" y1="21" x2="12" y2="23"/>
 <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
 <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
 <line x1="1" y1="12" x2="3" y2="12"/>
 <line x1="21" y1="12" x2="23" y2="12"/>
 </svg>
 ),
 },
 {
 title: 'Outlets & Wiring',
 desc: 'New outlets, GFCI/AFCI protection, remodel wiring, and dedicated circuits for appliances.',
 icon: (
 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1AD8C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <rect x="6" y="6" width="12" height="12" rx="1"/>
 <line x1="10" y1="10" x2="10" y2="14"/>
 <line x1="14" y1="10" x2="14" y2="14"/>
 </svg>
 ),
 },
 {
 title: 'Troubleshooting',
 desc: 'Tripping breakers, dead outlets, flickering lights. We diagnose fast and fix it properly the first time.',
 icon: (
 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1AD8C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <circle cx="11" cy="11" r="8"/>
 <line x1="21" y1="21" x2="16.65" y2="16.65"/>
 </svg>
 ),
 },
 {
 title: 'Surge Protection',
 desc: 'Whole-home surge protectors installed at the panel. Protect your electronics and appliances.',
 icon: (
 <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1AD8C0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
 </svg>
 ),
 },
];

const Services = () => {
 const [hovered, setHovered] = React.useState(null);

 return (
 <section id="services" style={{ background: '#141414', padding: '80px 32px', borderTop: '1px solid #1f1f1f' }}>
 <div style={{ maxWidth: 1200, margin: '0 auto' }}>

 {/* Section header */}
 <div style={{ marginBottom: 48 }}>
 <div style={{
 fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700,
 letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1AD8C0',
 marginBottom: 12,
 }}>What We Do</div>
 <h2 style={{
 fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
 fontSize: 'clamp(36px, 5vw, 56px)', textTransform: 'uppercase',
 color: '#fff', lineHeight: 1, letterSpacing: '-0.01em',
 }}>
 Electrical Services<br />
 <span style={{ color: '#1AD8C0' }}>Done Right.</span>
 </h2>
 </div>

 {/* Grid */}
 <div style={{
 display: 'grid',
 gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
 gap: 2,
 }}>
 {SERVICES.map((s, i) => (
 <div key={s.title}
 onMouseEnter={() => setHovered(i)}
 onMouseLeave={() => setHovered(null)}
 style={{
 background: hovered === i ? '#222' : '#1A1A1A',
 borderTop: `3px solid ${hovered === i ? '#1AD8C0' : '#252525'}`,
 padding: '32px 28px',
 transition: 'background 0.2s, border-color 0.2s',
 cursor: 'default',
 }}
 >
 <div style={{ marginBottom: 16 }}>{s.icon}</div>
 <div style={{
 fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
 fontSize: 22, textTransform: 'uppercase', color: '#fff',
 letterSpacing: '0.02em', marginBottom: 10,
 }}>{s.title}</div>
 <p style={{
 fontFamily: "'Barlow', sans-serif", fontSize: 14,
 color: '#777', lineHeight: 1.65,
 }}>{s.desc}</p>
 </div>
 ))}
 </div>

 {/* CTA strip */}
 <div style={{
 marginTop: 48, padding: '32px', background: '#1A1A1A',
 display: 'flex', alignItems: 'center', justifyContent: 'space-between',
 flexWrap: 'wrap', gap: 20,
 borderLeft: '4px solid #1AD8C0',
 }}>
 <div>
 <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 28, color: '#fff', textTransform: 'uppercase' }}>
 Don't Think Crazy, <span style={{ color: '#1AD8C0' }}>Choose Crazy</span>
 </div>
 <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: '#666', marginTop: 4 }}>
 Serving Phoenix, Scottsdale, Tempe, Mesa, Gilbert & Chandler
 </div>
 </div>
 <a href="tel:4809793353" style={{
 fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 14,
 letterSpacing: '0.1em', textTransform: 'uppercase',
 background: '#1AD8C0', color: '#0A0A0A',
 padding: '14px 28px', textDecoration: 'none', borderRadius: 2,
 whiteSpace: 'nowrap',
 }}>Call (480) 979-3353</a>
 </div>
 </div>
 </section>
 );
};

Object.assign(window, { Services });
