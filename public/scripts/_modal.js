import { selectOne, addClass, removeClass } from './_functions'

function openModal(selector) {
   const modal = selectOne(selector)
   removeClass(modal, 'd-none')
   document.body.style.overflow = 'hidden'
}

function closeModal(selector) {
   const modal = selectOne(selector)
   addClass(modal, 'd-none')
   document.body.style.overflow = ''
}

export { openModal, closeModal }