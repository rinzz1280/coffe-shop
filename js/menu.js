function addToCart(name, price) {

    // Get old cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    // Create product
    let item = {

        name: name,

        price: price,

        qty: 1

    };


    // Add product to cart
    cart.push(item);


    // Save cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Go to checkout
    window.location.href = "checkout.html";
}