export default function decorate(block) {
  const items = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'cards-faq-grid';

  items.forEach((row) => {
    const title = row.children[0]?.textContent?.trim();
    const content = row.children[1]?.innerHTML || '';

    const card = document.createElement('div');
    card.className = 'cards-faq-card';

    const header = document.createElement('div');
    header.className = 'cards-faq-card-header';
    header.innerHTML = `<h3 class="cards-faq-card-title">${title}</h3><span class="cards-faq-card-plus">+</span>`;

    const body = document.createElement('div');
    body.className = 'cards-faq-card-body';
    body.innerHTML = content;

    card.append(header, body);

    card.addEventListener('click', () => {
      card.classList.toggle('cards-faq-card-open');
    });

    grid.append(card);
  });

  block.textContent = '';
  block.append(grid);
}
