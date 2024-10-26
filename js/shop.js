// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'Cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

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
        total.innerHTML = `Total: $${totalPrice}`;
    } else {
        cleanCart();
    }
}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
    let removedProduct = cart.find(product => product.id === id);    

    if (removedProduct.quantity === 1) {
        cart.pop(removedProduct);        
    } else {
        removedProduct.quantity--
    }

    printCart()
}

function open_modal() {
    printCart();
}