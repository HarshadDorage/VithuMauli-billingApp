// Menu Data
let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [
    { id: 1, name: "Tea", category: "beverage", price: 15, description: "Traditional Indian tea" },
    { id: 2, name: "Black Tea", category: "beverage", price: 15, description: "Plain black tea" },
    { id: 3, name: "Coffee", category: "beverage", price: 20, description: "Filter coffee" },
    { id: 4, name: "Bhel", category: "food", price: 50, description: "Puffed rice snack with chutneys" },
    { id: 5, name: "Sadha Upma", category: "food", price: 50, description: "Plain upma" },
    { id: 6, name: "Onion Upma", category: "food", price: 60, description: "Upma with onions" },
    { id: 7, name: "Tomato Omelette", category: "food", price: 80, description: "Omelette with tomatoes" },
    { id: 8, name: "Idli Plate", category: "food", price: 40, description: "Steamed rice cakes" },
    { id: 9, name: "Medu Vada", category: "food", price: 50, description: "Savory fried donut" },
    { id: 10, name: "Idli Fry", category: "food", price: 80, description: "Fried idli pieces" },
    { id: 11, name: "Masala Idli", category: "food", price: 50, description: "Idli with spices" },
    { id: 12, name: "Pav Bhaji", category: "food", price: 80, description: "Buttered bread with vegetable curry" },
    { id: 13, name: "Cheese Pav Bhaji", category: "food", price: 100, description: "Pav bhaji with cheese" },
    { id: 14, name: "Dahi Vada", category: "food", price: 50, description: "Lentil dumplings in yogurt" },
    { id: 15, name: "Sadha Dosa", category: "food", price: 50, description: "Plain dosa" },
    { id: 16, name: "Masala Dosa", category: "food", price: 60, description: "Dosa with potato filling" },
    { id: 17, name: "Cut Cheese Masala Dosa", category: "food", price: 80, description: "Dosa with cheese and potato" },
    { id: 18, name: "Butter Masala Dosa", category: "food", price: 100, description: "Buttery masala dosa" },
    { id: 19, name: "Masala Garlic Butter Masala Dosa", category: "food", price: 100, description: "Garlic flavored butter dosa" },
    { id: 20, name: "Loni Special Masala Dosa", category: "food", price: 120, description: "Special masala dosa" },
    { id: 21, name: "Vada Sample", category: "food", price: 60, description: "Vada tasting portion" },
    { id: 22, name: "Vada Sambar", category: "food", price: 70, description: "Vada with lentil soup" },
    { id: 23, name: "Vada Pav", category: "food", price: 20, description: "Indian burger" },
    { id: 24, name: "Gol Bhaji", category: "food", price: 50, description: "Round fried snack" },
    { id: 25, name: "Misal Pav", category: "food", price: 70, description: "Spicy curry with bread" },
    { id: 26, name: "Vithu Mauli Special Dahi Vada", category: "food", price: 80, description: "Special yogurt vada" },
    { id: 27, name: "Vithu Mauli Special Misal", category: "food", price: 90, description: "Special misal pav" },
    { id: 28, name: "Vithu Mauli Special Dosa Masala", category: "food", price: 90, description: "Special masala dosa" },
    { id: 29, name: "Paneer Special Masala Dosa", category: "food", price: 100, description: "Dosa with paneer filling" }
];

// DOM Elements
const menuItemsContainer = document.getElementById('menu-items');
const cartItemsContainer = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart');
const categoryButtons = document.querySelectorAll('.category-btn');
const orderModal = document.getElementById('order-modal');
const orderSummary = document.getElementById('order-summary');
const confirmOrderBtn = document.getElementById('confirm-order');
const cancelOrderBtn = document.getElementById('cancel-order');
const billTemplate = document.getElementById('bill-template');
const billItemsContainer = document.getElementById('bill-items');
const billSubtotal = document.getElementById('bill-subtotal');
const billTotal = document.getElementById('bill-total');
const billNumber = document.getElementById('bill-number');
const billDate = document.getElementById('bill-date');
const billTable = document.getElementById('bill-table');
const editMenuBtn = document.getElementById('edit-menu-btn');
const editMenuModal = document.getElementById('edit-menu-modal');
const editMenuItemsContainer = document.getElementById('edit-menu-items');
const saveMenuBtn = document.getElementById('save-menu');
const cancelEditMenuBtn = document.getElementById('cancel-edit-menu');
const addMenuItemBtn = document.getElementById('add-menu-item');
const tableButtons = document.querySelectorAll('.table-btn');
const currentTableDisplay = document.getElementById('current-table');
const holdOrderBtn = document.getElementById('hold-order');
const viewOrdersBtn = document.getElementById('view-orders');
const viewOrdersModal = document.getElementById('view-orders-modal');
const holdOrdersList = document.getElementById('hold-orders-list');
const completedOrdersList = document.getElementById('completed-orders-list');
const closeViewOrdersBtn = document.getElementById('close-view-orders');

