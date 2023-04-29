import { MDCRippleFoundation } from '@material/ripple'
import { applyPassive } from '@material/dom/events'
import { addClass, removeClass } from '@material/dom/classlist'
class BSMDCRipple {
  constructor(element) {
    this.element = element
    this.disabled = false

    // Initialize MDCFoundation
    this.foundation = new MDCRippleFoundation({
      addClass: className => addClass(this.element, className),
      browserSupportsCssVars() {
        return window.CSS && CSS.supports && CSS.supports('box-shadow', 'var(--mdc-ripple-left) var(--mdc-ripple-top) 0 0 var(--mdc-ripple-color)')
      },
      computeBoundingRect: () => {
        return this.element.getBoundingClientRect()
      },
      containsEventTarget: target => this.element.contains(target),
      deregisterDocumentInteractionHandler: (evtType, handler) => document.documentElement.removeEventListener(evtType, handler, applyPassive()),
      deregisterInteractionHandler: (evtType, handler) => this.element.removeEventListener(evtType, handler, applyPassive()),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      getWindowPageOffset: () => ({
        x: window.pageXOffset,
        y: window.pageYOffset
      }),
      isSurfaceActive: () => this.element[FIRST_CHAR_LOWERCASED_METHOD_NAMES.mousedown] || this.element[FIRST_CHAR_LOWERCASED_METHOD_NAMES.touchstart],
      isSurfaceDisabled: () => this.disabled,
      registerDocumentInteractionHandler: (evtType, handler) => document.documentElement.addEventListener(evtType, handler, applyPassive()),
      registerInteractionHandler: (evtType, handler) => this.element.addEventListener(evtType, handler, applyPassive()),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      removeClass: className => removeClass(this.element, className),
      updateCssVariable: (varName, value) => this.element.style.setProperty(varName, value)
    })

    this.foundation.init()
  }

  destroy() {
    // Destroy MDCFoundation
    this.foundation.destroy()
    // Remove ripple classes from element
    removeClass(this.element, 'mdc-ripple-upgraded', 'mdc-ripple')
    // Remove ripple attributes from element
    this.element.removeAttribute('data-mdc-ripple-is-unbounded')
    this.element.removeAttribute('data-mdc-ripple-fg-size')
    this.element.removeAttribute('data-mdc-ripple-fg-scale')
    this.element.removeAttribute('data-mdc-ripple-fg-translate')
    this.element.removeAttribute('data-mdc-ripple-left')
    this.element.removeAttribute('data-mdc-ripple-top')
  }

  static attachTo(root) {
    return new BSMDCRipple(root)
  }
}
export default BSMDCRipple
