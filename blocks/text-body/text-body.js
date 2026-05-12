export default function decorate(block) {
  const rows = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.className = 'text-body-content';

  rows.forEach((row) => {
    const col = row.children[0];
    if (col) wrapper.append(...col.childNodes);
  });

  block.textContent = '';
  block.append(wrapper);
}