// State
let currentTable = 0; // 0 = Walk-in, 1-5 = Table 1-5
let cart = [];
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
let holdOrders = JSON.parse(localStorage.getItem('holdOrders')) || [];
let currentBillNumber = parseInt(localStorage.getItem('lastBillNumber')) || 1;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenuItems();
    renderCart();
    setupEventListeners();
    updateTableDisplay();
});

// Event Listeners
function setupEventListeners() {
    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            renderMenuItems(button.dataset.category);
        });
    });

    // Table selection
    tableButtons.forEach(button => {
        button.addEventListener('click', () => {
            tableButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentTable = parseInt(button.dataset.table);
            updateTableDisplay();
            
            // Check if there's a hold order for this table
            const tableHoldOrder = holdOrders.find(order => order.table === currentTable);
            if (tableHoldOrder) {
                if (confirm(`Table ${currentTable} has a hold order. Load it?`)) {
                    cart = [...tableHoldOrder.items];
                    updateCart();
                }
            }
        });
    });

    // Cart buttons
    checkoutBtn.addEventListener('click', showOrderConfirmation);
    clearCartBtn.addEventListener('click', clearCart);
    holdOrderBtn.addEventListener('click', holdCurrentOrder);
    viewOrdersBtn.addEventListener('click', showAllOrders);

    // Order modal buttons
    confirmOrderBtn.addEventListener('click', confirmOrder);
    cancelOrderBtn.addEventListener('click', () => {
        orderModal.classList.add('hidden');
    });

    // Edit menu buttons
    editMenuBtn.addEventListener('click', showEditMenu);
    saveMenuBtn.addEventListener('click', saveMenuChanges);
    cancelEditMenuBtn.addEventListener('click', () => {
        editMenuModal.classList.add('hidden');
    });
    addMenuItemBtn.addEventListener('click', addNewMenuItem);

    // View orders modal
    closeViewOrdersBtn.addEventListener('click', () => {
        viewOrdersModal.classList.add('hidden');
    });
}

// Render Menu Items
function renderMenuItems(category = 'all') {
    menuItemsContainer.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    if (filteredItems.length === 0) {
        menuItemsContainer.innerHTML = '<p class="text-gray-500 col-span-3 text-center py-4">No items found in this category</p>';
        return;
    }
    
    filteredItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item bg-white rounded-lg shadow p-4 flex flex-col';
        itemElement.innerHTML = `
            <h3 class="font-semibold">${item.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${item.description}</p>
            <div class="mt-auto flex justify-between items-center">
                <span class="font-bold">₹${item.price.toFixed(2)}</span>
                <button class="add-to-cart bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition" data-id="${item.id}">
                    Add
                </button>
            </div>
        `;
        menuItemsContainer.appendChild(itemElement);
    });

    // Add event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            addToCart(itemId);
        });
    });
}

// Cart Functions
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    renderCart();
    saveCartToLocalStorage();
    updateCheckoutButton();
}

