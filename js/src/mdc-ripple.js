import { MDCRipple, MDCRippleFoundation } from '@material/ripple'
import { getjQuery, onDOMContentLoaded } from './util/index.js'

const NAME = 'mdc.ripple'

class MDCRippled {
  constructor(element) {
    this.root = element
    this.active = false
    this.root.addEventListener('keydown', evt => {
      if (isSpace(evt)) {
        this.active = true
      }
    })
    this.root.addEventListener('keyup', evt => {
      if (isSpace(evt)) {
        this.active = false
      }
    })
    this.root.addEventListener('mouseenter', evt => {
      if (isSpace(evt)) {
        this.active = false
      }
    })
    this.root.addEventListener('mouseleave', evt => {
      if (isSpace(evt)) {
        this.active = false
      }
    })
    const foundation = new MDCRippleFoundation({
      ...MDCRipple.createAdapter(this), isSurfaceActive: () => this.active
    })
    this.ripple = new MDCRipple(this.root, foundation)
  }

  static get NAME() {
    return NAME
  }
}

function isSpace(evt) {
  return evt.key === ' ' || evt.keyCode === 32
}

onDOMContentLoaded(() => {
  const $ = getjQuery()

  if ($) {
    const JQUERY_NO_CONFLICT = $.fn[NAME]
    $.fn[NAME] = MDCRippled.jQueryInterface
    $.fn[NAME].Constructor = MDCRippled
    $.fn[NAME].noConflict = () => {
      $.fn[NAME] = JQUERY_NO_CONFLICT
      return MDCRippled.jQueryInterface
    }
  }
})

function addClassToElementsWithClassText(classText, classToAdd, options = {
  targetClass: '',
  excludeClasses: []
}) {
  const { targetClass, excludeClasses } = options

  const excludeSelectors = excludeClasses.map(excludeClass => {
    return `:not([class^="${excludeClass}-"][class$="-"], [class*=" ${excludeClass} "]:not([class*=" ${excludeClass}-"]), [class$="${excludeClass}"]:not([class*="-"])`
  })

  const elements = document.querySelectorAll(`[class*="${classText}"]${excludeSelectors.join('')}`)
  for (const element of elements) {
    if (targetClass && element.classList.contains(targetClass)) {
      if (excludeClasses.some(excludeClass => element.classList.contains(excludeClass))) {
        const newElement = document.createElement('div')
        newElement.classList.add('ripple-surface')
        element.append(newElement)
      } else {
        element.classList.add(classToAdd)
      }
    } else {
      element.classList.add(classToAdd)
    }
  }
}

addClassToElementsWithClassText('btn', 'mdc-ripple-surface', {
  targetClass: '   ',
  excludeClasses: ['btn-toolbar', 'dropdown-toggle', 'btn-group']
})

//
// function addClassToElementsWithClassText(classText, classToAdd, options = {
//   targetClass: '',
//   excludeTargetClass: [],
//   excludeClasses: []
// }) {
//   const { targetClass, excludeTargetClass, excludeClasses } = options
//
//   const excludeSelectors = excludeClasses.map(excludeClass => {
//     return `:not([class^="${excludeClass}-"][class$="-"], [class*=" ${excludeClass} "]:not([class*=" ${excludeClass}-"]), [class$="${excludeClass}"]:not([class*="-"]), .mdc-ripple-surface`
//   })
//
//   const elements = document.querySelectorAll(`[class*="${classText}"]${excludeSelectors.join('')}`)
//   for (const element of elements) {
//     if (element.classList.contains('mdc-ripple-surface')) {
//       continue // skip element with 'mdc-ripple-surface' class
//     }
//     if (excludeClasses.some(cls => element.classList.contains(cls))) {
//       const newElement = document.createElement('div')
//       newElement.classList.add('ripple-surface')
//       element.append(newElement)
//     } else {
//       element.classList.add(classToAdd)
//     }
//   }
// }
// function addClassToElementsWithClassText(classText, classToAdd, options = {
//   targetClass: '',
//   excludeTargetClass: '',
//   excludeClasses: []
// }) {
//   const { targetClass, excludeTargetClass, excludeClasses } = options
//
//   const excludeSelectors = excludeClasses.map(excludeClass => {
//     return `:not(.${excludeClass})`
//   })
//
//   const elements = document.querySelectorAll(`[class*="${classText}"]${excludeSelectors.join('')}`)
//   for (const element of elements) {
//     if (element.classList.contains('mdc-ripple-surface')) {
//       continue
//     }
//     if (targetClass && element.classList.contains(targetClass) && !element.classList.contains(excludeTargetClass)) {
//       const newElement = document.createElement('div')
//       newElement.classList.add('ripple-surface')
//       element.append(newElement)
//     } else if (!excludeClasses.some(cls => element.classList.contains(cls))) {
//       element.classList.add(classToAdd)
//     }
//   }
// }

// function addClassToElementsWithClassText(classText, classToAdd, options = {
//   targetClass: '',
//   excludeTargetClass: '',
//   excludeClasses: []
// }) {
//   const { targetClass, excludeTargetClass, excludeClasses } = options
//
//   const excludeSelectors = excludeClasses.map(excludeClass => {
//     return `:not(.${excludeClass})`
//   })
//
//
//   const elements = document.querySelectorAll(`[class*="${classText}"]${excludeSelectors.join('')}`)
//   for (const element of elements) {
//     if (excludeClasses.some(cls => element.classList.contains(cls))) {
//       let newElement = element.querySelector('.ripple-surface')
//       if (!newElement) {
//         newElement = document.createElement('div')
//         newElement.classList.add('ripple-surface')
//         element.append(newElement)
//       }
//     } else {
//
//     }
//   }
// }
//
// addRippleToElementsWithClassText('btn', 'mdc-ripple-surface', {
//   excludeClasses: ['dropdown-toggle', 'btn-group', 'btn-group-vertical', 'btn-check', 'btn-toolbar']
// })

// function addRippleToElements(selector, classesToAdd) {
// addToCreatedElementsClass('[class*="btn-"]', 'ripple-surface position-relative')
//   const elements = document.querySelectorAll(selector)
//   for (const element of elements) {
//     window.addEventListener('load', () => {
//       element.unbounded = true
//       for (const className of classesToAdd.split(' ')) {
//         element.classList.add(className.trim())
//       }
//
//       return new MDCRipple(element)
//     })
//   }
// }
//
// addRippleToElements('[class*="btn-"]', 'ripple-surface position-relative')

// const buttonEls = Array.from(mainEl.querySelectorAll('.mdc-button, .mdc-fab'))
// buttonEls.forEach((el) => mdc.ripple.MDCRipple.attachTo(el))
// const btnIconElements = document.querySelectorAll('a[class="btn-close"][class="btn-icon"], button[class="btn-close"][class="btn-icon"]')
// const btnElements = document.querySelectorAll('a[class="btn"], button[class*="btn"]')
//
// for (const btnIconElement of btnIconElements) {
//   window.addEventListener('load', () => {
//     btnIconElement.unbounded = true
//     btnIconElement.classList.add('mdc-icon-button')
//     // btnElement.classList.add('mdc-button')
//     return new MDCRipple(btnIconElement)
//   })
// }

export default MDCRippled
