
// ================= CART =================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ================= ORDER PRODUCT =================

function addToCart(name, price) {

    // Check Login
    if (!checkLogin()) {
        return;
    }

    // Check product already exists
    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        // Increase quantity
        existingProduct.qty++;

    } else {

        // Add new product
        cart.push({

            name: name,

            price: price,

            qty: 1
        });
    }

    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(name + " added to cart!");

    // Go to cart
    window.location.href = "cart.html";
}

