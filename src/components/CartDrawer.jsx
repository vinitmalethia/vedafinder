import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, setCartItems }) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 499;
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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E5DBCA]">
          
          {/* Header */}
          <div className="p-6 bg-[#183B2B] text-[#FAF6F0] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-[#E6C887]" />
              <div>
                <h3 className="font-serif font-bold text-xl">Your Ayurvedic Cart</h3>
                <p className="text-xs text-[#A8C4B4]">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} selected</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-6 py-3 bg-[#F2ECE1] border-b border-[#E5DBCA]">
            <div className="flex items-center justify-between text-xs font-medium text-[#183B2B] mb-1.5">
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

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-16 h-16 text-[#A89880] mx-auto" />
                <p className="font-serif text-lg text-[#183B2B]">Your cart is empty</p>
                <p className="text-xs text-[#7B8B82]">Explore our authentic formulations to begin your wellness journey.</p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#183B2B] text-white text-sm font-medium hover:bg-[#2A5E44]"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white border border-[#E5DCBF] shadow-sm hover:border-[#C5A059] transition-all"
                >
                  {/* Thumbnail Image */}
                  <div className="w-14 h-16 rounded-lg bg-[#FAF6EE] flex items-center justify-center shrink-0 border border-[#EAE0CD] p-1 overflow-hidden">
                    {item.image && typeof item.image === 'string' && item.image.startsWith('/') ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-2xl">🌿</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C682D]">{item.category}</span>
                    <h4 className="font-serif font-bold text-sm text-[#183B2B] truncate">{item.name}</h4>
                    <p className="text-xs text-[#7A8B80]">{item.size}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-sm text-[#183B2B]">₹{item.price * item.quantity}</span>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 border border-[#D5C9B3] rounded-full px-2 py-0.5 bg-[#FAF7F2]">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-[#697B70] hover:text-[#183B2B]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#183B2B] min-w-[12px] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-[#697B70] hover:text-[#183B2B]"
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
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E5DBCA] space-y-4">
              <div className="space-y-1.5 text-xs text-[#526359]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#183B2B]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Ayurvedic Packing & Shipping</span>
                  <span className="font-bold text-[#183B2B]">
                    {subtotal >= freeShippingThreshold ? <span className="text-emerald-700 font-semibold">FREE</span> : '₹60'}
                  </span>
                </div>
                <div className="border-t border-[#EAE2D2] pt-2 flex justify-between text-base font-serif font-bold text-[#183B2B]">
                  <span>Total Due</span>
                  <span className="text-lg text-[#183B2B]">₹{subtotal >= freeShippingThreshold ? subtotal : subtotal + 60}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert("Order Placed Successfully!\nThank you for choosing Veda Finder authentic Ayurvedic formulations. Tracking details sent to your phone/email.");
                  setCartItems([]);
                  onClose();
                }}
                className="w-full py-3.5 rounded-full bg-[#183B2B] hover:bg-[#26583E] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02]"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#697B70]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8C682D]" />
                <span>100% Encrypted & Authentic GMP-Certified</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