function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Your cart is empty</p>';
        subtotalElement.textContent = '₹0.00';
        totalElement.textContent = '₹0.00';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center py-2 border-b';
        itemElement.innerHTML = `
            <div class="flex-1">
                <h4 class="font-medium">${item.name}</h4>
                <div class="flex items-center mt-1">
                    <button class="decrease-quantity text-gray-500 hover:text-gray-700" data-id="${item.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                    </button>
                    <span class="quantity mx-2">${item.quantity}</span>
                    <button class="increase-quantity text-gray-500 hover:text-gray-700" data-id="${item.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="text-right">
                <span class="item-total font-medium">₹${itemTotal.toFixed(2)}</span>
                <button class="remove-item block text-red-500 text-xs mt-1 hover:underline" data-id="${item.id}">
                    Remove
                </button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;

    // Add event listeners to quantity buttons
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.closest('button').dataset.id);
            increaseQuantity(itemId);
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.closest('button').dataset.id);
            decreaseQuantity(itemId);
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.dataset.id);
            removeFromCart(itemId);
        });
    });
}

function increaseQuantity(itemId) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

function decreaseQuantity(itemId) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter(i => i.id !== itemId);
        }
        updateCart();
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    updateCart();
}

function clearCart() {
    if (cart.length === 0 || !confirm('Are you sure you want to clear your cart?')) return;
    cart = [];
    updateCart();
}

function updateCheckoutButton() {
    checkoutBtn.disabled = cart.length === 0;
    holdOrderBtn.disabled = cart.length === 0;
}

// Table Functions
function updateTableDisplay() {
    const tableNames = ['Walk-in', 'Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5'];
    currentTableDisplay.textContent = tableNames[currentTable];
}

// Order Functions
function showOrderConfirmation() {
    if (cart.length === 0) return;

    let summaryHTML = '<div class="space-y-2 mb-4">';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        summaryHTML += `
            <div class="flex justify-between">
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });

    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    summaryHTML += `
        </div>
        <div class="border-t pt-2">
            <div class="flex justify-between">
                <span>Subtotal:</span>
                <span>₹${subtotal.toFixed(2)}</span>
            </div>
            <div class="flex justify-between">
                <span>Tax (10%):</span>
                <span>₹${tax.toFixed(2)}</span>
            </div>
            <div class="flex justify-between font-bold mt-1">
                <span>Total:</span>
                <span>₹${total.toFixed(2)}</span>
            </div>
        </div>
    `;

    orderSummary.innerHTML = summaryHTML;
    orderModal.classList.remove('hidden');
}

function confirmOrder() {
    if (cart.length === 0) return;

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    // Create order object
    const order = {
        id: currentBillNumber,
        date: new Date().toISOString(),
        table: currentTable,
        items: [...cart],
        subtotal,
        tax,
        total,
        status: 'completed'
    };

    // Add to order history
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    // Remove any hold order for this table
    holdOrders = holdOrders.filter(order => order.table !== currentTable);
    localStorage.setItem('holdOrders', JSON.stringify(holdOrders));

    // Increment and save bill number
    currentBillNumber += 1;
    localStorage.setItem('lastBillNumber', currentBillNumber.toString());

    // Generate and print bill
    generateBill(order);

    // Clear cart
    cart = [];
    updateCart();

    // Close modal
    orderModal.classList.add('hidden');
}

function holdCurrentOrder() {
    if (cart.length === 0) return;

    // Check if there's already a hold order for this table
    const existingHoldOrderIndex = holdOrders.findIndex(order => order.table === currentTable);
    
    if (existingHoldOrderIndex >= 0) {
        if (!confirm(`Table ${currentTable} already has a hold order. Replace it?`)) {
            return;
        }
        // Remove the existing hold order
        holdOrders.splice(existingHoldOrderIndex, 1);
    }

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    // Create hold order object
    const holdOrder = {
        id: Date.now(),
        date: new Date().toISOString(),
        table: currentTable,
        items: [...cart],
        subtotal,
        tax,
        total,
        status: 'hold'
    };

    // Add to hold orders
    holdOrders.push(holdOrder);
    localStorage.setItem('holdOrders', JSON.stringify(holdOrders));

    // Clear cart
    cart = [];
    updateCart();

    alert(`Order held for Table ${currentTable}`);
}

