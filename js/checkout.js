
// ================= CART =================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ================= ELEMENTS =================

const cartItems =
    document.getElementById("cartItems");

const totalElement =
    document.getElementById("total");

let total = 0;


// ================= DISPLAY CART =================

function displayCart() {

    cartItems.innerHTML = "";

    total = 0;


    // Empty Cart
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


    // Display Products
    cart.forEach(function (item) {

        const itemTotal =
            item.price * item.qty;

        total += itemTotal;


        cartItems.innerHTML += `

            <div class="flex justify-between
                border-b py-3">

                <div>

                    <h3 class="font-bold">
                        ${item.name}
                    </h3>

                    <p>
                        $${item.price.toFixed(2)}
                        × ${item.qty}
                    </p>

                </div>


                <strong>
                    $${itemTotal.toFixed(2)}
                </strong>

            </div>

        `;
    });


    totalElement.innerText =
        "$" + total.toFixed(2);
}


// ================= PLACE ORDER =================

document
    .getElementById("checkoutForm")
    .addEventListener("submit", function (e) {

        e.preventDefault();


        // Check cart
        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;
        }


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


// ================= START =================

displayCart();

