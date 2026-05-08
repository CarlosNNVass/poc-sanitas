/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-coverage
 * Base block: accordion
 * Source: https://www.sanitas.es/seguros/seguro-de-salud-sanitas-unico
 * Generated: 2026-05-08
 *
 * Extracts accordion items from .o-accordion with button titles and content divs.
 * Each accordion item becomes a row with [title, content].
 */
export default function parse(element, { document }) {
  // Get all accordion trigger buttons
  const buttons = element.querySelectorAll('button.o-accordion__item.-isTrigger');
  const cells = [];

  buttons.forEach((button) => {
    // Extract title text from button (excluding icon elements)
    const titleText = Array.from(button.childNodes)
      .filter((node) => node.nodeType === 3 || (node.nodeType === 1 && !node.classList.contains('o-accordion__icon') && !node.classList.contains('o-accordion__iconTrigger')))
      .map((node) => node.textContent.trim())
      .filter((text) => text.length > 0)
      .join(' ');

    // Find the associated content div (next sibling)
    const contentDiv = button.nextElementSibling;

    // Build title cell
    const titleEl = document.createElement('p');
    titleEl.textContent = titleText;

    // Build content cell - extract the list or content
    const contentCell = [];
    if (contentDiv && contentDiv.classList.contains('o-accordion__content')) {
      const list = contentDiv.querySelector('ul.m-bulletList, ul, ol');
      if (list) {
        contentCell.push(list);
      } else {
        // Fallback: grab all paragraph/text content
        const paragraphs = contentDiv.querySelectorAll('p');
        paragraphs.forEach((p) => contentCell.push(p));
      }
    }

    // Add row: [title, content]
    if (contentCell.length > 0) {
      cells.push([titleEl, contentCell]);
    } else {
      cells.push([titleEl, '']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-coverage', cells });
  element.replaceWith(block);
}
