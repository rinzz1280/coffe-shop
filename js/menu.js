
function addToCart(name, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check product already in cart
    let product = cart.find(function (item) {
        return item.name === name;
    });

    if (product) {

        product.qty = product.qty + 1;

    } else {

        cart.push({
            name: name,
            price: price,
            qty: 1
        });

    }

    // Save cart
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
    window.location.href = "checkout.html";
}

// ================= FILTER PRODUCTS =================

function filterProducts(category, button) {

    // Get all product cards
    const products = document.querySelectorAll(".coffee-card");

    // Get all category buttons
    const buttons = document.querySelectorAll(".category");


    // Remove active from all buttons
    buttons.forEach(function (btn) {

        btn.classList.remove("active");

    });


    // Add active to clicked button
    button.classList.add("active");


    // Filter products
    products.forEach(function (product) {

        const productCategory = product.getAttribute("data-category");


        if (
            category === "all" ||
            productCategory === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}



