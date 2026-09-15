
// =====================================
// GET ELEMENTS
// =====================================

const orderTable =
    document.getElementById("orderTable");

const searchOrder =
    document.getElementById("searchOrder");


// =====================================
// GET ORDERS FROM LOCAL STORAGE
// =====================================

let orders = [];

try {

    orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];

} catch (error) {

    console.error(
        "Cannot read orders:",
        error
    );

    orders = [];
}


// =====================================
// SAVE ORDERS
// =====================================

function saveOrders() {

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );
}


// =====================================
// GET ORDER STATUS
// =====================================

function getStatusClass(status) {

    switch (status) {

        case "Pending":
            return "pending";

        case "Processing":
            return "processing";

        case "Completed":
            return "complete";

        case "Cancelled":
            return "cancelled";

        default:
            return "pending";
    }
}


// =====================================
// DISPLAY ORDERS
// =====================================

function getOrders() {

    updateOrderSummary();

    if (!orderTable) {

        console.error(
            "#orderTable not found!"
        );

        return;
    }


    const search =
        searchOrder
        ? searchOrder.value
            .toLowerCase()
            .trim()
        : "";


    const filteredOrders =
        orders.filter(order => {

            const orderId =
                String(order.id || "")
                    .toLowerCase();

            const customerName =
                String(
                    order.customerName || ""
                ).toLowerCase();

            const email =
                String(
                    order.email || ""
                ).toLowerCase();


            return (
                orderId.includes(search) ||
                customerName.includes(search) ||
                email.includes(search)
            );
        });


    orderTable.innerHTML = "";


    // =====================================
    // DISPLAY EACH ORDER
    // =====================================

    filteredOrders.forEach(
        (order, index) => {

            const status =
                order.status || "Pending";


            const statusClass =
                getStatusClass(status);


            const total =
                Number(order.total || 0);


            orderTable.innerHTML += `

                <tr>

                    <!-- NUMBER -->

                    <td>
                        ${index + 1}
                    </td>


                    <!-- ORDER ID -->

                    <td>
                        <strong>
                            #${order.id}
                        </strong>
                    </td>


                    <!-- CUSTOMER -->

                    <td>

                        <div class="customer-info">

                            <strong>
                                ${order.customerName || "Guest"}
                            </strong>

                            ${
                                order.email
                                ? `
                                    <small>
                                        ${order.email}
                                    </small>
                                  `
                                : ""
                            }

                        </div>

                    </td>


                    <!-- ITEMS -->

                    <td>

                        ${
                            order.items
                            ? order.items.length
                            : 0
                        }

                    </td>


                    <!-- TOTAL -->

                    <td>

                        $${total.toFixed(2)}

                    </td>


                    <!-- DATE -->

                    <td>

                        ${order.date || "-"}

                    </td>


                    <!-- STATUS -->

                    <td>

                        <span
                            class="status ${statusClass}"
                        >
                            ${status}
                        </span>

                    </td>


                    <!-- ACTION -->

                    <td>

                        <button
                            class="view-btn"
                            onclick="viewOrder('${order.id}')"
                        >
                            <i class="fa-solid fa-eye"></i>
                            View
                        </button>


                        <button
                            class="delete-btn"
                            onclick="deleteOrder('${order.id}')"
                        >
                            <i class="fa-solid fa-trash"></i>
                            Delete
                        </button>

                    </td>

                </tr>

            `;
        }
    );


    // =====================================
    // NO ORDER
    // =====================================

    if (filteredOrders.length === 0) {

        orderTable.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    style="
                        text-align:center;
                        padding:40px;
                    "
                >

                    <i
                        class="fa-solid fa-receipt"
                        style="
                            font-size:35px;
                            margin-bottom:10px;
                        "
                    ></i>

                    <br>

                    No orders found.

                </td>

            </tr>

        `;
    }
}


// =====================================
// SEARCH
// =====================================

if (searchOrder) {

    searchOrder.addEventListener(
        "input",
        getOrders
    );
}


// =====================================
// VIEW ORDER
// =====================================

function viewOrder(id) {

    const order =
        orders.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!order) {

        alert(
            "Order not found!"
        );

        return;
    }


    let itemsText = "";


    if (
        Array.isArray(order.items) &&
        order.items.length > 0
    ) {

        order.items.forEach(item => {

            itemsText +=
                `${item.name} x${item.qty} - $${Number(
                    item.price
                ).toFixed(2)}\n`;

        });

    } else {

        itemsText =
            "No items";
    }


    alert(

        `ORDER #${order.id}

Customer: ${order.customerName || "Guest"}

Email: ${order.email || "-"}

Items:
${itemsText}

Total: $${Number(
            order.total || 0
        ).toFixed(2)}

Status: ${order.status || "Pending"}

Date: ${order.date || "-"}`
    );
}


// =====================================
// CHANGE ORDER STATUS
// =====================================

function updateOrderStatus(
    id,
    newStatus
) {

    const order =
        orders.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!order) return;


    order.status =
        newStatus;


    saveOrders();

    getOrders();
}


// =====================================
// DELETE ORDER
// =====================================

function deleteOrder(id) {

    const order =
        orders.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!order) {

        alert(
            "Order not found!"
        );

        return;
    }


    const confirmDelete =
        confirm(
            `Delete Order #${order.id}?`
        );


    if (!confirmDelete) return;


    orders =
        orders.filter(
            item =>
                String(item.id) !==
                String(id)
        );


    saveOrders();

    getOrders();
}


// =====================================
// REFRESH ORDERS
// =====================================

function refreshOrders() {

    try {

        orders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];

    } catch (error) {

        orders = [];
    }


    getOrders();
}


// =====================================
// LOAD ORDERS
// =====================================

// =====================================
// UPDATE ORDER SUMMARY
// =====================================

function updateOrderSummary() {

    const totalOrders =
        document.getElementById("totalOrders");

    const pendingOrders =
        document.getElementById("pendingOrders");

    const completeOrders =
        document.getElementById("completeOrders");

    const total =
        orders.length;

    const pending =
        orders.filter(
            order => order.status === "Pending"
        ).length;

    const completed =
        orders.filter(
            order => order.status === "Completed"
        ).length;

    if (totalOrders) {
        totalOrders.textContent = total;
    }

    if (pendingOrders) {
        pendingOrders.textContent = pending;
    }

    if (completeOrders) {
        completeOrders.textContent = completed;
    }
}

getOrders();

