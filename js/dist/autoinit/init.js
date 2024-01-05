/*!
  * Bootstrap init.js v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2024 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('../dom/selector-engine.js'), require('../util/index.js')) :
  typeof define === 'function' && define.amd ? define(['exports', '../dom/selector-engine', '../util/index'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Init = {}, global.SelectorEngine, global.Index));
})(this, (function (exports, SelectorEngine, index_js) { 'use strict';

  const mapComponentsData = (() => {
    const componentsData = [];
    return {
      set(componentName) {
        componentsData.push(componentName);
      },
      get(componentName) {
        return componentsData.includes(componentName);
      }
    };
  })();
  const InitializedComponents = {
    set(componentName) {
      mapComponentsData.set(componentName);
    },
    get(componentName) {
      return mapComponentsData.get(componentName);
    }
  };
  const isInitialized = componentName => {
    return InitializedComponents.get(componentName);
  };
  const bindCallbackEventsIfNeeded = component => {
    if (!isInitialized(component.NAME)) {
      const manualInit = true;
      initComponent(component, manualInit);
    }
  };
  const initComponent = (component, manualInit = false) => {
    if (!component || InitializedComponents.get(component.NAME)) {
      return;
    }
    InitializedComponents.set(component.NAME);
    const thisComponent = _defaultInitSelectors[component.NAME] || null;
    const isToggler = (thisComponent == null ? void 0 : thisComponent.isToggler) || false;
    index_js.defineJQueryPlugin(component);
    if (thisComponent != null && thisComponent.advanced) {
      thisComponent.advanced(component, thisComponent == null ? void 0 : thisComponent.selector);
      return;
    }
    if (isToggler) {
      thisComponent.callback(component, thisComponent == null ? void 0 : thisComponent.selector);
      return;
    }
    if (manualInit) {
      return;
    }
    SelectorEngine.find(thisComponent == null ? void 0 : thisComponent.selector).forEach(element => {
      let instance = component.getInstance(element);
      if (!instance) {
        instance = new component(element); // eslint-disable-line
        if (thisComponent != null && thisComponent.onInit) {
          instance[thisComponent.onInit]();
        }
      }
    });
  };
  let _defaultInitSelectors;
  class InitBS {
    constructor(defaultInitSelectors) {
      this.init = components => {
        components.forEach(component => initComponent(component));
      };
      this.initBS = (components, checkOtherImports = false) => {
        const componentList = Object.keys(_defaultInitSelectors).map(element => {
          const requireAutoInit = Boolean(document.querySelector(_defaultInitSelectors[element].selector));
          if (requireAutoInit) {
            const component = components[_defaultInitSelectors[element].name];
            if (!component && !InitializedComponents.get(element) && checkOtherImports) {
              // eslint-disable-next-line no-console
              console.warn(`Please import ${_defaultInitSelectors[element].name} from "BS" package and add it to a object parameter inside "initBS" function`);
            }
            return component;
          }
          return null;
        });
        this.init(componentList);
      };
      _defaultInitSelectors = defaultInitSelectors;
    }
  }

  exports.InitBS = InitBS;
  exports.InitializedComponents = InitializedComponents;
  exports.bindCallbackEventsIfNeeded = bindCallbackEventsIfNeeded;

  Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

}));
//# sourceMappingURL=init.js.map
