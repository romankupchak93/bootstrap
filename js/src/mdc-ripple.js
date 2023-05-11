<<<<<<< Updated upstream
import { MDCRipple, MDCRippleFoundation } from '@material/ripple'

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
    if (this.root.MDCRippled instanceof MDCRippled) {
      // An instance of this class already exists for this element
      return this.root.MDCRippled
    }

    // Create a new instance of this class for this element
    const foundation = new MDCRippleFoundation({
      ...MDCRipple.createAdapter(this), isSurfaceActive: () => this.active
    })
    this.ripple = new MDCRipple(this.root, foundation)
    this.root.MDCRippled = this

    // const foundation = new MDCRippleFoundation({
    //   ...MDCRipple.createAdapter(this), isSurfaceActive: () => this.active
    // })
    // this.ripple = new MDCRipple(this.root, foundation)
  }
}

function isSpace(evt) {
  return evt.key === ' ' || evt.keyCode === 32
}

function addClassToElementsWithClassText(classText, classToAdd, options = {
  targetClass: [],
  excludeClasses: []
}) {
  const { targetClass, excludeClasses } = options

  const excludeSelectors = excludeClasses.map(excludeClass => {
    return `:not(.${excludeClass}), :not(div[class*="${classText}-"])`
  })

  const primarySelector = document.querySelectorAll(`[class*="${classText}"]${excludeSelectors.join('')}`)
  const excludeElements = document.querySelectorAll(`.${excludeClasses.join('.')}`)

  for (const elementSelector of primarySelector) {
    window.addEventListener('load', () => {
      if ((elementSelector.classList.contains(classText) || targetClass.some(cls => elementSelector.classList.contains(cls))) && !excludeClasses.some(cls => elementSelector.classList.contains(cls))) {
        elementSelector.classList.add(classToAdd)
        elementSelector.unbounded = true
        return new MDCRippled(elementSelector)
      }
    })
  }

  for (const excludeElement of excludeElements) {
    const childElementExclude = document.createElement('div')
    childElementExclude.classList.add('ripple-surface')
    excludeElement.append(childElementExclude)
  }

  for (const classNameTarget of targetClass) {
    const elementsWithClassTarget = document.querySelectorAll(`.${classNameTarget}`)
    for (const elementClassTarget of elementsWithClassTarget) {
      elementClassTarget.style.borderRadius = '50%'
    }
  }
}

addClassToElementsWithClassText('btn', 'mdc-ripple-surface', {
  targetClass: ['btn-close', 'btn-icon', 'btn-edit', 'btn-clipboard', 'navbar-toggler'],
  excludeClasses: ['dropdown-toggle']
=======
import { MDCRipple } from '@material/ripple'
import { MDCRippleFoundation } from '@material/ripple/foundation'
import { onDOMContentLoaded } from './util/index.js'

class MDCRippled extends MDCRipple {
  constructor(element) {
    super(element, new MDCRippleFoundation({ adapter: {} }))
  }
}

onDOMContentLoaded(() => {
  const classText = 'btn'
  const btnIconClassList = ['btn-close', 'btn-icon', 'btn-edit', 'btn-clipboard', 'navbar-toggler']

  const lineClassList = ['list-group-item', 'accordion-button']
  const dropClassList = ['dropdown-toggle']

  const primarySelector = document.querySelectorAll(`[class*="${classText}-"]:not(.${dropClassList.join(', .')}), .${classText}`)
  // const lineClassSelector = document.querySelectorAll(`.${lineClassList.join(',')}`)

  for (const elementSelector of primarySelector) {
    if (elementSelector.classList.contains(classText) &&
      !btnIconClassList.some(cls => elementSelector.classList.contains(cls)) &&
      !dropClassList.some(cls => elementSelector.classList.contains(cls))) {
      elementSelector.classList.add('mdc-ripple-surface')
      MDCRipple.attachTo(elementSelector)
    } else if ((elementSelector.classList.contains(classText) && dropClassList.some(cls => elementSelector.classList.contains(cls))) ||
      dropClassList.some(cls => elementSelector.classList.contains(cls))) {
      const childElementDrop = document.createElement('span')
      childElementDrop.classList.add('mdc-ripple-surface')
      elementSelector.append(childElementDrop)
      elementSelector.unbounded = true
      MDCRipple.attachTo(childElementDrop)
    }
  }

  for (const btnIconClassName of btnIconClassList) {
    const btnIconElements = document.querySelectorAll(`.${btnIconClassName}`)
    for (const btnIconEl of btnIconElements) {
      btnIconEl.style.borderRadius = '50%'
      btnIconEl.unbounded = true
      btnIconEl.classList.add('mdc-button-icon', 'mdc-ripple-surface')
      MDCRipple.attachTo(btnIconEl)
    }
  }

  for (const lineElementsClassName of lineClassList) {
    const lineClassElements = document.querySelectorAll(`.${lineElementsClassName}`)
    for (const lineElement of lineClassElements) {
      lineElement.unbounded = true
      lineElement.classList.add('mdc-ripple-surface')
      MDCRipple.attachTo(lineElement)
    }
  }
  // for (const lineElement of lineClassSelector) {
  //   const lineClassElements = document.querySelectorAll(`.${btnIconClassName}`)
  //   if (lineClassList.some(cls => lineElement.classList.contains(cls))) {
  //     MDCRipple.attachTo(lineElement)
  //     const childElementDrop = document.createElement('span')
  //     childElementDrop.classList.add('mdc-ripple-surface')
  //     lineElement.append(childElementDrop)
  //   }
  // }
>>>>>>> Stashed changes
})
export default MDCRippled
