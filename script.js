/* Contact destinations are configured here; WhatsApp uses country code + number, digits only. */
const SITE_CONFIG = {
  email: 'jnyadwera@yahoo.com',
  whatsapp: '254758946742'
};

document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const setMenuState = open => {
  navLinks?.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('menu-open', open);
};
menuToggle?.addEventListener('click', () => {
  setMenuState(!navLinks.classList.contains('open'));
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  setMenuState(false);
}));

document.addEventListener('click', event => {
  if (!navLinks?.classList.contains('open')) return;
  if (!navLinks.contains(event.target) && !menuToggle?.contains(event.target)) {
    setMenuState(false);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 700) setMenuState(false);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navLinks?.classList.contains('open')) {
    setMenuState(false);
    menuToggle?.focus();
  }
});

const revealItems = document.querySelectorAll(
  '.section-intro, .about-content, .service-card, .work-card, .process-grid article, .support-card, .contact-copy, .contact-form'
);

revealItems.forEach(item => item.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

const sections = document.querySelectorAll('main section[id]');
const navigationLinks = document.querySelectorAll('.nav-links a[href^="#"]');

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-35% 0px -55%', threshold: 0 });

  sections.forEach(section => sectionObserver.observe(section));
}

const showcase = document.querySelector('.project-showcase');
if (showcase) {
  const slides = [...showcase.querySelectorAll('.showcase-slide')];
  const dots = [...showcase.querySelectorAll('.showcase-dots button')];
  const pauseButton = showcase.querySelector('.showcase-pause');
  const slideCount = document.getElementById('showcaseCount');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = 0;
  let manuallyPaused = motionPreference.matches;
  let interactionPaused = false;

  const showSlide = index => {
    activeIndex = (index + slides.length) % slides.length;
    slideCount.textContent = `${String(activeIndex + 1).padStart(2, '0')} — ${String(slides.length).padStart(2, '0')}`;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === activeIndex;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
      dots[slideIndex].classList.toggle('active', active);
      if (active) {
        dots[slideIndex].setAttribute('aria-current', 'true');
      } else {
        dots[slideIndex].removeAttribute('aria-current');
      }
    });
  };

  const updatePauseButton = () => {
    const paused = manuallyPaused || motionPreference.matches;
    pauseButton.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    pauseButton.textContent = paused ? '▶' : 'Ⅱ';
  };

  showcase.querySelector('.showcase-prev').addEventListener('click', () => showSlide(activeIndex - 1));
  showcase.querySelector('.showcase-next').addEventListener('click', () => showSlide(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
  pauseButton.addEventListener('click', () => {
    manuallyPaused = !manuallyPaused;
    updatePauseButton();
  });

  showcase.addEventListener('pointerenter', () => { interactionPaused = true; });
  showcase.addEventListener('pointerleave', () => { interactionPaused = false; });
  showcase.addEventListener('focusin', () => { interactionPaused = true; });
  showcase.addEventListener('focusout', event => {
    if (!showcase.contains(event.relatedTarget)) interactionPaused = false;
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !manuallyPaused && !motionPreference.matches && !interactionPaused) {
      showSlide(activeIndex);
    }
  });
  motionPreference.addEventListener?.('change', event => {
    manuallyPaused = event.matches;
    updatePauseButton();
  });

  updatePauseButton();
  window.setInterval(() => {
    if (!manuallyPaused && !motionPreference.matches && !interactionPaused && !document.hidden) {
      showSlide(activeIndex + 1);
    }
  }, 5500);
}

document.getElementById('year').textContent = new Date().getFullYear();

const contactForm = document.getElementById('contactForm');
const formHint = document.getElementById('formHint');
const serviceSelect = contactForm?.querySelector('[name="service"]');
const getEnquiry = () => {
  const data = new FormData(contactForm);
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  const service = String(data.get('service') || '').trim();
  const message = String(data.get('message') || '').trim();
  const body = `Hello Ralph Digital Solutions,\n\nMy name is ${name}.\nEmail: ${email}\nService: ${service}\n\n${message}\n\nSent via the Ralph Digital Solutions website.`;
  return { service, body };
};

document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const service = link.dataset.service;
    if (serviceSelect && [...serviceSelect.options].some(option => option.value === service)) {
      serviceSelect.value = service;
    }
  });
});
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  const { service, body } = getEnquiry();

  if (SITE_CONFIG.email === 'YOUR_EMAIL@example.com') {
    formHint.textContent = 'The form is ready. Before publishing, open script.js and replace YOUR_EMAIL@example.com with your business email address.';
    formHint.style.color = '#a65b20';
    return;
  }
  const subject = encodeURIComponent(`Website enquiry: ${service}`);
  window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
  formHint.textContent = 'Your email app should open with the enquiry prepared. Please review and send it from your email app.';
});

