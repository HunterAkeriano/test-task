import { classManipulator, getElement, getElements } from '../../composables/domManipulator.js'

export function download() {
   const alert = getElement('.alert')
   const downloadButtons = getElements('.card__download')

   downloadButtons.forEach((button) => {
      button.addEventListener('click', () => {
         setTimeout(showAlert, 1500)
      })
   })

   function showAlert() {
      classManipulator(alert, 'add', 'alert_active')

      if (navigator.userAgent.includes('Chrome')) {
         classManipulator(alert, 'add', 'alert_chrome')
      }

      setTimeout(hideAlert, 10000)
   }

   function hideAlert() {
      classManipulator(alert, 'remove', 'alert_active')
   }
}
