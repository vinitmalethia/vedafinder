import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import QuickViewModal from './components/QuickViewModal';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CollectionsPage from './pages/CollectionsPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import CustomerAccountModal from './components/CustomerAccountModal';
import { INITIAL_CART } from './data/products';
import { auth, logoutUser, onAuthStateChanged } from './firebase/config';

export default function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [shopCategoryFilter, setShopCategoryFilter] = useState('all');
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('vf_cart');
      return saved ? JSON.parse(saved) : INITIAL_CART;
    } catch {
      return INITIAL_CART;
    }
  });
  const [customerOrders, setCustomerOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('vf_customer_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [user, setUser] = useState(null);

  // Save cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vf_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  // Sync Firebase Auth state across the app
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const isMasterAdmin = (currentUser.email === 'sachin@gmail.com');
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || (isMasterAdmin ? 'Sachin (Admin)' : currentUser.email?.split('@')[0]),
          photoURL: currentUser.photoURL,
          role: isMasterAdmin ? 'admin' : 'customer'
        });
      } else {
        // Keep local admin session if active
        setUser(prev => (prev?.email === 'sachin@gmail.com' ? prev : null));
      }
    });

    return () => unsubscribe();
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavigate = (page, category = 'all') => {
    setCurrentPage(page);
    if (category) {
      setShopCategoryFilter(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSearch = (query = '') => {
    setSearchInitialQuery(query);
    setIsSearchOpen(true);
  };

  const handleAddToCart = (product, openDrawer = true) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item => 
          item.name === product.name 
            ? { ...item, quantity: item.quantity + (product.quantity || 1) } 
            : item
        );
      }
      return [
        ...prev, 
        { 
          id: product.id || 'cart-' + Date.now(), 
          name: product.name, 
          category: product.category || 'Ayurvedic', 
          size: product.size || product.weight || 'Standard Unit', 
          price: product.price || 449, 
          quantity: product.quantity || 1, 
          image: product.image || '/products/nar-ojas.png' 
        }
      ];
    });
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product, true);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    handleNavigate('Home');
  };

  // PRIVATE ADMIN ROUTE GUARD
  if (currentPage === 'Admin') {
    // Check if user is authenticated with the private admin credentials
    const isAuthorizedAdmin = user && user.role === 'admin' && user.email === 'sachin@gmail.com';

    if (!isAuthorizedAdmin) {
      return (
        <LoginPage 
          initialAdminMode={true}
          onNavigate={handleNavigate}
          onLoginSuccess={(adminData) => {
            setUser(adminData);
            setCurrentPage('Admin');
          }}
        />
      );
    }

    return (
      <AdminPage 
        currentUser={user}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
    );
  }

  // If Login Page is active, render dedicated Login View
  if (currentPage === 'Login') {
    return (
      <LoginPage 
        onNavigate={handleNavigate}
        onLoginSuccess={(userData) => {
          setUser(userData);
          if (userData.role === 'admin') {
            handleNavigate('Admin');
          } else {
            handleNavigate('Home');
          }
        }}
      />
    );
  }

  // Render standard storefront pages
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'Home':
        return (
          <HomePage 
            onNavigate={handleNavigate}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
          />
        );
      case 'Shop':
        return (
          <ShopPage 
            initialCategory={shopCategoryFilter}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        );
      case 'Collections':
        return (
          <CollectionsPage 
            onNavigate={handleNavigate}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        );
      case 'About Us':
        return (
          <AboutPage 
            onNavigate={handleNavigate}
          />
        );
      case 'Blog':
        return (
          <BlogPage 
            onNavigate={handleNavigate}
          />
        );
      case 'Contact':
        return (
          <ContactPage />
        );
      default:
        return (
          <HomePage 
            onNavigate={handleNavigate}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] font-sans selection:bg-[#183B2B] selection:text-[#FAF7F2]">
      {/* Top Header with Announcement and Navigation */}
      <Header 
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={handleOpenSearch}
        activeNav={currentPage}
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
        onOpenAccountModal={() => setIsAccountModalOpen(true)}
      />

      {/* Dynamic Main Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
        onOrderPlaced={(newOrder) => {
          setCustomerOrders(prev => [newOrder, ...prev]);
        }}
      />

      {/* Global Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialQuery={searchInitialQuery}
        onSelectProduct={(item) => setQuickViewProduct(item.raw || item)}
      />

      {/* Product Quick View Modal */}
      <QuickViewModal 
        isOpen={!!quickViewProduct}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Customer Account & Orders Modal */}
      <CustomerAccountModal 
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        user={user}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        orders={customerOrders}
      />
    </div>
  );
}
