// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [];

fetch('./js/products.json')
    .then(response => response.json())
    .then(data => {
        products = data
    })
    .catch(error => { console.error('Error loading JSON file:', error); });


// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {

    let newProduct;

    for (i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            newProduct = products[i];
        }
    }

    let cartProduct = cart.find(product => product.id === id);
    if (cartProduct) {
        cartProduct.quantity += 1;
    } else {
        newProduct = { ...newProduct, quantity: 1 };
        cart.push(newProduct);
    }
}

// Exercise 2
function cleanCart() {
    cart.length = 0;
    let modal = document.querySelector('#cart_list');
    let total = document.querySelector('#modal_total');
    modal.innerHTML = "";
    total.innerHTML = `Cart is empty`;
}

// Exercise 3
function calculateTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].subtotalWithDiscount) {
            total += cart[i].subtotalWithDiscount * cart[i].quantity;
        } else {
            total += cart[i].price * cart[i].quantity;
        }
    }
    return total;
}

// Exercise 4
function applyPromotionsCart() {
    let offerProduct = cart.filter(product => product.offer);
    for (i = 0; i < offerProduct.length; i++) {
        if (offerProduct[i].quantity >= offerProduct[i].offer.number) {
            offerProduct[i].subtotalWithDiscount = offerProduct[i].price * (1 - (offerProduct[i].offer.percent / 100));
        }
    }
}

// Exercise 5
function printCart() {

    if (cart.length != 0) {
        applyPromotionsCart()
        let modal = document.querySelector('#cart_list');
        let total = document.querySelector('#modal_total');
        let domItemCart = "";

        for (i = 0; i < cart.length; i++) {
            if (cart[i].subtotalWithDiscount) {
                domItemCart += `<tr><th scope = "row">${cart[i].name}</th><td>$${cart[i].price}</td><td>${cart[i].quantity}</td><td>$${(cart[i].subtotalWithDiscount * cart[i].quantity).toFixed(2)}</td><td><a class="btn" onclick="removeFromCart(${cart[i].id})"">X</a></td></tr><br>`;
            } else {
                domItemCart += `<tr><th scope = "row">${cart[i].name}</th><td>$${cart[i].price}</td><td>${cart[i].quantity}</td><td>$${cart[i].price * cart[i].quantity}</td><td><a class="btn" onclick="removeFromCart(${cart[i].id})"">X</a></td></tr><br>`;
            }
        }
        modal.innerHTML = domItemCart;
        let totalPrice = calculateTotal();
        total.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
    } else {
        cleanCart();
    }
}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
    let removedProduct = cart.find(product => product.id === id);
    let indexProduct = cart.findIndex(product => product.id === id);

    if (removedProduct.quantity === 1) {
        cart.splice(indexProduct, 1);
    } else {
        removedProduct.quantity--
    }

    if(removedProduct.subtotalWithDiscount && removedProduct.quantity < removedProduct.offer.number) {
        delete removedProduct.subtotalWithDiscount;
    }

    printCart()
}

function open_modal() {
    printCart();
}