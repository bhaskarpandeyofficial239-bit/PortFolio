const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

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

// Replace this with the preferred public contact address before publishing.
const contactEmail = '';
if (contactEmail) {
  document.querySelector('[data-email-link]').href = `mailto:${contactEmail}`;
  document.querySelector('[data-email-label]').textContent = contactEmail;
  document.querySelector('[data-email-hint]').hidden = true;
}

const projectDetails = {
  vidya: {
    title: 'Vidya Setu',
    kicker: 'LEARNING TECHNOLOGY · PROJECT THEME',
    description: 'A gamified learning platform concept centered on making learning more engaging and accessible. The brief identifies this as a project to showcase; implementation specifics and links still need to be added.',
    tags: ['Gamified learning', 'Education technology', 'Product concept']
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
