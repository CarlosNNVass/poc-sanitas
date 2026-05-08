/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-product
 * Base block: hero
 * Source: https://www.sanitas.es/seguros/seguro-de-salud-sanitas-unico
 * Selector: .o-container.m-banner.-hero
 * Generated: 2026-05-08
 *
 * Structure:
 *   Row 1: Background image (picture element)
 *   Row 2: Title heading + subtitle + CTA link
 *
 * Extracts the product hero content (left column) excluding the form (right column).
 */
export default function parse(element, { document }) {
  // Row 1: Background image
  const bgPicture = element.querySelector('picture.m-banner__media');
  const bgImg = element.querySelector('picture.m-banner__media img, .m-banner__media img');

  // Row 2: Content from the left content column (exclude the form column)
  const contentColumn = element.querySelector('.a-col__12.a-colLg__5');

  // Title: h1 heading
  const title = contentColumn
    ? contentColumn.querySelector('h1, h2, .a-title__xs')
    : element.querySelector('h1, h2');

  // Subtitle: div with class a-title__md (immediately after h1)
  const subtitle = contentColumn
    ? contentColumn.querySelector('.u-bgColorPrimary__navy div.a-title__md, div.a-title__md')
    : element.querySelector('div.a-title__md');

  // Price/description paragraph
  const priceInfo = contentColumn
    ? contentColumn.querySelector('.u-padding__md p.a-title__sm, p.a-title__sm')
    : null;

  // CTA button link (the main action button, not internal anchors)
  const ctaLink = contentColumn
    ? contentColumn.querySelector('a.a-button')
    : element.querySelector('a.a-button');

  // Build cells array matching target structure
  const cells = [];

  // Row 1: Background image
  if (bgPicture) {
    cells.push([bgPicture]);
  } else if (bgImg) {
    cells.push([bgImg]);
  }

  // Row 2: Single cell with title + subtitle + price + CTA (wrapped in array for single-column row)
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subtitle) contentCell.push(subtitle);
  if (priceInfo) contentCell.push(priceInfo);
  if (ctaLink) contentCell.push(ctaLink);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-product', cells });
  element.replaceWith(block);
}