document.getElementById('whatsappSubmit')?.addEventListener('click', () => {
  if (!contactForm.reportValidity()) return;
  if (!/^\d{8,15}$/.test(SITE_CONFIG.whatsapp)) {
    formHint.textContent = 'WhatsApp is not configured yet. Please email us directly instead.';
    return;
  }

  const { body } = getEnquiry();
  const url = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(body)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  formHint.textContent = 'WhatsApp should open in a new tab with your enquiry ready. Please review and send it there.';
});

const assistantLauncher = document.getElementById('assistantLauncher');
const assistantPanel = document.getElementById('assistantPanel');
const assistantForm = document.getElementById('assistantForm');
const assistantInput = document.getElementById('assistantInput');
const assistantMessages = document.getElementById('assistantMessages');

const setAssistantOpen = open => {
  assistantPanel.hidden = !open;
  assistantLauncher.setAttribute('aria-expanded', String(open));
  if (open) assistantInput.focus();
};

const serviceTopics = [
  { terms: ['it support', 'computer support', 'network', 'wi-fi', 'wifi', 'router'], service: 'IT Support & Networking' },
  { terms: ['website', 'web site', 'web development', 'web design'], service: 'Web Development' },
  { terms: ['training', 'learn', 'digital skills'], service: 'ICT Training' },
  { terms: ['repair', 'maintenance', 'slow computer', 'computer is slow', 'slow laptop', 'laptop', 'device'], service: 'Computer Repair & Maintenance' },
  { terms: ['software installation', 'install software', 'operating system'], service: 'Software Installation' },
  { terms: ['database', 'records', 'data system'], service: 'Database Systems' },
  { terms: ['backup', 'data recovery', 'recover files'], service: 'Backup & Data Recovery' },
  { terms: ['security', 'cyber', 'protect account'], service: 'Cybersecurity Basics' },
  { terms: ['business email', 'cloud', 'file sharing'], service: 'Business Email & Cloud Setup' },
  { terms: ['hosting', 'domain', 'website care'], service: 'Domains, Hosting & Website Care' },
  { terms: ['online store', 'e-commerce', 'shop', 'store'], service: 'Online Store Setup' },
  { terms: ['branding', 'graphic design', 'logo'], service: 'Graphic Design & Branding' },
  { terms: ['seo', 'search ranking', 'google listing'], service: 'SEO & Local Search Setup' },
  { terms: ['automation', 'custom software'], service: 'Custom Software & Automation' },
  { terms: ['printer', 'scanner', 'peripheral'], service: 'Printer & Peripheral Setup' }
];

const getAssistantAnswer = question => {
  const text = question.toLowerCase();
  const serviceMatch = serviceTopics.find(topic => topic.terms.some(term => text.includes(term)));

  if (/\b(price|pricing|cost|quote|fee|charges|how much)\b/.test(text)) {
    return {
      text: 'Pricing depends on the work and scope. Tell us what you need and the team can discuss a suitable estimate before work begins.',
      actions: [{ label: 'Request an estimate', href: '#contact', service: serviceMatch?.service }]
    };
  }
  if (/\b(location|located|where are you|address|nairobi|map)\b/.test(text)) {
    return {
      text: 'Ralph Digital Solutions is based in Nairobi, Kenya. The map shows the general service area, not an exact office address.',
      actions: [{ label: 'View Nairobi map', href: '#contact' }]
    };
  }
  if (/\b(support|sponsor|donat|welfare|volunteer|partner)\b/.test(text)) {
    return {
      text: 'You can support the team by sharing our work, partnering on community projects, contributing useful resources, or discussing transparent sponsorship.',
      actions: [{ label: 'Ways to support us', href: '#support' }]
    };
  }
  if (/\b(process|how do you work|how it works|steps)\b/.test(text)) {
    return {
      text: 'We listen to your needs, assess the scope, agree on a practical solution, then deliver and discuss any next steps.',
      actions: [{ label: 'See how we work', href: '#process' }]
    };
  }
  if (/\b(service|services|what do you do|what can you help)\b/.test(text)) {
    return {
      text: 'We help with IT support, websites, training, device care, networking, data, security basics, online stores, business tools, design, SEO, and automation.',
      actions: [{ label: 'Explore all services', href: '#services' }]
    };
  }
  if (/\b(contact|email|whatsapp|human|team|talk)\b/.test(text)) {
    return {
      text: 'You can send an enquiry by email or WhatsApp. The contact form prepares a message for you to review and send.',
      actions: [
        { label: 'Go to contact form', href: '#contact', service: serviceMatch?.service },
        { label: 'Email the team', href: `mailto:${SITE_CONFIG.email}` },
        { label: 'WhatsApp the team', href: `https://wa.me/${SITE_CONFIG.whatsapp}`, external: true }
      ]
    };
  }
  if (serviceMatch) {
    return {
      text: `${serviceMatch.service} is one of our services. Share what you need and we can discuss a practical scope.`,
      actions: [{ label: `Ask about ${serviceMatch.service}`, href: '#contact', service: serviceMatch.service }]
    };
  }
  return {
    text: 'I can answer common questions about services, pricing, the Nairobi service area, our process, or ways to support the team. For anything else, send us an enquiry.',
    actions: [{ label: 'Contact the team', href: '#contact' }]
  };
};

