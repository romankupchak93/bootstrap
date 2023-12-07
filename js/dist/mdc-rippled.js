/*!
  * Bootstrap mdc-rippled.js v5.3.0-alpha1 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@material/ripple'), require('@material/ripple/foundation'), require('./util/index')) :
  typeof define === 'function' && define.amd ? define(['@material/ripple', '@material/ripple/foundation', './util/index'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MdcRippled = factory(global["@material/ripple"], global["@material/ripple/foundation"], global.index));
})(this, (function (ripple, foundation, index) { 'use strict';

  class MDCRippled extends ripple.MDCRipple {
    constructor(element) {
      super(element, new foundation.MDCRippleFoundation({
        adapter: {}
      }));
    }
  }
  index.onDOMContentLoaded(() => {
    const classText = ['btn'];
    const btnIconClassList = ['btn-close', 'btn-icon', 'btn-edit', 'btn-clipboard', 'navbar-toggler'];
    const dropClassList = ['dropdown-toggle'];
    const dropSelectors = dropClassList.map(dropClass => {
      return `:not(.${dropClass}), :not(.${dropClass}), :not(div[class*="${classText}-"])`;
    });
    const primarySelector = document.querySelectorAll(`[class*="${classText}"]${dropSelectors.join('')}`);
    const dropClassListElements = document.querySelectorAll(`.${dropClassList.join('.')}`);
    for (const elementSelector of primarySelector) {
      if ((elementSelector.classList.contains(classText) || btnIconClassList.some(cls => elementSelector.classList.contains(cls))) && !dropClassList.some(cls => elementSelector.classList.contains(cls))) {
        elementSelector.classList.add('mdc-ripple-surface');
        ripple.MDCRipple.attachTo(elementSelector);
      }
    }
    for (const dropElement of dropClassListElements) {
      if (dropElement.classList.contains(classText) && dropClassList.some(cls => dropElement.classList.contains(cls))) {
        const childElementDrop = document.createElement('div');
        childElementDrop.classList.add('mdc-ripple-surface');
        dropElement.append(childElementDrop);
      }
    }
    for (const btnWithIconMDC of btnIconClassList) {
      const elBtnIconMDC = document.querySelectorAll(`.${btnWithIconMDC}`);
      for (const btnIconMDC of elBtnIconMDC) {
        btnIconMDC.style.borderRadius = '50%';
        ripple.MDCRipple.attachTo(btnIconMDC);
        btnIconMDC.classList.add('mdc-ripple-surface');
      }
    }
  });

  // const toggleBtns = document.querySelectorAll('.dropdown-toggle');
  // const iconBtns = document.querySelectorAll('.btn-icon, .btn-close, .btn-edit');
  // const iconBtnClasses = Array.from(iconBtns).map(btn => btn.classList);
  // const iconBtnSelectors = iconBtnClasses.map(clsList => `[class*="${clsList}"]`).join(',');
  // const defButtons = document.querySelectorAll(`[class*="btn"]:not(${iconBtnSelectors}):not(.dropdown-toggle)`);
  // const defButtonClasses = Array.from(defButtons).map(btn => btn.classList);
  //
  // for (const button of defButtons) {
  //   const classList = Array.from(button.classList);
  //   if (classList.some(cls => defButtonClasses.some(clsList => clsList.contains(cls))) && !Array.from(toggleBtns).some(cls => button.classList.contains(cls))) {
  //     button.classList.add('mdc-ripple-surface');
  //     MDCRipple.attachTo(button);
  //   }
  // }
  //
  // for (const dropdownBtn of toggleBtns) {
  //   const mdcEl = document.createElement('span')
  //   mdcEl.classList.add('mdc-ripple-surface')
  //   dropdownBtn.append(mdcEl)
  //   MDCRipple.attachTo(dropdownBtn);
  // }
  //
  // for (const iconBtn of iconBtns) {
  //   const mdcEl = document.createElement('span')
  //   mdcEl.classList.add('mdc-ripple-surface')
  //   iconBtn.append(mdcEl)
  //   MDCRipple.attachTo(iconBtn);
  // }

  return MDCRippled;

}));
//# sourceMappingURL=mdc-rippled.js.map
