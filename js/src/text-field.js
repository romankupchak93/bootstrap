/**
 * --------------------------------------------------------------------------
 * Material Style (v3.0.0): text_field.js
 * Licensed under MIT (https://github.com/materialstyle/materialstyle/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

import {
  getBaseColor, getPrimaryColor
} from './util/color.js'
import BaseComponent from './base-component.js'
import { defineJQueryPlugin } from './util/index.js'
// import 'detect-autofill'

/**
 * --------------------------------------------------------------------------
 * Constants
 * --------------------------------------------------------------------------
 */

const NAME = 'textfield'
const VERSION = '3.0.0'

const CLASS_NAME_FLOATING_MAIN = 'floating-label'
const CLASS_NAME_FLOATING_LINE = 'floating-label-line'

const LABEL_SCALE = 0.85

class TextField extends BaseComponent {
  constructor(element) {
    super(element)
    this._textField = element
    this._formFloating = element.closest(`.${CLASS_NAME_FLOATING_MAIN}`)

    if (this._textField && this._formFloating) {
      this.initTextFields()
      this.addFontsReadyEvent()
    }
  }

  static get NAME() {
    return NAME
  }

  static get VERSION() {
    return VERSION
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
    const baseColor = getBaseColor(this._textField)
    const primaryColor = getPrimaryColor(this._textField)
    const islined = this._textField.classList.contains(CLASS_NAME_FLOATING_LINE)

    if (baseColor) {
      this._textField.style.setProperty('--bs-form-field-border-color', baseColor)
    }

    if (primaryColor) {
      this._textField.style.setProperty('--bs-form-field-active-border-color', primaryColor)
    }

    this._label = this._textField.nextElementSibling
    this._inputGroup = this._textField.closest('.input-group')

    if (this._inputGroup) {
      if (islined) {
        this._inputGroup.classList.add('has-floating-label')
      } else {
        this._inputGroup.classList.add('has-floating-label-outlined')
      }
    }

    this._formFloatingWithIcon = this._textField.closest('.floating-label-with-icon')

    if (this._formFloatingWithIcon) {
      this._prepend = this._formFloatingWithIcon.querySelector('.prepend')
      this._append = this._formFloatingWithIcon.querySelector('.append')
    }

    if (this._prepend) {
      this._label.style.paddingLeft = 0
    }

    if (islined) {
      this.addRipple()
    } else {
      this.addNotch()
    }
  }

  // initTextFields() {
  //   const baseColor = getBaseColor(this._formFloating)
  //   const primaryColor = getPrimaryColor(this._formFloating)
  //   const formFloatingRipple = this._formFloating.nextElementSibling
  //
  //   if (baseColor) {
  //     this._formFloating.style.setProperty('--bs-form-field-border-color', baseColor)
  //   }
  //
  //   if (primaryColor) {
  //     this._formFloating.style.setProperty('--bs-form-field-active-border-color', primaryColor)
  //   }
  //
  //   this._label = this._formFloating.querySelector('label')
  //   this._inputGroup = this._formFloating.closest('.input-group')
  //
  //   if (this._inputGroup) {
  //     if (this._formFloating.className.includes(CLASS_NAME_FLOATING_LINE)) {
  //       this._inputGroup.classList.add('has-floating-label-lined')
  //     } else {
  //       this._inputGroup.classList.add('has-floating-label-outlined')
  //     }
  //   }
  //
  //   this._formFloatingWithIcon = this._formFloating.closest('.floating-label-with-icon')
  //
  //   if (this._formFloatingWithIcon) {
  //     this._prepend = this._formFloatingWithIcon.querySelector('.prepend')
  //     this._append = this._formFloatingWithIcon.querySelector('.append')
  //   }
  //
  //   if (this._prepend) {
  //     this._label.style.paddingLeft = 0
  //   }
  //   if (formFloatingRipple && formFloatingRipple.classList.contains('floating-label-ripple')) {
  //     this.addRipple()
  //   }
  //
  //   if (this._formFloating.className.includes(CLASS_NAME_FLOATING_MAIN)) {
  //     this.addNotch()
  //   }
  //   // else {
  //   //   this.addRipple()
  //   // }
  // }

  redraw() {
    if (this._label) {
      this._formFloating.style.setProperty('--label-floating-margin-right', `-${this._label.offsetWidth - (this._label.offsetWidth * LABEL_SCALE)}px`)
    }
    if (this._formFloating.className.includes(CLASS_NAME_FLOATING_MAIN)) {
      this._inputGroup.classList.add('has-floating-label-outlined')
    } else {
      this._inputGroup.classList.add('has-floating-label-lined')
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
      this._formFloating.style.setProperty('--label-floating-margin-right', `-${this._label.offsetWidth - (this._label.offsetWidth * LABEL_SCALE)}px`)
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
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

defineJQueryPlugin(TextField)

export default TextField
