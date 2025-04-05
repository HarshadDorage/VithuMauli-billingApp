
// document.addEventListener('DOMContentLoaded', () => {
//     // Check authentication
//     if (!localStorage.getItem('isLoggedIn')) {
//         window.location.href = 'login.html';
//         return;
//     }

//     // Setup event listeners
//     setupEventListeners();

//     // Load data
//     loadDashboardData();
//     loadRecentOrders();
//     loadRecentExpenses();
//     renderSalesChart();
// });

// function setupEventListeners() {
//     // Logout button
//     document.getElementById('logout-btn').addEventListener('click', logout);

//     // Expense buttons
//     document.getElementById('add-expense-btn').addEventListener('click', () => {
//         document.getElementById('expense-modal').classList.remove('hidden');
//         document.getElementById('expense-date').valueAsDate = new Date();
//     });

//     document.getElementById('cancel-expense').addEventListener('click', () => {
//         document.getElementById('expense-modal').classList.add('hidden');
//     });

//     document.getElementById('expense-form').addEventListener('submit', addExpense);

//     // View buttons
//     document.getElementById('view-orders-btn').addEventListener('click', () => {
//         loadRecentOrders(true); // Load all orders
//     });

//     document.getElementById('view-expenses-btn').addEventListener('click', () => {
//         loadRecentExpenses(true); // Load all expenses
//     });

//     // Refresh buttons
//     document.getElementById('refresh-orders').addEventListener('click', () => {
//         loadRecentOrders();
//     });

//     document.getElementById('refresh-expenses').addEventListener('click', () => {
//         loadRecentExpenses();
//     });

//     // Close order details modal
//     document.getElementById('close-order-details').addEventListener('click', () => {
//         document.getElementById('order-details-modal').classList.add('hidden');
//     });
// }

// function loadDashboardData() {
//     const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
//     const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

//     // Today's date
//     const today = new Date().toISOString().split('T')[0];

//     // Today's summary
//     const todayOrders = orders.filter(order => order.date.includes(today));
//     const todaySales = todayOrders.reduce((sum, order) => sum + order.total, 0);
//     const todayExpenses = expenses.filter(exp => exp.date === today)
//         .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
//     const todayProfit = todaySales - todayExpenses;

//     document.getElementById('today-orders').textContent = todayOrders.length;
//     document.getElementById('today-sales').textContent = `₹${todaySales.toFixed(2)}`;
//     document.getElementById('today-expenses').textContent = `₹${todayExpenses.toFixed(2)}`;
//     document.getElementById('today-profit').textContent = `₹${todayProfit.toFixed(2)}`;
//     document.getElementById('today-profit').className = todayProfit >= 0 ? 'font-bold text-green-600' : 'font-bold text-red-600';

//     // Monthly summary (current month)
//     const currentMonth = new Date().getMonth() + 1;
//     const currentYear = new Date().getFullYear();
    
//     const monthOrders = orders.filter(order => {
//         const orderDate = new Date(order.date);
//         return orderDate.getMonth() + 1 === currentMonth && orderDate.getFullYear() === currentYear;
//     });
    
//     const monthSales = monthOrders.reduce((sum, order) => sum + order.total, 0);
    
//     const monthExpenses = expenses.filter(exp => {
//         const expDate = new Date(exp.date);
//         return expDate.getMonth() + 1 === currentMonth && expDate.getFullYear() === currentYear;
//     }).reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    
//     const monthProfit = monthSales - monthExpenses;

//     document.getElementById('month-orders').textContent = monthOrders.length;
//     document.getElementById('month-sales').textContent = `₹${monthSales.toFixed(2)}`;
//     document.getElementById('month-expenses').textContent = `₹${monthExpenses.toFixed(2)}`;
//     document.getElementById('month-profit').textContent = `₹${monthProfit.toFixed(2)}`;
//     document.getElementById('month-profit').className = monthProfit >= 0 ? 'font-bold text-green-600' : 'font-bold text-red-600';
// }

// function loadRecentOrders(showAll = false) {
//     const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
//     const ordersContainer = document.getElementById('recent-orders');
    
//     // Sort by date (newest first)
//     orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
//     // Limit to 10 if not showing all
//     const displayOrders = showAll ? orders : orders.slice(0, 10);
    
