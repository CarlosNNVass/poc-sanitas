/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Sanitas site-wide cleanup.
 * Removes non-authorable content from Sanitas insurance pages.
 * All selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove cookie consent overlay (blocks interaction/parsing)
    // Found: <div id="onetrust-consent-sdk"> at line 2794
    WebImporter.DOMUtils.remove(element, ['#onetrust-consent-sdk']);

    // Remove forms that block parsing (calculator, callback forms)
    // Found: <form class="m-form" id="formulario_calcula_tu_seguro"> at multiple locations
    // Found: <form class="m-form a-colXs__12 a-colMd__6" id="formulario_te_llamamos"> at multiple locations
    WebImporter.DOMUtils.remove(element, ['form.m-form']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove site header (non-authorable global nav)
    // Found: <header class="o-mainHeader o-container"> at line 3
    WebImporter.DOMUtils.remove(element, ['header.o-mainHeader']);

    // Remove site footer (non-authorable global footer)
    // Found: <footer class="o-mainFooter o-container..."> at line 2383
    WebImporter.DOMUtils.remove(element, ['footer.o-mainFooter']);

    // Remove skip-to-content link (non-authorable accessibility aid)
    // Found: <a href="#mainContentBlock" class="a-skipToContent"> at line 2
    WebImporter.DOMUtils.remove(element, ['.a-skipToContent']);

    // Remove sticky mobile CTA bar (non-authorable UI widget)
    // Found: <div class="m-stickyBar m-row u-hideDesktop..."> at line 2109
    WebImporter.DOMUtils.remove(element, ['.m-stickyBar']);

    // Remove scroll-back-up button (non-authorable UI widget)
    // Found: <a class="a-scrollBackUp..."> at line 2378
    WebImporter.DOMUtils.remove(element, ['.a-scrollBackUp']);

    // Remove any remaining nav elements
    // Found: <nav class="u-flex a-col__12"> at line 108
    WebImporter.DOMUtils.remove(element, ['nav']);

    // Remove iframes and noscript tags
    // Found: </iframe> at line 2793
    WebImporter.DOMUtils.remove(element, ['iframe', 'noscript', 'link']);
  }
}
