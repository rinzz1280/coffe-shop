let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const totalElement = document.getElementById("total");

function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="text-center text-gray-500">
                Your cart is empty.
            </p>
        `;

        totalElement.textContent = "$0.00";
        return;
    }

    let total = 0;

    cart.forEach(function (item, index) {

        let itemTotal = item.price * item.qty;

        total += itemTotal;

        cartItems.innerHTML += `
            <div class="flex justify-between items-center border-b py-4">

                <div>
                    <h3 class="text-xl font-bold">
                        ${item.name}
                    </h3>

                    <p class="text-gray-500">
                        $${item.price.toFixed(2)} × ${item.qty}
                    </p>
                </div>

                <div class="flex items-center gap-4">

                    <span class="font-bold">
                        $${itemTotal.toFixed(2)}
                    </span>

                    <button
                        onclick="removeItem(${index})"
                        class="bg-red-500 text-white px-3 py-1 rounded">

                        Remove

                    </button>

                </div>

            </div>
        `;
    });

    totalElement.textContent = "$" + total.toFixed(2);
}


function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


function goCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    window.location.href = "checkout.html";
}


displayCart();