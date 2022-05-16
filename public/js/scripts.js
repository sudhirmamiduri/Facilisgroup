"use static";
const app = (() => {

    const productContainer = document.getElementById("products");
    const productPagination = document.getElementById("products-pagination");
    const productOffset = 10
    const productCount = 20

    const renderProducts = (products) => {
        // render products logic here

        productContainer.innerText = ''

        for(let i=productOffset; (i < productOffset + productCount) && i < products.length; i++) {
            productContainer.appendChild(new Product(products[i]))
        }
    }

    const loadProducts = async () => {
        // load products logic here
        const products = await (await fetch(`/public/data/products.json`)).json()
        
        return products

    };

    const init = async () => {
        const products = await loadProducts();
        renderProducts(products)
    }

    init();

})();



class Product extends HTMLElement {
    product = {}
    constructor(product) {
        super()
        this.product = product
        this.render()
    }

    render() {

        this.attachShadow({mode: 'open'});

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'product');
        wrapper.setAttribute('id', `product-${this.product.id}`)
        wrapper.addEventListener('click', () => this.onclick())

        const imgContainer = document.createElement('div');
        imgContainer.setAttribute('class', 'product-image');

        const img = document.createElement('img');
        img.alt = this.product.name
        img.src = this.product.image
        imgContainer.appendChild(img)

        const name = document.createElement('div');
        name.setAttribute('calss', 'product-name')
        name.innerText = this.product.name

        const price = document.createElement('div');
        price.setAttribute('class', 'product-price')
        price.innerText = this.product.price


        wrapper.append(imgContainer, name, price)

        const style = document.createElement('style')
        style.innerText = `
        .product {
            border: 1px solid #eee;
            border-radius: 8px;
            padding: 1rem;
            text-align: center;
            cursor: pointer;
          }
          
        .product > .product-price {
            margin-top: .5rem;
            font-weight: 600;
        }

        .selected {
            background-color: gray;
        }
        `

        this.shadowRoot.append(style, wrapper);
    }

    onclick() {
        const modalContainer = document.getElementById('modal-container');
        if(!modalContainer || !modalContainer.querySelector('section'))return;

        modalContainer.querySelector('section').innerText = this.product.desc
        modalContainer.dataset.id = `product-${this.product.id}`

        modalContainer.classList.add('show')

        const closeButton = modalContainer.querySelector('[data-button=close-modal]')
        closeButton.onclick = () => {
            this.unSelect()
            modalContainer.classList.remove('show')
        }

        this.select()
    }

    select() {
        this.shadowRoot.querySelector('div').classList.add('selected')
    }

    unSelect() {
        this.shadowRoot.querySelector('div').classList.remove('selected')
    }
}

customElements.define('app-product', Product)
