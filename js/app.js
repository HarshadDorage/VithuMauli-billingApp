// // Menu Data
// let menuItems = JSON.parse(localStorage.getItem('menuItems')) || [
//     // Maharashtrian
//     { id: 1, name: "Misal Pav", category: "maharashtrian", price: 70, description: "Spicy curry with bread" },
//     { id: 2, name: "Vada Pav", category: "maharashtrian", price: 20, description: "Indian burger" },
//     { id: 3, name: "Pav Bhaji", category: "maharashtrian", price: 80, description: "Buttered bread with vegetable curry" },
//     { id: 4, name: "Thalipeeth", category: "maharashtrian", price: 60, description: "Multigrain pancake" },
//     { id: 5, name: "Puran Poli", category: "maharashtrian", price: 50, description: "Sweet flatbread" },
    
//     // South Indian
//     { id: 6, name: "Masala Dosa", category: "south-indian", price: 60, description: "Dosa with potato filling" },
//     { id: 7, name: "Idli Sambar", category: "south-indian", price: 50, description: "Steamed rice cakes with lentil soup" },
//     { id: 8, name: "Medu Vada", category: "south-indian", price: 50, description: "Savory fried donut" },
//     { id: 9, name: "Rava Dosa", category: "south-indian", price: 70, description: "Crispy semolina dosa" },
//     { id: 10, name: "Uttapam", category: "south-indian", price: 60, description: "Thick pancake with toppings" },
    
//     // Drinks
//     { id: 11, name: "Tea", category: "drinks", price: 15, description: "Traditional Indian tea" },
//     { id: 12, name: "Coffee", category: "drinks", price: 20, description: "Filter coffee" },
//     { id: 13, name: "Lassi", category: "drinks", price: 40, description: "Yogurt-based drink" },
//     { id: 14, name: "Buttermilk", category: "drinks", price: 25, description: "Spiced buttermilk" },
//     { id: 15, name: "Lemonade", category: "drinks", price: 30, description: "Fresh lemon drink" }
// ];

// // DOM Elements
// const menuItemsContainer = document.getElementById('menu-items');
// const cartItemsContainer = document.getElementById('cart-items');
// const subtotalElement = document.getElementById('subtotal');
// const totalElement = document.getElementById('total');
// const checkoutBtn = document.getElementById('checkout-btn');
// const categoryButtons = document.querySelectorAll('.category-btn');
// const orderModal = document.getElementById('order-modal');
// const orderSummary = document.getElementById('order-summary');
// const confirmOrderBtn = document.getElementById('confirm-order');
// const cancelOrderBtn = document.getElementById('cancel-order');
// const billTemplate = document.getElementById('bill-template');
// const billItemsContainer = document.getElementById('bill-items');
// const billSubtotal = document.getElementById('bill-subtotal');
// const billTotal = document.getElementById('bill-total');
// const billNumber = document.getElementById('bill-number');
// const billDate = document.getElementById('bill-date');
// const billTable = document.getElementById('bill-table');
// const tableButtons = document.querySelectorAll('.table-btn');
// const currentTableDisplay = document.getElementById('current-table');

// // State
// let currentTable = 0; // 0 = Walk-in, 1-5 = Table 1-5
// let cart = [];
// let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
// let currentBillNumber = parseInt(localStorage.getItem('lastBillNumber')) || 1;

// // Initialize
// document.addEventListener('DOMContentLoaded', () => {
//     renderMenuItems();
//     renderCart();
//     setupEventListeners();
//     updateTableDisplay();
// });

// // Event Listeners
// function setupEventListeners() {
//     // Category filtering
//     categoryButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             categoryButtons.forEach(btn => btn.classList.remove('active'));
//             button.classList.add('active');
//             renderMenuItems(button.dataset.category);
//         });
//     });

//     // Table selection
//     tableButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             tableButtons.forEach(btn => btn.classList.remove('active'));
//             button.classList.add('active');
//             currentTable = parseInt(button.dataset.table);
//             updateTableDisplay();
            
//             // Clear cart when switching tables
//             cart = [];
//             updateCart();
//         });
//     });

//     // Cart buttons
//     checkoutBtn.addEventListener('click', showOrderConfirmation);

//     // Order modal buttons
//     confirmOrderBtn.addEventListener('click', confirmOrder);
//     cancelOrderBtn.addEventListener('click', () => {
//         orderModal.classList.add('hidden');
//     });
// }

// // Render Menu Items
// function renderMenuItems(category = 'all') {
//     menuItemsContainer.innerHTML = '';
    