//     if (displayOrders.length === 0) {
//         ordersContainer.innerHTML = `
//             <tr>
//                 <td colspan="5" class="text-center py-4 text-gray-500">No orders found</td>
//             </tr>
//         `;
//         return;
//     }
    
//     ordersContainer.innerHTML = '';
    
//     displayOrders.forEach((order, index) => {
//         const orderDate = new Date(order.date);
//         const row = document.createElement('tr');
//         row.className = 'border-b hover:bg-gray-50';
//         row.innerHTML = `
//             <td class="py-2">${order.id}</td>
//             <td class="py-2">${orderDate.toLocaleDateString()}</td>
//             <td class="py-2 text-right">₹${order.total.toFixed(2)}</td>
//             <td class="py-2 text-right">
//                 <button class="view-order text-blue-500 hover:underline mr-2" data-id="${order.id}">
//                     View
//                 </button>
//                 <button class="delete-order text-red-500 hover:underline" data-id="${order.id}" data-index="${index}">
//                     Delete
//                 </button>
//             </td>
//         `;
//         ordersContainer.appendChild(row);
//     });
    
//     // Add event listeners to view buttons
//     document.querySelectorAll('.view-order').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const orderId = parseInt(e.target.dataset.id);
//             showOrderDetails(orderId);
//         });
//     });
    
//     // Add event listeners to delete buttons
//     document.querySelectorAll('.delete-order').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const orderId = parseInt(e.target.dataset.id);
//             const orderIndex = parseInt(e.target.dataset.index);
//             deleteOrder(orderId, orderIndex);
//         });
//     });
// }


// function deleteOrder(orderId, orderIndex) {
//     if (!confirm('Are you sure you want to delete this order?')) return;
    
//     let orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
//     orders.splice(orderIndex, 1);
//     localStorage.setItem('orderHistory', JSON.stringify(orders));
    
//     // Refresh data
//     loadDashboardData();
//     loadRecentOrders();
// }

// function loadRecentExpenses(showAll = false) {
//     const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
//     const expensesContainer = document.getElementById('recent-expenses');
    
//     // Sort by date (newest first)
//     expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    
//     // Limit to 10 if not showing all
//     const displayExpenses = showAll ? expenses : expenses.slice(0, 10);
    
//     if (displayExpenses.length === 0) {
//         expensesContainer.innerHTML = `
//             <tr>
//                 <td colspan="4" class="text-center py-4 text-gray-500">No expenses found</td>
//             </tr>
//         `;
//         return;
//     }
    
//     expensesContainer.innerHTML = '';
    
//     displayExpenses.forEach((expense, index) => {
//         const expDate = new Date(expense.date);
//         const row = document.createElement('tr');
//         row.className = 'border-b hover:bg-gray-50';
//         row.innerHTML = `
//             <td class="py-2">${expDate.toLocaleDateString()}</td>
//             <td class="py-2">${expense.description}</td>
//             <td class="py-2 text-right">₹${parseFloat(expense.amount).toFixed(2)}</td>
//             <td class="py-2 text-right">
//                 <button class="delete-expense text-red-500 hover:underline" data-index="${index}">
//                     Delete
//                 </button>
//             </td>
//         `;
//         expensesContainer.appendChild(row);
//     });
    
//     // Add event listeners to delete buttons
//     document.querySelectorAll('.delete-expense').forEach(button => {
//         button.addEventListener('click', (e) => {
//             const expenseIndex = parseInt(e.target.dataset.index);
//             deleteExpense(expenseIndex);
//         });
//     });
// }

// function addExpense(e) {
//     e.preventDefault();
    
//     const date = document.getElementById('expense-date').value;
//     const description = document.getElementById('expense-description').value;
//     const amount = parseFloat(document.getElementById('expense-amount').value);
    
//     if (!date || !description || isNaN(amount)) {
//         alert('Please fill all fields with valid data');
//         return;
//     }
    
//     const expense = { date, description, amount };
//     const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
//     expenses.push(expense);
//     localStorage.setItem('expenses', JSON.stringify(expenses));
    
//     // Reset form and hide modal
//     e.target.reset();
//     document.getElementById('expense-modal').classList.add('hidden');
    
//     // Refresh data
//     loadDashboardData();
//     loadRecentExpenses();
// }

