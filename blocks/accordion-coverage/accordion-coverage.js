export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'accordion-coverage-layout';

  const accordionCol = document.createElement('div');
  accordionCol.className = 'accordion-coverage-col';

  [...block.children].forEach((row) => {
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-coverage-item-label';
    summary.append(...label.childNodes);
    const body = row.children[1];
    body.className = 'accordion-coverage-item-body';
    const details = document.createElement('details');
    details.className = 'accordion-coverage-item';
    details.append(summary, body);
    accordionCol.append(details);
  });

  const sidebar = document.createElement('div');
  sidebar.className = 'accordion-coverage-sidebar';
  sidebar.innerHTML = `<div class="accordion-coverage-highlight">
    <div class="accordion-coverage-highlight-icon">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M48 8H16C11.6 8 8 11.6 8 16V44C8 48.4 11.6 52 16 52H24V60L36 52H48C52.4 52 56 48.4 56 44V16C56 11.6 52.4 8 48 8Z" stroke="#0079c8" stroke-width="2" fill="none"/>
        <path d="M32 20V36M32 36V36H32" stroke="#0079c8" stroke-width="4" stroke-linecap="round"/>
        <rect x="24" y="26" width="16" height="16" rx="2" stroke="#0079c8" stroke-width="2" fill="#ddedf8"/>
        <path d="M32 29V39M27 34H37" stroke="#0079c8" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    </div>
    <p class="accordion-coverage-highlight-title">La mejor provisión médica</p>
    <p class="accordion-coverage-highlight-text">Más de 58.000 médicos, 4.500 centros médicos, 5 hospitales + 3 en proyecto, 31 centros médicos multiespecialidad, más de 220 clínicas dentales y 25 centros de rehabilitación avanzada.</p>
  </div>`;

  wrapper.append(accordionCol, sidebar);
  block.textContent = '';
  block.append(wrapper);
}
