// js/app.js
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const activeChildren = () => childrenByClass[state.setup.className] || [];
const timeNow = () => new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => t.classList.add('hidden'), 2500);
}

function showScreen(id) {
  ['loginScreen', 'setupScreen', 'appScreen'].forEach(s => $('#' + s).classList.toggle('hidden', s !== id));
}

function childCard(c, actions = '') {
  const st = state.statuses[c.id] || 'waiting';
  return `
    <article class="child">
      <div class="child-top">
        <img class="child-photo" src="${c.avatar}" alt="${esc(c.name)}">
        <div>
          <h3 style="margin:0 0 4px; font-size:16px;">${esc(c.name)}</h3>
          <small style="color:var(--muted);">${c.years} سنوات و ${c.months} شهر</small>
        </div>
      </div>
      <div class="allergy ${c.allergy === 'لا يوجد' ? 'no-allergy' : ''}">
        ${c.allergy === 'لا يوجد' ? '✓ لا توجد حساسية' : '⚠ حساسية: ' + esc(c.allergy)}
      </div>
      <div class="status-badge">
        الحالة: ${st === 'present' ? 'حاضر (' + (state.statusTimes[c.id] || '') + ')' : st === 'left' ? 'انصرف بأمان' : 'في الانتظار'}
      </div>
      ${actions}
    </article>
  `;
}

function render() {
  const list = activeChildren();
  const present = list.filter(c => (state.statuses[c.id] || 'waiting') === 'present').length;
  const left = list.filter(c => (state.statuses[c.id] || 'waiting') === 'left').length;

  $('#totalCount').textContent = list.length;
  $('#presentCount').textContent = present;
  $('#waitingCount').textContent = list.length - present - left;
  $('#leftCount').textContent = left;
  $('#classLabel').textContent = `فصل: ${state.setup.className} | تاريخ: ${state.setup.date}`;

  document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('active', b.dataset.tab === state.tab));

  const content = $('#tabContent');
  if (state.tab === 'children') {
    content.innerHTML = `<div class="children">${list.map(c => childCard(c)).join('')}</div>`;
  } else if (state.tab === 'attendance') {
    content.innerHTML = `
      <div class="children">
        ${list.map(c => childCard(c, `
          <button class="btn ${state.statuses[c.id] === 'present' ? 'secondary' : ''}" style="width:100%" data-action="toggle-attend" data-id="${c.id}">
            ${state.statuses[c.id] === 'present' ? '✓ مسجل حاضر' : 'تسجيل حضور'}
          </button>
        `)).join('')}
      </div>
    `;
  } else if (state.tab === 'activities') {
    content.innerHTML = `
      <div style="background:#fff; padding:16px; border-radius:18px; margin-bottom:16px;">
        <label style="font-weight:700;">تسجيل نشاط جماعي:</label>
        <select id="quickActivitySelect" style="padding:10px; border-radius:12px; margin-top:8px; width:100%;">
          ${activityOptions.map(a => `<option value="${a.id}">${a.emoji} ${a.label}</option>`).join('')}
        </select>
      </div>
      <div class="children">${list.map(c => childCard(c)).join('')}</div>
    `;
  } else if (state.tab === 'dismissal') {
    content.innerHTML = `
      <div class="children">
        ${list.filter(c => state.statuses[c.id] === 'present').map(c => childCard(c, `
          <div style="font-size:12px; margin-bottom:6px;">المستلم: <b>${esc(c.guardian)}</b></div>
          <button class="btn" style="width:100%" data-action="dismiss" data-id="${c.id}">تأكيد الاستلام</button>
        `)).join('') || '<p style="color:var(--muted)">لا يوجد أطفال حاضرون في الفصل حالياً.</p>'}
      </div>
    `;
  }
}

// معالجة الأحداث
$('#loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const u = $('#username').value.trim().toLowerCase();
  const p = $('#password').value;
  if (u === DEMO_USER && p === DEMO_PASS) {
    showScreen('setupScreen');
    $('#dayDate').value = new Date().toISOString().slice(0, 10);
  } else {
    $('#loginError').textContent = 'بيانات الدخول غير صحيحة';
  }
});

$('#setupForm').addEventListener('submit', e => {
  e.preventDefault();
  state.setup.className = $('#classSelect').value;
  state.setup.date = $('#dayDate').value;
  const saved = loadDayData();
  state.statuses = saved.statuses || {};
  state.statusTimes = saved.statusTimes || {};
  showScreen('appScreen');
  render();
});

document.addEventListener('click', e => {
  const tabBtn = e.target.closest('[data-tab]');
  if (tabBtn) {
    state.tab = tabBtn.dataset.tab;
    render();
    return;
  }

  const actBtn = e.target.closest('[data-action]');
  if (!actBtn) return;
  const id = actBtn.dataset.id;

  if (actBtn.dataset.action === 'toggle-attend') {
    state.statuses[id] = 'present';
    state.statusTimes[id] = timeNow();
    saveDayData();
    render();
    toast('تم تسجيل الحضور');
  } else if (actBtn.dataset.action === 'dismiss') {
    state.statuses[id] = 'left';
    saveDayData();
    render();
    toast('تم تأكيد الانصراف');
  }
});

$('#logoutBtn').addEventListener('click', () => showScreen('loginScreen'));
$('#takeSelfie').addEventListener('click', () => $('#selfieInput').click());
$('#selfieInput').addEventListener('change', e => {
  const f = e.target.files[0];
  if (f) {
    const r = new FileReader();
    r.onload = () => {
      $('#selfiePreview').src = r.result;
      $('#selfiePreview').classList.remove('hidden');
      $('#selfiePlaceholder').classList.add('hidden');
    };
    r.readAsDataURL(f);
  }
});