function showAllOrders() {
    // Clear previous lists
    holdOrdersList.innerHTML = '';
    completedOrdersList.innerHTML = '';

    // Display hold orders
    if (holdOrders.length === 0) {
        holdOrdersList.innerHTML = '<p class="text-gray-500">No hold orders</p>';
    } else {
        holdOrders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.className = 'bg-gray-100 p-3 rounded';
            orderElement.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <strong>Table ${order.table}</strong>
                        <span class="text-sm text-gray-600 ml-2">${new Date(order.date).toLocaleString()}</span>
                    </div>
                    <div class="flex gap-2">
                        <button class="load-hold-order px-2 py-1 bg-blue-500 text-white text-sm rounded" data-id="${order.id}">
                            Load
                        </button>
                        <button class="complete-hold-order px-2 py-1 bg-green-500 text-white text-sm rounded" data-id="${order.id}">
                            Complete
                        </button>
                        <button class="delete-hold-order px-2 py-1 bg-red-500 text-white text-sm rounded" data-id="${order.id}">
                            Delete
                        </button>
                    </div>
                </div>
                <div class="mt-2">
                    ${order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}
                </div>
                <div class="text-right mt-1 font-medium">₹${order.total.toFixed(2)}</div>
            `;
            holdOrdersList.appendChild(orderElement);
        });
    }

    // Display completed orders (last 5)
    const recentCompletedOrders = orderHistory.filter(order => order.status === 'completed').slice(-5).reverse();
    if (recentCompletedOrders.length === 0) {
        completedOrdersList.innerHTML = '<p class="text-gray-500">No completed orders</p>';
    } else {
        recentCompletedOrders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.className = 'bg-gray-100 p-3 rounded';
            orderElement.innerHTML = `
                <div class="flex justify-between items-center">
                    <div>
                        <strong>${order.table === 0 ? 'Walk-in' : 'Table ' + order.table}</strong>
                        <span class="text-sm text-gray-600 ml-2">${new Date(order.date).toLocaleString()}</span>
                    </div>
                    <div>
                        <span class="text-sm">Bill #${order.id}</span>
                    </div>
                </div>
                <div class="mt-2">
                    ${order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}
                </div>
                <div class="text-right mt-1 font-medium">₹${order.total.toFixed(2)}</div>
            `;
            completedOrdersList.appendChild(orderElement);
        });
    }

    // Add event listeners to hold order buttons
    document.querySelectorAll('.load-hold-order').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = parseInt(e.target.dataset.id);
            loadHoldOrder(orderId, false);
        });
    });

    document.querySelectorAll('.complete-hold-order').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = parseInt(e.target.dataset.id);
            completeHoldOrder(orderId);
        });
    });

    document.querySelectorAll('.delete-hold-order').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = parseInt(e.target.dataset.id);
            deleteHoldOrder(orderId);
        });
    });

    viewOrdersModal.classList.remove('hidden');
}

function loadHoldOrder(orderId, switchTable = true) {
    const order = holdOrders.find(o => o.id === orderId);
    if (!order) return;

    if (switchTable) {
        // Switch to the table of the hold order
        currentTable = order.table;
        updateTableDisplay();
        tableButtons.forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.dataset.table) === currentTable) {
                btn.classList.add('active');
            }
        });
    }

    cart = [...order.items];
    updateCart();
    viewOrdersModal.classList.add('hidden');
}

function completeHoldOrder(orderId) {
    const orderIndex = holdOrders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) return;

    const order = holdOrders[orderIndex];
    
    // Create completed order object
    const completedOrder = {
        id: currentBillNumber,
        date: new Date().toISOString(),
        table: order.table,
        items: [...order.items],
        subtotal: order.subtotal,
        tax: order.tax,
        total: order.total,
        status: 'completed'
    };

    // Add to order history
    orderHistory.push(completedOrder);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

    // Remove from hold orders
    holdOrders.splice(orderIndex, 1);
    localStorage.setItem('holdOrders', JSON.stringify(holdOrders));

    // Increment bill number
    currentBillNumber += 1;
    localStorage.setItem('lastBillNumber', currentBillNumber.toString());

    // Generate bill
    generateBill(completedOrder);

    // Refresh view
    showAllOrders();
}

function deleteHoldOrder(orderId) {
    if (!confirm('Are you sure you want to delete this hold order?')) return;
    
    const orderIndex = holdOrders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) return;

    // Remove from hold orders
    holdOrders.splice(orderIndex, 1);
    localStorage.setItem('holdOrders', JSON.stringify(holdOrders));

    // Refresh view
    showAllOrders();
}

function generateBill(order) {
    // Set bill details
    billNumber.textContent = order.id;
    billDate.textContent = new Date(order.date).toLocaleDateString('en-IN');
    billTable.textContent = order.table === 0 ? 'Walk-in' : `Table ${order.table}`;
    
    // Clear previous items
    billItemsContainer.innerHTML = '';
    
    // Add current items
    order.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const row = document.createElement('tr');
        row.className = 'border-b';
        row.innerHTML = `
            <td class="py-1">${item.name}</td>
            <td class="text-right py-1">${item.quantity}</td>
            <td class="text-right py-1">₹${item.price.toFixed(2)}</td>
            <td class="text-right py-1">₹${itemTotal.toFixed(2)}</td>
        `;
        billItemsContainer.appendChild(row);
    });
    
    // Set totals
    billSubtotal.textContent = `₹${order.subtotal.toFixed(2)}`;
    document.getElementById('bill-tax').textContent = `₹${order.tax.toFixed(2)}`;
    billTotal.textContent = `₹${order.total.toFixed(2)}`;
    
    // Show and print the bill
    billTemplate.classList.remove('hidden');
    window.print();
    billTemplate.classList.add('hidden');
}

// Menu Editing Functions
function showEditMenu() {
    editMenuItemsContainer.innerHTML = '';
    
    menuItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'border-b py-3 mb-3';
        itemElement.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-6 gap-2 items-end">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" class="edit-item-name mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="${item.name}">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Category</label>
                    <select class="edit-item-category mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="food" ${item.category === 'food' ? 'selected' : ''}>Food</option>
                        <option value="beverage" ${item.category === 'beverage' ? 'selected' : ''}>Beverage</option>
                        <option value="dessert" ${item.category === 'dessert' ? 'selected' : ''}>Dessert</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Price</label>
                    <input type="number" class="edit-item-price mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="${item.price}">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <input type="text" class="edit-item-desc mt-1 block w-full rounded-md border-gray-300 shadow-sm" value="${item.description}">
                </div>
                <div class="flex justify-end">
                    <button class="delete-menu-item px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" data-index="${index}">
                        Delete
                    </button>
                </div>
            </div>
        `;
        editMenuItemsContainer.appendChild(itemElement);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-menu-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            deleteMenuItem(index);
        });
    });

    editMenuModal.classList.remove('hidden');
}

