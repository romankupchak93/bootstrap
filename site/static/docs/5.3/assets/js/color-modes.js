const html = document.documentElement
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
const savedTheme = localStorage.getItem('theme') || systemTheme
let animate = false
function setTheme(theme, animate = false) {
  if (animate) {
    const el = document.querySelector('body')
    const copy = el.cloneNode(true)
    copy.classList.add('app-copy')
    const rect = el.getBoundingClientRect()
    copy.style.top = rect.top + 'px'
    copy.style.left = rect.left + 'px'
    copy.style.width = rect.width + 'px'
    copy.style.height = rect.height + 'px'
    const targetEl = document.activeElement
    const targetRect = targetEl.getBoundingClientRect()
    const left = targetRect.left + targetRect.width / 2 + window.scrollX
    const top = targetRect.top + targetRect.height / 2 + window.scrollY
    el.style.setProperty('--clip-pos', `${left}px ${top}px`)
    el.style.removeProperty('--clip-size')
    setTimeout(function () {
      el.classList.add('app-transition')
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          el.style.setProperty('--clip-size', Math.hypot(window.innerWidth, window.innerHeight) + 'px')
        })
      })
    })

    document.body.append(copy)
    const scrollElements = copy.querySelectorAll('[data-scroll-x], [data-scroll-y]');
    scrollElements.forEach((el) => {
      el.scrollLeft = +el.dataset.scrollX;
      el.scrollTop = +el.dataset.scrollY;
    });
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
  localStorage.setItem('theme', theme)
}

setTheme(savedTheme)
window.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('#themeToggle')

  themeToggle.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme, true) // передаємо параметр animate як true
  })
})
