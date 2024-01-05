/**
 * --------------------------------------------------------------------------
 * Bootstrap Ripple.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
import { MDCRipple } from '@material/ripple'
import BaseComponent from './base-component.js'
import EventHandler from './dom/event-handler.js'
import SelectorEngine from './dom/selector-engine.js'
import { defineJQueryPlugin } from './util/index.js'

const NAME = 'ripple'
const DATA_KEY = 'bs.ripple'
const EVENT_KEY = `.${DATA_KEY}`
const DATA_API_KEY = '.data-api'
const EVENT_LOAD_DATA_API = `load${EVENT_KEY}${DATA_API_KEY}`
const CLASS_NAME_RIPPLE = 'mdc-ripple-surface'

// const SELECTOR_NAV_LINK = '.nav-link'
// const NOT_SELECTOR_NAV_LINK = `:not(${SELECTOR_NAV_LINK})`
const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle'
const SELECTOR_COMPONENT_TAG_LINK = 'a.accordion-button, a.list-group-item'
const SELECTOR_COMPONENT_TAG_BUTTON = 'button.accordion-button, button.list-group-item'
const SELECTOR_COMPONENT = `.btn, ${SELECTOR_COMPONENT_TAG_LINK}, ${SELECTOR_COMPONENT_TAG_BUTTON}`
const SELECTOR_COMPONENT_UNBOUNDED = '.btn-close, .btn-icon, .navbar-toggler'
const SELECTOR_COMPONENTS = `${SELECTOR_COMPONENT}, ${SELECTOR_COMPONENT_UNBOUNDED}, ${SELECTOR_DROPDOWN_TOGGLE}`

const Default = {
  setActive: false,
  setUnbounded: false
}

const DefaultType = {
  setActive: '(boolean|string)',
  setUnbounded: '(boolean|string)'
}

class Ripple extends BaseComponent {
  constructor(element, config) {
    super(element, config)
    this._ripple = null
    this._element = element
    this._init()
  }

  static get Default() {
    return Default
  }

  static get DefaultType() {
    return DefaultType
  }

  static get NAME() {
    return NAME
  }

  _init() {
    if (!this._element || this._element.tagName.toLowerCase() === 'input') {
      return
    }

    this._activate(this._element)
  }

  dispose() {
    if (this._ripple) {
      this._ripple.destroy()
      this._ripple = null
    }

    super.dispose()
  }

  _checkInstance(element) {
    const instance = Ripple.getInstance(element)
    if (instance) {
      instance.dispose()
    }
  }

  _activate(element) {
    this._checkInstance(element)
    this._createElement(element)
  }

  _createElement(element) {
    const rippleContainer = document.createElement('div')
    rippleContainer.classList.add(CLASS_NAME_RIPPLE)
    element.append(rippleContainer)
    this._setRipple(element, rippleContainer)
  }

  _setRipple(element, rippleContainer) {
    this._ripple = new MDCRipple(rippleContainer)
    this._isUnbounded(element)
  }

  _isUnbounded(element) {
    const isUnbound = element.matches(SELECTOR_COMPONENT_UNBOUNDED)
    if (isUnbound) {
      this._ripple.unbounded = true
    }
  }

  static jQueryInterface(config) {
    return this.each(function () {
      const data = Ripple.getOrCreateInstance(this, config)

      if (typeof config === 'string') {
        if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config]()
      }
    })
  }
}

EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  const rippleSurfaces = SelectorEngine.find(SELECTOR_COMPONENTS)
  for (const surface of rippleSurfaces) {
    Ripple.getOrCreateInstance(surface)
  }
})

defineJQueryPlugin(Ripple)
export default Ripple
