/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroProductParser from './parsers/hero-product.js';
import accordionCoverageParser from './parsers/accordion-coverage.js';
import cardsServiceParser from './parsers/cards-service.js';
import tablePricingParser from './parsers/table-pricing.js';
import columnsCtaParser from './parsers/columns-cta.js';
import carouselTestimonialParser from './parsers/carousel-testimonial.js';
import accordionFaqParser from './parsers/accordion-faq.js';

// TRANSFORMER IMPORTS
import sanitasCleanupTransformer from './transformers/sanitas-cleanup.js';
import sanitasSectionsTransformer from './transformers/sanitas-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-product': heroProductParser,
  'accordion-coverage': accordionCoverageParser,
  'cards-service': cardsServiceParser,
  'table-pricing': tablePricingParser,
  'columns-cta': columnsCtaParser,
  'carousel-testimonial': carouselTestimonialParser,
  'accordion-faq': accordionFaqParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  sanitasCleanupTransformer,
  sanitasSectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'insurance-product-page',
  description: 'Health insurance product landing page with hero, features, pricing, and CTAs',
  urls: ['https://www.sanitas.es/seguros/seguro-de-salud-sanitas-unico'],
  blocks: [
    {
      name: 'hero-product',
      instances: ['.o-container.m-banner.-hero'],
    },
    {
      name: 'accordion-coverage',
      instances: ['.m-cards__mainContent.o-accordion.-iconAccordion.o-fan:not(.faq)'],
    },
    {
      name: 'cards-service',
      instances: ['ul.m-list.-insightList.-iconList.u-flexLg__flexRow'],
    },
    {
      name: 'table-pricing',
      instances: ['table.o-table'],
    },
    {
      name: 'columns-cta',
      instances: ['.m-row.u-flex__flexColumn > .m-cards > .m-cards__item.a-colLg__7'],
    },
    {
      name: 'carousel-testimonial',
      instances: ['ul.m-cards.o-slider.-allSlider'],
    },
    {
      name: 'accordion-faq',
      instances: ['ul.m-cards.u-paddingVertical__lg', '.m-cards__mainContent.faq.o-accordion'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: '.o-container.m-banner.-hero',
      style: null,
      blocks: ['hero-product'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Coverage Details',
      selector: '.o-container.m-banner.-hero ~ .o-container:not(.u-bgGradient__warmGray):not(.u-bgColorPrimary__cyan):not(.u-bgColorPrimary__warmGray)',
      style: null,
      blocks: ['accordion-coverage'],
      defaultContent: ['h2.a-title__xl', 'p'],
    },
    {
      id: 'section-3',
      name: 'Companion Services',
      selector: 'ul.m-list.-insightList.-iconList.u-flexLg__flexRow',
      style: null,
      blocks: ['cards-service'],
      defaultContent: ['h2.a-title__xl', 'div.a-sub'],
    },
    {
      id: 'section-4',
      name: 'Copayment and Conditions',
      selector: '.o-container.u-bgGradient__warmGray',
      style: 'warm-gray',
      blocks: ['table-pricing', 'columns-cta'],
      defaultContent: ['h2.a-title__xl', 'p'],
    },
    {
      id: 'section-5',
      name: 'Testimonials',
      selector: '.o-container.u-bgColorPrimary__cyan.-tint5',
      style: 'light-blue',
      blocks: ['carousel-testimonial'],
      defaultContent: ['h2.a-title__lg', 'div.a-sub', 'a.a-button'],
    },
    {
      id: 'section-6',
      name: 'FAQ',
      selector: '.o-container.u-bgColorPrimary__warmGray.-tint75',
      style: 'warm-gray',
      blocks: ['accordion-faq'],
      defaultContent: ['h2.a-title__lg', 'div.a-sub'],
    },
    {
      id: 'section-7',
      name: 'Contact',
      selector: '.o-container:has(#contactoDudasSuperior)',
      style: null,
      blocks: ['columns-cta'],
      defaultContent: [],
    },
    {
      id: 'section-8',
      name: 'SEO Content',
      selector: '.o-container.u-bgColorPrimary__warmGray:not(.-tint75)',
      style: 'warm-gray',
      blocks: [],
      defaultContent: ['p'],
    },
    {
      id: 'section-9',
      name: 'Legal Disclaimers',
      selector: '.o-container:has(.u-flex__separatorRow)',
      style: null,
      blocks: [],
      defaultContent: ['p.u-textSize__sm', 'p.a-textSize__sm'],
    },
  ],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
