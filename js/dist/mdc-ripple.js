/*!
  * Bootstrap mdc-ripple.js v5.3.0-alpha3 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@material/ripple')) :
  typeof define === 'function' && define.amd ? define(['@material/ripple'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MdcRipple = factory(global["@material/ripple"]));
})(this, (function (ripple) { 'use strict';

  const NAME = 'bs.ripple';
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
      if (this.root.MDCRippled instanceof MDCRippled) {
        // An instance of this class already exists for this element
        return this.root.MDCRippled;
      }

      // Create a new instance of this class for this element
      const foundation = new ripple.MDCRippleFoundation({
        ...ripple.MDCRipple.createAdapter(this),
        isSurfaceActive: () => this.active
      });
      this.ripple = new ripple.MDCRipple(this.root, foundation);
      this.root.MDCRippled = this;

      // const foundation = new MDCRippleFoundation({
      //   ...MDCRipple.createAdapter(this), isSurfaceActive: () => this.active
      // })
      // this.ripple = new MDCRipple(this.root, foundation)
    }

    static get NAME() {
      return NAME;
    }
  }
  function isSpace(evt) {
    return evt.key === ' ' || evt.keyCode === 32;
  }
  function addClassToElementsWithClassText(classText, classToAdd, options = {
    targetClass: [],
    excludeClasses: []
  }) {
    const {
      targetClass,
      excludeClasses
    } = options;
    const excludeSelectors = excludeClasses.map(excludeClass => {
      return `:not(.${excludeClass}), :not(div[class*="${classText}-"])`;
    });
    const primarySelector = document.querySelectorAll(`[class*="${classText}"]${excludeSelectors.join('')}`);
    const excludeElements = document.querySelectorAll(`.${excludeClasses.join('.')}`);
    for (const elementSelector of primarySelector) {
      window.addEventListener('load', () => {
        if ((elementSelector.classList.contains(classText) || targetClass.some(cls => elementSelector.classList.contains(cls))) && !excludeClasses.some(cls => elementSelector.classList.contains(cls))) {
          elementSelector.classList.add(classToAdd);
          elementSelector.unbounded = true;
          return new MDCRippled(elementSelector);
        }
      });
    }
    for (const excludeElement of excludeElements) {
      const childElementExclude = document.createElement('div');
      childElementExclude.classList.add('ripple-surface');
      excludeElement.append(childElementExclude);
    }
    for (const classNameTarget of targetClass) {
      const elementsWithClassTarget = document.querySelectorAll(`.${classNameTarget}`);
      for (const elementClassTarget of elementsWithClassTarget) {
        elementClassTarget.style.borderRadius = '50%';
      }
    }
  }
  addClassToElementsWithClassText('btn', 'mdc-ripple-surface', {
    targetClass: ['btn-close', 'btn-icon', 'btn-edit', 'btn-clipboard', 'navbar-toggler'],
    excludeClasses: ['dropdown-toggle']
  });

  return MDCRippled;

}));
//# sourceMappingURL=mdc-ripple.js.map
