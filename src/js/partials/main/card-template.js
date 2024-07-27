import { classManipulator, getElement } from '../../composables/domManipulator.js'

function containsSubstring(string, substring) {
   return string.indexOf(substring) !== -1
}

export async function createElement(card) {
   const cardInfoElement = getElement('.card-info')
   const hasDiscount = containsSubstring(card.price_key, '%')
   const isMonthlyLicense = containsSubstring(card.license_name, 'Monthly')

   let discountRibbonHtml = ''
   let oldPriceHtml = ''

   if (hasDiscount) {
      const discountPercentage = +card.price_key.replace('%', '')
      const originalPrice = (card.amount / (1 - discountPercentage / 100)).toFixed(2)
      discountRibbonHtml = `
            <div class="card__discount">
                <div class="card__discount-percente">${discountPercentage}%</div>
                <div class="card__discount-text">OFF</div>
                
                <svg class="svg-icon icon-used">
                    <use xlink:href="#iconUsed"></use>
                </svg>
            </div>
        `
      oldPriceHtml = `
            <strike class="card__old-price">$${originalPrice}</strike>
        `
   }

   const cardElement = document.createElement('div')

   classManipulator(cardElement, 'add', 'card')

   cardElement.innerHTML = `
        <div class="card__value">
            ${card.is_best ? '<div class="card__label">Best Value</div>' : ''}
            ${discountRibbonHtml}
            <div class="card__price">
                <span class="card__price-amount">$${card.amount}</span>
                <span class="card__price-years">/per ${isMonthlyLicense ? 'mo' : 'year'}</span>
            </div>
            ${oldPriceHtml}
        </div>
        
        <h3 class="card__title">${card.name_prod}</h3>
        
        <div class="card__license">${card.license_name}</div>
        
        <a class="card__download" href="${card.link}" download="${card.name_display}">
            <span class="card__download-text">DOWNLOAD</span>
                
            <svg class="svg-icon icon-download">
                <use xlink:href="#iconDownload"></use>
             </svg>
        </a>
    `

   cardInfoElement.appendChild(cardElement)
}
