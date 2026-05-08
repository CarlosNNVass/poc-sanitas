/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-insurance-product-page.js
  var import_insurance_product_page_exports = {};
  __export(import_insurance_product_page_exports, {
    default: () => import_insurance_product_page_default
  });

  // tools/importer/parsers/hero-product.js
  function parse(element, { document }) {
    const bgPicture = element.querySelector("picture.m-banner__media");
    const bgImg = element.querySelector("picture.m-banner__media img, .m-banner__media img");
    const contentColumn = element.querySelector(".a-col__12.a-colLg__5");
    const title = contentColumn ? contentColumn.querySelector("h1, h2, .a-title__xs") : element.querySelector("h1, h2");
    const subtitle = contentColumn ? contentColumn.querySelector(".u-bgColorPrimary__navy div.a-title__md, div.a-title__md") : element.querySelector("div.a-title__md");
    const priceInfo = contentColumn ? contentColumn.querySelector(".u-padding__md p.a-title__sm, p.a-title__sm") : null;
    const ctaLink = contentColumn ? contentColumn.querySelector("a.a-button") : element.querySelector("a.a-button");
    const cells = [];
    if (bgPicture) {
      cells.push([bgPicture]);
    } else if (bgImg) {
      cells.push([bgImg]);
    }
    const contentCell = [];
    if (title) contentCell.push(title);
    if (subtitle) contentCell.push(subtitle);
    if (priceInfo) contentCell.push(priceInfo);
    if (ctaLink) contentCell.push(ctaLink);
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-coverage.js
  function parse2(element, { document }) {
    const buttons = element.querySelectorAll("button.o-accordion__item.-isTrigger");
    const cells = [];
    buttons.forEach((button) => {
      const titleText = Array.from(button.childNodes).filter((node) => node.nodeType === 3 || node.nodeType === 1 && !node.classList.contains("o-accordion__icon") && !node.classList.contains("o-accordion__iconTrigger")).map((node) => node.textContent.trim()).filter((text) => text.length > 0).join(" ");
      const contentDiv = button.nextElementSibling;
      const titleEl = document.createElement("p");
      titleEl.textContent = titleText;
      const contentCell = [];
      if (contentDiv && contentDiv.classList.contains("o-accordion__content")) {
        const list = contentDiv.querySelector("ul.m-bulletList, ul, ol");
        if (list) {
          contentCell.push(list);
        } else {
          const paragraphs = contentDiv.querySelectorAll("p");
          paragraphs.forEach((p) => contentCell.push(p));
        }
      }
      if (contentCell.length > 0) {
        cells.push([titleEl, contentCell]);
      } else {
        cells.push([titleEl, ""]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-coverage", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-service.js
  function parse3(element, { document }) {
    const items = element.querySelectorAll(":scope > li.m-list__item");
    const cells = [];
    items.forEach((item) => {
      const heading = item.querySelector("h3");
      const description = item.querySelector("p");
      const cellContent = [];
      if (heading) {
        cellContent.push(heading);
      }
      if (description) {
        cellContent.push(description);
      }
      if (cellContent.length > 0) {
        cells.push([cellContent]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-service", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/table-pricing.js
  function parse4(element, { document }) {
    const cells = [];
    const theadRow = element.querySelector("thead tr");
    if (theadRow) {
      const headerCells = Array.from(theadRow.querySelectorAll("th, td"));
      if (headerCells.length > 0) {
        const headerContent = headerCells.map((cell) => {
          const heading = cell.querySelector("h1, h2, h3, h4, h5, h6");
          if (heading) return heading;
          const text = cell.textContent.trim();
          return text || null;
        }).filter(Boolean);
        if (headerContent.length > 0) {
          cells.push(headerContent);
        }
      }
    }
    const tbodyRows = Array.from(element.querySelectorAll("tbody tr"));
    tbodyRows.forEach((row) => {
      const tds = Array.from(row.querySelectorAll("td"));
      if (tds.length >= 2) {
        const secondCellText = tds[1].textContent.trim();
        if (secondCellText && secondCellText !== "\xA0") {
          cells.push([tds[0].textContent.trim(), secondCellText]);
        } else {
          const strong = tds[0].querySelector("strong, b");
          if (strong) {
            const container = document.createElement("div");
            const boldEl = document.createElement("strong");
            boldEl.textContent = strong.textContent.trim();
            container.appendChild(boldEl);
            const fullText = tds[0].textContent.trim();
            const labelText = strong.textContent.trim();
            const descText = fullText.replace(labelText, "").trim();
            if (descText) {
              container.appendChild(document.createElement("br"));
              container.appendChild(document.createTextNode(descText));
            }
            cells.push([container]);
          } else {
            cells.push([tds[0].textContent.trim()]);
          }
        }
      } else if (tds.length === 1) {
        cells.push([tds[0].textContent.trim()]);
      }
    });
    const tfootRows = Array.from(element.querySelectorAll("tfoot tr"));
    tfootRows.forEach((row) => {
      const tds = Array.from(row.querySelectorAll("td, th"));
      if (tds.length > 0) {
        const footnoteText = tds.map((td) => td.textContent.trim()).filter(Boolean).join(" ");
        if (footnoteText) {
          cells.push([footnoteText]);
        }
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "table-pricing", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-cta.js
  function parse5(element, { document }) {
    const container = element.closest(".m-cards") || element.parentElement;
    const cards = Array.from(container.querySelectorAll(":scope > .m-cards__item"));
    const row = [];
    cards.forEach((card) => {
      const cellContent = [];
      const title = card.querySelector(".a-title__sm, .a-title__md, .a-title__lg, h2, h3, h4");
      if (title) {
        const heading = document.createElement("h3");
        heading.textContent = title.textContent.trim();
        cellContent.push(heading);
      }
      const description = card.querySelector(".m-cards__mainContent > p");
      if (description) {
        cellContent.push(description);
      }
      const ctaLinks = Array.from(card.querySelectorAll("a.a-button, .m-cards__bottomLink a"));
      const seen = /* @__PURE__ */ new Set();
      ctaLinks.forEach((link) => {
        if (!seen.has(link)) {
          seen.add(link);
          const cleanLink = document.createElement("a");
          cleanLink.href = link.href || link.getAttribute("href");
          cleanLink.textContent = link.textContent.trim();
          cellContent.push(cleanLink);
        }
      });
      row.push(cellContent);
    });
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-testimonial.js
  function parse6(element, { document }) {
    const slides = element.querySelectorAll(":scope > li.m-cards__item");
    const cells = [];
    slides.forEach((slide) => {
      const mainContent = slide.querySelector(".m-cards__mainContent");
      if (!mainContent) return;
      const nameEl = mainContent.querySelector("div.u-textSize__lg");
      const dateEl = mainContent.querySelector("div.u-textSize__xs");
      const stars = mainContent.querySelectorAll(".m-rating__stars i.a-star");
      const filledCount = Array.from(stars).filter((star) => !star.classList.contains("-emptyStar")).length;
      const totalCount = stars.length || 5;
      const modalDiv = slide.querySelector('div[id^="modalValoracion_"]');
      let reviewText = "";
      if (modalDiv) {
        const modalP = modalDiv.querySelector(".u-text__alignLeft p");
        if (modalP) {
          reviewText = modalP.textContent.trim();
        }
      }
      if (!reviewText) {
        const cardP = mainContent.querySelector("p");
        if (cardP) {
          reviewText = cardP.textContent.trim();
        }
      }
      const contentContainer = document.createElement("div");
      if (nameEl) {
        const nameP = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = nameEl.textContent.trim();
        nameP.appendChild(strong);
        if (dateEl) {
          const dateSpan = document.createElement("span");
          dateSpan.textContent = ` - ${dateEl.textContent.trim()}`;
          nameP.appendChild(dateSpan);
        }
        contentContainer.appendChild(nameP);
      }
      if (filledCount > 0) {
        const ratingP = document.createElement("p");
        ratingP.textContent = "\u2605".repeat(filledCount) + "\u2606".repeat(totalCount - filledCount);
        contentContainer.appendChild(ratingP);
      }
      if (reviewText) {
        const reviewP = document.createElement("p");
        reviewP.textContent = reviewText;
        contentContainer.appendChild(reviewP);
      }
      cells.push(["", contentContainer]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse7(element, { document }) {
    const items = element.querySelectorAll('button.o-accordion__item, [class*="o-accordion__item"]');
    const cells = [];
    items.forEach((item) => {
      const questionEl = item.querySelector("h3.o-accordion__title, .o-accordion__title, h3");
      const answerEl = item.nextElementSibling;
      if (questionEl && answerEl && answerEl.classList.contains("o-accordion__content")) {
        const questionText = questionEl.textContent.trim();
        const question = document.createElement("p");
        question.textContent = questionText;
        const answerContent = [];
        const paragraphs = answerEl.querySelectorAll("p, ul, ol, a, div");
        if (paragraphs.length > 0) {
          paragraphs.forEach((p) => answerContent.push(p));
        } else {
          const fallbackP = document.createElement("p");
          fallbackP.textContent = answerEl.textContent.trim();
          answerContent.push(fallbackP);
        }
        cells.push([question, answerContent.length === 1 ? answerContent[0] : answerContent]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/sanitas-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, ["#onetrust-consent-sdk"]);
      WebImporter.DOMUtils.remove(element, ["form.m-form"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, ["header.o-mainHeader"]);
      WebImporter.DOMUtils.remove(element, ["footer.o-mainFooter"]);
      WebImporter.DOMUtils.remove(element, [".a-skipToContent"]);
      WebImporter.DOMUtils.remove(element, [".m-stickyBar"]);
      WebImporter.DOMUtils.remove(element, [".a-scrollBackUp"]);
      WebImporter.DOMUtils.remove(element, ["nav"]);
      WebImporter.DOMUtils.remove(element, ["iframe", "noscript", "link"]);
    }
  }

  // tools/importer/transformers/sanitas-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const document = element.ownerDocument;
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-insurance-product-page.js
  var parsers = {
    "hero-product": parse,
    "accordion-coverage": parse2,
    "cards-service": parse3,
    "table-pricing": parse4,
    "columns-cta": parse5,
    "carousel-testimonial": parse6,
    "accordion-faq": parse7
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "insurance-product-page",
    description: "Health insurance product landing page with hero, features, pricing, and CTAs",
    urls: ["https://www.sanitas.es/seguros/seguro-de-salud-sanitas-unico"],
    blocks: [
      {
        name: "hero-product",
        instances: [".o-container.m-banner.-hero"]
      },
      {
        name: "accordion-coverage",
        instances: [".m-cards__mainContent.o-accordion.-iconAccordion.o-fan:not(.faq)"]
      },
      {
        name: "cards-service",
        instances: ["ul.m-list.-insightList.-iconList.u-flexLg__flexRow"]
      },
      {
        name: "table-pricing",
        instances: ["table.o-table"]
      },
      {
        name: "columns-cta",
        instances: [".m-row.u-flex__flexColumn > .m-cards > .m-cards__item.a-colLg__7"]
      },
      {
        name: "carousel-testimonial",
        instances: ["ul.m-cards.o-slider.-allSlider"]
      },
      {
        name: "accordion-faq",
        instances: ["ul.m-cards.u-paddingVertical__lg", ".m-cards__mainContent.faq.o-accordion"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: ".o-container.m-banner.-hero",
        style: null,
        blocks: ["hero-product"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Coverage Details",
        selector: ".o-container.m-banner.-hero ~ .o-container:not(.u-bgGradient__warmGray):not(.u-bgColorPrimary__cyan):not(.u-bgColorPrimary__warmGray)",
        style: null,
        blocks: ["accordion-coverage"],
        defaultContent: ["h2.a-title__xl", "p"]
      },
      {
        id: "section-3",
        name: "Companion Services",
        selector: "ul.m-list.-insightList.-iconList.u-flexLg__flexRow",
        style: null,
        blocks: ["cards-service"],
        defaultContent: ["h2.a-title__xl", "div.a-sub"]
      },
      {
        id: "section-4",
        name: "Copayment and Conditions",
        selector: ".o-container.u-bgGradient__warmGray",
        style: "warm-gray",
        blocks: ["table-pricing", "columns-cta"],
        defaultContent: ["h2.a-title__xl", "p"]
      },
      {
        id: "section-5",
        name: "Testimonials",
        selector: ".o-container.u-bgColorPrimary__cyan.-tint5",
        style: "light-blue",
        blocks: ["carousel-testimonial"],
        defaultContent: ["h2.a-title__lg", "div.a-sub", "a.a-button"]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: ".o-container.u-bgColorPrimary__warmGray.-tint75",
        style: "warm-gray",
        blocks: ["accordion-faq"],
        defaultContent: ["h2.a-title__lg", "div.a-sub"]
      },
      {
        id: "section-7",
        name: "Contact",
        selector: ".o-container:has(#contactoDudasSuperior)",
        style: null,
        blocks: ["columns-cta"],
        defaultContent: []
      },
      {
        id: "section-8",
        name: "SEO Content",
        selector: ".o-container.u-bgColorPrimary__warmGray:not(.-tint75)",
        style: "warm-gray",
        blocks: [],
        defaultContent: ["p"]
      },
      {
        id: "section-9",
        name: "Legal Disclaimers",
        selector: ".o-container:has(.u-flex__separatorRow)",
        style: null,
        blocks: [],
        defaultContent: ["p.u-textSize__sm", "p.a-textSize__sm"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    return pageBlocks;
  }
  var import_insurance_product_page_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_insurance_product_page_exports);
})();
