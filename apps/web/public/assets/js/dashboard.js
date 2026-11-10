// Dummy dashboard: renders sample data. No backend calls.

let session = null;
try {
  session = JSON.parse(sessionStorage.getItem('emrSession'));
} catch (e) {
  session = null;
}

// Not "signed in" in this tab: send back to the login page.
if (!session) {
  window.location.replace('index.html');
}

const { email = 'staff@hospital.org', hospitalCode = 'DEMO-001' } = session || {};

document.getElementById('userEmail').textContent = email;
document.getElementById('avatar').textContent = email.charAt(0) || 'S';
document.getElementById('hospitalCode').textContent = hospitalCode;
document.getElementById('hospitalName').textContent = `${hospitalCode} General Hospital`;

const now = new Date();
const hour = now.getHours();
const name = email.split('@')[0];
const timeOfDay = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
document.getElementById('greeting').textContent = `${timeOfDay}, ${name}`;
document.getElementById('today').textContent = now.toLocaleDateString(undefined, {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  try { sessionStorage.removeItem('emrSession'); } catch (e) { /* ignore */ }
  window.location.href = 'index.html';
});

// ---------- Sample data ----------

const appointments = [
  { time: '08:30', patient: 'Amara Okafor', mrn: 'MRN-10234', dept: 'General Medicine', status: ['Completed', 'green'] },
  { time: '09:15', patient: 'David Mensah', mrn: 'MRN-10871', dept: 'Cardiology', status: ['Completed', 'green'] },
  { time: '10:00', patient: 'Grace Adeyemi', mrn: 'MRN-11102', dept: 'Pediatrics', status: ['In progress', 'blue'] },
  { time: '10:45', patient: 'Tunde Bello', mrn: 'MRN-09876', dept: 'Orthopedics', status: ['Checked in', 'amber'] },
  { time: '11:30', patient: 'Fatima Yusuf', mrn: 'MRN-11345', dept: 'Obstetrics', status: ['Scheduled', 'blue'] },
  { time: '13:00', patient: 'Chinedu Eze', mrn: 'MRN-10559', dept: 'General Medicine', status: ['Scheduled', 'blue'] },
  { time: '14:15', patient: 'Ngozi Nwosu', mrn: 'MRN-11420', dept: 'Dermatology', status: ['Cancelled', 'red'] },
];

const labs = [
  { patient: 'David Mensah', test: 'Troponin I', result: '0.08 ng/mL', flag: ['High', 'red'], reported: '09:52' },
  { patient: 'Amara Okafor', test: 'Full blood count', result: 'Hb 11.2 g/dL', flag: ['Low', 'amber'], reported: '09:10' },
  { patient: 'Grace Adeyemi', test: 'Malaria RDT', result: 'Negative', flag: ['Normal', 'green'], reported: '08:47' },
  { patient: 'Tunde Bello', test: 'Fasting glucose', result: '5.1 mmol/L', flag: ['Normal', 'green'], reported: '08:20' },
  { patient: 'Fatima Yusuf', test: 'Urinalysis', result: 'Protein +', flag: ['Abnormal', 'amber'], reported: '07:58' },
];

const alerts = [
  { text: 'Critical result: Troponin I', sub: 'David Mensah · MRN-10871', pill: ['Urgent', 'red'] },
  { text: 'Allergy: Penicillin', sub: 'Grace Adeyemi · MRN-11102', pill: ['Allergy', 'amber'] },
  { text: '3 prescriptions awaiting sign-off', sub: 'Pharmacy', pill: ['Review', 'blue'] },
];

const wards = [
  { name: 'General Ward A', occupied: 28, total: 30 },
  { name: 'Maternity', occupied: 18, total: 24 },
  { name: 'Pediatrics', occupied: 15, total: 20 },
  { name: 'ICU', occupied: 9, total: 10 },
  { name: 'Surgical', occupied: 22, total: 26 },
];

// ---------- Render ----------

const pill = ([label, color]) => `<span class="pill ${color}">${label}</span>`;

document.getElementById('appointmentsBody').innerHTML = appointments.map((a) => `
  <tr>
    <td>${a.time}</td>
    <td><strong>${a.patient}</strong></td>
    <td>${a.mrn}</td>
    <td>${a.dept}</td>
    <td>${pill(a.status)}</td>
  </tr>`).join('');

document.getElementById('labsBody').innerHTML = labs.map((l) => `
  <tr>
    <td><strong>${l.patient}</strong></td>
    <td>${l.test}</td>
    <td>${l.result}</td>
    <td>${pill(l.flag)}</td>
    <td>${l.reported}</td>
  </tr>`).join('');

document.getElementById('alertsList').innerHTML = alerts.map((a) => `
  <li>
    <div>${a.text}<div class="sub">${a.sub}</div></div>
    ${pill(a.pill)}
  </li>`).join('');

document.getElementById('wardsList').innerHTML = wards.map((w) => {
  const pct = Math.round((w.occupied / w.total) * 100);
  const color = pct >= 90 ? 'red' : pct >= 75 ? 'amber' : 'green';
  return `
  <li>
    <div>${w.name}<div class="sub">${w.occupied} of ${w.total} beds</div></div>
    ${pill([`${pct}%`, color])}
  </li>`;
}).join('');
