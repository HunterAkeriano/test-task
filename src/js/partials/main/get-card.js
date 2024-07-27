import { createElement } from './card-template.js'
import { useFetch } from '../../composables/useFetch.js'

export async function renderCard() {
   try {
      const { result } = await useFetch('front_test_api.php')
      const { elements } = result

      elements.forEach((item) => {
         createElement(item)
      })
   } catch (error) {
      console.error('Error fetching data:', error)
   }
}
