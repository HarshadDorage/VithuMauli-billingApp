// Menu Data
const menuItems = [
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

// State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
let currentBillNumber = parseInt(localStorage.getItem('lastBillNumber')) || 1;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMenuItems();
    renderCart();
    setupEventListeners();
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

    // Cart buttons
    checkoutBtn.addEventListener('click', showOrderConfirmation);
    clearCartBtn.addEventListener('click', clearCart);

    // Order modal buttons
    confirmOrderBtn.addEventListener('click', confirmOrder);
    cancelOrderBtn.addEventListener('click', () => {
        orderModal.classList.add('hidden');
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

    const total = subtotal;

    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
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

    const total = subtotal;

    summaryHTML += `
        </div>
        <div class="border-t pt-2">
            <div class="flex justify-between">
                <span>Subtotal:</span>
                <span>₹${subtotal.toFixed(2)}</span>
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
    const total = subtotal;

    // Create order object
    const order = {
        id: currentBillNumber,
        date: new Date().toISOString(),
        items: [...cart],
        subtotal,
        total
    };

    // Add to order history
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

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

function generateBill(order) {
    // Set bill details
    billNumber.textContent = order.id;
    billDate.textContent = new Date(order.date).toLocaleDateString('en-IN');
    
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
    billTotal.textContent = `₹${order.total.toFixed(2)}`;
    
    // Show and print the bill
    billTemplate.classList.remove('hidden');
    window.print();
    billTemplate.classList.add('hidden');
}

// Local Storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}