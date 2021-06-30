function selectOne(selector) {
   return document.querySelector(selector)
}

function selectAll(selector) {
   return document.querySelectorAll(selector)
}

function addClass(element, className) {
   element.classList.add(className)
}

function removeClass(element, className) {
   element.classList.remove(className)
}

export {selectOne, selectAll, addClass, removeClass}