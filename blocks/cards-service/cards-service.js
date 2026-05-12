import { createOptimizedPicture } from '../../scripts/aem.js';

const SERVICE_ICONS = {
  'Sanitas 24 horas': 'phone24h',
  'Gestiones online': 'app',
  'Centro Relaciones con Cliente': 'phone',
};

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-service-card-image';
      else div.className = 'cards-service-card-body';
    });

    const h3 = li.querySelector('h3');
    if (h3) {
      const iconName = SERVICE_ICONS[h3.textContent.trim()];
      if (iconName) {
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'cards-service-card-icon';
        iconWrapper.innerHTML = `<span class="icon icon-${iconName}"><img src="/icons/${iconName}.svg" alt=""></span>`;
        const body = li.querySelector('.cards-service-card-body');
        if (body) body.prepend(iconWrapper);
      }
    }

    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