//     const filteredItems = category === 'all' 
//         ? menuItems 
//         : menuItems.filter(item => item.category === category);
    
//     if (filteredItems.length === 0) {
//         menuItemsContainer.innerHTML = '<p class="text-gray-500 col-span-3 text-center py-4">No items found in this category</p>';
//         return;
//     }
    
//     filteredItems.forEach(item => {
//         const itemElement = document.createElement('div');
//         itemElement.className = 'menu-item bg-white rounded-lg shadow p-4 flex flex-col menu-card';
//         itemElement.innerHTML = `
//             <h3 class="font-semibold text-gray-800">${item.name}</h3>
//             <p class="text-sm text-gray-600 mb-2">${item.description}</p>
//             <div class="mt-auto flex justify-between items-center">
//                 <span class="font-bold text-blue-600">₹${item.price.toFixed(2)}</span>
//                 <button class="add-to-cart bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition" data-id="${item.id}">
//                     <i class="fas fa-plus mr-1"></i>Add
//                 </button>
//             </div>
//         `;
//         menuItemsContainer.appendChild(itemElement);
//     });

//     // Add event listeners to all add-to-cart buttons
//     document.querySelectorAll('.add-to-cart').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const itemId = parseInt(e.target.closest('button').dataset.id);
//             addToCart(itemId);
//         });
//     });
// }

// // Cart Functions
// function addToCart(itemId) {
//     const item = menuItems.find(i => i.id === itemId);
//     if (!item) return;

//     const existingItem = cart.find(i => i.id === itemId);
//     if (existingItem) {
//         existingItem.quantity += 1;
//     } else {
//         cart.push({ ...item, quantity: 1 });
//     }

//     updateCart();
// }

// function updateCart() {
//     renderCart();
//     saveCartToLocalStorage();
//     updateCheckoutButton();
// }

// function renderCart() {
//     if (cart.length === 0) {
//         cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Your cart is empty</p>';
//         subtotalElement.textContent = '₹0.00';
//         totalElement.textContent = '₹0.00';
//         return;
//     }

//     cartItemsContainer.innerHTML = '';
//     let subtotal = 0;

//     cart.forEach(item => {
//         const itemTotal = item.price * item.quantity;
//         subtotal += itemTotal;

//         const itemElement = document.createElement('div');
//         itemElement.className = 'flex justify-between items-center py-3 border-b';
//         itemElement.innerHTML = `
//             <div class="flex-1">
//                 <h4 class="font-medium text-gray-800">${item.name}</h4>
//                 <div class="flex items-center mt-1">
//                     <button class="decrease-quantity text-gray-500 hover:text-gray-700" data-id="${item.id}">
//                         <i class="fas fa-minus-circle"></i>
//                     </button>
//                     <span class="quantity mx-3 font-medium">${item.quantity}</span>
//                     <button class="increase-quantity text-gray-500 hover:text-gray-700" data-id="${item.id}">
//                         <i class="fas fa-plus-circle"></i>
//                     </button>
//                 </div>
//             </div>
//             <div class="text-right">
//                 <span class="item-total font-medium text-gray-800">₹${itemTotal.toFixed(2)}</span>
//                 <button class="remove-item block text-red-500 text-xs mt-1 hover:underline" data-id="${item.id}">
//                     <i class="fas fa-trash-alt mr-1"></i>Remove
//                 </button>
//             </div>
//         `;
//         cartItemsContainer.appendChild(itemElement);
//     });

//     const tax = subtotal * 0.10;
//     const total = subtotal + tax;

//     subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
//     document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
//     totalElement.textContent = `₹${total.toFixed(2)}`;

//     // Add event listeners to quantity buttons
//     document.querySelectorAll('.increase-quantity').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const itemId = parseInt(e.target.closest('button').dataset.id);
//             increaseQuantity(itemId);
//         });
//     });

//     document.querySelectorAll('.decrease-quantity').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const itemId = parseInt(e.target.closest('button').dataset.id);
//             decreaseQuantity(itemId);
//         });
//     });

//     document.querySelectorAll('.remove-item').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const itemId = parseInt(e.target.closest('button').dataset.id);
//             removeFromCart(itemId);
//         });
//     });
// }

// function increaseQuantity(itemId) {
//     const item = cart.find(i => i.id === itemId);
//     if (item) {
//         item.quantity += 1;
//         updateCart();
//     }
// }

