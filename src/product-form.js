import formatMoney from './utils/money-format.js'

export default class ProductForm extends HTMLElement {
  constructor() {
    super()

    this.product = JSON.parse(
      document.querySelector('[data-product-json]').innerHTML
    )
    this.form = this.querySelector('form')
    this.button = this.querySelector('[type="submit"]')
    this.options = this.querySelectorAll('[type="radio"]')
    this.price = this.querySelector('[data-price]')
    this.form.addEventListener('input', this.updateVariant.bind(this))
  }

  getSelectedOptions() {
    this.selectedOptions = []
    this.options.forEach((option) => {
      if (option.checked) {
        this.selectedOptions.push(option.value)
      }
    })

    this.matchedVariant = this.product.variants.find((variant) => {
      return variant.title === this.selectedOptions.join(' / ')
    })

    return this.matchedVariant
  }

  updateURLHash() {
    const searchParams = new URLSearchParams(window.location.search)
    const selectedOptions = this.getSelectedOptions()

    if (selectedOptions) {
      searchParams.set('variant', selectedOptions.id)
    }

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${searchParams}`
    )
  }

  updateProductPrice() {
    this.price.textContent = formatMoney(
      this.getSelectedOptions().price,
      Shopify.currency.active
    )
  }

  updateVariant() {
    this.updateURLHash()
    this.updateProductPrice()
  }
}
