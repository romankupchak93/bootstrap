/*!
  * Bootstrap material-ripple.js v5.3.0-alpha1 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@material/ripple'), require('./util/index.js'), require('./dom/event-handler.js'), require('./dom/selector-engine.js'), require('./base-component.js')) :
  typeof define === 'function' && define.amd ? define(['@material/ripple', './util/index', './dom/event-handler', './dom/selector-engine', './base-component'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MaterialRipple = factory(global["@material/ripple"], global.Index, global.EventHandler, global.SelectorEngine, global.BaseComponent));
})(this, (function (ripple, index_js, EventHandler, SelectorEngine, BaseComponent) { 'use strict';

  /**
   * --------------------------------------------------------------------------
   * Bootstrap material ripple.js
   * --------------------------------------------------------------------------
   */
  const NAME = 'ripple';
  const DATA_KEY = 'bs.ripple';
  const EVENT_KEY = `.${DATA_KEY}`;
  const DATA_API_KEY = '.data-api';
  const CLASS_NAME_RIPPLE = 'ripple-surface';
  const SELECTOR_COMPONENT = '.btn, .accordion-button, a.list-group-item, a.dropdown-item';
  const SELECTOR_COMPONENT_UNBOUNDED = '.btn-close, .btn-icon, .navbar-toggler';
  const SELECTOR_DATA_TIP = '.btn:not([data-bs-toggle="tooltip"])';
  const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]';
  const SELECTOR_COMPONENTS = `${SELECTOR_COMPONENT}, ${SELECTOR_DATA_TIP}, ${SELECTOR_DATA_TOGGLE}, ${SELECTOR_COMPONENT_UNBOUNDED}`;
  const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`;

  /**
   * Class definition
   */
  class MaterialRipple extends BaseComponent {
    constructor(element) {
      super(element);
      this._element = element;
      this._ripple = null;
      this._init();
    }

    // Getters
    static get NAME() {
      return NAME;
    }
    _init() {
      if (!this._element || this._element.tagName.toLowerCase() === 'input') {
        return;
      }
      this._activate(this._element);
    }
    dispose() {
      if (this._ripple) {
        this._ripple.destroy();
        this._ripple = null;
      }
      super.dispose();
    }
    _checkInstance(element) {
      const instance = MaterialRipple.getInstance(element);
      if (instance) {
        instance.dispose();
      }
    }
    _activate(element) {
      this._checkInstance(element);
      const rippleContainer = document.createElement('div');
      rippleContainer.classList.add(CLASS_NAME_RIPPLE);
      element.appendChild(rippleContainer);
      this._setRipple(element, rippleContainer);
    }
    _setRipple(element, rippleContainer) {
      this._ripple = new ripple.MDCRipple(rippleContainer);
      this._isUnbounded(element);
    }
    _isUnbounded(element) {
      const isUnbound = element.matches(SELECTOR_COMPONENT_UNBOUNDED);
      if (isUnbound) {
        this._ripple.unbounded = true;
      }
    }

    // Static
    static jQueryInterface(config) {
      return this.each(function () {
        const data = MaterialRipple.getOrCreateInstance(this);
        if (typeof config !== 'string') {
          return;
        }
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`);
        }
        data[config]();
      });
    }
  }

  /**
   * Data API implementation
   */
  EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
    const rippleSurfaces = SelectorEngine.find(SELECTOR_COMPONENTS);
    for (const surface of rippleSurfaces) {
      MaterialRipple.getOrCreateInstance(surface);
    }
  });
  /**
   * jQuery
   */
  index_js.defineJQueryPlugin(MaterialRipple);

  // import {MDCRipple} from '@material/ripple';
  // import {MDCRippleFoundation} from '@material/ripple/foundation';
  // import {onDOMContentLoaded} from './util/index';
  //
  // class MaterialRipple extends MDCRipple {
  //   constructor(element) {
  //     super(element, new MDCRippleFoundation({adapter: {}}));
  //   }
  // }
  //
  // onDOMContentLoaded(() => {
  //   const classText = ['btn']
  //   const btnIconClassList = ['btn-close', 'btn-icon', 'btn-edit', 'btn-clipboard', 'navbar-toggler']
  //   const dropClassList = ['dropdown-toggle']
  //
  //   const dropSelectors = dropClassList.map(dropClass => {
  //     return `:not(.${dropClass}), :not(.${dropClass}), :not(div[class*="${classText}-"])`
  //   })
  //
  //   const primarySelector = document.querySelectorAll(`[class*="${classText}"]${dropSelectors.join('')}`)
  //   const dropClassListElements = document.querySelectorAll(`.${dropClassList.join('.')}`)
  //
  //   for (const elementSelector of primarySelector) {
  //     if ((elementSelector.classList.contains(classText) || btnIconClassList.some(cls => elementSelector.classList.contains(cls))) && !dropClassList.some(cls => elementSelector.classList.contains(cls))) {
  //       elementSelector.classList.add('mdc-ripple-surface')
  //       MDCRipple.attachTo(elementSelector);
  //     }
  //   }
  //   for (const dropElement of dropClassListElements) {
  //     if (dropElement.classList.contains(classText) && dropClassList.some(cls => dropElement.classList.contains(cls))) {
  //       const childElementDrop = document.createElement('div')
  //       childElementDrop.classList.add('mdc-ripple-surface')
  //       dropElement.append(childElementDrop)
  //     }
  //   }
  //   for (const btnWithIconMDC of btnIconClassList) {
  //     const elBtnIconMDC = document.querySelectorAll(`.${btnWithIconMDC}`)
  //     for (const btnIconMDC of elBtnIconMDC) {
  //       btnIconMDC.style.borderRadius = '50%'
  //       MDCRipple.attachTo(btnIconMDC);
  //       btnIconMDC.classList.add('mdc-ripple-surface')
  //     }
  //   }
  // })
  // export default MaterialRipple
  //
  // // const toggleBtns = document.querySelectorAll('.dropdown-toggle');
  // // const iconBtns = document.querySelectorAll('.btn-icon, .btn-close, .btn-edit');
  // // const iconBtnClasses = Array.from(iconBtns).map(btn => btn.classList);
  // // const iconBtnSelectors = iconBtnClasses.map(clsList => `[class*="${clsList}"]`).join(',');
  // // const defButtons = document.querySelectorAll(`[class*="btn"]:not(${iconBtnSelectors}):not(.dropdown-toggle)`);
  // // const defButtonClasses = Array.from(defButtons).map(btn => btn.classList);
  // //
  // // for (const button of defButtons) {
  // //   const classList = Array.from(button.classList);
  // //   if (classList.some(cls => defButtonClasses.some(clsList => clsList.contains(cls))) && !Array.from(toggleBtns).some(cls => button.classList.contains(cls))) {
  // //     button.classList.add('mdc-ripple-surface');
  // //     MDCRipple.attachTo(button);
  // //   }
  // // }
  // //
  // // for (const dropdownBtn of toggleBtns) {
  // //   const mdcEl = document.createElement('span')
  // //   mdcEl.classList.add('mdc-ripple-surface')
  // //   dropdownBtn.append(mdcEl)
  // //   MDCRipple.attachTo(dropdownBtn);
  // // }
  // //
  // // for (const iconBtn of iconBtns) {
  // //   const mdcEl = document.createElement('span')
  // //   mdcEl.classList.add('mdc-ripple-surface')
  // //   iconBtn.append(mdcEl)
  // //   MDCRipple.attachTo(iconBtn);
  // // }

  return MaterialRipple;

}));
//# sourceMappingURL=material-ripple.js.map
