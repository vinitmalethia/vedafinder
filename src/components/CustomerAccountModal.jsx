import React, { useState } from 'react';
import { X, Package, User, LogOut, Check, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function CustomerAccountModal({
  isOpen,
  onClose,
  user,
  onLogout,
  onNavigate,
  orders = []
}) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'details'

  if (!isOpen || !user) return null;

  const getDisplayName = () => {
    if (user.displayName) return user.displayName;
    if (user.email) {
      const namePart = user.email.split('@')[0];
      return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    return 'Valued Customer';
  };

  const displayName = getDisplayName();
  const userInitial = displayName ? displayName.charAt(0).toUpperCase() : 'U';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#EAE2D2] overflow-hidden transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="p-5 pb-4 flex items-center justify-between border-b border-[#F2ECE1]">
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt={displayName} 
                className="w-11 h-11 rounded-2xl object-cover ring-2 ring-[#E2D6C0] shadow-sm"
              />
            ) : (
              <div className="w-11 h-11 rounded-2xl bg-[#183B2B] text-white flex items-center justify-center font-serif font-bold text-base shadow-md">
                {userInitial}
              </div>
            )}
            <div className="overflow-hidden">
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#183B2B] leading-snug truncate">
                  {displayName}
                </h3>
                {user.role === 'admin' && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#183B2B] text-[#E5D7BE] shrink-0">
                    Master Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-[#7A8C81] truncate">{user.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#F0E8DA] border border-[#E2D6C0] flex items-center justify-center text-[#55695C] hover:text-[#183B2B] transition-colors shrink-0 ml-2"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher Pills */}
        <div className="px-5 pt-4">
          <div className="p-1 bg-[#F4EFE6] rounded-2xl flex items-center gap-1 border border-[#E8DFC9]">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                activeTab === 'orders'
                  ? 'bg-white text-[#183B2B] shadow-sm'
                  : 'text-[#6A7D71] hover:text-[#183B2B]'
              }`}
            >
              <Package className="w-4 h-4 text-[#8C682D]" />
              <span>My Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 ${
                activeTab === 'details'
                  ? 'bg-white text-[#183B2B] shadow-sm'
                  : 'text-[#6A7D71] hover:text-[#183B2B]'
              }`}
            >
              <User className="w-4 h-4 text-[#8C682D]" />
              <span>Account Details</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 min-h-[200px] flex flex-col justify-center">
          {activeTab === 'orders' ? (
            orders.length === 0 ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#E8DFC9] flex items-center justify-center mx-auto text-[#8C682D] shadow-inner">
                  <Package className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-[#183B2B]">No orders placed yet</h4>
                  <p className="text-xs text-[#7A8C81] max-w-xs mx-auto mt-1 leading-relaxed">
                    When you order your Veda Finder formulations, your live order details will appear here.
                  </p>
                </div>
                <div className="pt-1">
                  <button
                    onClick={() => {
                      onClose();
                      if (onNavigate) onNavigate('Shop');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-[#183B2B] bg-[#F2EADB] hover:bg-[#EAE1D1] transition-colors border border-[#D5C9B3]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Explore Ayurvedic Shop</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {orders.map((ord, idx) => (
                  <div key={ord.id || idx} className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC9] flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#183B2B]">Order #{ord.id || `VF-100${idx + 1}`}</p>
                      <p className="text-[11px] text-[#7A8C81]">{ord.date || 'Recent Order'} • {ord.itemsCount || 1} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#183B2B]">₹{ord.total || 499}</p>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        {ord.status || 'Confirmed'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8DFC9] space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#EAE2D2]">
                  <span className="text-[#6A7D71]">Full Name</span>
                  <span className="font-semibold text-[#183B2B]">{displayName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EAE2D2]">
                  <span className="text-[#6A7D71]">Email</span>
                  <span className="font-semibold text-[#183B2B]">{user.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#EAE2D2]">
                  <span className="text-[#6A7D71]">Account Status</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Verified Customer
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#6A7D71]">Security Clearance</span>
                  <span className="font-semibold text-[#8C682D] capitalize">
                    {user.role === 'admin' ? 'Master Administrator' : 'Standard Member'}
                  </span>
                </div>
              </div>

              {user.role === 'admin' && (
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigate) onNavigate('Admin');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#183B2B] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#25553D] transition-all shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C59A4E]" />
                  <span>Open Master Admin Portal</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 bg-[#FAF7F2] border-t border-[#F2ECE1] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              if (onLogout) onLogout();
            }}
            className="flex items-center gap-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 py-1.5 px-3 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4 stroke-[2.2]" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#183B2B] hover:bg-[#25553D] text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
