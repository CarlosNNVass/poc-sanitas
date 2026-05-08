/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-testimonial
 * Base block: carousel
 * Source: https://www.sanitas.es/seguros/seguro-de-salud-sanitas-unico
 * Selector: ul.m-cards.o-slider.-allSlider
 * Generated: 2026-05-08
 *
 * Extracts customer testimonial slides from a carousel/slider.
 * Each slide contains: reviewer name, date, star rating, and review text.
 * The modal div (if present) contains the full untruncated review text.
 */
export default function parse(element, { document }) {
  // Get all slide items from the carousel
  const slides = element.querySelectorAll(':scope > li.m-cards__item');

  const cells = [];

  slides.forEach((slide) => {
    // Extract from the card's main content area
    const mainContent = slide.querySelector('.m-cards__mainContent');
    if (!mainContent) return;

    // Extract reviewer name (div.u-textSize__lg within the flex header)
    const nameEl = mainContent.querySelector('div.u-textSize__lg');

    // Extract date (div.u-textSize__xs within the flex header)
    const dateEl = mainContent.querySelector('div.u-textSize__xs');

    // Extract star rating - count filled vs empty stars
    const stars = mainContent.querySelectorAll('.m-rating__stars i.a-star');
    const filledCount = Array.from(stars).filter((star) => !star.classList.contains('-emptyStar')).length;
    const totalCount = stars.length || 5;

    // Prefer full review text from modal if available, otherwise use truncated card text
    const modalDiv = slide.querySelector('div[id^="modalValoracion_"]');
    let reviewText = '';
    if (modalDiv) {
      const modalP = modalDiv.querySelector('.u-text__alignLeft p');
      if (modalP) {
        reviewText = modalP.textContent.trim();
      }
    }
    if (!reviewText) {
      const cardP = mainContent.querySelector('p');
      if (cardP) {
        reviewText = cardP.textContent.trim();
      }
    }

    // Build content cell with reviewer info, rating, and review text
    const contentContainer = document.createElement('div');

    // Reviewer name as strong text
    if (nameEl) {
      const nameP = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = nameEl.textContent.trim();
      nameP.appendChild(strong);
      // Append date inline if available
      if (dateEl) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = ` - ${dateEl.textContent.trim()}`;
        nameP.appendChild(dateSpan);
      }
      contentContainer.appendChild(nameP);
    }

    // Star rating as text representation
    if (filledCount > 0) {
      const ratingP = document.createElement('p');
      ratingP.textContent = '★'.repeat(filledCount) + '☆'.repeat(totalCount - filledCount);
      contentContainer.appendChild(ratingP);
    }

    // Review text
    if (reviewText) {
      const reviewP = document.createElement('p');
      reviewP.textContent = reviewText;
      contentContainer.appendChild(reviewP);
    }

    // Each row: [empty cell (no image), content cell]
    cells.push(['', contentContainer]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-testimonial', cells });
  element.replaceWith(block);
}
