function classManipulator(element, action, className) {
   if (element && className) {
      const actions = {
         add: () => element.classList.add(className),
         remove: () => element.classList.remove(className),
         toggle: () => element.classList.toggle(className),
         contains: () => element.classList.contains(className)
      }

      if (actions[action]) {
         return actions[action]()
      }
   }
}
function getElement(element, target = document) {
   return target.querySelector(element)
}

function getElements(element, target = document) {
   return target.querySelectorAll(element)
}

export { getElement, getElements, classManipulator }