function addNewMenuItem() {
    const newItemElement = document.createElement('div');
    newItemElement.className = 'border-b py-3 mb-3 bg-yellow-50';
    newItemElement.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-6 gap-2 items-end">
            <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" class="edit-item-name mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Item name">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Category</label>
                <select class="edit-item-category mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    <option value="food">Food</option>
                    <option value="beverage">Beverage</option>
                    <option value="dessert">Dessert</option>
                </select>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" class="edit-item-price mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Price">
            </div>
            <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <input type="text" class="edit-item-desc mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Description">
            </div>
            <div class="flex justify-end">
                <button class="cancel-new-item px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600">
                    Cancel
                </button>
            </div>
        </div>
    `;
    editMenuItemsContainer.prepend(newItemElement);

    // Add event listener to cancel button
    document.querySelector('.cancel-new-item').addEventListener('click', () => {
        newItemElement.remove();
    });

    // Focus on the name field
    newItemElement.querySelector('.edit-item-name').focus();
}

function saveMenuChanges() {
    const updatedMenu = [];
    
    // Get all menu item editors
    const itemEditors = editMenuItemsContainer.querySelectorAll('div.border-b');
    
    itemEditors.forEach(editor => {
        // Skip if it's a new item that was cancelled
        if (editor.querySelector('.cancel-new-item')) {
            return;
        }
        
        const name = editor.querySelector('.edit-item-name').value.trim();
        const category = editor.querySelector('.edit-item-category').value;
        const price = parseFloat(editor.querySelector('.edit-item-price').value);
        const description = editor.querySelector('.edit-item-desc').value.trim();
        
        if(name && !isNaN(price) && description) {
            updatedMenu.push({
                id: updatedMenu.length + 1,
                name,
                category,
                price,
                description
            });
        }
    });
    
    if (updatedMenu.length === 0) {
        alert('Menu cannot be empty');
        return;
    }
    
    // Update menu
    menuItems = updatedMenu;
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    
    // Refresh menu display
    renderMenuItems();
    
    // Close edit modal
    editMenuModal.classList.add('hidden');
}

function deleteMenuItem(index) {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    
    menuItems.splice(index, 1);
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    
    // Refresh edit view
    showEditMenu();
}

// Local Storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}