// function deleteExpense(index) {
//     if (!confirm('Are you sure you want to delete this expense?')) return;
    
//     const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
//     expenses.splice(index, 1);
//     localStorage.setItem('expenses', JSON.stringify(expenses));
    
//     // Refresh data
//     loadDashboardData();
//     loadRecentExpenses();
// }

// function showOrderDetails(orderId) {
//     const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
//     const order = orders.find(o => o.id === orderId);
    
//     if (!order) {
//         alert('Order not found');
//         return;
//     }
    
//     const orderDate = new Date(order.date);
//     let itemsHTML = '';
    
//     order.items.forEach(item => {
//         itemsHTML += `
//             <div class="flex justify-between py-1 border-b">
//                 <span>${item.name} x ${item.quantity}</span>
//                 <span>₹${(item.price * item.quantity).toFixed(2)}</span>
//             </div>
//         `;
//     });
    
//     const content = `
//         <div class="mb-4">
//             <div class="flex justify-between">
//                 <span class="font-semibold">Order ID:</span>
//                 <span>${order.id}</span>
//             </div>
//             <div class="flex justify-between">
//                 <span class="font-semibold">Date:</span>
//                 <span>${orderDate.toLocaleString()}</span>
//             </div>
//         </div>
        
//         <h4 class="font-semibold mb-2">Items:</h4>
//         <div class="mb-4">
//             ${itemsHTML}
//         </div>
        
//         <div class="border-t pt-2">
//             <div class="flex justify-between">
//                 <span class="font-semibold">Subtotal:</span>
//                 <span>₹${order.subtotal.toFixed(2)}</span>
//             </div>
//             <div class="flex justify-between">
//                 <span class="font-semibold">Tax (10%):</span>
//                 <span>₹${order.tax.toFixed(2)}</span>
//             </div>
//             <div class="flex justify-between font-bold mt-1">
//                 <span>Total:</span>
//                 <span>₹${order.total.toFixed(2)}</span>
//             </div>
//         </div>
//     `;
    
//     document.getElementById('order-details-content').innerHTML = content;
//     document.getElementById('order-details-modal').classList.remove('hidden');
// }

// function renderSalesChart() {
//     const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    
//     // Get last 7 days
//     const dates = [];
//     const salesData = [];
    
//     for (let i = 6; i >= 0; i--) {
//         const date = new Date();
//         date.setDate(date.getDate() - i);
//         const dateString = date.toISOString().split('T')[0];
//         dates.push(date.toLocaleDateString(undefined, { weekday: 'short' }));
        
//         const dayOrders = orders.filter(order => order.date.includes(dateString));
//         const daySales = dayOrders.reduce((sum, order) => sum + order.total, 0);
//         salesData.push(daySales);
//     }
    
//     const ctx = document.getElementById('sales-chart').getContext('2d');
    
//     // Destroy previous chart if it exists
//     if (window.salesChart) {
//         window.salesChart.destroy();
//     }
    
//     window.salesChart = new Chart(ctx, {
//         type: 'bar',
//         data: {
//             labels: dates,
//             datasets: [{
//                 label: 'Daily Sales (₹)',
//                 data: salesData,
//                 backgroundColor: 'rgba(59, 130, 246, 0.7)',
//                 borderColor: 'rgba(59, 130, 246, 1)',
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
// }

// function logout() {
//     localStorage.removeItem('isLoggedIn');
//     window.location.href = 'login.html';
// }

// function resetOrderNumbers() {
//     if (!confirm('This will reset all order numbers starting from 1. Continue?')) return;
    
//     let orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    
//     // Sort orders by date (oldest first)
//     orders.sort((a, b) => new Date(a.date) - new Date(b.date));
    
//     // Reassign IDs starting from 1
//     orders.forEach((order, index) => {
//         order.id = index + 1;
//     });
    
//     // Update lastBillNumber
//     const newLastBillNumber = orders.length > 0 ? orders.length : 1;
//     localStorage.setItem('lastBillNumber', newLastBillNumber.toString());
    
//     // Save updated orders
//     localStorage.setItem('orderHistory', JSON.stringify(orders));
    
//     // Refresh data
//     loadDashboardData();
//     loadRecentOrders();
    
//     alert('Order numbers have been reset successfully!');
// }