// function decreaseQuantity(itemId) {
//     const item = cart.find(i => i.id === itemId);
//     if (item) {
//         if (item.quantity > 1) {
//             item.quantity -= 1;
//         } else {
//             cart = cart.filter(i => i.id !== itemId);
//         }
//         updateCart();
//     }
// }

// function removeFromCart(itemId) {
//     cart = cart.filter(i => i.id !== itemId);
//     updateCart();
// }

// function updateCheckoutButton() {
//     checkoutBtn.disabled = cart.length === 0;
// }

// // Table Functions
// function updateTableDisplay() {
//     const tableNames = ['Walk-in', 'Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5'];
//     currentTableDisplay.textContent = tableNames[currentTable];
// }

// // Order Functions
// function showOrderConfirmation() {
//     if (cart.length === 0) return;

//     let summaryHTML = '<div class="space-y-3 mb-4">';
//     let subtotal = 0;

//     cart.forEach(item => {
//         const itemTotal = item.price * item.quantity;
//         subtotal += itemTotal;
//         summaryHTML += `
//             <div class="flex justify-between items-center">
//                 <span class="text-gray-700">${item.name} x ${item.quantity}</span>
//                 <span class="font-medium">₹${itemTotal.toFixed(2)}</span>
//             </div>
//         `;
//     });

//     const tax = subtotal * 0.10;
//     const total = subtotal + tax;

//     summaryHTML += `
//         </div>
//         <div class="border-t pt-3">
//             <div class="flex justify-between mb-1">
//                 <span class="text-gray-700">Subtotal:</span>
//                 <span class="font-medium">₹${subtotal.toFixed(2)}</span>
//             </div>
//             <div class="flex justify-between mb-1">
//                 <span class="text-gray-700">Tax (10%):</span>
//                 <span class="font-medium">₹${tax.toFixed(2)}</span>
//             </div>
//             <div class="flex justify-between font-bold mt-2 pt-2 border-t">
//                 <span class="text-gray-800">Total:</span>
//                 <span class="text-blue-600">₹${total.toFixed(2)}</span>
//             </div>
//         </div>
//     `;

//     orderSummary.innerHTML = summaryHTML;
//     orderModal.classList.remove('hidden');
// }

// function confirmOrder() {
//     if (cart.length === 0) return;

//     // Calculate totals
//     const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//     const tax = subtotal * 0.10;
//     const total = subtotal + tax;

//     // Create order object
//     const order = {
//         id: currentBillNumber,
//         date: new Date().toISOString(),
//         table: currentTable,
//         items: [...cart],
//         subtotal,
//         tax,
//         total,
//         status: 'completed'
//     };

//     // Add to order history
//     orderHistory.push(order);
//     localStorage.setItem('orderHistory', JSON.stringify(orderHistory));

//     // Increment and save bill number
//     currentBillNumber += 1;
//     localStorage.setItem('lastBillNumber', currentBillNumber.toString());

//     // Generate bill (but don't print automatically)
//     generateBill(order);

//     // Clear cart
//     cart = [];
//     updateCart();

//     // Close modal
//     orderModal.classList.add('hidden');

//     // Show success message
//     alert(`Order #${order.id} for ${currentTableDisplay.textContent} has been placed successfully!`);
// }

// function generateBill(order) {
//     // Set bill details
//     billNumber.textContent = order.id;
//     billDate.textContent = new Date(order.date).toLocaleDateString('en-IN');
//     billTable.textContent = order.table === 0 ? 'Walk-in' : `Table ${order.table}`;
    
//     // Clear previous items
//     billItemsContainer.innerHTML = '';
    
//     // Add current items
//     order.items.forEach(item => {
//         const itemTotal = item.price * item.quantity;
//         const row = document.createElement('tr');
//         row.className = 'border-b';
//         row.innerHTML = `
//             <td class="py-1">${item.name}</td>
//             <td class="text-right py-1">${item.quantity}</td>
//             <td class="text-right py-1">₹${item.price.toFixed(2)}</td>
//             <td class="text-right py-1">₹${itemTotal.toFixed(2)}</td>
//         `;
//         billItemsContainer.appendChild(row);
//     });
    
//     // Set totals
//     billSubtotal.textContent = `₹${order.subtotal.toFixed(2)}`;
//     document.getElementById('bill-tax').textContent = `₹${order.tax.toFixed(2)}`;
//     billTotal.textContent = `₹${order.total.toFixed(2)}`;
// }

// // Local Storage
// function saveCartToLocalStorage() {
//     localStorage.setItem('cart', JSON.stringify(cart));
// }