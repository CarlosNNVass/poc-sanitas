export default function decorate(block) {
  if (!block.querySelector(':scope > div:first-child picture')) {
    block.classList.add('no-image');
  }

  const contentRow = block.querySelector(':scope > div:last-child');
  const contentColumns = contentRow ? [...contentRow.children] : [];

  if (contentColumns.length > 1) {
    block.classList.add('has-aside');
  }
}
