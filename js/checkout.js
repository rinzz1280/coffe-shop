// Get cart from localStorage

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// Get HTML elements

let cartItems =
    document.getElementById("cartItems");

let totalElement =
    document.getElementById("total");


// Total price

let total = 0;



// ==========================================
// Display Cart
// ==========================================

function displayCart() {

    // Clear old items

    cartItems.innerHTML = "";


    // Reset total

    total = 0;


    // Check empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="text-gray-500 text-center">
                Your cart is empty.
            </p>
        `;

        totalElement.innerText = "$0.00";

        return;
    }



    // Display each product

    cart.forEach(function(item, index) {


        let itemTotal =
            item.price * item.qty;


        total += itemTotal;



        cartItems.innerHTML += `

            <div
                class="flex justify-between items-center border-b py-4"
            >

                <div>

                    <h3 class="font-bold text-lg">
                        ${item.name}
                    </h3>

                    <p class="text-gray-500">
                        $${item.price.toFixed(2)}
                        ×
                        ${item.qty}
                    </p>

                </div>


                <div class="text-right">

                    <p class="font-bold">
                        $${itemTotal.toFixed(2)}
                    </p>


                    <button
                        onclick="removeItem(${index})"
                        class="text-red-500 text-sm"
                    >

                        <i class="fa-solid fa-trash"></i>

                        Remove

                    </button>

                </div>

            </div>

        `;

    });



    // Display total

    totalElement.innerText =
        "$" + total.toFixed(2);

}



// ==========================================
// Remove Product
// ==========================================

function removeItem(index) {


    // Remove product

    cart.splice(index, 1);


    // Save updated cart

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Display again

    displayCart();

}



// ==========================================
// Submit Order
// ==========================================

document
    .getElementById("checkoutForm")
    .addEventListener("submit", function(e) {


        // Stop refresh

        e.preventDefault();



        // Check cart

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }



        // Get customer information

        let name =
            document.getElementById("name").value;


        let phone =
            document.getElementById("phone").value;


        let address =
            document.getElementById("address").value;


        let payment =
            document.getElementById("payment").value;



        // Create order

        let order = {

            customerName: name,

            phone: phone,

            address: address,

            payment: payment,

            items: cart,

            total: total,

            date: new Date().toLocaleString()

        };



        // Save order

        localStorage.setItem(
            "order",
            JSON.stringify(order)
        );



        // Delete cart

        localStorage.removeItem("cart");



        // Message

        alert(
            "Order successfully placed!"
        );



        // Go to success page

        window.location.href =
            "success.html";

    });



// ==========================================
// Start
// ==========================================

displayCart();