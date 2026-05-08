/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Sanitas section breaks and section metadata.
 * Inserts <hr> section breaks and Section Metadata blocks based on template sections.
 * All selectors from page-templates.json, validated against migration-work/cleaned.html.
 *
 * Sections (from template):
 *   1. Hero: .o-container.m-banner.-hero (no style)
 *   2. Coverage Details: .o-container.m-banner.-hero ~ .o-container:not(...) (no style)
 *   3. Companion Services: ul.m-list.-insightList.-iconList.u-flexLg__flexRow (no style)
 *   4. Copayment and Conditions: .o-container.u-bgGradient__warmGray (warm-gray)
 *   5. Testimonials: .o-container.u-bgColorPrimary__cyan.-tint5 (light-blue)
 *   6. FAQ: .o-container.u-bgColorPrimary__warmGray.-tint75 (warm-gray)
 *   7. Contact: .o-container:has(#contactoDudasSuperior) (no style)
 *   8. SEO Content: .o-container.u-bgColorPrimary__warmGray:not(.-tint75) (warm-gray)
 *   9. Legal Disclaimers: .o-container:has(.u-flex__separatorRow) (no style)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const document = element.ownerDocument;
    const sections = template.sections;

    // Process sections in reverse order to preserve DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);

      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(sectionMetadata);
      }

      // Insert <hr> before each section except the first
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
