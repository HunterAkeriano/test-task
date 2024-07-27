import { renderCard } from './partials/main/get-card.js'
import { download } from './partials/main/download.js'

document.addEventListener('DOMContentLoaded', async () => {
   await renderCard()
   download()
})
