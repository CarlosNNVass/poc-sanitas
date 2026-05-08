/* eslint-disable */
/* global WebImporter */
/**
 * Parser for table-pricing.
 * Base block: table.
 * Source selector: table.o-table
 * Generated: 2026-05-08
 *
 * Extracts pricing/conditions data tables with thead headers,
 * tbody data rows (service + price), and optional tfoot footnotes.
 * Handles two table variations:
 *   1. Copayment table: thead with h3 title, tbody with 2-col rows (service | price), tfoot with footnotes
 *   2. Conditions table: empty thead, tbody with 2-col rows where second col is empty (single-col content with strong labels)
 */
export default function parse(element, { document }) {
  const cells = [];

  // Extract header row from thead (if it has content)
  const theadRow = element.querySelector('thead tr');
  if (theadRow) {
    const headerCells = Array.from(theadRow.querySelectorAll('th, td'));
    if (headerCells.length > 0) {
      // Build header row - preserve heading elements inside th
      const headerContent = headerCells.map((cell) => {
        const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) return heading;
        const text = cell.textContent.trim();
        return text || null;
      }).filter(Boolean);
      if (headerContent.length > 0) {
        cells.push(headerContent);
      }
    }
  }

  // Extract data rows from tbody
  const tbodyRows = Array.from(element.querySelectorAll('tbody tr'));
  tbodyRows.forEach((row) => {
    const tds = Array.from(row.querySelectorAll('td'));
    if (tds.length >= 2) {
      const secondCellText = tds[1].textContent.trim();
      // Check if second column has meaningful content (not just nbsp or empty)
      if (secondCellText && secondCellText !== ' ') {
        // Two-column row: service name | price
        cells.push([tds[0].textContent.trim(), secondCellText]);
      } else {
        // Single meaningful column - preserve strong/bold labels with description
        const strong = tds[0].querySelector('strong, b');
        if (strong) {
          // Create a container preserving the bold label and description text
          const container = document.createElement('div');
          const boldEl = document.createElement('strong');
          boldEl.textContent = strong.textContent.trim();
          container.appendChild(boldEl);
          // Get remaining text after the strong element
          const fullText = tds[0].textContent.trim();
          const labelText = strong.textContent.trim();
          const descText = fullText.replace(labelText, '').trim();
          if (descText) {
            container.appendChild(document.createElement('br'));
            container.appendChild(document.createTextNode(descText));
          }
          cells.push([container]);
        } else {
          cells.push([tds[0].textContent.trim()]);
        }
      }
    } else if (tds.length === 1) {
      // Single-column row (spanning)
      cells.push([tds[0].textContent.trim()]);
    }
  });

  // Extract footnotes from tfoot (optional, skip if empty)
  const tfootRows = Array.from(element.querySelectorAll('tfoot tr'));
  tfootRows.forEach((row) => {
    const tds = Array.from(row.querySelectorAll('td, th'));
    if (tds.length > 0) {
      const footnoteText = tds.map((td) => td.textContent.trim()).filter(Boolean).join(' ');
      if (footnoteText) {
        cells.push([footnoteText]);
      }
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'table-pricing', cells });
  element.replaceWith(block);
}
