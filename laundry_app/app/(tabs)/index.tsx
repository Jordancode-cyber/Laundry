import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const freshAndTidyHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Fresh & Tidy – Book a Service</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Georgia, serif; background: #F9F5ED; min-height: 100vh; display: flex; flex-direction: column; }

    .header { background: #2D6A4F; padding: 1.5rem 2rem; display: flex; align-items: center; justify-content: space-between; }
    .header-logo { color: #E9C46A; font-size: 1.4rem; font-weight: bold; letter-spacing: 0.05em; }
    .header-sub { color: rgba(255,255,255,0.7); font-size: 0.75rem; letter-spacing: 0.15em; margin-top: 2px; }
    .header-right { color: rgba(255,255,255,0.6); font-size: 0.8rem; }

    .progress-track { background: #D8F3DC; height: 6px; }
    .progress-bar { background: #52B788; height: 100%; transition: width 0.4s ease; }

    .step-labels { display: flex; justify-content: space-between; padding: 0.75rem 1.5rem; border-bottom: 1px solid #dde8e2; }
    .step-label { font-size: 0.7rem; color: #6B7C74; letter-spacing: 0.05em; text-transform: uppercase; }
    .step-label.active { color: #2D6A4F; font-weight: bold; }

    .content { max-width: 600px; margin: 0 auto; padding: 2rem 1.5rem; flex: 1; width: 100%; }
    h2 { color: #1B1F1E; font-size: 1.6rem; margin-bottom: 0.4rem; }
    .subtitle { color: #6B7C74; margin-bottom: 2rem; font-size: 0.95rem; }

    .card { background: #fff; border: 2px solid #dde8e2; border-radius: 1.2rem; padding: 1.2rem 1.5rem; cursor: pointer; transition: all 0.2s; margin-bottom: 1rem; display: flex; align-items: center; gap: 1rem; }
    .card.selected { background: #2D6A4F; border-color: #2D6A4F; box-shadow: 0 4px 20px rgba(45,106,79,0.2); }
    .card-emoji { font-size: 2.2rem; }
    .card-title { font-weight: bold; color: #1B1F1E; font-size: 1.05rem; }
    .card.selected .card-title { color: #fff; }
    .card-desc { color: #6B7C74; font-size: 0.85rem; margin-top: 2px; }
    .card.selected .card-desc { color: rgba(255,255,255,0.75); }

    .svc-card { background: #fff; border: 2px solid #dde8e2; border-radius: 1.2rem; padding: 1.2rem 1.5rem; cursor: pointer; transition: all 0.2s; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: flex-start; }
    .svc-card.selected { background: #D8F3DC; border-color: #52B788; }
    .svc-left { display: flex; gap: 0.8rem; align-items: center; }
    .svc-icon { font-size: 1.8rem; }
    .svc-name { font-weight: bold; color: #1B1F1E; }
    .svc-desc { color: #6B7C74; font-size: 0.83rem; margin-top: 2px; }
    .price-badge { background: #E9C46A; border-radius: 1rem; padding: 0.3rem 0.7rem; font-size: 0.75rem; color: #1B1F1E; font-weight: bold; white-space: nowrap; margin-left: 0.5rem; flex-shrink: 0; }

    .field { margin-bottom: 1.2rem; }
    label { display: block; color: #1B1F1E; font-weight: bold; font-size: 0.88rem; margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.05em; }
    input { width: 100%; padding: 0.85rem 1rem; border-radius: 0.8rem; border: 1.5px solid #dde8e2; font-size: 0.95rem; font-family: Georgia, serif; background: #fff; outline: none; }

    .payment-row { display: flex; gap: 0.7rem; flex-wrap: wrap; margin-top: 0.4rem; }
    .pay-chip { background: #fff; color: #1B1F1E; border: 1.5px solid #dde8e2; border-radius: 2rem; padding: 0.5rem 1rem; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 0.4rem; font-family: Georgia, serif; }
    .pay-chip.selected { background: #2D6A4F; color: #fff; border-color: #2D6A4F; }

    .btn-row { display: flex; gap: 1rem; margin-top: 2rem; }
    .btn-primary { flex: 2; background: #2D6A4F; color: #fff; border: none; border-radius: 2rem; padding: 1rem; font-size: 1rem; cursor: pointer; font-family: Georgia, serif; }
    .btn-primary:disabled { background: #ccc; cursor: not-allowed; }
    .btn-outline { flex: 1; background: transparent; color: #2D6A4F; border: 2px solid #2D6A4F; border-radius: 2rem; padding: 1rem; font-size: 1rem; cursor: pointer; font-family: Georgia, serif; }
    .btn-full { width: 100%; background: #2D6A4F; color: #fff; border: none; border-radius: 2rem; padding: 1rem; font-size: 1rem; cursor: pointer; font-family: Georgia, serif; margin-top: 2rem; }
    .btn-full:disabled { background: #ccc; cursor: not-allowed; }

    .confirm-card { background: #fff; border-radius: 1.2rem; border: 1.5px solid #dde8e2; overflow: hidden; margin-bottom: 1.5rem; }
    .confirm-header { background: #2D6A4F; padding: 1.2rem 1.5rem; }
    .confirm-body { padding: 1.2rem 1.5rem; }
    .confirm-row { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #f0f0f0; font-size: 0.9rem; }
    .confirm-row-value { color: #1B1F1E; font-weight: bold; text-align: right; max-width: 60%; }

    .success-screen { min-height: 100vh; background: #2D6A4F; display: flex; align-items: center; justify-content: center; padding: 2rem; }
    .success-card { background: #fff; border-radius: 2rem; padding: 3rem 2rem; max-width: 480px; width: 100%; text-align: center; }

    .footer { text-align: center; padding: 2rem 1rem; color: #6B7C74; font-size: 0.78rem; border-top: 1px solid #dde8e2; margin-top: auto; line-height: 1.8; }
    .footer-green { color: #52B788; }
    .hidden { display: none !important; }
  </style>
</head>
<body>

<div id="success-screen" class="success-screen hidden">
  <div class="success-card">
    <div class="success-icon">✅</div>
    <h2 class="success-title">Booking Confirmed!</h2>
    <p class="success-msg">Thank you, <strong id="s-name"></strong>! Your booking is confirmed.</p>
    <button class="btn-primary" onclick="resetApp()">Book Another</button>
  </div>
</div>

<div id="main-app" style="display: flex; flex-direction: column; min-height: 100vh;">
  <div class="header">
    <div>
      <div class="header-logo">🧺 Fresh & Tidy</div>
      <div class="header-sub">STUDENT SERVICES • MUKONO</div>
    </div>
    <div class="header-right">UCU Campus</div>
  </div>
  <div class="progress-track">
    <div class="progress-bar" id="progress-bar" style="width: 0%"></div>
  </div>
  <div class="step-labels">
    <div class="step-label active" id="lbl-0">1. Who</div>
    <div class="step-label" id="lbl-1">2. Service</div>
    <div class="step-label" id="lbl-2">3. Details</div>
    <div class="step-label" id="lbl-3">4. Review</div>
  </div>

  <div class="content">
    <div id="step-0">
      <h2>Who are you booking for?</h2>
      <p class="subtitle">We serve students, hospital staff, and day care centers across Mukono.</p>
      <div class="card" id="seg-student" onclick="selectSegment('student')">
        <div class="card-emoji">🎓</div>
        <div><div class="card-title">UCU Student</div><div class="card-desc">Hostel rooms & personal laundry</div></div>
      </div>
      <div class="card" id="seg-hospital" onclick="selectSegment('hospital')">
        <div class="card-emoji">🏥</div>
        <div><div class="card-title">Mukono Hospital</div><div class="card-desc">Uniforms & linen cleaning</div></div>
      </div>
      <div class="card" id="seg-daycare" onclick="selectSegment('daycare')">
        <div class="card-emoji">🌸</div>
        <div><div class="card-title">Day Care Center</div><div class="card-desc">Children's clothes cleaning</div></div>
      </div>
      <button class="btn-full" id="btn-seg-next" disabled onclick="goTo(1)">Continue →</button>
    </div>

    <div id="step-1" class="hidden">
      <h2>Choose a service</h2>
      <div id="service-cards"></div>
      <div class="btn-row">
        <button class="btn-outline" onclick="goTo(0)">← Back</button>
        <button class="btn-primary" id="btn-svc-next" disabled onclick="goTo(2)">Continue →</button>
      </div>
    </div>

    <div id="step-2" class="hidden">
      <h2>Schedule & Details</h2>
      <div class="field"><label>Your Name</label><input type="text" id="f-name" placeholder="Name" oninput="checkForm()"></div>
      <div class="field"><label>Phone Number</label><input type="tel" id="f-contact" placeholder="07..." oninput="checkForm()"></div>
      <div class="field"><label>Location</label><input type="text" id="f-location" placeholder="Hostel/Address" oninput="checkForm()"></div>
      <div class="field"><label>Date</label><input type="date" id="f-date" oninput="checkForm()"></div>
      <div class="field"><label>Time</label><input type="time" id="f-time" oninput="checkForm()"></div>
      <div class="field">
        <label>Payment Method</label>
        <div class="payment-row">
          <button class="pay-chip" id="pay-mtn" onclick="selectPayment('mtn','MTN MM')">📱 MTN</button>
          <button class="pay-chip" id="pay-airtel" onclick="selectPayment('airtel','Airtel')">📲 Airtel</button>
          <button class="pay-chip" id="pay-cash" onclick="selectPayment('cash','Cash')">💵 Cash</button>
        </div>
      </div>
      <div class="btn-row">
        <button class="btn-outline" onclick="goTo(1)">← Back</button>
        <button class="btn-primary" id="btn-form-next" disabled onclick="goTo(3)">Review →</button>
      </div>
    </div>

    <div id="step-3" class="hidden">
      <h2>Review Booking</h2>
      <div class="confirm-card">
        <div class="confirm-header"><div id="c-svc-name" style="color:#fff; font-weight:bold;"></div></div>
        <div class="confirm-body" id="confirm-body"></div>
      </div>
      <div class="btn-row">
        <button class="btn-outline" onclick="goTo(2)">← Edit</button>
        <button class="btn-primary" onclick="submitBooking()">✅ Confirm</button>
      </div>
    </div>
  </div>

  <div class="footer">
    Fresh & Tidy Student Services • Uganda Christian University, Mukono<br>
    <span class="footer-green">📱 Book via WhatsApp • MTN & Airtel Money accepted</span>
  </div>
</div>

<script>
  const services = {
    student: [
      { id:"room", name:"Room Cleaning", desc:"Sweep, mop, dust", price:"UGX 5,000 – 8,000", icon:"🧹" },
      { id:"laundry", name:"Laundry Service", desc:"Wash & return", price:"UGX 3,000 – 5,000", icon:"👕" },
      { id:"combo", name:"Combined Package", desc:"Room + laundry", price:"UGX 10,000 – 15,000", icon:"✨" },
    ],
    hospital: [
      { id:"uniform", name:"Uniform Laundry", desc:"Scrubs, lab coats", price:"UGX 5,000 – 8,000", icon:"🥼" },
      { id:"linen", name:"Bulk Linen", desc:"Bedsheets", price:"UGX 15,000 – 30,000", icon:"🛏️" },
    ],
    daycare: [
      { id:"kids", name:"Kids Laundry", desc:"Wash & label", price:"UGX 8,000 – 15,000", icon:"👶" },
      { id:"bedding", name:"Weekly Bedding", desc:"Nap mats", price:"UGX 20,000 – 40,000", icon:"🌙" },
    ]
  };
  const segmentLabels = { student:"UCU Student", hospital:"Mukono Hospital", daycare:"Day Care" };
  let state = { step:0, segment:null, service:null, payment:null, paymentLabel:null };

  function goTo(n) {
    document.getElementById('step-'+state.step).classList.add('hidden');
    document.getElementById('step-'+n).classList.remove('hidden');
    state.step = n;
    updateProgress();
    if (n===1) renderServices();
    if (n===3) renderConfirm();
  }

  function updateProgress() {
    document.getElementById('progress-bar').style.width = (state.step/3*100)+'%';
    for(let i=0;i<4;i++) document.getElementById('lbl-'+i).classList.toggle('active',i===state.step);
  }

  function selectSegment(seg) {
    state.segment = seg; state.service = null;
    ['student','hospital','daycare'].forEach(s => document.getElementById('seg-'+s).classList.toggle('selected',s===seg));
    document.getElementById('btn-seg-next').disabled = false;
  }

  function renderServices() {
    const list = services[state.segment];
    document.getElementById('service-cards').innerHTML = list.map(s=>\`
      <div class="svc-card\${state.service?.id===s.id?' selected':''}" id="svc-\${s.id}" onclick="selectService('\${s.id}')">
        <div class="svc-left"><span class="svc-icon">\${s.icon}</span><div><div class="svc-name">\${s.name}</div><div class="svc-desc">\${s.desc}</div></div></div>
        <div class="price-badge">\${s.price}</div>
      </div>\`).join('');
    document.getElementById('btn-svc-next').disabled = !state.service;
  }

  function selectService(id) {
    state.service = services[state.segment].find(s=>s.id===id);
    document.querySelectorAll('.svc-card').forEach(el=>el.classList.remove('selected'));
    document.getElementById('svc-'+id).classList.add('selected');
    document.getElementById('btn-svc-next').disabled = false;
  }

  function selectPayment(id,label) {
    state.payment=id; state.paymentLabel=label;
    ['mtn','airtel','cash'].forEach(p=>document.getElementById('pay-'+p).classList.toggle('selected',p===id));
    checkForm();
  }

  function checkForm() {
    const ok = document.getElementById('f-name').value.trim() &&
               document.getElementById('f-contact').value.trim() &&
               document.getElementById('f-location').value.trim() &&
               document.getElementById('f-date').value &&
               document.getElementById('f-time').value &&
               state.payment;
    document.getElementById('btn-form-next').disabled = !ok;
  }

  function renderConfirm() {
    const svc = state.service;
    document.getElementById('c-svc-name').textContent = svc.icon+' '+svc.name;
    const rows = [
      {label:'Name',value:document.getElementById('f-name').value},
      {label:'Location',value:document.getElementById('f-location').value},
      {label:'Date',value:document.getElementById('f-date').value},
      {label:'Payment',value:state.paymentLabel},
    ];
    document.getElementById('confirm-body').innerHTML = rows.map(r=>\`
      <div class="confirm-row"><span class="confirm-row-label">\${r.label}</span><span class="confirm-row-value">\${r.value}</span></div>\`).join('');
  }

  function submitBooking() {
    document.getElementById('s-name').textContent = document.getElementById('f-name').value;
    document.getElementById('main-app').classList.add('hidden');
    document.getElementById('success-screen').classList.remove('hidden');
  }

  function resetApp() {
    location.reload();
  }
</script>
</body>
</html>
  `;

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <WebView 
        originWhitelist={['*']}
        source={{ html: freshAndTidyHTML }} 
        style={styles.webview}
        bounces={false}
        overScrollMode="never"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D6A4F',
  },
  webview: {
    flex: 1,
  },
});