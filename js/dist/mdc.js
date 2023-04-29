/*!
  * Bootstrap mdc.js v5.3.0-alpha3 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@material/ripple'), require('@material/dom/events'), require('@material/dom/classlist')) :
  typeof define === 'function' && define.amd ? define(['@material/ripple', '@material/dom/events', '@material/dom/classlist'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Mdc = factory(global["@material/ripple"], global["@material/dom/events"], global["@material/dom/classlist"]));
})(this, (function (ripple, events, classlist) { 'use strict';

  class BSMDCRipple {
    constructor(element) {
      this.element = element;
      this.disabled = false;

      // Initialize MDCFoundation
      this.foundation = new ripple.MDCRippleFoundation({
        addClass: className => classlist.addClass(this.element, className),
        browserSupportsCssVars() {
          return window.CSS && CSS.supports && CSS.supports('box-shadow', 'var(--mdc-ripple-left) var(--mdc-ripple-top) 0 0 var(--mdc-ripple-color)');
        },
        computeBoundingRect: () => {
          return this.element.getBoundingClientRect();
        },
        containsEventTarget: target => this.element.contains(target),
        deregisterDocumentInteractionHandler: (evtType, handler) => document.documentElement.removeEventListener(evtType, handler, events.applyPassive()),
        deregisterInteractionHandler: (evtType, handler) => this.element.removeEventListener(evtType, handler, events.applyPassive()),
        deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
        getWindowPageOffset: () => ({
          x: window.pageXOffset,
          y: window.pageYOffset
        }),
        isSurfaceActive: () => this.element[FIRST_CHAR_LOWERCASED_METHOD_NAMES.mousedown] || this.element[FIRST_CHAR_LOWERCASED_METHOD_NAMES.touchstart],
        isSurfaceDisabled: () => this.disabled,
        registerDocumentInteractionHandler: (evtType, handler) => document.documentElement.addEventListener(evtType, handler, events.applyPassive()),
        registerInteractionHandler: (evtType, handler) => this.element.addEventListener(evtType, handler, events.applyPassive()),
        registerResizeHandler: handler => window.addEventListener('resize', handler),
        removeClass: className => classlist.removeClass(this.element, className),
        updateCssVariable: (varName, value) => this.element.style.setProperty(varName, value)
      });
      this.foundation.init();
    }
    destroy() {
      // Destroy MDCFoundation
      this.foundation.destroy();
      // Remove ripple classes from element
      classlist.removeClass(this.element, 'mdc-ripple-upgraded', 'mdc-ripple');
      // Remove ripple attributes from element
      this.element.removeAttribute('data-mdc-ripple-is-unbounded');
      this.element.removeAttribute('data-mdc-ripple-fg-size');
      this.element.removeAttribute('data-mdc-ripple-fg-scale');
      this.element.removeAttribute('data-mdc-ripple-fg-translate');
      this.element.removeAttribute('data-mdc-ripple-left');
      this.element.removeAttribute('data-mdc-ripple-top');
    }
    static attachTo(root) {
      return new BSMDCRipple(root);
    }
  }

  return BSMDCRipple;

}));
//# sourceMappingURL=mdc.js.map
