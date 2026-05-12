const MODAL_CONTENT = {
  Copago: `<p>Copago es un pequeño importe que abona el cliente al hacer uso de determinados servicios y que nos permite ofrecer una prima más baja. Si vas a usar tu seguro con poca frecuencia, un producto con copagos puede ser una buena forma de ahorrar en tu prima.</p>
<p>Como ofrecemos productos que pueden contratarse <a href="/seguros/seguros-de-salud-con-copago">con copago</a> y <a href="/seguros/seguros-de-salud-sin-copago">sin copago</a> (con una cobertura idéntica en ambos casos), podrás elegir la modalidad que más se ajusta a tus necesidades. Puedes consultar el detalle de copagos en la ficha de cada producto. Estos copagos se facturan de manera mensual.</p>`,

  Videoconsulta: `<p>Servicio que te permite hablar con tu médico estés donde estés. Gran ahorro de tiempo y muy útil para revisión de resultados, prescripción de pruebas o recetas, urgencias…</p>
<p><strong>Ventajas de la videoconsulta</strong></p>
<ul>
<li>Los profesionales que atienden por videoconsulta son los mismos que atienden en nuestros centros propios y concertados.</li>
<li><strong>Ahorro de tiempo</strong> en desplazamientos.</li>
<li>Pueden <strong>prescribirte una prueba médica o una receta</strong> directamente desde la videoconsulta.</li>
<li>Pueden <strong>consultar resultados de pruebas médicas</strong> que tú les compartas.</li>
<li><strong>Tú eliges el médico</strong> con el que quieres conectar.</li>
<li>Recibe <strong>orientación y atención profesional</strong> de los mejores asesores a través de <strong>programas personalizados</strong> de prevención y cuidado de la salud.</li>
</ul>
<p><strong>¿Cuándo hacer una videoconsulta?</strong></p>
<ul>
<li><strong>Revisión de resultados:</strong> tras una primera consulta presencial, revisa con tu médico los resultados de pruebas.</li>
<li><strong>Medicación:</strong> ¿Tienes dudas con un medicamento?</li>
<li><strong>Dudas médicas:</strong> ¿Tienes un dolor y no sabes a qué médico acudir? ¿Necesitas una analítica?</li>
<li><strong>Urgencias médicas</strong> sin desplazamientos.</li>
<li><strong>Tratamientos:</strong> puedes seguir tu evolución por videoconsulta.</li>
<li><strong>Médicos recomendados:</strong> contacta con un médico por videoconsulta, incluso fuera de tu provincia.</li>
<li><strong>Programas de salud:</strong> empieza ya tu Programa de Nutrición, Entrenador Personal, Embarazo, Psicología, etc.</li>
</ul>`,

  'Periodo de permanencia': `<p>Los contratos de seguros sanitarios tienen una duración de 12 meses, excepto Sanitas International Students y Sanitas Estudiantes.</p>
<p>La renovación del seguro se realiza de forma automática excepto si el tomador de la póliza comunica su no renovación con al menos un mes de antelación a la finalización del contrato.</p>`,

  Carencias: `<p>Los periodos de carencia son el tiempo que debe pasar desde que contratas el seguro hasta que haces uso de determinados servicios, que suelen ser pruebas diagnósticas o tratamientos complejos. Para visitas médicas y pruebas diagnósticas sencillas, como análisis de sangre y orina, ecografías, radiografías, etc. no hay periodos de carencia y puedes hacer uso de ellos desde el primer día.</p>
<p>Es importante conocer los periodos de carencia que aplican al producto contratado y puedes consultarlos en la ficha de cada producto. Si ya tienes otro seguro de salud y vienes a Sanitas, es posible que se te eliminen estos periodos. Indícalo en el momento del alta.</p>`,

  Preexistencias: `<p>Se denomina preexistencias a las patologías del cliente existentes con anterioridad a la fecha de la contratación del producto.</p>
<p>Si deseas contratar una póliza y padeces o has padecido alguna enfermedad o lesión, una operación o algún síntoma, el departamento médico te llamará para valorarlo.</p>`,

  'Clínicas concertadas': '<p>La red médica más completa con más de 4.500 centros asistenciales de referencia concertados a nivel nacional.</p>',

  'Precio final': '<p>Al precio de la póliza no es necesario añadirle IVA ni ningún otro impuesto, salvo el Recargo de Compensación de Seguros, que se abona únicamente en el primer recibo y supone un 0,15% de la cuota neta anual.</p>',
};

export default function decorate(block) {
  const items = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'cards-faq-grid';

  const overlay = document.createElement('div');
  overlay.className = 'cards-faq-modal-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const modal = document.createElement('div');
  modal.className = 'cards-faq-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');

  const modalBody = document.createElement('div');
  modalBody.className = 'cards-faq-modal-body';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'cards-faq-modal-close';
  closeBtn.setAttribute('aria-label', 'Cerrar ventana');

  modal.append(modalBody, closeBtn);
  overlay.append(modal);

  function openModal(content) {
    modalBody.innerHTML = content;
    overlay.classList.add('cards-faq-modal-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('cards-faq-modal-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('cards-faq-modal-open')) {
      closeModal();
    }
  });

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
      const modalContent = MODAL_CONTENT[title] || content;
      openModal(modalContent);
    });

    grid.append(card);
  });

  block.textContent = '';
  block.append(grid, overlay);
}
