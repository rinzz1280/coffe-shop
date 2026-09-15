// ===============================
// GET ORDERS FROM LOCAL STORAGE
// ===============================

let orders = JSON.parse(
    localStorage.getItem("orders") || "[]"
);


// ===============================
// LOAD ORDERS
// ===============================

function loadOrders() {

    const table = document.getElementById("orderTable");

    if (!table) return;

    table.innerHTML = "";

    // No order
    if (orders.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No orders found
                </td>
            </tr>
        `;

        updateSummary();

        return;
    }


    // Show orders
    orders.forEach(order => {

        table.innerHTML += `
            <tr>

                <td class="order-id">
                    #${order.id}
                </td>

                <td>
                    ${order.customer}
                </td>

                <td>
                    ${order.product}
                </td>

                <td>
                    ${order.quantity}
                </td>

                <td class="price">
                    $${Number(order.total).toFixed(2)}
                </td>

                <td>
                    <span class="status ${getStatusClass(order.status)}">
                        ${order.status}
                    </span>
                </td>

                <td>

                    <button 
                        class="view-btn"
                        onclick="viewOrder(${order.id})">

                        <i class="fa-solid fa-eye"></i>
                        View

                    </button>

                    <button 
                        class="edit-btn"
                        onclick="changeStatus(${order.id})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button 
                        class="delete-btn"
                        onclick="deleteOrder(${order.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>
        `;

    });

    updateSummary();
}


// ===============================
// STATUS CLASS
// ===============================

function getStatusClass(status) {

    if (status === "Complete") {
        return "complete";
    }

    if (status === "Pending") {
        return "pending";
    }

    if (status === "Cancelled") {
        return "cancelled";
    }

    return "";
}


// ===============================
// SEARCH ORDER
// ===============================

function searchOrder() {

    const input = document.getElementById("searchOrder");

    if (!input) return;

    const keyword = input.value
        .toLowerCase()
        .trim();


    const result = orders.filter(order => {

        return (
            order.id.toString().includes(keyword) ||

            order.customer
                .toLowerCase()
                .includes(keyword) ||

            order.product
                .toLowerCase()
                .includes(keyword) ||

            order.status
                .toLowerCase()
                .includes(keyword)
        );

    });


    displayOrders(result);
}


// ===============================
// DISPLAY SEARCH RESULT
// ===============================

function displayOrders(data) {

    const table = document.getElementById("orderTable");

    if (!table) return;

    table.innerHTML = "";


    if (data.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No orders found
                </td>
            </tr>
        `;

        return;
    }


    data.forEach(order => {

        table.innerHTML += `
            <tr>

                <td class="order-id">
                    #${order.id}
                </td>

                <td>
                    ${order.customer}
                </td>

                <td>
                    ${order.product}
                </td>

                <td>
                    ${order.quantity}
                </td>

                <td class="price">
                    $${Number(order.total).toFixed(2)}
                </td>

                <td>
                    <span class="status ${getStatusClass(order.status)}">
                        ${order.status}
                    </span>
                </td>

                <td>

                    <button 
                        class="view-btn"
                        onclick="viewOrder(${order.id})">

                        <i class="fa-solid fa-eye"></i>
                        View

                    </button>

                    <button 
                        class="edit-btn"
                        onclick="changeStatus(${order.id})">

                        <i class="fa-solid fa-pen"></i>

                    </button>

                    <button 
                        class="delete-btn"
                        onclick="deleteOrder(${order.id})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>
        `;

    });
}


// ===============================
// VIEW ORDER
// ===============================

function viewOrder(id) {

    const order = orders.find(
        order => order.id === id
    );

    if (!order) {

        alert("Order not found!");

        return;
    }


    alert(`
Order Details

Order ID: #${order.id}
Customer: ${order.customer}
Product: ${order.product}
Quantity: ${order.quantity}
Total: $${Number(order.total).toFixed(2)}
Status: ${order.status}
    `);
}


// ===============================
// CHANGE STATUS
// ===============================

function changeStatus(id) {

    const order = orders.find(
        order => order.id === id
    );

    if (!order) return;


    const newStatus = prompt(
        "Enter status: Pending, Complete, or Cancelled",
        order.status
    );


    if (!newStatus) return;


    const validStatus = [
        "Pending",
        "Complete",
        "Cancelled"
    ];


    if (!validStatus.includes(newStatus)) {

        alert(
            "Please enter: Pending, Complete, or Cancelled"
        );

        return;
    }


    order.status = newStatus;


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    loadOrders();
}


// ===============================
// DELETE ORDER
// ===============================

function deleteOrder(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this order?"
    );


    if (!confirmDelete) return;


    orders = orders.filter(
        order => order.id !== id
    );


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    loadOrders();
}


// ===============================
// SUMMARY
// ===============================

function updateSummary() {

    const total = orders.length;


    const pending = orders.filter(
        order => order.status === "Pending"
    ).length;


    const complete = orders.filter(
        order => order.status === "Complete"
    ).length;


    const totalElement =
        document.getElementById("totalOrders");

    const pendingElement =
        document.getElementById("pendingOrders");

    const completeElement =
        document.getElementById("completeOrders");


    if (totalElement) {
        totalElement.textContent = total;
    }


    if (pendingElement) {
        pendingElement.textContent = pending;
    }


    if (completeElement) {
        completeElement.textContent = complete;
    }
}


// ===============================
// AUTO UPDATE
// ===============================

window.addEventListener("storage", function(event) {

    if (event.key === "orders") {

        orders = JSON.parse(
            event.newValue || "[]"
        );

        loadOrders();
    }

});


// ===============================
// LOAD WHEN PAGE OPENS
// ===============================

loadOrders();

