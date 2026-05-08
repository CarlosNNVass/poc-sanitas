/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-faq
 * Base block: accordion
 * Source selector: .m-cards__mainContent.faq.o-accordion
 * Generated: 2026-05-08
 *
 * Extracts FAQ items from an accordion structure where each item consists of
 * a button.o-accordion__item (containing h3.o-accordion__title for the question)
 * followed by a div.o-accordion__content (containing the answer paragraph).
 *
 * Target structure: Each row has two cells - col1: question text, col2: answer content.
 */
export default function parse(element, { document }) {
  // Extract all accordion item buttons (each contains the question heading)
  const items = element.querySelectorAll('button.o-accordion__item, [class*="o-accordion__item"]');

  const cells = [];

  items.forEach((item) => {
    // Extract question from h3.o-accordion__title within the button
    const questionEl = item.querySelector('h3.o-accordion__title, .o-accordion__title, h3');

    // The answer content is in the next sibling div.o-accordion__content
    const answerEl = item.nextElementSibling;

    if (questionEl && answerEl && answerEl.classList.contains('o-accordion__content')) {
      // Build question cell - preserve the heading element
      const questionText = questionEl.textContent.trim();
      const question = document.createElement('p');
      question.textContent = questionText;

      // Build answer cell - clone the content to preserve paragraph structure
      const answerContent = [];
      const paragraphs = answerEl.querySelectorAll('p, ul, ol, a, div');
      if (paragraphs.length > 0) {
        paragraphs.forEach((p) => answerContent.push(p));
      } else {
        // Fallback: use the answer div content directly
        const fallbackP = document.createElement('p');
        fallbackP.textContent = answerEl.textContent.trim();
        answerContent.push(fallbackP);
      }

      // Each row: [question, answer]
      cells.push([question, answerContent.length === 1 ? answerContent[0] : answerContent]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
