/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-service.
 * Base block: cards
 * Source: https://www.sanitas.es/seguros/seguro-de-salud-sanitas-unico
 * Generated: 2026-05-08
 *
 * Extracts service feature items from a ul.m-list.-insightList list.
 * Each li contains an icon (i element), heading (h3), and description (p).
 * Output: one row per card, each cell contains heading + description text.
 */
export default function parse(element, { document }) {
  // Extract all list items (service cards)
  const items = element.querySelectorAll(':scope > li.m-list__item');

  const cells = [];

  items.forEach((item) => {
    // Extract heading from within the item
    const heading = item.querySelector('h3');
    // Extract description paragraph
    const description = item.querySelector('p');

    // Build the cell content array for this card row
    const cellContent = [];

    if (heading) {
      cellContent.push(heading);
    }
    if (description) {
      cellContent.push(description);
    }

    // Only add the row if there is content
    // Wrap in array to create a single cell per row (row = [cell], cell = [elements])
    if (cellContent.length > 0) {
      cells.push([cellContent]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-service', cells });
  element.replaceWith(block);
}
