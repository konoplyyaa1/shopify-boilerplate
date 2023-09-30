export default class ProductForm extends HTMLElement {
  constructor() {
    super()

    this.form = this.querySelector('form')
    this.button = this.querySelector('[type="submit"]')
    this.options = this.querySelectorAll('[type="radio"]')

    this.form.addEventListener('input', this.getFormData.bind(this))
  }

  getFormData() {
    const formData = new FormData(this.form)

    console.log(formData.get('id'))
  }
}
