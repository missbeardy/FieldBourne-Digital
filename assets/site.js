(function () {
  const BUSINESS_TYPES = [
    'TV / antenna service',
    'Electrical',
    'Plumbing',
    'Solar & renewables',
    'HVAC',
    'Franchise head office',
    'Other field service',
  ];

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
    const email = config.contactEmail || 'admin@fieldbournedigital.com.au';
    const intent = data.intent || 'consult';
    const intentLabel = intent === 'waitlist' ? 'Self-serve waitlist' : 'Free chat request';
    const subject = encodeURIComponent('FieldBourne ' + intentLabel + ' from ' + (data.name || 'website'));
    const body = encodeURIComponent(
      'Intent: ' + intentLabel + '\n' +
      'Name: ' + data.name + '\n' +
      'Phone: ' + data.phone + '\n' +
      'Email: ' + (data.email || '(not provided)') + '\n' +
      'Business type: ' + (data.businessType || '(not selected)') + '\n\n' +
      'Message:\n' + (data.message || '(none)')
    );
    return 'mailto:' + email + '?subject=' + subject + '&body=' + body;
  }

  function setBusinessType(value) {
    const hidden = document.getElementById('consultType');
    if (hidden) hidden.value = value || '';

    document.querySelectorAll('.type-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-value') === value);
    });
  }

  function initBusinessTypeButtons() {
    const wrap = document.getElementById('businessTypeButtons');
    if (!wrap) return;

    wrap.innerHTML = '';
    BUSINESS_TYPES.forEach(function (type) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'type-btn';
      btn.setAttribute('data-value', type);
      btn.textContent = type;
      btn.addEventListener('click', function () {
        setBusinessType(type);
      });
      wrap.appendChild(btn);
    });
  }

  function setFormIntent(intent) {
    const form = document.getElementById('consultForm');
    if (!form) return;

    const intentInput = form.querySelector('[name="formIntent"]');
    if (intentInput) intentInput.value = intent;

    const heading = document.getElementById('contactFormHeading');
    const note = document.getElementById('contactFormNote');
    const submit = form.querySelector('button[type="submit"]');

    if (intent === 'waitlist') {
      if (heading) heading.textContent = 'Join the self-serve waitlist';
      if (note) note.textContent = 'Name and phone are all we need. Darren will email you when solo self-serve launches.';
      if (submit) submit.textContent = 'Notify me →';
    } else {
      if (heading) heading.textContent = 'Book a free chat';
      if (note) note.textContent = 'Name and phone required. Darren will email you within one business day to arrange a chat.';
      if (submit) submit.textContent = 'Send message →';
    }
  }

  function initFormDefaults() {
    const params = new URLSearchParams(window.location.search);
    const path = params.get('path');

    if (path === 'solo' || path === 'waitlist') {
      setFormIntent('waitlist');
    } else if (path === 'team' || path === 'consult') {
      setFormIntent('consult');
    }

    const referrer = document.referrer || '';
    if (referrer.includes('tvmagic.html')) {
      setBusinessType('TV / antenna service');
    }
  }

  function initClientVideo() {
    const config = window.SITE_CONFIG || {};
    const iframe = document.getElementById('clientVideoFrame');
    const nameEl = document.getElementById('clientVideoName');
    if (!iframe || !config.clientVideoYoutubeId) return;

    iframe.src = 'https://www.youtube-nocookie.com/embed/' + config.clientVideoYoutubeId + '?rel=0';
    if (nameEl && config.clientVideoFirstName) {
      nameEl.textContent = config.clientVideoFirstName;
    }
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
      businessType: form.consultType.value.trim(),
      message: form.consultMsg.value.trim(),
      intent: form.formIntent.value || 'consult',
    };

    if (!data.name || !data.phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';

    const endpoint = config.formEndpoint || '';
    const useFormspree = endpoint && !endpoint.includes('YOUR_FORM_ID');
    const subject =
      data.intent === 'waitlist'
        ? 'New FieldBourne self-serve waitlist signup'
        : 'New FieldBourne free chat request';

    if (!useFormspree) {
      window.location.href = buildMailtoUrl(data);
      showFormSuccess(btn);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email || 'not provided');
      formData.append('phone', data.phone);
      formData.append('business_type', data.businessType);
      formData.append('message', data.message);
      formData.append('intent', data.intent);
      formData.append('_subject', subject);

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        setBusinessType('');
        setFormIntent(data.intent);
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
    initBusinessTypeButtons();
    initFormDefaults();
    initClientVideo();

    const form = document.getElementById('consultForm');
    if (form) {
      form.addEventListener('submit', handleConsult);
    }
  });
})();
