const TAB_ICONS = [
  '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 2C7.4 2 2 7.4 2 14s5.4 12 12 12 12-5.4 12-12S20.6 2 14 2z" stroke="currentColor" stroke-width="1.5"/><path d="M14 8v4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M10 18h8M12 14h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="4" y="6" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="13" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M10 22h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M14 20v2" stroke="currentColor" stroke-width="1.5"/></svg>',
  '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4 14l10-10 10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 13v11h16V13" stroke="currentColor" stroke-width="1.5"/><path d="M11 24v-6h6v6" stroke="currentColor" stroke-width="1.5"/></svg>',
  '<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M8 26c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M20 12l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
];

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'accordion-coverage-layout';

  const accordionCol = document.createElement('div');
  accordionCol.className = 'accordion-coverage-col';

  [...block.children].forEach((row, i) => {
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-coverage-item-label';

    if (TAB_ICONS[i]) {
      const iconSpan = document.createElement('span');
      iconSpan.className = 'accordion-coverage-icon';
      iconSpan.innerHTML = TAB_ICONS[i];
      summary.append(iconSpan);
    }

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
        <rect x="24" y="22" width="16" height="16" rx="2" stroke="#0079c8" stroke-width="2" fill="#ddedf8"/>
        <path d="M32 25V35M27 30H37" stroke="#0079c8" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
    </div>
    <p class="accordion-coverage-highlight-title">La mejor provisión médica</p>
    <p class="accordion-coverage-highlight-text">Más de 58.000 médicos, 4.500 centros médicos, 5 hospitales + 3 en proyecto, 31 centros médicos multiespecialidad, más de 220 clínicas dentales y 25 centros de rehabilitación avanzada.</p>
  </div>`;

  wrapper.append(accordionCol, sidebar);
  block.textContent = '';
  block.append(wrapper);
}
