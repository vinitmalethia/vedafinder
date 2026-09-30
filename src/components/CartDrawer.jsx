import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, ArrowLeft, Truck, Phone, MapPin } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, setCartItems, onOrderPlaced }) {
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPincode, setCustomerPincode] = useState('');
  const [paymentMode, setPaymentMode] = useState('COD'); // 'COD' | 'UPI'
  const [lastOrder, setLastOrder] = useState(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 499;
  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 60;
  const finalTotal = subtotal + shippingFee;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert("Please fill in your name, phone number, and delivery address.");
      return;
    }

    const orderId = '#VF' + Math.floor(1000 + Math.random() * 9000);
    const orderDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const itemsSummary = cartItems.map((item, idx) => 
      `${idx + 1}. *${item.name}* (${item.size || 'Pack'}) x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n');

    const whatsappMessage = [
      `🛒 *NEW ORDER FROM VEDA FINDER*`,
      `*Order ID:* ${orderId}`,
      `*Date:* ${orderDate}`,
      ``,
      `👤 *Customer Details:*`,
      `• *Name:* ${customerName.trim()}`,
      `• *Phone:* ${customerPhone.trim()}`,
      `• *Address:* ${customerAddress.trim()}${customerPincode ? ` - ${customerPincode.trim()}` : ''}`,
      `• *Payment Mode:* ${paymentMode === 'COD' ? 'Cash On Delivery (COD)' : 'Online Payment / UPI'}`,
      ``,
      `📦 *Items Ordered:*`,
      itemsSummary,
      ``,
      `💵 *Subtotal:* ₹${subtotal}`,
      `🚚 *Delivery:* ${shippingFee === 0 ? 'FREE' : '₹60'}`,
      `💰 *Total Amount Payable:* ₹${finalTotal}`,
      ``,
      `Please confirm my order dispatch. Thank you! 🌿`
    ].join('\n');

    const whatsappUrl = `https://wa.me/919888335557?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    const orderRecord = {
      id: orderId,
      date: orderDate,
      customer: customerName,
      phone: customerPhone,
      address: customerAddress,
      total: finalTotal,
      itemsCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
      items: cartItems,
      status: 'Confirmed'
    };

    // Save to local storage for My Orders tracking
    try {
      const existing = JSON.parse(localStorage.getItem('vf_customer_orders') || '[]');
      localStorage.setItem('vf_customer_orders', JSON.stringify([orderRecord, ...existing]));
    } catch (err) {}

    if (onOrderPlaced) {
      onOrderPlaced(orderRecord);
    }

    setLastOrder(orderRecord);
    setCartItems([]);
    setCheckoutStep('success');
  };

  const handleClose = () => {
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E5DBCA]">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#183B2B] text-[#FAF6F0] flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {checkoutStep === 'checkout' && (
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="p-1 rounded-full hover:bg-white/10 text-white transition-colors mr-1"
                  aria-label="Back to cart"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#E6C887]" />
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg">
                  {checkoutStep === 'cart' && 'Your Ayurvedic Cart'}
                  {checkoutStep === 'checkout' && 'Fast Checkout'}
                  {checkoutStep === 'success' && 'Order Received!'}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#A8C4B4]">
                  {checkoutStep === 'cart' && `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} selected`}
                  {checkoutStep === 'checkout' && 'Direct WhatsApp & COD Dispatch'}
                  {checkoutStep === 'success' && 'Order Confirmation'}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Free Shipping Meter (when in cart view) */}
          {checkoutStep === 'cart' && (
            <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#F2ECE1] border-b border-[#E5DBCA]">
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-medium text-[#183B2B] mb-1.5">
                <span>
                  {subtotal >= freeShippingThreshold 
                    ? '🎉 You unlocked FREE Delivery!' 
                    : `Add ₹${freeShippingThreshold - subtotal} more for FREE shipping`}
                </span>
                <span className="font-bold">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-2 bg-[#DDD3C1] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#8C682D] to-[#183B2B] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* BODY CONTENT BASED ON STEP */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
            
            {/* STEP 1: CART ITEMS */}
            {checkoutStep === 'cart' && (
              cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FAF0DC] flex items-center justify-center mx-auto text-[#8C682D] border border-[#E5D7BE]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="font-serif text-lg text-[#183B2B]">Your cart is empty</p>
                  <p className="text-xs text-[#7B8B82] max-w-xs mx-auto">Explore our authentic classical formulations to begin your wellness journey.</p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 rounded-full bg-[#183B2B] text-white text-xs sm:text-sm font-medium hover:bg-[#2A5E44] transition-all shadow-md"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-2xl bg-white border border-[#E5DCBF] shadow-sm hover:border-[#C5A059] transition-all"
                  >
                    {/* Thumbnail Image */}
                    <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl bg-[#FAF6EE] flex items-center justify-center shrink-0 border border-[#EAE0CD] p-1 overflow-hidden">
                      {item.image && typeof item.image === 'string' && item.image.startsWith('/') ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-xl sm:text-2xl">🌿</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#8C682D]">{item.category}</span>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[#183B2B] truncate">{item.name}</h4>
                      <p className="text-[11px] sm:text-xs text-[#7A8B80]">{item.size}</p>
                      
                      <div className="flex items-center justify-between mt-1.5 sm:mt-2">
                        <span className="font-bold text-xs sm:text-sm text-[#183B2B]">₹{item.price * item.quantity}</span>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 sm:gap-2 border border-[#D5C9B3] rounded-full px-2 py-0.5 bg-[#FAF7F2]">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-[#697B70] hover:text-[#183B2B] p-0.5"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#183B2B] min-w-[12px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-[#697B70] hover:text-[#183B2B] p-0.5"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-[#A0B0A7] hover:text-red-600 transition-colors shrink-0"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )
            )}

            {/* STEP 2: CHECKOUT FORM */}
            {checkoutStep === 'checkout' && (
              <form onSubmit={handlePlaceOrder} id="checkout-form" className="space-y-4">
                <div className="p-3 bg-[#FAF3E6] rounded-2xl border border-[#E2D4BC] text-xs text-[#526659] flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#8C682D] shrink-0" />
                  <span>Express Dispatch within 24h across India.</span>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#183B2B] uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C9B3] text-xs sm:text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#183B2B] uppercase tracking-wider">
                    WhatsApp / Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C9B3] text-xs sm:text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#183B2B] uppercase tracking-wider">
                    Full Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="2"
                    required
                    placeholder="House / Flat No., Street, Landmark, City, State"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D5C9B3] text-xs sm:text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#183B2B] uppercase tracking-wider">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 125001"
                    value={customerPincode}
                    onChange={(e) => setCustomerPincode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C9B3] text-xs sm:text-sm text-[#183B2B] focus:outline-none focus:border-[#183B2B]"
                  />
                </div>

                {/* Payment Selection */}
                <div className="space-y-1.5 pt-1">
                  <label className="block text-xs font-bold text-[#183B2B] uppercase tracking-wider">
                    Payment Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMode('COD')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMode === 'COD' 
                          ? 'bg-[#183B2B] text-white border-[#183B2B] shadow-sm' 
                          : 'bg-white text-[#526659] border-[#D5C9B3] hover:border-[#183B2B]'
                      }`}
                    >
                      <span>💵 Cash on Delivery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMode('UPI')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMode === 'UPI' 
                          ? 'bg-[#183B2B] text-white border-[#183B2B] shadow-sm' 
                          : 'bg-white text-[#526659] border-[#D5C9B3] hover:border-[#183B2B]'
                      }`}
                    >
                      <span>📱 UPI / Online</span>
                    </button>
                  </div>
                </div>

                {/* Order Summary Mini-Box */}
                <div className="p-3 bg-white rounded-2xl border border-[#E5DCBF] space-y-1.5 text-xs text-[#526658]">
                  <div className="flex justify-between">
                    <span>{cartItems.length} Formulations:</span>
                    <span className="font-semibold text-[#183B2B]">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span className="font-semibold text-[#183B2B]">
                      {shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : '₹60'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-[#F0E8DA] font-bold text-[#183B2B] text-sm">
                    <span>Total Amount:</span>
                    <span className="font-serif text-base text-[#183B2B]">₹{finalTotal}</span>
                  </div>
                </div>
              </form>
            )}

            {/* STEP 3: ORDER SUCCESS */}
            {checkoutStep === 'success' && lastOrder && (
              <div className="py-8 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#183B2B] text-white flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-9 h-9 stroke-[2.2] text-[#E6C887]" />
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#EAE0CB] text-[#8C682D]">
                    {lastOrder.id}
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-[#183B2B] mt-2">
                    Order Dispatched with Care!
                  </h3>
                  <p className="text-xs text-[#6A7C71] max-w-xs mx-auto mt-1">
                    Thank you, {lastOrder.customer}. Your order details have been forwarded to our dispensary on WhatsApp (+91 98883 35557).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E5DCBF] text-left text-xs space-y-2 max-w-xs mx-auto">
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-[#6A7C71]">Total Payable:</span>
                    <strong className="text-[#183B2B] text-sm">₹{lastOrder.total}</strong>
                  </div>
                  <div className="flex justify-between border-b pb-1.5">
                    <span className="text-[#6A7C71]">Payment:</span>
                    <span className="font-medium text-[#183B2B]">{paymentMode === 'COD' ? 'Cash on Delivery' : 'Online / UPI'}</span>
                  </div>
                  <div>
                    <span className="text-[#6A7C71] block">Deliver to:</span>
                    <span className="font-medium text-[#183B2B]">{lastOrder.address}</span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3 rounded-full bg-[#183B2B] text-white text-xs sm:text-sm font-semibold hover:bg-[#25553D] shadow-md transition-all"
                >
                  Continue Browsing
                </button>
              </div>
            )}

          </div>

          {/* Footer & Checkout Buttons */}
          {cartItems.length > 0 && checkoutStep !== 'success' && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#E5DBCA] space-y-3">
              {checkoutStep === 'cart' ? (
                <>
                  <div className="space-y-1.5 text-xs text-[#526658]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#183B2B]">₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Standard Vedic Shipping</span>
                      <span className="font-medium text-[#183B2B]">
                        {shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : '₹60'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#183B2B] pt-2 border-t border-[#EAE1CF]">
                      <span>Total Amount</span>
                      <span className="font-serif text-lg text-[#183B2B]">₹{finalTotal}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep('checkout')}
                    className="w-full py-3.5 rounded-full bg-[#183B2B] hover:bg-[#25553D] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#183B2B]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full py-3.5 rounded-full bg-[#183B2B] hover:bg-[#25553D] text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#183B2B]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Confirm Order via WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#788C80]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C682D]" />
                <span>100% Genuine Ayurvedic Formulations • Fast Delivery</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
