// Contact.jsx - Crazy Electric quote calculator + contact form
// Load with: <script type="text/babel" src="Contact.jsx"></script>

const CE_BASE_LAT = 33.4018, CE_BASE_LNG = -111.8396;

function ceHaversine(lat1, lng1, lat2, lng2) {
 const R = 3958.8;
 const dLat = (lat2 - lat1) * Math.PI / 180;
 const dLng = (lng2 - lng1) * Math.PI / 180;
 const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
 return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function ceGetZone(miles) {
 if (miles <= 15) return { multiplier: 1.00, serviceCall: 200 };
 if (miles <= 20) return { multiplier: 1.15, serviceCall: 225 };
 if (miles <= 25) return { multiplier: 1.25, serviceCall: 250 };
 if (miles <= 30) return { multiplier: 1.35, serviceCall: 275 };
 if (miles <= 33) return { multiplier: 1.50, serviceCall: 300 };
 return null;
}

function ceTaper(t) {
 if (t < 500) return 1.00;
 if (t < 1500) return 0.80;
 if (t < 4000) return 0.60;
 return 0.40;
}

function ceRound25(n) { return Math.round(n / 25) * 25; }

function ceCalcRange(baseLow, baseHigh, qty, zone) {
 const calc = (base) => {
 const job = base * qty;
 const eff = 1 + ((zone.multiplier - 1) * ceTaper(job));
 return ceRound25(Math.max(zone.serviceCall, job * eff));
 };
 return { low: calc(baseLow), high: calc(baseHigh) };
}

const FIXTURE_TYPES = {
 fan: { label: 'Ceiling Fan', price: 150, hasQty: true },
 chandStd: { label: 'Chandelier (Standard)', price: 150, hasQty: true },
 chandHigh: { label: 'Chandelier (High Ceiling / Large)', price: 950, hasQty: true },
 recessed: { label: 'Recessed / Can Light', price: 150, hasQty: true },
 pendant: { label: 'Pendant / Wall Sconce / Flush Mount',price: 85, hasQty: true },
 bistro: { label: 'Bistro / String Lights', price: 395, hasQty: false,
 note: 'Starting price for ~50ft of tensioned wire. Final pricing depends on layout, mounting points, and exact scope.' },
};

const CE_SVCS = {
 panel: { label: 'Panel Upgrade', baseLow: 4500, baseHigh: 6500, hasQty: false, maxQty: null, note: 'Final pricing depends on layout, access, and exact scope.' },
 ev: { label: 'EV Charger Install', baseLow: 600, baseHigh: 1200, hasQty: false, maxQty: null, note: 'Does not include panel upgrade if required. Final pricing depends on layout, access, and exact scope.' },
 lighting: { label: 'Lighting / Ceiling Fan', baseLow: null, baseHigh: null, hasQty: true, maxQty: 5, note: null, isLighting: true },
 outlets: { label: 'Outlets / Wiring', baseLow: 200, baseHigh: 350, hasQty: true, maxQty: 5, note: 'Final pricing depends on layout, access, and exact scope.' },
 surge: { label: 'Surge Protection', baseLow: 400, baseHigh: 900, hasQty: false, maxQty: null, note: 'Depends on panel type and system. Final pricing depends on layout, access, and exact scope.' },
 troubleshoot: { label: 'Troubleshooting', baseLow: null, baseHigh: null, hasQty: false, maxQty: null, note: 'Most issues resolved within 1-2 hours. Additional time billed at $150/hr.' },
 other: { label: 'Other', baseLow: null, baseHigh: null, hasQty: false, maxQty: null, note: null },
};

const Contact = () => {
 const [service, setService] = React.useState('');
 const [fixture, setFixture] = React.useState('');
 const [qty, setQty] = React.useState(1);
 const [zip, setZip] = React.useState('');
 const [zipData, setZipData] = React.useState(null);
 const [form, setForm] = React.useState({ firstName: '', lastName: '', phone: '', email: '', message: '', optin: false });
 const [sent, setSent] = React.useState(false);

 const svc = CE_SVCS[service] || null;
 const fix = fixture ? FIXTURE_TYPES[fixture] : null;
 const maxQty = svc ? (svc.maxQty || 99) : 99;
 const handle = (k, v) => setForm(f => ({ ...f, [k]: v }));
 const setQtyCapped = (fn) => setQty(q => Math.min(maxQty, Math.max(1, fn(q))));

 const lookupZip = async (z) => {
 setZipData('loading');
 try {
 const url = 'https://nominatim.openstreetmap.org/search?postalcode=' + z + '&countrycodes=us&format=json&limit=1&addressdetails=1';
 const resp = await fetch(url, { headers: { 'Accept-Language': 'en' } });
 const data = await resp.json();
 if (!data || !data.length) { setZipData({ error: 'ZIP not found' }); return; }
 const miles = ceHaversine(CE_BASE_LAT, CE_BASE_LNG, parseFloat(data[0].lat), parseFloat(data[0].lon));
 const zone = ceGetZone(miles);
 const addr = data[0].address || {};
 const city = addr.city || addr.town || addr.village || addr.suburb || addr.county || z;
 setZipData({ city, zone, miles: Math.round(miles) });
 } catch(e) { setZipData({ error: 'Could not look up ZIP.' }); }
 };

 const handleZip = (raw) => {
 const z = raw.replace(/[^0-9]/g, '');
 setZip(z);
 if (z.length === 5) lookupZip(z); else setZipData(null);
 };

 const estimate = React.useMemo(() => {
 if (!svc || !zipData || zipData === 'loading' || zipData.error) return null;
 if (!zipData.zone) return { custom: true };
 if (svc.baseLow === null && !svc.isLighting) return { callOnly: true };
 if (svc.isLighting) {
 if (!fix) return null; // wait for fixture selection
 if (!fix.hasQty) {
 // Bistro - fixed minimum, apply zone
 const low = ceRound25(Math.max(zipData.zone.serviceCall, fix.price * (1 + ((zipData.zone.multiplier - 1) * ceTaper(fix.price)))));
 return { low, high: low };
 }
 const { low, high } = ceCalcRange(fix.price, fix.price, qty, zipData.zone);
 return { low, high };
 }
 const { low, high } = ceCalcRange(svc.baseLow, svc.baseHigh, svc.hasQty ? qty : 1, zipData.zone);
 return { low, high };
 }, [service, fixture, qty, zipData]);

 const IS = {
 background: '#1A1A1A', border: '1px solid #2A2A2A', color: '#fff',
 fontFamily: "'Barlow', sans-serif", fontSize: 15, padding: '12px 14px',
 borderRadius: 2, outline: 'none', width: '100%', transition: 'border-color 0.15s',
 };
 const LS = { display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#555', marginBottom: 6 };
 const fo = (e) => e.target.style.borderColor = '#1AD8C0';
 const bl = (e) => e.target.style.borderColor = '#2A2A2A';

 if (sent) return (
 <section id="contact" style={{ background: '#0D0D0D', padding: '80px 32px', borderTop: '1px solid #222' }}>
 <div style={{ maxWidth: 560, margin: '0 auto', background: '#1A1A1A', borderTop: '4px solid #1AD8C0', padding: '48px 40px', textAlign: 'center' }}>
 <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, color: '#1AD8C0', textTransform: 'uppercase', marginBottom: 12 }}>Got it!</div>
 <p style={{ fontSize: 15, color: '#888', lineHeight: 1.7 }}>We will reach out shortly.<br />Or call now: <a href="tel:4809793353" style={{ color: '#1AD8C0' }}>(480) 979-3353</a></p>
 </div>
 </section>
 );

 const serviceCall = zipData && zipData.zone ? zipData.zone.serviceCall : null;

 return (
 <section id="contact" style={{ background: '#0D0D0D', padding: '80px 32px', borderTop: '1px solid #222' }}>
 <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 80, flexWrap: 'wrap' }}>

 {/* Left */}
 <div style={{ flex: '1 1 260px' }}>
 <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1AD8C0', marginBottom: 12 }}>Get In Touch</div>
 <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(36px,5vw,52px)', textTransform: 'uppercase', color: '#fff', lineHeight: 1, marginBottom: 24 }}>
 Request a<br /><span style={{ color: '#1AD8C0' }}>Fast Quote</span>
 </h2>
 <p style={{ fontSize: 15, color: '#666', lineHeight: 1.7, marginBottom: 32 }}>
 Select your service and ZIP to see estimated pricing before you hit send.
 </p>
 <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
 <div>
 <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#444', marginBottom: 6 }}>Phone / Text</div>
 <a href="tel:4809793353" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 32, color: '#1AD8C0', textDecoration: 'none' }}>(480) 979-3353</a>
 </div>
 <div>
 <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#444', marginBottom: 6 }}>Website</div>
 <a href="https://www.CrazyElectricAZ.com" style={{ fontSize: 15, color: '#666', textDecoration: 'none' }}>www.CrazyElectricAZ.com</a>
 </div>
 <div>
 <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#444', marginBottom: 6 }}>Service Areas</div>
 <span style={{ fontSize: 14, color: '#666' }}>Phoenix · Scottsdale · Tempe · Mesa · Gilbert · Chandler</span>
 </div>
 </div>
 </div>

 {/* Right - form */}
 <div style={{ flex: '1 1 400px' }}>
 <form onSubmit={e => {
 e.preventDefault();
 if (!zip || zip.length !== 5 || !zipData || !zipData.zone) return;
 if (!form.firstName.trim() || !form.lastName.trim() || !form.phone.trim() || !form.email.trim()) return;
 setSent(true);
 }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

 {/* Service */}
 <div>
 <label style={LS}>Service Needed</label>
 <select style={{ ...IS, appearance: 'none', cursor: 'pointer' }}
 value={service} onChange={e => { setService(e.target.value); setFixture(''); setQty(1); }}
 onFocus={fo} onBlur={bl}>
 <option value="">Select a service...</option>
 {Object.entries(CE_SVCS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
 </select>
 {svc && !svc.isLighting && svc.note && (
 <div style={{ marginTop: 6, fontSize: 11, color: '#555', fontStyle: 'italic', lineHeight: 1.6 }}>{svc.note}</div>
 )}
 </div>

 {/* Fixture type dropdown - lighting only */}
 {svc && svc.isLighting && (
 <div>
 <label style={LS}>Type of Light</label>
 <select style={{ ...IS, appearance: 'none', cursor: 'pointer' }}
 value={fixture} onChange={e => { setFixture(e.target.value); setQty(1); }}
 onFocus={fo} onBlur={bl}>
 <option value="">Select fixture type...</option>
 {Object.entries(FIXTURE_TYPES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
 </select>
 {fix && fix.note && (
 <div style={{ marginTop: 6, fontSize: 11, color: '#555', fontStyle: 'italic', lineHeight: 1.6 }}>{fix.note}</div>
 )}
 </div>
 )}

 {/* Quantity */}
 {((svc && svc.hasQty && !svc.isLighting) || (svc && svc.isLighting && fix && fix.hasQty)) && (
 <div>
 <label style={LS}>{svc.isLighting ? 'Quantity' : 'Number of outlets / runs'}</label>
 <div style={{ display: 'flex' }}>
 <button type="button" onClick={() => setQtyCapped(q => q - 1)}
 style={{ background: '#2A2A2A', border: 'none', color: '#fff', width: 44, height: 46, fontSize: 20, cursor: 'pointer', borderRadius: '2px 0 0 2px', fontWeight: 700 }}>-</button>
 <div style={{ flex: 1, background: '#1A1A1A', border: '1px solid #2A2A2A', borderLeft: 'none', borderRight: 'none', color: '#fff', fontSize: 18, fontWeight: 700, textAlign: 'center', padding: '10px' }}>{qty}</div>
 <button type="button" onClick={() => setQtyCapped(q => q + 1)}
 style={{ background: '#2A2A2A', border: 'none', color: '#fff', width: 44, height: 46, fontSize: 20, cursor: 'pointer', borderRadius: '0 2px 2px 0', fontWeight: 700 }}>+</button>
 </div>
 {maxQty === 5 && qty === 5 && (
 <div style={{ marginTop: 6, fontSize: 11, color: '#555', fontStyle: 'italic' }}>For larger projects (5+ items), request a custom quote for more accurate pricing.</div>
 )}
 </div>
 )}

 {/* ZIP */}
 <div>
 <label style={LS}>Your ZIP Code <span style={{ color: '#1AD8C0' }}>*</span></label>
 <input required style={IS} placeholder="Enter ZIP for service call pricing" maxLength={5}
 value={zip} onChange={e => handleZip(e.target.value)} onFocus={fo} onBlur={bl} />
 {zipData === 'loading' && <div style={{ marginTop: 6, fontSize: 12, color: '#555' }}>Checking your area...</div>}
 {zipData && zipData.error && <div style={{ marginTop: 6, fontSize: 12, color: '#f87171' }}>{zipData.error}</div>}
 {zipData && zipData.city && !zipData.error && (
 <div style={{ marginTop: 6, fontSize: 12, color: '#666' }}>
 {zipData.zone
 ? <span>{zipData.city} - Standard service call pricing: <strong style={{ color: '#1AD8C0' }}>${zipData.zone.serviceCall}</strong></span>
 : <span style={{ color: '#f87171' }}>{zipData.city} is outside our standard area. <a href="tel:4809793353" style={{ color: '#1AD8C0' }}>Call for a custom quote.</a></span>
 }
 </div>
 )}
 </div>

 {/* Estimate - standard services */}
 {estimate && !estimate.custom && !estimate.callOnly && (
 <div style={{ background: '#0A0A0A', borderLeft: '4px solid #1AD8C0', padding: '16px 18px' }}>
 <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#555', marginBottom: 6 }}>Estimated Total</div>
 <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, color: '#1AD8C0', lineHeight: 1 }}>
 {estimate.low === estimate.high
 ? '$' + estimate.low.toLocaleString()
 : '$' + estimate.low.toLocaleString() + ' - $' + estimate.high.toLocaleString()
 }
 </div>
 <div style={{ fontSize: 11, color: '#444', marginTop: 8, lineHeight: 1.6 }}>
 Most projects in your area fall within this range. Final pricing depends on the exact setup.
 </div>
 </div>
 )}

 {/* Estimate - troubleshooting */}
 {estimate && estimate.callOnly && serviceCall && (
 <div style={{ background: '#0A0A0A', borderLeft: '4px solid #1AD8C0', padding: '16px 18px' }}>
 <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#555', marginBottom: 6 }}>Estimated Starting Price</div>
 <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 40, color: '#1AD8C0', lineHeight: 1 }}>
 {'$' + serviceCall}
 </div>
 <div style={{ fontSize: 11, color: '#555', marginTop: 6, fontStyle: 'italic' }}>Additional time billed at $150/hr after the first hour.</div>
 <div style={{ fontSize: 11, color: '#444', marginTop: 6, lineHeight: 1.6 }}>Final pricing depends on the exact setup.</div>
 </div>
 )}

 {/* Other */}
 {service === 'other' && (
 <div style={{ background: '#0A0A0A', borderLeft: '4px solid #fff', padding: '14px 18px', fontSize: 13, color: '#888', lineHeight: 1.6 }}>
 Not sure what you need? <a href="tel:4809793353" style={{ color: '#1AD8C0' }}>Call or text (480) 979-3353</a>, or fill out the form below and we will reach out.
 </div>
 )}

 {/* Custom zone */}
 {estimate && estimate.custom && (
 <div style={{ background: '#0A0A0A', borderLeft: '4px solid #fff', padding: '14px 18px', fontSize: 13, color: '#888', lineHeight: 1.6 }}>
 Your area requires a custom quote. <a href="tel:4809793353" style={{ color: '#1AD8C0' }}>Call us at (480) 979-3353.</a>
 </div>
 )}

 <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}></div>

 {/* First + Last */}
 <div style={{ display: 'flex', gap: 12 }}>
 <div style={{ flex: 1 }}>
 <label style={LS}>First Name <span style={{ color: '#1AD8C0' }}>*</span></label>
 <input required style={IS} placeholder="First" value={form.firstName} onChange={e => handle('firstName', e.target.value)} onFocus={fo} onBlur={bl} />
 </div>
 <div style={{ flex: 1 }}>
 <label style={LS}>Last Name <span style={{ color: '#1AD8C0' }}>*</span></label>
 <input required style={IS} placeholder="Last" value={form.lastName} onChange={e => handle('lastName', e.target.value)} onFocus={fo} onBlur={bl} />
 </div>
 </div>

 {/* Phone + Email */}
 <div style={{ display: 'flex', gap: 12 }}>
 <div style={{ flex: 1 }}>
 <label style={LS}>Phone <span style={{ color: '#1AD8C0' }}>*</span></label>
 <input required style={IS} placeholder="(480) 000-0000" type="tel" value={form.phone} onChange={e => handle('phone', e.target.value)} onFocus={fo} onBlur={bl} />
 </div>
 <div style={{ flex: 1 }}>
 <label style={LS}>Email <span style={{ color: '#1AD8C0' }}>*</span></label>
 <input required style={IS} placeholder="you@example.com" type="email" value={form.email} onChange={e => handle('email', e.target.value)} onFocus={fo} onBlur={bl} />
 </div>
 </div>

 {/* Message */}
 <div>
 <label style={LS}>Message (optional)</label>
 <textarea style={{ ...IS, minHeight: 80, resize: 'vertical' }} placeholder="Any details about your project..."
 value={form.message} onChange={e => handle('message', e.target.value)} onFocus={fo} onBlur={bl} />
 </div>

 {/* Opt-in */}
 <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
 <input type="checkbox" id="optin2" checked={form.optin} onChange={e => handle('optin', e.target.checked)}
 style={{ marginTop: 3, accentColor: '#1AD8C0', width: 16, height: 16, flexShrink: 0 }} />
 <label htmlFor="optin2" style={{ fontSize: 12, color: '#555', lineHeight: 1.6, cursor: 'pointer' }}>
 I agree to receive texts and emails from Crazy Electric regarding my inquiry. Message &amp; data rates may apply.{' '}
 <a href="javascript:void(0)" onClick={(e) => { e.preventDefault(); const p = location.pathname.includes('/pages/') ? 'privacy-policy.html' : '../pages/privacy-policy.html'; window.open(p, '_blank'); }} style={{ color: '#1AD8C0', textDecoration: 'none' }}>Privacy Policy</a>.
 </label>
 </div>

 {/* Disclaimer */}
 <div style={{ fontSize: 11, color: '#3A3A3A', lineHeight: 1.6, fontStyle: 'italic' }}>
 Pricing shown is based on typical projects in your area. Final cost depends on the exact setup.
 </div>

 {/* Submit */}
 <button type="submit" style={{
 fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 14,
 letterSpacing: '0.12em', textTransform: 'uppercase',
 background: '#1AD8C0', color: '#0A0A0A',
 padding: '15px', border: 'none', borderRadius: 2, cursor: 'pointer', transition: 'background 0.15s',
 }}
 onMouseEnter={e => e.target.style.background = '#0FA898'}
 onMouseLeave={e => e.target.style.background = '#1AD8C0'}
 >Request a Fast Quote</button>

 </form>
 </div>
 </div>
 </section>
 );
};

Object.assign(window, { Contact });
