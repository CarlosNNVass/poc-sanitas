export default function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'cards-addon-grid';

  rows.forEach((row) => {
    const cols = [...row.children];
    const imgCol = cols[0];
    const textCol = cols[1];

    const card = document.createElement('a');
    card.className = 'cards-addon-card';

    const link = textCol?.querySelector('a');
    if (link) {
      card.href = link.href;
    }

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'cards-addon-card-image';
    const pic = imgCol?.querySelector('picture');
    if (pic) imgWrapper.append(pic);

    const content = document.createElement('div');
    content.className = 'cards-addon-card-content';

    const h3 = textCol?.querySelector('h3');
    const p = textCol?.querySelector('p');

    if (h3) {
      const title = document.createElement('h3');
      title.className = 'cards-addon-card-title';
      title.textContent = h3.textContent;
      content.append(title);
    }
    if (p) {
      const desc = document.createElement('p');
      desc.className = 'cards-addon-card-desc';
      desc.textContent = p.textContent;
      content.append(desc);
    }

    const cta = document.createElement('span');
    cta.className = 'cards-addon-card-cta';
    cta.textContent = 'Más información';
    content.append(cta);

    card.append(imgWrapper, content);
    grid.append(card);
  });

  block.textContent = '';
  block.append(grid);
}
