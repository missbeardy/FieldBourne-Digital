(function () {
  const dataEvents = [
    { icon: '📧', cls: 'email', label: 'New enquiry via email', detail: 'Antenna install requested, Parramatta', badge: 'badge-ingested', badgeText: 'New lead', time: 'Just now' },
    { icon: '💬', cls: 'sms', label: 'SMS enquiry received', detail: '"No signal since yesterday, need help ASAP"', badge: 'badge-auto', badgeText: 'Lead created', time: '2 min ago' },
    { icon: '📊', cls: 'sheet', label: 'Job status updated', detail: 'Job #1041 marked In Progress', badge: 'badge-ingested', badgeText: 'Updated', time: '6 min ago' },
    { icon: '📅', cls: 'cal', label: 'Job booked automatically', detail: 'Job #1042 scheduled, tomorrow 9am', badge: 'badge-auto', badgeText: 'Auto-assigned', time: '12 min ago' },
    { icon: '📞', cls: 'data', label: 'Missed call captured', detail: 'John from Penrith, callback queued', badge: 'badge-ingested', badgeText: 'New lead', time: '21 min ago' },
    { icon: '✉️', cls: 'email', label: 'Auto-reply sent', detail: 'Quote request acknowledged instantly', badge: 'badge-auto', badgeText: 'Auto-reply', time: '34 min ago' },
  ];

  function initTicker() {
    const list = document.getElementById('eventList');
    if (!list) return;

    let idx = 0;

    function renderEvents(items) {
      list.innerHTML = '';
      items.forEach(function (ev) {
        const el = document.createElement('div');
        el.className = 'event-item';
        el.innerHTML =
          '<div class="event-icon ' + ev.cls + '">' + ev.icon + '</div>' +
          '<div class="event-body"><div class="event-label">' + ev.label + '</div>' +
          '<div class="event-detail">' + ev.detail + '</div>' +
          '<div class="event-time">' + ev.time + '</div></div>' +
          '<span class="event-badge ' + ev.badge + '">' + ev.badgeText + '</span>';
        list.appendChild(el);
      });
    }

    function tick() {
      const start = idx % dataEvents.length;
      renderEvents([
        dataEvents[start % dataEvents.length],
        dataEvents[(start + 1) % dataEvents.length],
        dataEvents[(start + 2) % dataEvents.length],
        dataEvents[(start + 3) % dataEvents.length],
      ]);
      idx++;
    }

    tick();
    setInterval(tick, 3400);
  }

  function showFormSuccess(btn) {
    btn.textContent = '✓ Sent. Darren will be in touch within one business day';
    btn.style.background = '#2DC97E';
    btn.disabled = true;
  }

  function showFormError(btn, originalText) {
    btn.textContent = 'Something went wrong. Please email us directly';
    btn.disabled = false;
    setTimeout(function () {
      btn.textContent = originalText;
    }, 4000);
  }

  function buildMailtoUrl(data) {
    const config = window.SITE_CONFIG || {};
    const email = config.contactEmail || 'hello@fieldbournedigital.com.au';
    const subject = encodeURIComponent('FieldBourne consultation request from ' + (data.name || 'website'));
    const body = encodeURIComponent(
      'Name: ' + data.name + '\n' +
      'Email: ' + data.email + '\n' +
      'Phone: ' + data.phone + '\n' +
      'Business type: ' + data.businessType + '\n\n' +
      'Message:\n' + data.message
    );
    return 'mailto:' + email + '?subject=' + subject + '&body=' + body;
  }

  async function handleConsult(e) {
    e.preventDefault();

    const form = e.target.closest('form');
    if (!form) return;

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    const config = window.SITE_CONFIG || {};

    const data = {
      name: form.consultName.value.trim(),
      email: form.consultEmail.value.trim(),
      phone: form.consultPhone.value.trim(),
      businessType: form.consultType.value,
      message: form.consultMsg.value.trim(),
    };

    if (!data.name || !data.email) {
      alert('Please enter your name and email address.');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';

    const endpoint = config.formEndpoint || '';
    const useFormspree = endpoint && !endpoint.includes('YOUR_FORM_ID');

    if (!useFormspree) {
      window.location.href = buildMailtoUrl(data);
      showFormSuccess(btn);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('business_type', data.businessType);
      formData.append('message', data.message);
      formData.append('_subject', 'New FieldBourne consultation request');

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        showFormSuccess(btn);
      } else {
        showFormError(btn, originalText);
      }
    } catch (err) {
      window.location.href = buildMailtoUrl(data);
      showFormSuccess(btn);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTicker();

    const form = document.getElementById('consultForm');
    if (form) {
      form.addEventListener('submit', handleConsult);
    }
  });
})();
