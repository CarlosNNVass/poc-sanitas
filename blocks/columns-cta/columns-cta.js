export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-cta-${cols.length}-cols`);

  if (block.classList.contains('contact')) {
    const firstCol = block.querySelector(':scope > div > div:first-child');
    if (firstCol) {
      const paragraphs = [...firstCol.querySelectorAll(':scope > p')];
      const items = [];
      let current = null;

      paragraphs.forEach((p) => {
        if (p.querySelector('.icon')) {
          if (current) items.push(current);
          current = document.createElement('div');
          current.className = 'contact-item';
          current.append(p);
        } else if (current) {
          current.append(p);
        }
      });
      if (current) items.push(current);

      firstCol.innerHTML = '';
      items.forEach((item) => firstCol.append(item));
    }
  }
}
