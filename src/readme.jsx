// App.jsx - sets up routes

// MainLayout.jsx - holds the cart state + navbar

// HomePage.jsx - fetches products from Fake Store API

// ProductCard.jsx - shows each product and has Add to Cart button

// CartUtils.jsx - updates the cart

// MainLayout.jsx - navbar cart count updates

































// Flow
// 1. App loads
// 2. React Router shows MainLayout
// 3. MainLayout creates cart state: []
// 4. HomePage appears inside Outlet
// 5. HomePage fetches products from API
// 6. Products are stored in products state
// 7. HomePage maps products into ProductCards
// 8. User clicks Add to Cart
// 9. ProductCard calls onAdd
// 10. HomePage runs setCart(addToCart(cart, product))
// 11. CartUtils updates the cart array
// 12. MainLayout re-renders
// 13. Cart count in navbar updates