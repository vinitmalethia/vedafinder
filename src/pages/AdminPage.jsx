import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, FolderTree, 
  Ticket, Star, BookOpen, Settings, LogOut, Search, Bell, 
  ChevronRight, ChevronDown, Plus, Edit2, Trash2, Eye, X, 
  Check, ArrowRight, ShieldCheck, Filter, ArrowLeft, TrendingUp,
  BarChart3, AlertTriangle, Clock, Calendar, DollarSign, Upload,
  Sparkles, CheckCircle2, Tag, Layers, RefreshCw, Menu
} from 'lucide-react';
import { VedaFinderLogo } from '../components/VedaLogoBrand';
import { BotanicalBranch } from '../components/AyurvedicIcons';

export default function AdminPage({ onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [dateRange, setDateRange] = useState('This Month');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Products State
  const [products, setProducts] = useState([
    {
      id: 'p1',
      sku: 'VF-BH-001',
      name: 'Abhrak Bhasma 1000 10GM',
      hindiName: 'अभ्रक भस्म (१,००० पुटी) - १० ग्राम',
      category: 'Bhasma',
      price: 497,
      originalPrice: 650,
      stock: 35,
      salesCount: 410,
      status: 'In Stock',
      image: '/products/abhrak-bhasma.png',
      indicates: 'Cough, Acidity, Anemia, Debility',
      ingredients: 'Sahasraputi Biotite Mica',
      usage: '125mg with honey or ginger juice.'
    },
    {
      id: 'p2',
      sku: 'VF-BH-002',
      name: 'Abhrak Bhasma 100 10GM',
      hindiName: 'अभ्रक भस्म (१०० पुटी) - १० ग्राम',
      category: 'Bhasma',
      price: 190,
      originalPrice: 260,
      stock: 45,
      salesCount: 280,
      status: 'In Stock',
      image: '/products/abhrak-bhasma-100.png',
      indicates: 'Cough, Acidity, Anemia, Anorexia',
      ingredients: '100 Puti Mica',
      usage: '125mg with honey.'
    },
    {
      id: 'p3',
      sku: 'VF-BH-003',
      name: 'Godanti Bhasma 10GM',
      hindiName: 'गोदन्ती भस्म - १० ग्राम',
      category: 'Bhasma',
      price: 108,
      originalPrice: 150,
      stock: 55,
      salesCount: 310,
      status: 'In Stock',
      image: '/products/godanti-bhasma.png',
      indicates: 'Vitiated Blood, Cough, Headache, Fever',
      ingredients: 'Purified Gypsum',
      usage: '250mg with honey or ghee.'
    },
    {
      id: 'p4',
      sku: 'VF-PS-004',
      name: 'Praval Pishti 10GM',
      hindiName: 'प्रवाल पिष्टी - १० ग्राम',
      category: 'Pishti',
      price: 430,
      originalPrice: 580,
      stock: 65,
      salesCount: 380,
      status: 'In Stock',
      image: '/products/praval-pishti.png',
      indicates: 'Calcium Deficiency, Cough, Hyperacidity',
      ingredients: 'Shuddha Praval (Coral), Rose Water',
      usage: '250mg with butter or honey.'
    },
    {
      id: 'p5',
      sku: 'VF-PS-005',
      name: 'Moti Pishti Bhasma 10GM',
      hindiName: 'मोती पिष्टी भस्म - शुद्ध मुक्ता',
      category: 'Pishti',
      price: 865,
      originalPrice: 1150,
      stock: 14,
      salesCount: 520,
      status: 'In Stock',
      image: '/products/moti-pishti.png',
      indicates: 'Chronic Fever, Bleeding Disorders, Pitta Shamak',
      ingredients: 'Shuddha Mukta (Natural Pearl), Gulab Jal',
      usage: '65mg to 125mg with honey or milk cream.'
    },
    {
      id: 'p6',
      sku: 'VF-BH-006',
      name: 'Vang Bhasma 10GM',
      hindiName: 'वंग भस्म - १० ग्राम',
      category: 'Bhasma',
      price: 213,
      originalPrice: 299,
      stock: 28,
      salesCount: 270,
      status: 'In Stock',
      image: '/products/vang-bhasma.png',
      indicates: 'Urinary System Debility, Stamina',
      ingredients: 'Shuddha Vanga (Tin)',
      usage: '125mg with honey or milk.'
    },
    {
      id: 'p7',
      sku: 'VF-BH-007',
      name: 'Loh Bhasma 10GM',
      hindiName: 'लौह भस्म - शुद्ध लौह',
      category: 'Bhasma',
      price: 130,
      originalPrice: 180,
      stock: 50,
      salesCount: 340,
      status: 'In Stock',
      image: '/products/loha-bhasma.png',
      indicates: 'Anaemia, Spleen & Liver Enlargement',
      ingredients: 'Shuddha Lauha, Triphala Kwath',
      usage: '125mg to 250mg with honey or ghee twice daily.'
    },
    {
      id: 'p8',
      sku: 'VF-TE-008',
      name: 'Agnisip',
      hindiName: 'अग्निसिप डाइजेस्टिव टी (२० बैग)',
      category: 'Herbal Tea',
      price: 799,
      originalPrice: 999,
      stock: 85,
      salesCount: 740,
      status: 'In Stock',
      image: '/products/agnisip-tea.png',
      indicates: 'Gut Agni, Bloating, Digestive Balance',
      ingredients: 'Sunthi, Jeeraka, Maricha, Cardamom',
      usage: 'Dip 1 pyramid bag in boiling water for 3-5 mins.'
    },
    {
      id: 'p9',
      sku: 'VF-BH-009',
      name: 'Chandi',
      hindiName: 'चांदी भस्म (रजत भस्म)',
      category: 'Bhasma',
      price: 6700,
      originalPrice: 7999,
      stock: 8,
      salesCount: 350,
      status: 'Low Stock',
      image: '/products/chandi-bhasma.png',
      indicates: 'Memory Support, Low Immunity, Stress',
      ingredients: 'Shuddha Rajat (Silver)',
      usage: '65mg with honey or milk.'
    },
    {
      id: 'p10',
      sku: 'VF-CP-010',
      name: 'Nar Ojas Vitality Capsules',
      hindiName: 'नर ओज कैप्सूल - ९० कैप्सूल',
      category: 'Capsules',
      price: 4270,
      originalPrice: 4999,
      stock: 120,
      salesCount: 680,
      status: 'In Stock',
      image: '/products/nar-ojas.png',
      indicates: 'Strength, Stamina, Stress Relief, Recovery',
      ingredients: 'KSM-66 Ashwagandha, Shudh Shilajit, Safed Musli',
      usage: '1 capsule twice daily with warm milk.'
    },
    {
      id: 'p11',
      sku: 'VF-BH-011',
      name: 'Trivang Bhasma 10GM',
      hindiName: 'त्रिवंग भस्म - १० ग्राम',
      category: 'Bhasma',
      price: 320,
      originalPrice: 420,
      stock: 40,
      salesCount: 295,
      status: 'In Stock',
      image: '/products/trivang-bhasma.png',
      indicates: 'Reproductive Health, Urinary Disorders, Prameha',
      ingredients: 'Naga, Vanga, Yashada Bhasma',
      usage: '125mg with honey or warm milk.'
    }
  ]);

  // Orders State
  const [orders, setOrders] = useState([]);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);

  // Form State for Add / Edit Product
  const [formData, setFormData] = useState({
    name: '',
    hindiName: '',
    category: 'Bhasma',
    price: '',
    originalPrice: '',
    stock: '',
    sku: '',
    indicates: '',
    ingredients: '',
    usage: '',
    image: '/products/abhrak-bhasma.png'
  });

  const sidebarLinks = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Products', icon: Package },
    { name: 'Orders', icon: ShoppingCart },
    { name: 'Customers', icon: Users },
    { name: 'Categories', icon: FolderTree },
    { name: 'Inventory', icon: Layers },
    { name: 'Coupons & Offers', icon: Ticket },
    { name: 'Reviews', icon: Star },
    { name: 'Blog', icon: BookOpen },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Settings', icon: Settings },
  ];

  // Save Product handler
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? {
        ...p,
        ...formData,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice || formData.price),
        stock: Number(formData.stock),
        status: Number(formData.stock) < 15 ? 'Low Stock' : 'In Stock'
      } : p));
    } else {
      const newProduct = {
        id: 'p-' + Date.now(),
        ...formData,
        sku: formData.sku || `VF-SKU-${Math.floor(100 + Math.random() * 900)}`,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice || formData.price),
        stock: Number(formData.stock),
        salesCount: 0,
        status: Number(formData.stock) < 15 ? 'Low Stock' : 'In Stock'
      };
      setProducts([newProduct, ...products]);
    }
    setIsAddModalOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (p) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      hindiName: p.hindiName || '',
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice || '',
      stock: p.stock,
      sku: p.sku || '',
      indicates: p.indicates || '',
      ingredients: p.ingredients || '',
      usage: p.usage || '',
      image: p.image || '/products/abhrak-bhasma.png'
    });
    setIsAddModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this Ayurvedic formulation?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const filteredProducts = products.filter(p => {
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.hindiName && p.hindiName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.indicates && p.indicates.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const lowStockItems = products.filter(p => p.stock < 20);

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E4F3E8] text-[#1E7246] border border-[#C6E6CD]">Delivered</span>;
      case 'Processing':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FAF0D9] text-[#A67116] border border-[#EEDDB8]">Processing</span>;
      case 'Shipped':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E2EEF9] text-[#2267A8] border border-[#C5DCF2]">Shipped</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FDE8E8] text-[#C53030] border border-[#F9C2C2]">Cancelled</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FAF7F2] text-[#183B2B]">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2E8] font-sans flex text-[#2C3E35] selection:bg-[#174D3A] selection:text-white">
      
      {/* 1. SIDEBAR (Deep Forest Green #112F22) */}
      <aside className="w-64 bg-[#112F22] text-[#E8DFC8] flex flex-col justify-between shrink-0 min-h-screen sticky top-0 border-r border-[#1B4432] relative overflow-hidden hidden lg:flex">
        
        {/* Botanical leaf decoration at bottom */}
        <div className="absolute -bottom-10 -left-10 w-56 h-56 text-[#1A4734] pointer-events-none opacity-40">
          <BotanicalBranch className="w-full h-full text-[#1F523C]" />
        </div>

        <div>
          {/* Top Brand Logo */}
          <div className="p-6 border-b border-[#1A4230]">
            <button onClick={() => onNavigate('Home')} className="text-left focus:outline-none">
              <VedaFinderLogo variant="light" size="md" showTagline={true} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/15 text-white shadow-sm backdrop-blur-sm font-semibold'
                      : 'text-[#A2BCB0] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E6C887]' : 'text-[#8EA89C]'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout at Bottom */}
        <div className="p-4 border-t border-[#1A4230] relative z-10">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium text-[#D5BFA0] hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4 text-[#C59A4E]" />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* Mobile Sidebar Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" 
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-[#112F22] text-[#E8DFC8] flex flex-col justify-between p-4 shadow-2xl z-10 border-r border-[#1B4432] animate-slideIn">
            <div>
              {/* Top Brand Logo & Close button */}
              <div className="p-2 pb-4 border-b border-[#1A4230] flex items-center justify-between">
                <button onClick={() => { setMobileSidebarOpen(false); onNavigate('Home'); }} className="text-left focus:outline-none">
                  <VedaFinderLogo variant="light" size="sm" showTagline={true} />
                </button>
                <button 
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-full text-[#A2BCB0] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="py-4 space-y-1">
                {sidebarLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.name;
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveTab(item.name);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-white/15 text-white shadow-sm font-semibold'
                          : 'text-[#A2BCB0] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-[#E6C887]' : 'text-[#8EA89C]'}`} />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Logout at Bottom */}
            <div className="pt-3 border-t border-[#1A4230]">
              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#D5BFA0] hover:text-white hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-4 h-4 text-[#C59A4E]" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-16 sm:h-20 bg-[#FAF7F2] border-b border-[#E7DECD] px-3 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm gap-2 sm:gap-4">
          
          {/* Mobile Sidebar Hamburger Toggle & Search */}
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white border border-[#DCD3C0] text-[#174D3A] shadow-sm shrink-0"
              aria-label="Open admin menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search bar */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search dispensary..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm bg-white border border-[#DCD3C0] text-[#174D3A] placeholder-[#8A9C91] focus:outline-none focus:ring-2 focus:ring-[#174D3A]/20 focus:border-[#174D3A] shadow-inner"
              />
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8C682D] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Date Filter Dropdown */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DCD3C0] text-xs font-semibold text-[#174D3A] shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-[#8C682D]" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer"
              >
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Quarter</option>
                <option>Year 2026</option>
              </select>
            </div>

            {/* Back to Store Button */}
            <button
              onClick={() => onNavigate('Home')}
              className="inline-flex items-center gap-1 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white hover:bg-[#EFE7D8] text-[#174D3A] border border-[#DCD3C0] text-[11px] sm:text-xs font-semibold shadow-sm transition-all"
            >
              <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Storefront</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-[#DCD3C0] flex items-center justify-center text-[#2C3E35] hover:bg-[#FAF7F2] transition-colors shadow-sm"
              >
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4E6155]" />
                <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-[#E5DCBF] p-4 z-50 text-xs space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-bold text-[#174D3A]">Dispensary Alerts</span>
                    <span className="text-[10px] text-[#8C682D]">3 New</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[#4E6155] p-2 bg-[#FAF7F2] rounded-lg">
                      ⚠️ <strong>Low Stock:</strong> Chandi is down to 8 units.
                    </p>
                    <p className="text-[#4E6155] p-2 bg-[#FAF7F2] rounded-lg">
                      📋 <strong>System:</strong> No new orders yet.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile */}
            <div className="flex items-center gap-2 pl-1 sm:pl-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#174D3A] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                A
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-[#174D3A] leading-tight">Doctor Admin</span>
                <span className="text-[10px] text-[#7A8C81] leading-tight">Master Dispensary</span>
              </div>
            </div>

          </div>

        </header>

        {/* Dynamic Main Body based on Active Tab */}
        <main className="p-3 sm:p-8 space-y-6 sm:space-y-8 flex-1">
          
          {/* ========================================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ========================================================================= */}
          {activeTab === 'Dashboard' && (
            <div className="space-y-6 sm:space-y-8">
              
              {/* Welcome Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#174D3A] flex items-center gap-2">
                    <span>Good Morning, Admin</span>
                    <span className="text-2xl">🌿</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-[#5B6D62]">
                    Here is what's happening across your Ayurvedic dispensary for {dateRange}.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setFormData({
                        name: '',
                        hindiName: '',
                        category: 'Bhasma',
                        price: '',
                        originalPrice: '',
                        stock: '50',
                        sku: '',
                        indicates: '',
                        ingredients: '',
                        usage: '',
                        image: '/products/abhrak-bhasma.png'
                      });
                      setIsAddModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#174D3A] hover:bg-[#22634B] text-white text-xs font-semibold shadow-md transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Formulation</span>
                  </button>
                </div>
              </div>

              {/* 4 Metric KPI Cards: 2x2 on mobile, 4 columns on lg */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                
                {/* Total Sales */}
                <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#E6DCC8] shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
                  <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#FAF0DC] text-[#A67824] flex items-center justify-center shadow-inner font-bold text-base sm:text-xl shrink-0">
                      ₹
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] sm:text-xs text-[#708277] font-medium block truncate">Total Sales</span>
                      <span className="font-serif font-bold text-lg sm:text-3xl text-[#174D3A] leading-tight block truncate">
                        ₹ 1.48L
                      </span>
                      <span className="text-[9px] sm:text-[11px] text-emerald-700 font-semibold block truncate">+28%</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E3D8C4] items-center justify-center text-[#73857B] group-hover:bg-[#174D3A] group-hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Total Orders */}
                <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#E6DCC8] shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
                  <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F6EBE3] text-[#A66133] flex items-center justify-center shadow-inner shrink-0">
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-[#A66133]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] sm:text-xs text-[#708277] font-medium block truncate">Total Orders</span>
                      <span className="font-serif font-bold text-lg sm:text-3xl text-[#174D3A] leading-tight block truncate">
                        128
                      </span>
                      <span className="text-[9px] sm:text-[11px] text-[#55695C] font-semibold block truncate">+18 mo</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E3D8C4] items-center justify-center text-[#73857B] group-hover:bg-[#174D3A] group-hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Total Customers */}
                <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#E6DCC8] shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
                  <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#E5F2E9] text-[#246A42] flex items-center justify-center shadow-inner shrink-0">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#246A42]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] sm:text-xs text-[#708277] font-medium block truncate">Seekers</span>
                      <span className="font-serif font-bold text-lg sm:text-3xl text-[#174D3A] leading-tight block truncate">
                        1,280
                      </span>
                      <span className="text-[9px] sm:text-[11px] text-[#55695C] font-semibold block truncate">+96 new</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E3D8C4] items-center justify-center text-[#73857B] group-hover:bg-[#174D3A] group-hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Total Products */}
                <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#E6DCC8] shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
                  <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#E5EFE7] text-[#246A42] flex items-center justify-center shadow-inner shrink-0">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#246A42]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] sm:text-xs text-[#708277] font-medium block truncate">Products</span>
                      <span className="font-serif font-bold text-lg sm:text-3xl text-[#174D3A] leading-tight block truncate">
                        {products.length}
                      </span>
                      <span className="text-[9px] sm:text-[11px] text-emerald-700 font-semibold block truncate">AYUSH Mark</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E3D8C4] items-center justify-center text-[#73857B] group-hover:bg-[#174D3A] group-hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

              </div>

              {/* Sales Overview Graph Card (Clean SVG Trend Line) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DCC8] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFE5D3] pb-4">
                  <div>
                    <h2 className="font-serif font-bold text-xl text-[#174D3A]">
                      Sales Overview & Revenue Trend
                    </h2>
                    <p className="text-xs text-[#708277]">Monthly performance and seasonal Ayurvedic demand</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5 font-semibold text-[#174D3A]">
                      <span className="w-3 h-3 rounded-full bg-[#174D3A]" /> Revenue (₹)
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold text-[#8C682D]">
                      <span className="w-3 h-3 rounded-full bg-[#C59A4E]" /> Order Count
                    </span>
                  </div>
                </div>

                {/* SVG Visual Graph */}
                <div className="h-48 w-full pt-4">
                  <svg viewBox="0 0 800 180" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#174D3A" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#174D3A" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="800" y2="30" stroke="#EFE7D8" strokeDasharray="4 4" />
                    <line x1="0" y1="80" x2="800" y2="80" stroke="#EFE7D8" strokeDasharray="4 4" />
                    <line x1="0" y1="130" x2="800" y2="130" stroke="#EFE7D8" strokeDasharray="4 4" />

                    {/* Area under curve */}
                    <path
                      d="M 0 140 Q 150 120 250 80 T 500 50 T 800 20 L 800 160 L 0 160 Z"
                      fill="url(#revenueGrad)"
                    />

                    {/* Trend Line */}
                    <path
                      d="M 0 140 Q 150 120 250 80 T 500 50 T 800 20"
                      fill="none"
                      stroke="#174D3A"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Accent Order count Line */}
                    <path
                      d="M 0 155 Q 150 135 250 110 T 500 85 T 800 60"
                      fill="none"
                      stroke="#C59A4E"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                    />

                    {/* Data Points */}
                    <circle cx="250" cy="80" r="5" fill="#174D3A" stroke="#FFF" strokeWidth="2" />
                    <circle cx="500" cy="50" r="5" fill="#174D3A" stroke="#FFF" strokeWidth="2" />
                    <circle cx="800" cy="20" r="6" fill="#174D3A" stroke="#C59A4E" strokeWidth="2.5" />
                  </svg>
                  <div className="flex justify-between text-[11px] text-[#7A8C80] font-medium pt-2">
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep (Peak)</span>
                    <span>Oct (Forecast)</span>
                  </div>
                </div>
              </div>

              {/* Side by Side: Recent Orders Table & Top-Selling Formulations */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                
                {/* Recent Orders (7 cols on xl) */}
                <div className="xl:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-[#E6DCC8] shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-[#EFE5D3] pb-3">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-[#174D3A]">Recent Orders</h3>
                      <p className="text-xs text-[#708277]">Live order fulfillment stream</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('Orders')}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#174D3A] hover:text-[#8C682D]"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#EAE1D0] text-[#7A8C81] uppercase text-[10px] tracking-wider font-bold">
                          <th className="pb-3 pl-1">Order ID</th>
                          <th className="pb-3">Customer</th>
                          <th className="pb-3">Amount</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right pr-1">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2EADB]">
                        {orders.slice(0, 5).map((ord) => (
                          <tr key={ord.id} className="hover:bg-[#FAF7F2] transition-colors">
                            <td className="py-3 pl-1 font-mono font-bold text-xs text-[#174D3A]">
                              {ord.id}
                            </td>
                            <td className="py-3 font-semibold text-xs text-[#174D3A]">
                              {ord.customer}
                            </td>
                            <td className="py-3 font-serif font-bold text-xs text-[#174D3A]">
                              ₹{ord.amount}
                            </td>
                            <td className="py-3">
                              {getStatusBadge(ord.status)}
                            </td>
                            <td className="py-3 text-right pr-1">
                              <button
                                onClick={() => setViewingOrder(ord)}
                                className="p-1.5 rounded-md text-[#5B6F63] hover:text-[#174D3A] hover:bg-[#EAE0CB] transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top-Selling & Low-Stock Alerts (5 cols on xl) */}
                <div className="xl:col-span-5 space-y-6">
                  
                  {/* Top-Selling Products */}
                  <div className="bg-white rounded-3xl p-6 border border-[#E6DCC8] shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-[#EFE5D3] pb-3">
                      <h3 className="font-serif font-bold text-lg text-[#174D3A]">Top-Selling Formulations</h3>
                      <Sparkles className="w-4 h-4 text-[#8C682D]" />
                    </div>

                    <div className="space-y-3">
                      {products.slice(0, 4).map((p, idx) => (
                        <div key={p.id} className="flex items-center justify-between text-xs p-2 rounded-xl hover:bg-[#FAF7F2] transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-[#8C682D] w-4">#{idx + 1}</span>
                            <div className="w-9 h-10 rounded-md bg-[#FAF6EE] p-0.5 border border-[#E5DAC4] flex items-center justify-center shrink-0">
                              <img src={p.image} alt={p.name} className="h-full w-full object-contain" />
                            </div>
                            <div>
                              <span className="font-semibold text-[#174D3A] block truncate max-w-[140px]">{p.name}</span>
                              <span className="text-[10px] text-[#7A8C81]">{p.salesCount || 100}+ orders</span>
                            </div>
                          </div>
                          <span className="font-serif font-bold text-sm text-[#174D3A]">₹{p.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Low-Stock Warning Banner */}
                  <div className="bg-[#FAF4E8] rounded-3xl p-5 border border-[#E4D5B8] space-y-3 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#A67116] uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-[#A67116]" />
                      <span>Low Stock Dispensary Alert ({lowStockItems.length})</span>
                    </div>
                    <div className="space-y-2 text-xs text-[#526659]">
                      {lowStockItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-white p-2 rounded-xl border border-[#E6DCC7]">
                          <span className="font-semibold text-[#174D3A]">{item.name}</span>
                          <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{item.stock} left</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: PRODUCT MANAGEMENT */}
          {/* ========================================================================= */}
          {activeTab === 'Products' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DCC8] shadow-sm space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFE5D3]">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-[#174D3A]">
                    Formulations Dispensary ({products.length})
                  </h2>
                  <p className="text-xs text-[#738479]">
                    Add, edit, modify pricing, or update stock units for classical remedies.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setFormData({
                      name: '',
                      hindiName: '',
                      category: 'Bhasma',
                      price: '',
                      originalPrice: '',
                      stock: '50',
                      sku: '',
                      indicates: '',
                      ingredients: '',
                      usage: '',
                      image: '/products/abhrak-bhasma.png'
                    });
                    setIsAddModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#174D3A] hover:bg-[#20634B] text-white text-xs font-semibold shadow-md transition-all shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Formulation</span>
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {['All', 'Bhasma', 'Pishti', 'Capsules', 'Herbal Tea'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      categoryFilter === cat
                        ? 'bg-[#174D3A] text-white shadow-sm'
                        : 'bg-[#FAF7F2] text-[#55675C] hover:bg-[#EFE5D3] border border-[#E2D4BC]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#EAE1D0] text-[#8C682D] uppercase text-[10px] tracking-wider font-bold">
                      <th className="pb-3 pl-2">Product</th>
                      <th className="pb-3">SKU</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Price</th>
                      <th className="pb-3">Stock</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right pr-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2EADB]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF7F2] transition-colors">
                        <td className="py-3.5 pl-2">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-14 rounded-lg bg-[#FAF6EE] p-1 border border-[#E4D9C2] flex items-center justify-center shrink-0">
                              <img src={p.image} alt={p.name} className="h-full w-full object-contain" />
                            </div>
                            <div>
                              <span className="font-serif font-bold text-sm text-[#174D3A] block">{p.name}</span>
                              <span className="text-[11px] text-[#8C682D] italic block">{p.hindiName}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 font-mono text-xs text-[#7A8C81]">
                          {p.sku}
                        </td>

                        <td className="py-3.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FAF3E6] text-[#8C682D] border border-[#E2D2B5]">
                            {p.category}
                          </span>
                        </td>

                        <td className="py-3.5 font-serif font-bold text-base text-[#174D3A]">
                          ₹{p.price}
                        </td>

                        <td className="py-3.5 font-medium text-xs text-[#2C3E35]">
                          {p.stock} units
                        </td>

                        <td className="py-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            p.status === 'In Stock'
                              ? 'bg-[#E3F2E7] text-[#1E7246] border border-[#C6E6CD]'
                              : 'bg-[#FAF0D9] text-[#A67116] border border-[#EEDDB8]'
                          }`}>
                            {p.status}
                          </span>
                        </td>

                        <td className="py-3.5 text-right pr-2">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleEdit(p)}
                              className="p-2 rounded-lg bg-white hover:bg-[#FAF0DC] text-[#174D3A] border border-[#DFCFA8] transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="p-2 rounded-lg bg-white hover:bg-red-50 text-[#8C682D] hover:text-red-700 border border-[#DFCFA8] hover:border-red-200 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: ORDER MANAGEMENT */}
          {/* ========================================================================= */}
          {activeTab === 'Orders' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DCC8] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#EFE5D3] pb-4">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-[#174D3A]">All Dispensary Orders ({orders.length})</h2>
                  <p className="text-xs text-[#708277]">Track dispatch, payment status and customer deliveries</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#EAE1D0] text-[#8C682D] uppercase text-[10px] tracking-wider font-bold">
                      <th className="pb-3 pl-2">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Products</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Payment</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3 text-right pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2EADB]">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-[#FAF7F2] transition-colors">
                        <td className="py-3.5 pl-2 font-mono font-bold text-xs text-[#174D3A]">{ord.id}</td>
                        <td className="py-3.5 font-semibold text-xs text-[#174D3A]">{ord.customer}</td>
                        <td className="py-3.5 text-xs text-[#4E6155] max-w-[200px] truncate">{ord.products}</td>
                        <td className="py-3.5 font-serif font-bold text-sm text-[#174D3A]">₹{ord.amount}</td>
                        <td className="py-3.5 text-xs text-[#708277]">{ord.paymentStatus}</td>
                        <td className="py-3.5">{getStatusBadge(ord.status)}</td>
                        <td className="py-3.5 text-[11px] text-[#7A8C81]">{ord.date}</td>
                        <td className="py-3.5 text-right pr-2">
                          <button
                            onClick={() => setViewingOrder(ord)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#174D3A] text-[#174D3A] hover:text-white border border-[#D5C9B3] text-xs font-semibold transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: ANALYTICS */}
          {/* ========================================================================= */}
          {activeTab === 'Analytics' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DCC8] shadow-sm space-y-6">
                <div className="border-b border-[#EFE5D3] pb-4">
                  <h2 className="font-serif font-bold text-2xl text-[#174D3A]">Dispensary Analytics & Intelligence</h2>
                  <p className="text-xs text-[#708277]">Ayurvedic category distribution, retention, and fulfillment metrics</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC9]">
                    <span className="text-xs text-[#708277] block">Bhasma Share</span>
                    <span className="font-serif font-bold text-2xl text-[#174D3A]">45.2%</span>
                    <span className="text-[11px] text-emerald-700 font-semibold block">Top Category</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC9]">
                    <span className="text-xs text-[#708277] block">Pishti Share</span>
                    <span className="font-serif font-bold text-2xl text-[#174D3A]">25.8%</span>
                    <span className="text-[11px] text-emerald-700 font-semibold block">High Repeat Rate</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC9]">
                    <span className="text-xs text-[#708277] block">Capsules & Vitality</span>
                    <span className="font-serif font-bold text-2xl text-[#174D3A]">19.4%</span>
                    <span className="text-[11px] text-emerald-700 font-semibold block">Nar Ojas Leading</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC9]">
                    <span className="text-xs text-[#708277] block">Herbal Teas</span>
                    <span className="font-serif font-bold text-2xl text-[#174D3A]">9.6%</span>
                    <span className="text-[11px] text-emerald-700 font-semibold block">Growing</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: OTHER SIDEBAR TABS (Customers, Categories, Reviews, etc.) */}
          {/* ========================================================================= */}
          {['Customers', 'Categories', 'Inventory', 'Coupons & Offers', 'Reviews', 'Blog', 'Settings'].includes(activeTab) && (
            <div className="bg-white rounded-3xl p-8 border border-[#E6DCC8] shadow-sm space-y-4 text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#FAF5EB] flex items-center justify-center mx-auto text-[#174D3A] border border-[#E4D5B9]">
                <Settings className="w-8 h-8 text-[#8C682D]" />
              </div>
              <h2 className="font-serif font-bold text-2xl text-[#174D3A]">{activeTab} Management</h2>
              <p className="text-xs sm:text-sm text-[#5C6E62] max-w-md mx-auto">
                Configure your Ayurvedic {activeTab.toLowerCase()} parameters, permissions, and classical dispensations.
              </p>
              <button
                onClick={() => setActiveTab('Dashboard')}
                className="px-6 py-2.5 rounded-full bg-[#174D3A] text-white text-xs font-semibold shadow hover:bg-[#20634B]"
              >
                Back to Dashboard
              </button>
            </div>
          )}

        </main>
      </div>

      {/* 3. ADD / EDIT PRODUCT FULL FORM MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
          <div onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D5C9B3] z-10 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#EAE1D0] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C682D]">Dispensary Catalog</span>
                <h3 className="font-serif font-bold text-2xl text-[#174D3A]">
                  {editingProduct ? 'Edit Classical Formulation' : 'Add New Ayurvedic Formulation'}
                </h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-[#7B8E83] hover:text-[#174D3A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              
              {/* Product Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">Product Name (English)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Swarna Bhasma"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C9B3] text-sm text-[#174D3A] focus:outline-none focus:border-[#174D3A]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">Hindi Script Name</label>
                  <input
                    type="text"
                    placeholder="e.g. स्वर्ण भस्म - शुद्ध स्वर्ण"
                    value={formData.hindiName}
                    onChange={(e) => setFormData({...formData, hindiName: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C9B3] text-sm text-[#174D3A] focus:outline-none focus:border-[#174D3A]"
                  />
                </div>
              </div>

              {/* Category, SKU, Stock */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D5C9B3] text-sm text-[#174D3A] focus:outline-none"
                  >
                    <option>Bhasma</option>
                    <option>Pishti</option>
                    <option>Capsules</option>
                    <option>Herbal Tea</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">SKU Code</label>
                  <input
                    type="text"
                    placeholder="VF-BH-009"
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D5C9B3] text-sm text-[#174D3A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">Stock Units</label>
                  <input
                    type="number"
                    required
                    placeholder="50"
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D5C9B3] text-sm text-[#174D3A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">Sale Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="499"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C9B3] text-sm text-[#174D3A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">Original / MRP (₹)</label>
                  <input
                    type="number"
                    placeholder="650"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C9B3] text-sm text-[#174D3A] focus:outline-none"
                  />
                </div>
              </div>

              {/* Product Benefits & Indications */}
              <div>
                <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">Therapeutic Indications</label>
                <input
                  type="text"
                  placeholder="e.g. Indicated in Chronic Cough, Hyperacidity, General Debility"
                  value={formData.indicates}
                  onChange={(e) => setFormData({...formData, indicates: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C9B3] text-sm text-[#174D3A] focus:outline-none"
                />
              </div>

              {/* Key Ingredients */}
              <div>
                <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">Key Ayurvedic Ingredients</label>
                <input
                  type="text"
                  placeholder="e.g. Shuddha Abhrak, Gomutra, Triphala Decoction"
                  value={formData.ingredients}
                  onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C9B3] text-sm text-[#174D3A] focus:outline-none"
                />
              </div>

              {/* Usage / Anupana Instructions */}
              <div>
                <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">Usage & Anupana (Carrier)</label>
                <input
                  type="text"
                  placeholder="e.g. 125mg twice daily with honey or warm milk"
                  value={formData.usage}
                  onChange={(e) => setFormData({...formData, usage: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#D5C9B3] text-sm text-[#174D3A] focus:outline-none"
                />
              </div>

              {/* Image Selection */}
              <div>
                <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">Select 3D Pack Photo</label>
                <select
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#D5C9B3] text-sm text-[#174D3A] focus:outline-none"
                >
                  <option value="/products/loha-bhasma.png">Loha Bhasma Pack</option>
                  <option value="/products/nar-ojas.png">Nar Ojas Vitality Pack</option>
                  <option value="/products/abhrak-bhasma.png">Abhrak Bhasma (1,000 Puti)</option>
                  <option value="/products/agnisip-tea.png">Agnisip Digestive Tea Tin</option>
                  <option value="/products/moti-pishti.png">Moti Pishti Pack</option>
                  <option value="/products/praval-pishti.png">Praval Pishti Pack</option>
                  <option value="/products/chandi-bhasma.png">Chandi Bhasma Pack</option>
                  <option value="/products/trivang-bhasma.png">Trivang Bhasma Pack</option>
                  <option value="/products/godanti-bhasma.png">Godanti Bhasma Pack</option>
                  <option value="/products/vang-bhasma.png">Vang Bhasma Pack</option>
                </select>
              </div>

              <div className="pt-4 border-t border-[#EAE1D0] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#D5C9B3] text-[#55695D] hover:bg-white"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#174D3A] hover:bg-[#20634B] text-white font-semibold shadow-md"
                >
                  Publish Formulation
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 4. VIEW ORDER MODAL */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
          <div onClick={() => setViewingOrder(null)} className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D5C9B3] z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE1D0] pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-[#174D3A] block">{viewingOrder.id}</span>
                <h3 className="font-serif font-bold text-lg text-[#174D3A]">Order Details</h3>
              </div>
              <button onClick={() => setViewingOrder(null)} className="p-1 text-[#7B8E83] hover:text-[#174D3A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#E7DCBF]">
                <span className="text-[#8C682D] font-bold block mb-0.5">Customer Information</span>
                <p className="text-sm font-semibold text-[#174D3A]">{viewingOrder.customer}</p>
                <p className="text-[#6D8074]">{viewingOrder.email}</p>
                <p className="text-[#6D8074]">{viewingOrder.phone}</p>
                <p className="text-[11px] text-[#8C682D] mt-1">{viewingOrder.date}</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E7DCBF]">
                <span className="text-[#8C682D] font-bold block mb-0.5">Formulations</span>
                <p className="text-sm text-[#2C3E35] font-medium">{viewingOrder.products}</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E7DCBF] flex items-center justify-between">
                <div>
                  <span className="text-[#8C682D] font-bold block">Status</span>
                  <div className="mt-1">{getStatusBadge(viewingOrder.status)}</div>
                </div>
                <div className="text-right">
                  <span className="text-[#8C682D] font-bold block">Total Amount</span>
                  <span className="font-serif font-bold text-lg text-[#174D3A]">₹{viewingOrder.amount}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Status for ${viewingOrder.id} marked as updated!`);
                setViewingOrder(null);
              }}
              className="w-full py-2.5 rounded-full bg-[#174D3A] hover:bg-[#20634B] text-white text-xs font-semibold shadow"
            >
              Update Dispatch Status
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
