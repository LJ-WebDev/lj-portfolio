const container = document.querySelector('#projects-grid');
const template = document.querySelector('#project-card-template');

const sortedProjects = [...projects].sort(
  (a, b) => (b.priority ?? Infinity) - (a.priority ?? Infinity),
);

const fragment = document.createDocumentFragment();

sortedProjects.reverse().forEach((project) => {
  const clone = template.content.cloneNode(true);
  const typeEl = clone.querySelector('.project-type');
  const tagsContainer = clone.querySelector('.project-tags');
  const desktopImg = clone.querySelector('.project-screenshot-desktop');
  const mobileImg = clone.querySelector('.project-screenshot-mobile');
  const siteLinks = clone.querySelectorAll('.project-link');
  const codeLink = clone.querySelector('.project-code');
  const publicationDate = clone.querySelector('.project-date');
  const contentEl = clone.querySelector('.project-content');
  const projectCard = clone.querySelector('.project-card');

  clone.querySelector('.project-title').textContent = project.title;
  clone.querySelector('.project-description').textContent = project.description;

  typeEl.textContent = project.type;
  if (project.type === 'Client / Work') {
    typeEl.classList.add(
      'bg-blue-100',
      'text-blue-700',
      'dark:bg-blue-500/20',
      'dark:text-blue-300',
    );
  } else {
    typeEl.classList.add(
      'bg-green-100',
      'text-green-700',
      'dark:bg-green-500/20',
      'dark:text-green-300',
    );
  }

  project.tags.forEach((tag) => {
    const span = document.createElement('span');
    span.className = 'rounded border border-border px-2 py-1';
    span.textContent = tag;
    tagsContainer.appendChild(span);
  });

  if (project.desktopImage != '') {
    desktopImg.src = project.desktopImage;
    desktopImg.alt = project.imageAlt;

    mobileImg.src = project.mobileImage;
    mobileImg.alt = project.imageAlt + ' mobile view';
  } else {
    desktopImg.alt = 'Image Not Available';
    desktopImg.style.textAlign = 'center';
    desktopImg.style.padding = '25%';
    desktopImg.style.height = '100%';

    mobileImg.style.display = 'none';
  }

  siteLinks.forEach((link) => (link.href = project.siteLink));
  codeLink.href = project.codeLink;

  publicationDate.textContent = project.datePublished;

  projectCard.id = project.id;

  fragment.appendChild(clone);
});

container.appendChild(fragment);
