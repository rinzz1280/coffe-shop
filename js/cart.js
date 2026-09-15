
// ================= CART =================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ================= DISPLAY CART =================

function displayCart() {

    const cartItems =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("total");

    cartItems.innerHTML = "";

    let total = 0;


    // Empty Cart
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="text-center py-10">

                <p class="text-gray-500 text-xl">
                    Your cart is empty.
                </p>

                <a href="menu.html"
                    class="inline-block mt-5
                    bg-yellow-600 text-white
                    px-5 py-3 rounded-lg">

                    Go to Menu

                </a>

            </div>
        `;

        totalElement.innerText = "$0.00";

        return;
    }


    // Display Products
    cart.forEach(function (item, index) {

        const itemTotal =
            item.price * item.qty;

        total += itemTotal;


        cartItems.innerHTML += `

            <div class="border-b py-5
                flex justify-between
                items-center gap-5">

                <div>

                    <h3 class="text-xl font-bold">
                        ${item.name}
                    </h3>

                    <p class="text-gray-500">
                        $${item.price.toFixed(2)}
                    </p>

                </div>


                <div class="flex items-center gap-3">

                    <button
                        onclick="decreaseQty(${index})"
                        class="bg-gray-200
                        px-3 py-1 rounded">

                        −

                    </button>


                    <span class="font-bold">
                        ${item.qty}
                    </span>


                    <button
                        onclick="increaseQty(${index})"
                        class="bg-gray-200
                        px-3 py-1 rounded">

                        +

                    </button>

                </div>


                <div class="text-right">

                    <p class="font-bold">
                        $${itemTotal.toFixed(2)}
                    </p>

                    <button
                        onclick="removeItem(${index})"
                        class="text-red-500 text-sm">

                        Delete

                    </button>

                </div>

            </div>

        `;
    });


    totalElement.innerText =
        "$" + total.toFixed(2);
}


// ================= INCREASE =================

function increaseQty(index) {

    cart[index].qty++;

    saveCart();
}


// ================= DECREASE =================

function decreaseQty(index) {

    if (cart[index].qty > 1) {

        cart[index].qty--;

    } else {

        cart.splice(index, 1);
    }

    saveCart();
}


// ================= DELETE =================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
}


// ================= SAVE =================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// ================= CHECKOUT =================

function goCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    window.location.href =
        "checkout.html";
}


// ================= START =================

displayCart();

