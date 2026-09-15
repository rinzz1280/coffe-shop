<<<<<<< HEAD

// ================= CART =================
=======
// ==========================================
// Get Cart
// ==========================================
>>>>>>> d6c00e9 (jen)

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


<<<<<<< HEAD
// ================= ELEMENTS =================
=======
// ==========================================
// Get HTML Elements
// ==========================================
>>>>>>> d6c00e9 (jen)

const cartItems =
    document.getElementById("cartItems");

const totalElement =
    document.getElementById("total");

<<<<<<< HEAD
let total = 0;


// ================= DISPLAY CART =================
=======
let checkoutForm =
    document.getElementById("checkoutForm");


// ==========================================
// Total
// ==========================================

let total = 0;


// ==========================================
// Display Cart
// ==========================================
>>>>>>> d6c00e9 (jen)

function displayCart() {

    cartItems.innerHTML = "";

    total = 0;


<<<<<<< HEAD
    // Empty Cart
=======
    // Empty cart

>>>>>>> d6c00e9 (jen)
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="text-gray-500">
                Your cart is empty.
            </p>
        `;

        totalElement.innerText =
            "$0.00";

        return;
    }


<<<<<<< HEAD
    // Display Products
    cart.forEach(function (item) {

        const itemTotal =
            item.price * item.qty;
=======
    // Display products

    cart.forEach(function(item, index) {

        let price =
            Number(item.price);

        let qty =
            Number(item.qty);

        let itemTotal =
            price * qty;
>>>>>>> d6c00e9 (jen)

        total += itemTotal;


        cartItems.innerHTML += `

<<<<<<< HEAD
            <div class="flex justify-between
                border-b py-3">
=======
            <div class="flex justify-between items-center border-b py-4">
>>>>>>> d6c00e9 (jen)

                <div>

                    <h3 class="font-bold">
                        ${item.name}
                    </h3>

<<<<<<< HEAD
                    <p>
                        $${item.price.toFixed(2)}
                        × ${item.qty}
=======
                    <p class="text-gray-500">
                        $${price.toFixed(2)}
                        ×
                        ${qty}
>>>>>>> d6c00e9 (jen)
                    </p>

                </div>


<<<<<<< HEAD
                <strong>
                    $${itemTotal.toFixed(2)}
                </strong>
=======
                <div class="text-right">

                    <p class="font-bold">
                        $${itemTotal.toFixed(2)}
                    </p>


                    <button
                        type="button"
                        onclick="removeItem(${index})"
                        class="text-red-500 text-sm"
                    >

                        <i class="fa-solid fa-trash"></i>

                        Remove

                    </button>

                </div>
>>>>>>> d6c00e9 (jen)

            </div>

        `;
    });


    totalElement.innerText =
        "$" + total.toFixed(2);
}


<<<<<<< HEAD
// ================= PLACE ORDER =================

document
    .getElementById("checkoutForm")
    .addEventListener("submit", function (e) {
=======
// ==========================================
// Remove Item
// ==========================================

function removeItem(index) {

    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();
}


// ==========================================
// Place Order
// ==========================================

checkoutForm.addEventListener("submit", function(e) {

    e.preventDefault();


    // Check cart
>>>>>>> d6c00e9 (jen)

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


<<<<<<< HEAD
        // Check cart
        if (cart.length === 0) {
=======
    // Get customer information

    let name =
        document.getElementById("name").value.trim();

    let phone =
        document.getElementById("phone").value.trim();
>>>>>>> d6c00e9 (jen)

    let address =
        document.getElementById("address").value.trim();

    let payment =
        document.getElementById("payment").value;


<<<<<<< HEAD
        // Create order
        const order = {

            customerName:
                document.getElementById("name").value.trim(),

            phone:
                document.getElementById("phone").value.trim(),

            address:
                document.getElementById("address").value.trim(),

            payment:
                document.getElementById("payment").value,

            items: cart,

            total: total,

            date:
                new Date().toLocaleString()
        };


        // Save order
        localStorage.setItem(
            "order",
            JSON.stringify(order)
        );


        // Clear cart
        localStorage.removeItem("cart");


        alert(
            "Order successfully placed!"
        );


        // Go Success Page
        window.location.href =
            "success.html";
    });

=======
    // Validate

    if (!name || !phone || !address || !payment) {

        alert("Please fill in all information!");

        return;
    }


    // ==========================================
    // Get Existing Orders
    // ==========================================

    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    // ==========================================
    // Create New Order
    // ==========================================

    let order = {

        id: Date.now(),

        customerName: name,

        phone: phone,

        address: address,

        payment: payment,

        items: cart,

        total: total,

        status: "Pending",

        date: new Date().toLocaleString()

    };


    // ==========================================
    // Add Order
    // ==========================================

    orders.push(order);


    // ==========================================
    // Save Orders
    // ==========================================

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    // ==========================================
    // Clear Cart
    // ==========================================

    localStorage.removeItem("cart");


    // ==========================================
    // Success
    // ==========================================

    alert("Order successfully placed!");


    window.location.href =
        "success.html";

});
>>>>>>> d6c00e9 (jen)

// ================= START =================

displayCart();

