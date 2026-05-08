/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-cta.
 * Base block: columns.
 * Source: https://www.sanitas.es/seguros/seguro-de-salud-sanitas-unico
 * Selector: .m-row.u-flex__flexColumn > .m-cards > .m-cards__item.a-colLg__7
 *
 * Extracts a side-by-side CTA column layout from .m-cards container.
 * Each .m-cards__item becomes a column cell containing its title, optional
 * description, and CTA link.
 */
export default function parse(element, { document }) {
  // The selector targets the first .m-cards__item; we need to work with the
  // parent .m-cards container to get both columns.
  const container = element.closest('.m-cards') || element.parentElement;

  // Get all card items within the container
  const cards = Array.from(container.querySelectorAll(':scope > .m-cards__item'));

  // Build one row with N cells (one per column/card)
  const row = [];

  cards.forEach((card) => {
    const cellContent = [];

    // Extract title (div.a-title__sm or any heading-like element)
    const title = card.querySelector('.a-title__sm, .a-title__md, .a-title__lg, h2, h3, h4');
    if (title) {
      // Convert the div title to a proper heading element for semantic output
      const heading = document.createElement('h3');
      heading.textContent = title.textContent.trim();
      cellContent.push(heading);
    }

    // Extract optional description paragraph
    const description = card.querySelector('.m-cards__mainContent > p');
    if (description) {
      cellContent.push(description);
    }

    // Extract CTA link(s)
    const ctaLinks = Array.from(card.querySelectorAll('a.a-button, .m-cards__bottomLink a'));
    // Deduplicate in case selectors overlap
    const seen = new Set();
    ctaLinks.forEach((link) => {
      if (!seen.has(link)) {
        seen.add(link);
        // Clean up the link text (remove icon elements, keep text)
        const cleanLink = document.createElement('a');
        cleanLink.href = link.href || link.getAttribute('href');
        cleanLink.textContent = link.textContent.trim();
        cellContent.push(cleanLink);
      }
    });

    row.push(cellContent);
  });

  const cells = [row];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-cta', cells });
  element.replaceWith(block);
}
