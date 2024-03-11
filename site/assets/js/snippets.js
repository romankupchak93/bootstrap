// NOTICE!!! Initially embedded in our docs this JavaScript
// file contains elements that can help you create reproducible
// use cases in StackBlitz for instance.
// In a real project please adapt this content to your needs.
// ++++++++++++++++++++++++++++++++++++++++++

/*!
 * JavaScript for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 * For details, see https://creativecommons.org/licenses/by/3.0/.
 */

/* global bootstrap: false */

(() => {
  'use strict'

  // --------
  // Tooltips
  // --------
  // Instantiate all tooltips in a docs or StackBlitz
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
    .forEach(tooltip => {
      new bootstrap.Tooltip(tooltip)
    })

  // --------
  // Popovers
  // --------
  // Instantiate all popovers in docs or StackBlitz
  document.querySelectorAll('[data-bs-toggle="popover"]')
    .forEach(popover => {
      new bootstrap.Popover(popover)
    })

  // -------------------------------
  // Toasts
  // -------------------------------
  // Used by 'Placement' example in docs or StackBlitz
  const toastPlacement = document.getElementById('toastPlacement')
  if (toastPlacement) {
    document.getElementById('selectToastPlacement').addEventListener('change', function () {
      if (!toastPlacement.dataset.originalClass) {
        toastPlacement.dataset.originalClass = toastPlacement.className
      }

      toastPlacement.className = `${toastPlacement.dataset.originalClass} ${this.value}`
    })
  }

  // Instantiate all toasts in docs pages only
  document.querySelectorAll('.bd-example .toast')
    .forEach(toastNode => {
      const toast = new bootstrap.Toast(toastNode, {
        autohide: false
      })

      toast.show()
    })

  // Instantiate all toasts in docs pages only
  // js-docs-start live-toast
  const toastTrigger = document.getElementById('liveToastBtn')
  const toastLiveExample = document.getElementById('liveToast')

  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
      toastBootstrap.show()
    })
  }
  // js-docs-end live-toast

  // -------------------------------
  // Alerts
  // -------------------------------
  // Used in 'Show live alert' example in docs or StackBlitz

  // js-docs-start live-alert
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
  }

  const alertTrigger = document.getElementById('liveAlertBtn')
  if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
      appendAlert('Nice, you triggered this alert message!', 'success')
    })
  }
  // js-docs-end live-alert

  // --------
  // Carousels
  // --------
  // Instantiate all non-autoplaying carousels in docs or StackBlitz
  document.querySelectorAll('.carousel:not([data-bs-ride="carousel"])')
    .forEach(carousel => {
      bootstrap.Carousel.getOrCreateInstance(carousel)
    })

  // -------------------------------
  // Checks & Radios
  // -------------------------------
  // Indeterminate checkbox example in docs and StackBlitz
  document.querySelectorAll('.bd-example-indeterminate [type="checkbox"]')
    .forEach(checkbox => {
      if (checkbox.id.includes('Indeterminate')) {
        checkbox.indeterminate = true
      }
    })

  // -------------------------------
  // Links
  // -------------------------------
  // Disable empty links in docs examples only
  document.querySelectorAll('.bd-content [href="#"]')
    .forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault()
      })
    })

  // -------------------------------
  // Modal
  // -------------------------------
  // Modal 'Varying modal content' example in docs and StackBlitz
  // js-docs-start varying-modal-content
  const exampleModal = document.getElementById('exampleModal')
  if (exampleModal) {
    exampleModal.addEventListener('show.bs.modal', event => {
      // Button that triggered the modal
      const button = event.relatedTarget
      // Extract info from data-bs-* attributes
      const recipient = button.getAttribute('data-bs-whatever')
      // If necessary, you could initiate an Ajax request here
      // and then do the updating in a callback.

      // Update the modal's content.
      const modalTitle = exampleModal.querySelector('.modal-title')
      const modalBodyInput = exampleModal.querySelector('.modal-body input')

      modalTitle.textContent = `New message to ${recipient}`
      modalBodyInput.value = recipient
    })
  }
  // js-docs-end varying-modal-content

  // -------------------------------
  // Offcanvas
  // -------------------------------
  // 'Offcanvas components' example in docs only
  const myOffcanvas = document.querySelectorAll('.bd-example-offcanvas .offcanvas')
  if (myOffcanvas) {
    myOffcanvas.forEach(offcanvas => {
      offcanvas.addEventListener('show.bs.offcanvas', event => {
        event.preventDefault()
      }, false)
    })
  }

  // -------------------------------
  // MCRipple
  // -------------------------------
  const MCRipple = (() => {
    const rippleCls = 'mdc-ripple-surface'
    const iconButtonEls = ['btn-icon', 'btn-close', 'navbar-toggler', 'btn-clipboard', 'btn-edit']
    const listItemEls = ['list-group-item', 'dropdown-item']
    const roleEls = ['[data-bs-toggle="tab"]', '[data-bs-toggle="collapse"]', '[data-bs-toggle="pill"]', '[data-bs-slide="prev"]', '[data-bs-slide="next"]']

    const getElements = selectors => document.querySelectorAll(selectors)
    const addRippleToElement = (element, unbounded) => {
      const rippleElement = document.createElement('div')
      rippleElement.classList.add(rippleCls)
      element.append(rippleElement)
      applyRippleEffect(element, rippleElement, unbounded)
    }

    const addRippleSpanElement = (element, unbounded) => {
      const rippleElement = document.createElement('span')
      rippleElement.classList.add(rippleCls)
      element.parentNode.insertBefore(rippleElement, element)
      rippleElement.append(element)
      applyRippleEffect(element, rippleElement, unbounded)
    }

    const applyRippleEffect = (element, rippleElement, unbounded) => {
      const mdcRipple = new mdc.ripple.MDCRipple(rippleElement)
      if (unbounded) {
        mdcRipple.unbounded = unbounded
      }
    }

    const initializeRipples = (elements, unbounded) => {
      elements.forEach(el => addRippleToElement(el, unbounded))
    }

    const hasLabelSibling = elements => {
      const previousSibling = elements.previousElementSibling
      const nextSibling = elements.nextElementSibling
      return (previousSibling && previousSibling.tagName.toLowerCase() === 'label') ||
        (nextSibling && nextSibling.tagName.toLowerCase() === 'label')
    }

    const rippleSurface = () => {
      const excludedSelectors = [...listItemEls, ...iconButtonEls].map(cls => `.${cls}`).join(', ')
      const inputButtons = getElements('input[class^="btn"]')
      const labelInputs = getElements('label[class^="btn"]')
      const buttonUnbounds = getElements(iconButtonEls.map(cls => `.${cls}`).join(', '))
      const listItems = getElements(`button.${listItemEls.join(', ')}, a.${listItemEls.join(', ')}`)
      const roleItems = getElements(`${roleEls.join(', ')}`)
      const buttonDefaults = getElements(`.btn:not(label):not(input):not(div):not(${excludedSelectors})`)

      initializeRipples(buttonDefaults, false)
      initializeRipples(buttonUnbounds, true)
      initializeRipples(labelInputs, false)
      initializeRipples(listItems, false)
      initializeRipples(roleItems, false)
      inputButtons.forEach(el => {
        if (!hasLabelSibling(el)) {
          addRippleSpanElement(el, false)
        }
      })
    }

    return {
      rippleSurface
    }
  })()

  MCRipple.rippleSurface()
})()
