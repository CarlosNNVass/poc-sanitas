function isIconParagraph(p) {
  if (p.querySelector('.icon')) return true;
  const children = [...p.children];
  if (children.length === 1 && children[0].tagName === 'PICTURE') return true;
  if (children.length === 1 && children[0].tagName === 'SPAN' && children[0].querySelector('img')) return true;
  return false;
}

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
        if (isIconParagraph(p)) {
          if (current) items.push(current);
          current = document.createElement('div');
          current.className = 'contact-item';
          current.append(p);
        } else if (current) {
          current.append(p);
        }
      });
      if (current) items.push(current);

      if (items.length > 0) {
        firstCol.innerHTML = '';
        items.forEach((item) => firstCol.append(item));
      }
    }
  }
}
