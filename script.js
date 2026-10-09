const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

// Add a brief press animation and a short haptic pulse where the browser supports it.
document.addEventListener('click', (event) => {
  const control = event.target.closest('a, button');
  if (!control) return;

  control.classList.remove('click-feedback');
  // Restart the animation when the same control is clicked again quickly.
  void control.offsetWidth;
  control.classList.add('click-feedback');
  control.addEventListener('animationend', () => control.classList.remove('click-feedback'), { once: true });

  if (typeof navigator.vibrate === 'function') navigator.vibrate(12);
});

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('open');
  });
});

// Set this to the inbox that should receive portfolio messages.
const contactEmail = 'bhaskarpandeyofficial239@gmail.com';
if (contactEmail) {
  document.querySelector('[data-email-link]').href = `mailto:${contactEmail}`;
  document.querySelector('[data-email-label]').textContent = contactEmail;
  document.querySelector('[data-email-hint]').hidden = true;
}

const contactForm = document.querySelector('[data-contact-form]');
contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = document.querySelector('[data-contact-status]');
  const submitButton = document.querySelector('[data-contact-submit]');
  const fields = new FormData(contactForm);

  if (fields.get('_honey')) return;
  if (!contactEmail) {
    status.textContent = 'This form is not connected yet. Please use the email link, or check back soon.';
    return;
  }

  submitButton.disabled = true;
  status.textContent = 'Sending your message…';
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        email: fields.get('email'),
        message: fields.get('message'),
        _subject: 'New portfolio message'
      })
    });
    const result = await response.json();
    if (!response.ok || result.success === false) throw new Error('Message could not be sent.');
    contactForm.reset();
    status.textContent = 'Thanks! Your message has been sent.';
  } catch (error) {
    status.textContent = 'Sorry, the message could not be sent. Please try the email link instead.';
  } finally {
    submitButton.disabled = false;
  }
});

const projectDetails = {
  vidya: {
    title: 'Vidya Setu',
    kicker: 'LEARNING TECHNOLOGY · PROJECT THEME',
    description: 'A gamified learning platform concept centered on making learning more engaging and accessible. The brief identifies this as a project to showcase; implementation specifics and links still need to be added.',
    tags: ['Gamified learning', 'Education technology', 'Product concept'],
    url: 'https://bhaskarpandeyofficial239-bit.github.io/VidyaSetu/'
  },
  krishi: {
    title: 'Krishi Setu',
    kicker: 'AGRICULTURE & COMMERCE · PROJECT THEME',
    description: 'A smart agriculture and farmer–buyer platform concept exploring direct connections between growers and buyers. Add verified features, architecture, and your contribution to turn this into a full case study.',
    tags: ['Agriculture', 'Farmer–buyer connection', 'Platform concept']
  },
  robot: {
    title: 'Gesture-controlled robot',
    kicker: 'ROBOTICS · PROJECT THEME',
    description: 'A robotics exploration connecting hand gesture recognition with a ROS-based skid-steer robot. The brief mentions ROS 2, OpenCV, and MediaPipe as part of the theme; hardware and implementation details can be added when confirmed.',
    tags: ['ROS 2', 'OpenCV', 'MediaPipe', 'Gesture recognition']
  }
};

const projectDialog = document.querySelector('.project-dialog');
document.querySelectorAll('[data-project]').forEach((card) => {
  card.querySelector('.project-open').addEventListener('click', () => {
    const details = projectDetails[card.dataset.project];
    projectDialog.querySelector('[data-dialog-kicker]').textContent = details.kicker;
    projectDialog.querySelector('#dialog-title').textContent = details.title;
    projectDialog.querySelector('.dialog-copy').textContent = details.description;
    const visitLink = projectDialog.querySelector('[data-visit-link]');
    visitLink.href = details.url || '#';
    visitLink.hidden = !details.url;
    const tags = projectDialog.querySelector('.dialog-details');
    tags.replaceChildren(...details.tags.map((tag) => {
      const chip = document.createElement('span');
      chip.textContent = tag;
      return chip;
    }));
    projectDialog.showModal();
  });
});

projectDialog.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', (event) => {
  if (event.target === projectDialog) projectDialog.close();
});
