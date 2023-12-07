import {getBaseColor, getPrimaryColor} from './util/color.js'
import BaseComponent from './base-component.js'
import {defineJQueryPlugin} from './util/index.js'

/**
 * Constants
 */
const NAME = 'textfield'
const CLASS_NAME_FLOATING = 'floating-label'
const CLASS_NAME_FLOATING_OUTLINED = 'floating-label-ripple'
const LABEL_SCALE = 0.85

class TextField extends BaseComponent {
  constructor(element) {
    super(element)
    this._textField = element
    this._formFloating = element.closest(`[class*="${CLASS_NAME_FLOATING}"]`)

    if (this._textField && this._formFloating) {
      this.initTextFields()
      this.addFontsReadyEvent()
    }
  }

  static get NAME() {
    return NAME
  }
  static jQueryInterface(config) {
    return this.each(function () {
      const data = TextField.getOrCreateInstance(this)

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`)
        }

        data[config](this)
      }
    })
  }
  initTextFields() {
    const baseColor = getBaseColor(this._formFloating)
    const primaryColor = getPrimaryColor(this._formFloating)

    if (baseColor) {
      this._formFloating.style.setProperty('--bs-floating-label-border-color', baseColor)
    }

    if (primaryColor) {
      this._formFloating.style.setProperty('--bs-floating-label-active-border-color', primaryColor)
    }

    this._label = this._formFloating.querySelector('label')
    this._inputGroup = this._formFloating.closest('.input-group')

    if (this._inputGroup) {
      if (this._formFloating.className.includes(CLASS_NAME_FLOATING_OUTLINED)) {
        this._inputGroup.classList.add('has-floating-label-ripple')
      } else {
        this._inputGroup.classList.add('has-floating-label')
      }
    }

    this._formFloatingWithIcon = this._formFloating.closest('.floating-label-with-icon')

    if (this._formFloatingWithIcon) {
      this._prepend = this._formFloatingWithIcon.querySelector('.prepend')
      this._append = this._formFloatingWithIcon.querySelector('.append')
    }

    if (this._prepend) {
      this._label.style.paddingLeft = 0
    }

    if (this._formFloating.className.includes(CLASS_NAME_FLOATING_OUTLINED)) {
      this.addRipple()
    } else {
      this.addNotch()
    }
  }

  redraw() {
    if (this._label) {
      this._formFloating.style.setProperty('--floating-label-margin-right', `-${this._label.offsetWidth - (this._label.offsetWidth * LABEL_SCALE)}px`)
    }

    this.addFontsReadyEvent()
  }

  addRipple() {
    const ripple = document.createElement('div')
    ripple.className = 'm-line-ripple'

    this._ripple = ripple
    this._textField.after(ripple)
  }

  addNotch() {
    const notch = document.createElement('div')
    notch.className = 'm-notch'

    const notchBefore = document.createElement('div')
    notchBefore.className = 'm-notch-before'

    const notchBetween = document.createElement('div')
    notchBetween.className = 'm-notch-between'

    const notchAfter = document.createElement('div')
    notchAfter.className = 'm-notch-after'

    notch.append(notchBefore)
    notch.append(notchBetween)
    notch.append(notchAfter)

    this._textField.after(notch)
    this._notch = notch

    if (this._label) {
      notchBetween.append(this._label)
      this._formFloating.style.setProperty('--floating-label-margin-right', `-${this._label.offsetWidth - (this._label.offsetWidth * LABEL_SCALE)}px`)
    }
  }

  addFontsReadyEvent() {
    document.fonts.ready.then(() => {
      if (this._formFloatingWithIcon) {
        if (this._prepend) {
          this._prepend.style.height = `${this._textField.offsetHeight}px`
          this._formFloating.style.setProperty('--prepend-width', `${this._prepend.offsetWidth}px`)
        }

        if (this._append) {
          this._append.style.height = `${this._textField.offsetHeight}px`
          this._formFloating.style.setProperty('--append-width', `${this._append.offsetWidth}px`)
        }
      }
    })
  }
}

defineJQueryPlugin(TextField)
export default TextField

const textFieldList = Array.prototype.slice.call(document.querySelectorAll('.form-control, .form-select'))
textFieldList.map(textField => {
  return new TextField(textField)
})