const appendAssistantMessage = (text, sender, actions = []) => {
  const message = document.createElement('div');
  message.className = `assistant-message ${sender}`;
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  message.appendChild(paragraph);

  if (actions.length) {
    const actionList = document.createElement('div');
    actionList.className = 'assistant-actions';
    actions.forEach(action => {
      const link = document.createElement('a');
      link.href = action.href;
      link.textContent = action.label;
      if (action.service) link.dataset.service = action.service;
      if (action.external) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      actionList.appendChild(link);
    });
    message.appendChild(actionList);
  }

  assistantMessages.appendChild(message);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
};

const sendAssistantMessage = question => {
  appendAssistantMessage(question, 'assistant-user');
  const answer = getAssistantAnswer(question);
  appendAssistantMessage(answer.text, 'assistant-reply', answer.actions);
};

assistantLauncher.addEventListener('click', () => setAssistantOpen(true));
assistantPanel.querySelector('.assistant-close').addEventListener('click', () => {
  setAssistantOpen(false);
  assistantLauncher.focus();
});
assistantPanel.querySelectorAll('[data-question]').forEach(button => {
  button.addEventListener('click', () => sendAssistantMessage(button.dataset.question));
});
assistantForm.addEventListener('submit', event => {
  event.preventDefault();
  const question = assistantInput.value.trim();
  if (!question) return;
  sendAssistantMessage(question);
  assistantInput.value = '';
  assistantInput.focus();
});
assistantMessages.addEventListener('click', event => {
  const link = event.target.closest('a[data-service]');
  if (link && serviceSelect) serviceSelect.value = link.dataset.service;
  if (event.target.closest('a[href^="#"]')) setAssistantOpen(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !assistantPanel.hidden) {
    setAssistantOpen(false);
    assistantLauncher.focus();
  }
});

const installButton = document.querySelector('#installAppButton');
const installStatus = document.querySelector('#installAppStatus');
const installPopup = document.querySelector('#installPopup');
const installPopupClose = document.querySelector('#installPopupClose');
let installPrompt = null;
let installPopupTimer = null;
const isInstalled = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const isAppleMobile = () => /iPhone|iPad|iPod/.test(navigator.userAgent)
  || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

const hideInstallPopup = () => {
  if (!installPopup) return;
  window.clearTimeout(installPopupTimer);
  installPopup.classList.remove('is-visible');
  installPopup.hidden = true;
};

if (installButton && installStatus && installPopup && installPopupClose) {
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
    installStatus.textContent = 'Your browser can install this app. Tap Install app to continue.';
  });

  installPopupClose.addEventListener('click', hideInstallPopup);

  installButton.addEventListener('click', async () => {
    if (isInstalled()) {
      installStatus.textContent = 'Ralph Digital Solutions is already installed.';
      installPopupTimer = window.setTimeout(hideInstallPopup, 4000);
      return;
    }

    if (!installPrompt) {
      installStatus.textContent = isAppleMobile()
        ? 'In Safari, tap Share, then Add to Home Screen.'
        : 'Open your browser menu and choose Install app or Add to Home Screen.';
      window.clearTimeout(installPopupTimer);
      installPopupTimer = window.setTimeout(hideInstallPopup, 8000);
      return;
    }

    const prompt = installPrompt;
    installPrompt = null;
    window.clearTimeout(installPopupTimer);
    try {
      await prompt.prompt();
      const { outcome } = await prompt.userChoice;
      installStatus.textContent = outcome === 'accepted'
        ? 'Ralph Digital Solutions was installed on your device.'
        : 'Installation was cancelled. You can try again from your browser menu.';
      installPopupTimer = window.setTimeout(hideInstallPopup, outcome === 'accepted' ? 2000 : 5000);
    } catch (error) {
      console.error('The browser install prompt could not be opened:', error);
      installStatus.textContent = 'Open your browser menu and choose Install app or Add to Home Screen.';
      installPopupTimer = window.setTimeout(hideInstallPopup, 8000);
    }
  });

  window.addEventListener('appinstalled', () => {
    hideInstallPopup();
  });

  if (!isInstalled()) {
    installPopup.hidden = false;
    requestAnimationFrame(() => installPopup.classList.add('is-visible'));
    installPopupTimer = window.setTimeout(hideInstallPopup, 8000);
  }
}

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(error => {
      console.error('Service worker registration failed:', error);
    });
  });
}
