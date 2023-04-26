/*!
  * Bootstrap mdc-ripple.js v5.3.0-alpha3 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@material/ripple'), require('./util/index.js')) :
  typeof define === 'function' && define.amd ? define(['@material/ripple', './util/index'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MdcRipple = factory(global["@material/ripple"], global.Index));
})(this, (function (ripple, index_js) { 'use strict';

  const NAME = 'mdc.ripple';
  class MDCRippled {
    constructor(element) {
      this.root = element;
      this.active = false;
      this.root.addEventListener('keydown', evt => {
        if (isSpace(evt)) {
          this.active = true;
        }
      });
      this.root.addEventListener('keyup', evt => {
        if (isSpace(evt)) {
          this.active = false;
        }
      });
      this.root.addEventListener('mouseenter', evt => {
        if (isSpace(evt)) {
          this.active = false;
        }
      });
      this.root.addEventListener('mouseleave', evt => {
        if (isSpace(evt)) {
          this.active = false;
        }
      });
      const foundation = new ripple.MDCRippleFoundation({
        ...ripple.MDCRipple.createAdapter(this),
        isSurfaceActive: () => this.active
      });
      this.ripple = new ripple.MDCRipple(this.root, foundation);
    }
    static get NAME() {
      return NAME;
    }
  }
  function isSpace(evt) {
    return evt.key === ' ' || evt.keyCode === 32;
  }
  index_js.onDOMContentLoaded(() => {
    const $ = index_js.getjQuery();
    if ($) {
      const JQUERY_NO_CONFLICT = $.fn[NAME];
      $.fn[NAME] = MDCRippled.jQueryInterface;
      $.fn[NAME].Constructor = MDCRippled;
      $.fn[NAME].noConflict = () => {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return MDCRippled.jQueryInterface;
      };
    }
  });
  function addClassToElementsWithClassText(classText, classToAdd, options = {
    targetClass: '',
    excludeClasses: []
  }) {
    const {
      targetClass,
      excludeClasses
    } = options;
    const excludeSelectors = excludeClasses.map(excludeClass => {
      return `:not([class^="${excludeClass}-"][class$="-"], [class*=" ${excludeClass} "]:not([class*=" ${excludeClass}-"]), [class$="${excludeClass}"]:not([class*="-"])`;
    });
    const elements = document.querySelectorAll(`[class*="${classText}"]${excludeSelectors.join('')}`);
    for (const element of elements) {
      if (targetClass && element.classList.contains(targetClass)) {
        if (excludeClasses.some(excludeClass => element.classList.contains(excludeClass))) {
          const newElement = document.createElement('div');
          newElement.classList.add('ripple-surface');
          element.append(newElement);
        } else {
          element.classList.add(classToAdd);
        }
      } else {
        element.classList.add(classToAdd);
      }
    }
  }
  addClassToElementsWithClassText('btn', 'mdc-ripple-surface', {
    targetClass: '',
    excludeClasses: ['btn-toolbar', 'dropdown-toggle', 'btn-group']
  });

  return MDCRippled;

}));
//# sourceMappingURL=mdc-ripple.js.map
