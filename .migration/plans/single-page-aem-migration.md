# Sanitas Health Insurance Page Migration Plan

## Overview
Migrate the Sanitas health insurance product page (`https://www.sanitas.es/seguros/seguro-de-salud-sanitas-unico`) to AEM Edge Delivery Services. This involves analyzing the source page structure, mapping content to EDS blocks, generating import infrastructure, and producing the final HTML content.

## Source Page
- **URL:** https://www.sanitas.es/seguros/seguro-de-salud-sanitas-unico
- **Type:** Product/insurance landing page (Spanish health insurance)
- **Expected content:** Hero section, product features, pricing/plans, CTAs, testimonials, FAQ, footer

## Prerequisites
- Local AEM EDS project set up with dev server running
- Block library available for mapping

## Migration Steps

### Phase 1: Page Analysis
- Scrape and analyze the source page to identify content structure
- Identify sections, blocks, and default content areas
- Capture screenshots and cleaned HTML for reference
- Determine block variants needed (hero, cards, accordion, columns, etc.)

### Phase 2: Block Mapping
- Match identified page sections to available EDS blocks
- Create new block variants if needed for custom components (e.g., pricing tables, feature lists)
- Update page templates with block mappings and DOM selectors

### Phase 3: Import Infrastructure
- Generate block parsers for each mapped block variant
- Create page transformers (cleanup and sections)
- Bundle the import script

### Phase 4: Content Import
- Execute the import script against the source URL
- Generate the final HTML content file
- Place content in `/content/` directory

### Phase 5: Verification
- Preview the migrated page in the local dev server
- Compare visual output against the original page
- Fix any styling or structural issues

## Checklist

- [ ] Run page analysis on https://www.sanitas.es/seguros/seguro-de-salud-sanitas-unico
- [ ] Review identified sections and block variants
- [ ] Confirm block mappings to EDS block library
- [ ] Generate import infrastructure (parsers + transformers)
- [ ] Execute content import to produce HTML
- [ ] Verify page renders correctly in local preview
- [ ] Compare against original and fix visual discrepancies

## Execution
This plan is ready to execute using the site migration workflow. Switch to Execute mode to begin.
