/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = (theme, animate = false) => {
    if (animate) {
      const el = document.querySelector('body')
      const copy = el.cloneNode(true)
      copy.classList.add('app-copy')
      const rect = el.getBoundingClientRect()
      copy.style.top = `${rect.top}px`
      copy.style.left = `${rect.left}px`
      copy.style.width = `${rect.width}px`
      copy.style.height = `${rect.height}px`
      const targetEl = document.activeElement
      const targetRect = targetEl.getBoundingClientRect()
      const left = targetRect.left + targetRect.width / 2 + window.scrollX
      const top = targetRect.top + targetRect.height / 2 + window.scrollY
      el.style.setProperty('--clip-pos', `${left}px ${top}px`)
      el.style.removeProperty('--clip-size')

      setTimeout(() => {
        el.classList.add('app-transition')
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.setProperty('--clip-size', `${Math.hypot(window.innerWidth, window.innerHeight)}px`)
          })
        })
      })

      document.body.append(copy)
      const scrollElements = copy.querySelectorAll('[data-scroll-x], [data-scroll-y]')
      scrollElements.forEach(el => {
        el.scrollLeft = Number(el.dataset.scrollX)
        el.scrollTop = Number(el.dataset.scrollY)
      })
      const onTransitionend = function (e) {
        if (e.target === e.currentTarget) {
          copy.remove()
          el.removeEventListener('transitionend', onTransitionend)
          el.removeEventListener('transitioncancel', onTransitionend)
          el.classList.remove('app-transition')
          el.style.removeProperty('--clip-size')
          el.style.removeProperty('--clip-pos')
        }
      }

      el.addEventListener('transitionend', onTransitionend)
      el.addEventListener('transitioncancel', onTransitionend)
    }

    document.documentElement.setAttribute('data-bs-theme', theme)
  }
  // const setTheme = theme => {
  //   if (theme === 'auto') {
  //     document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  //   } else {
  //     document.documentElement.setAttribute('data-bs-theme', theme)
  //   }
  // }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    if (!themeSwitcher) {
      return
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) {
      themeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme, true)
          showActiveTheme(theme, true)
        })
      })
  })
})()
