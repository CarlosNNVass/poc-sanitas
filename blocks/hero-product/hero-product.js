export default function decorate(block) {
  if (!block.querySelector(':scope > div:first-child picture')) {
    block.classList.add('no-image');
  }

  const rightCol = block.querySelector(':scope > div:last-child > div:last-child');
  if (rightCol && rightCol.querySelector('h3')) {
    rightCol.innerHTML = `
      <div class="hero-form">
        <h3 class="hero-form-title">Calcula tu seguro médico</h3>
        <div class="hero-form-group">
          <label>¿A quién quieres asegurar?</label>
          <select disabled>
            <option>Solo para mí</option>
            <option>Otros incluyéndome a mí</option>
            <option>Otros sin incluirme a mí</option>
          </select>
        </div>
        <div class="hero-form-group">
          <label>Fecha de nacimiento</label>
          <input type="text" placeholder="Día / Mes / Año" disabled>
        </div>
        <div class="hero-form-group">
          <label>Código postal</label>
          <input type="text" placeholder="C. Postal" disabled>
        </div>
        <div class="hero-form-group">
          <label>Teléfono</label>
          <input type="tel" placeholder="Teléfono de contacto" disabled>
        </div>
        <a href="https://www.sanitas.es/seguros/contratacion-salud/#/planes/3216" class="hero-form-submit">Calcular precio</a>
      </div>
    `;
  }
}
