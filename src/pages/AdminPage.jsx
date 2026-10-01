import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, FolderTree, 
  Ticket, Star, BookOpen, Settings, LogOut, Search, Bell, 
  ChevronRight, ChevronDown, Plus, Edit2, Trash2, Eye, X, 
  Check, ArrowRight, ShieldCheck, Filter, ArrowLeft, TrendingUp,
  BarChart3, AlertTriangle, Clock, Calendar, DollarSign, Upload,
  Sparkles, CheckCircle2, Tag, Layers, RefreshCw, Menu, Award,
  HelpCircle, Save, CheckCircle
} from 'lucide-react';
import { VedaFinderLogo } from '../components/VedaLogoBrand';
import { BotanicalBranch } from '../components/AyurvedicIcons';
import { 
  getStoredSutraQuiz, 
  saveStoredSutraQuiz, 
  DEFAULT_SUTRA_QUIZ 
} from '../data/sutraQuizData';

export default function AdminPage({ 
  orders: passedOrders = [], 
  setOrders: setPassedOrders,
  currentUser,
  onLogout, 
  onNavigate 
}) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [dateRange, setDateRange] = useState('This Month');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Orders State (synced from prop or localStorage)
  const [orders, setOrders] = useState(() => {
    if (passedOrders && passedOrders.length > 0) return passedOrders;
    try {
      const saved = localStorage.getItem('vf_customer_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync orders when props change
  useEffect(() => {
    if (passedOrders && passedOrders.length > 0) {
      setOrders(passedOrders);
    }
  }, [passedOrders]);

  // The Sutra Quiz State
  const [sutraQuiz, setSutraQuiz] = useState(getStoredSutraQuiz);
  const [quizSuccessToast, setQuizSuccessToast] = useState('');
  const [editingQuestionId, setEditingQuestionId] = useState(null);

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
      salesCount: 0,
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
      salesCount: 0,
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
      salesCount: 0,
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
      salesCount: 0,
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
      salesCount: 0,
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
      salesCount: 0,
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
      salesCount: 0,
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
      salesCount: 0,
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
      salesCount: 0,
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
      salesCount: 0,
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
      salesCount: 0,
      status: 'In Stock',
      image: '/products/trivang-bhasma.png',
      indicates: 'Reproductive Health, Urinary Disorders, Prameha',
      ingredients: 'Naga, Vanga, Yashada Bhasma',
      usage: '125mg with honey or warm milk.'
    }
  ]);

  // Modals
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
    { name: 'The Sutra Quiz', icon: Award },
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

  // Dynamic Metrics Calculated from Real Orders & Real Products
  const totalSales = orders.reduce((sum, o) => sum + (Number(o.amount) || Number(o.total) || 0), 0);
  const totalOrdersCount = orders.length;
  const uniqueSeekers = new Set(orders.map(o => o.phone || o.customer || o.email || o.customerEmail).filter(Boolean)).size;
  const productsCount = products.length;
  const lowStockItems = products.filter(p => p.stock < 15);

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

  // The Sutra Quiz Management Handlers
  const handleQuizHeaderChange = (field, value) => {
    setSutraQuiz(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateQuestion = (qId, updatedFields) => {
    setSutraQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q => q.id === qId ? { ...q, ...updatedFields } : q)
    }));
  };

  const handleUpdateOption = (qId, optionKey, newText) => {
    setSutraQuiz(prev => ({
      ...prev,
      questions: prev.questions.map(q => {
        if (q.id === qId) {
          return {
            ...q,
            options: q.options.map(opt => opt.key === optionKey ? { ...opt, text: newText } : opt)
          };
        }
        return q;
      })
    }));
  };

  const handleAddNewQuestion = () => {
    const nextIdx = (sutraQuiz.questions?.length || 0) + 1;
    const newQ = {
      id: 'q-' + Date.now(),
      subject: 'Classical Samhita Chikitsa',
      question: `Question ${nextIdx}: Enter your Ayurvedic challenge question here...`,
      options: [
        { key: 'A', text: 'Option A Text' },
        { key: 'B', text: 'Option B Text' },
        { key: 'C', text: 'Option C Text' },
        { key: 'D', text: 'Option D Text' }
      ],
      correct: 'A',
      explanation: 'Add classical Sanskrit shloka reference and explanation here.'
    };

    setSutraQuiz(prev => ({
      ...prev,
      totalQuestions: (prev.questions?.length || 0) + 1,
      questions: [...(prev.questions || []), newQ]
    }));
    setEditingQuestionId(newQ.id);
  };

  const handleDeleteQuestion = (qId) => {
    if (window.confirm('Are you sure you want to delete this MCQ question?')) {
      setSutraQuiz(prev => {
        const remaining = prev.questions.filter(q => q.id !== qId);
        return {
          ...prev,
          totalQuestions: remaining.length,
          questions: remaining
        };
      });
    }
  };

  const handleSaveQuizToLive = () => {
    saveStoredSutraQuiz(sutraQuiz);
    setQuizSuccessToast('✨ The Sutra Challenge Quiz has been successfully saved & updated live on website!');
    setTimeout(() => {
      setQuizSuccessToast('');
    }, 4500);
  };

  const handleResetQuizToDefault = () => {
    if (window.confirm('Reset all questions to default classical Week 42 questions?')) {
      setSutraQuiz(DEFAULT_SUTRA_QUIZ);
      saveStoredSutraQuiz(DEFAULT_SUTRA_QUIZ);
      setQuizSuccessToast('🌿 Quiz restored to default classical questions and saved live!');
      setTimeout(() => {
        setQuizSuccessToast('');
      }, 4500);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.hindiName && p.hindiName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.indicates && p.indicates.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

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
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FAF7F2] text-[#183B2B]">{status || 'Active'}</span>;
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
                  {item.name === 'The Sutra Quiz' && (
                    <span className="ml-auto text-[9px] uppercase font-bold bg-[#C59A4E] text-[#112F22] px-1.5 py-0.5 rounded-full">
                      New
                    </span>
                  )}
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
          
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white border border-[#DCD3C0] text-[#174D3A] shadow-sm shrink-0"
              aria-label="Open admin menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#8A9C91] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dispensary formulations, orders, questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-full bg-white border border-[#DCD3C0] text-xs sm:text-sm text-[#174D3A] placeholder-[#8A9C91] focus:outline-none focus:ring-2 focus:ring-[#174D3A]/20 shadow-inner"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => onNavigate('Home')}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white border border-[#DCD3C0] text-[11px] sm:text-xs font-semibold text-[#174D3A] hover:bg-[#FAF7F2] shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Storefront</span>
            </button>

            <div className="flex items-center gap-2 pl-1 sm:pl-2">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#174D3A] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                A
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-[#174D3A] leading-tight">Master Admin</span>
                <span className="text-[10px] text-[#7A8C81] leading-tight">Veda Finder Portal</span>
              </div>
            </div>
          </div>

        </header>

        {/* Dynamic Main Body based on Active Tab */}
        <main className="p-3 sm:p-8 space-y-6 sm:space-y-8 flex-1">
          
          {/* ========================================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW (LIVE CLEAN DATA) */}
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
                    Here is the live dispensary performance and customer metrics for {dateRange}.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('The Sutra Quiz')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF3E6] border border-[#DFCFA8] text-[#8C682D] text-xs font-bold shadow-sm hover:bg-[#F2E7D0] transition-all"
                  >
                    <Award className="w-4 h-4 text-[#8C682D]" />
                    <span>Manage The Sutra Quiz</span>
                  </button>

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

              {/* 4 Metric KPI Cards (REAL LIVE DATA) */}
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
                        ₹ {totalSales.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[9px] sm:text-[11px] text-[#8C682D] font-semibold block truncate">
                        {totalSales > 0 ? 'Live Revenue' : 'Awaiting Orders'}
                      </span>
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
                        {totalOrdersCount}
                      </span>
                      <span className="text-[9px] sm:text-[11px] text-[#55695C] font-semibold block truncate">
                        {totalOrdersCount > 0 ? 'Placed by customers' : '0 Orders this month'}
                      </span>
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
                        {uniqueSeekers}
                      </span>
                      <span className="text-[9px] sm:text-[11px] text-[#55695C] font-semibold block truncate">
                        {uniqueSeekers > 0 ? 'Unique Buyers' : '0 Registered'}
                      </span>
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
                      <span className="text-[10px] sm:text-xs text-[#708277] font-medium block truncate">Catalog</span>
                      <span className="font-serif font-bold text-lg sm:text-3xl text-[#174D3A] leading-tight block truncate">
                        {productsCount}
                      </span>
                      <span className="text-[9px] sm:text-[11px] text-emerald-700 font-semibold block truncate">AYUSH Active</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E3D8C4] items-center justify-center text-[#73857B] group-hover:bg-[#174D3A] group-hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

              </div>

              {/* Side by Side: Live Orders Table & Top Formulations */}
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

                  {orders.length === 0 ? (
                    <div className="py-12 text-center text-[#73857B] space-y-3">
                      <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E6DCC8] flex items-center justify-center mx-auto text-[#8C682D]">
                        <ShoppingCart className="w-6 h-6 text-[#8C682D]" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-sm text-[#174D3A]">No Customer Orders Placed Yet</p>
                        <p className="text-xs text-[#7A8C81] max-w-sm mx-auto">
                          Orders placed via the online store or WhatsApp checkout will appear here automatically.
                        </p>
                      </div>
                    </div>
                  ) : (
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
                                {ord.customer || ord.customerName || 'Customer'}
                              </td>
                              <td className="py-3 font-serif font-bold text-xs text-[#174D3A]">
                                ₹{ord.amount || ord.total}
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
                  )}
                </div>

                {/* Top Formulations & Low-Stock Alerts (5 cols on xl) */}
                <div className="xl:col-span-5 space-y-6">
                  
                  {/* Formulations List */}
                  <div className="bg-white rounded-3xl p-6 border border-[#E6DCC8] shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-[#EFE5D3] pb-3">
                      <h3 className="font-serif font-bold text-lg text-[#174D3A]">Active Formulations</h3>
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
                              <span className="text-[10px] text-[#7A8C81]">{p.category} • {p.stock} units</span>
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
                      {lowStockItems.length === 0 ? (
                        <p className="text-xs text-emerald-800 font-medium">All dispensary stocks are currently healthy.</p>
                      ) : (
                        lowStockItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between bg-white p-2 rounded-xl border border-[#E6DCC7]">
                            <span className="font-semibold text-[#174D3A]">{item.name}</span>
                            <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{item.stock} left</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: THE SUTRA QUIZ & QUESTIONS MANAGER (FULL EDITING SUITE) */}
          {/* ========================================================================= */}
          {activeTab === 'The Sutra Quiz' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Success Toast */}
              {quizSuccessToast && (
                <div className="p-4 rounded-2xl bg-emerald-900 text-emerald-100 border border-emerald-500 shadow-xl flex items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle className="w-5 h-5 text-emerald-300 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold">{quizSuccessToast}</span>
                  </div>
                  <button onClick={() => setQuizSuccessToast('')} className="text-emerald-300 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Header Box */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DCC8] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C682D] bg-[#FAF3E6] px-3 py-1 rounded-full border border-[#E2D2B5]">
                      WEEK {sutraQuiz.week || 42} QUIZ MANAGER
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      LIVE ON /the-sutra
                    </span>
                  </div>
                  <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#174D3A]">
                    The Sutra Knowledge Challenge Manager
                  </h2>
                  <p className="text-xs text-[#6A7C71]">
                    Customize the weekly theme, modify questions, update MCQ options (A, B, C, D), and change correct answers whenever you want.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={handleResetQuizToDefault}
                    className="px-4 py-2.5 rounded-full bg-[#FAF7F2] hover:bg-[#EFE5D3] text-[#55695C] border border-[#D5C9B3] text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset to Default</span>
                  </button>

                  <button
                    onClick={handleAddNewQuestion}
                    className="px-4 py-2.5 rounded-full bg-[#174D3A] hover:bg-[#20634B] text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Question</span>
                  </button>

                  <button
                    onClick={handleSaveQuizToLive}
                    className="px-6 py-2.5 rounded-full bg-[#C59A4E] hover:bg-[#B3873B] text-[#0E2419] text-xs font-bold shadow-lg transition-all flex items-center gap-1.5 transform hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Publish Live</span>
                  </button>
                </div>
              </div>

              {/* Quiz General Settings Card */}
              <div className="bg-white rounded-3xl p-6 border border-[#E6DCC8] shadow-sm space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#174D3A] border-b border-[#F0E6D5] pb-2">
                  1. Challenge Metadata & Schedule
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">Week Number</label>
                    <input
                      type="number"
                      value={sutraQuiz.week || 42}
                      onChange={(e) => handleQuizHeaderChange('week', Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#D5C9B3] text-sm text-[#174D3A] font-bold focus:outline-none focus:border-[#174D3A]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">Challenge Title</label>
                    <input
                      type="text"
                      value={sutraQuiz.title || ''}
                      onChange={(e) => handleQuizHeaderChange('title', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#D5C9B3] text-xs text-[#174D3A] font-semibold focus:outline-none focus:border-[#174D3A]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">Sanskrit Theme</label>
                    <input
                      type="text"
                      value={sutraQuiz.sanskritTheme || ''}
                      onChange={(e) => handleQuizHeaderChange('sanskritTheme', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#D5C9B3] text-xs text-[#8C682D] font-bold focus:outline-none focus:border-[#174D3A]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#174D3A] uppercase tracking-wider mb-1">Duration & Live Until</label>
                    <input
                      type="text"
                      value={sutraQuiz.liveUntil || 'Sunday 10:00 PM IST'}
                      onChange={(e) => handleQuizHeaderChange('liveUntil', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#D5C9B3] text-xs text-[#174D3A] focus:outline-none focus:border-[#174D3A]"
                    />
                  </div>
                </div>
              </div>

              {/* Questions & Options List Card */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-xl text-[#174D3A]">
                    2. Manage Questions & Options ({(sutraQuiz.questions || []).length} MCQs)
                  </h3>
                  <button
                    onClick={handleAddNewQuestion}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C682D] hover:text-[#174D3A]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Question</span>
                  </button>
                </div>

                {(sutraQuiz.questions || []).map((q, idx) => (
                  <div 
                    key={q.id || idx}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3D8C3] shadow-md space-y-5 hover:border-[#8C682D]/70 transition-all"
                  >
                    {/* Question Header & Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0E6D5] pb-4">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-[#174D3A] text-white flex items-center justify-center font-serif font-bold text-sm shadow">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C682D] block">
                            QUESTION #{idx + 1}
                          </span>
                          <input
                            type="text"
                            value={q.subject || ''}
                            onChange={(e) => handleUpdateQuestion(q.id, { subject: e.target.value })}
                            placeholder="Subject / Samhita Reference (e.g. Charaka Samhita)"
                            className="text-xs font-bold text-[#174D3A] bg-transparent border-b border-dashed border-[#D5C9B3] focus:outline-none focus:border-[#174D3A] w-64"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF3E6] border border-[#E4D5B9] text-xs font-bold text-[#8C682D]">
                          <span>Correct Key:</span>
                          <select
                            value={q.correct}
                            onChange={(e) => handleUpdateQuestion(q.id, { correct: e.target.value })}
                            className="bg-white text-emerald-800 font-bold border border-[#D5C9B3] rounded-lg px-2 py-0.5 focus:outline-none cursor-pointer"
                          >
                            <option value="A">Option A</option>
                            <option value="B">Option B</option>
                            <option value="C">Option C</option>
                            <option value="D">Option D</option>
                          </select>
                        </div>

                        <button
                          onClick={() => handleDeleteQuestion(q.id)}
                          className="p-2 rounded-full text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Question Textarea */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-[#174D3A] uppercase tracking-wider">
                        Question Description:
                      </label>
                      <textarea
                        rows={2}
                        value={q.question}
                        onChange={(e) => handleUpdateQuestion(q.id, { question: e.target.value })}
                        className="w-full p-3 rounded-2xl bg-[#FAF7F2] border border-[#D5C9B3] text-sm text-[#174D3A] font-serif font-medium focus:outline-none focus:border-[#174D3A]"
                      />
                    </div>

                    {/* 4 Options Grid (A, B, C, D) */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-[#174D3A] uppercase tracking-wider">
                        Options (Select the radio button to mark as the correct answer):
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {['A', 'B', 'C', 'D'].map((key) => {
                          const optionObj = q.options?.find(o => o.key === key) || { key, text: '' };
                          const isCorrect = q.correct === key;

                          return (
                            <div 
                              key={key}
                              className={`p-3 rounded-2xl border transition-all flex items-center gap-3 ${
                                isCorrect 
                                  ? 'bg-emerald-50/80 border-emerald-500 shadow-sm' 
                                  : 'bg-[#FAF7F2] border-[#E0D5C1]'
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => handleUpdateQuestion(q.id, { correct: key })}
                                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                                  isCorrect 
                                    ? 'bg-emerald-600 text-white shadow-md' 
                                    : 'bg-white border border-[#C5B79F] text-[#5B6D62] hover:bg-[#174D3A] hover:text-white'
                                }`}
                                title={`Click to set Option ${key} as Correct Answer`}
                              >
                                {key}
                              </button>

                              <input
                                type="text"
                                value={optionObj.text}
                                onChange={(e) => handleUpdateOption(q.id, key, e.target.value)}
                                placeholder={`Enter text for Option ${key}`}
                                className="flex-1 bg-transparent text-xs sm:text-sm text-[#174D3A] font-medium focus:outline-none"
                              />

                              {isCorrect && (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Correct
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Explanation / Reference */}
                    <div className="space-y-1 pt-1">
                      <label className="block text-xs font-bold text-[#8C682D] uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Classical Shloka Reference & Explanation (Revealed to participants after quiz):</span>
                      </label>
                      <textarea
                        rows={2}
                        value={q.explanation || ''}
                        onChange={(e) => handleUpdateQuestion(q.id, { explanation: e.target.value })}
                        placeholder="e.g. Reference: Charaka Samhita Chikitsasthana 1/1..."
                        className="w-full p-3 rounded-2xl bg-[#F6F2E8] border border-[#DFCFA8] text-xs text-[#485B50] focus:outline-none focus:border-[#174D3A]"
                      />
                    </div>

                  </div>
                ))}

                {/* Bottom Save CTA Bar */}
                <div className="p-6 rounded-3xl bg-[#112F22] text-[#E8DFC8] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-[#C59A4E]/30">
                  <div>
                    <h4 className="font-serif font-bold text-lg text-white">
                      Ready to update The Sutra Challenge?
                    </h4>
                    <p className="text-xs text-[#B4D0C2]">
                      Saving will immediately update all questions, options, and explanations live on the website.
                    </p>
                  </div>

                  <button
                    onClick={handleSaveQuizToLive}
                    className="px-8 py-3.5 rounded-full bg-[#C59A4E] hover:bg-[#B3873B] text-[#0E2419] font-bold text-sm shadow-xl transition-all flex items-center gap-2 transform hover:scale-105 shrink-0"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Publish Live Changes</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: PRODUCT MANAGEMENT */}
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
          {/* TAB 4: ORDER MANAGEMENT (LIVE CUSTOMER ORDERS) */}
          {/* ========================================================================= */}
          {activeTab === 'Orders' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DCC8] shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#EFE5D3] pb-4">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-[#174D3A]">All Dispensary Orders ({orders.length})</h2>
                  <p className="text-xs text-[#708277]">Track dispatch, payment status and customer deliveries</p>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="py-16 text-center text-[#73857B] space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#E6DCC8] flex items-center justify-center mx-auto text-[#8C682D]">
                    <ShoppingCart className="w-7 h-7 text-[#8C682D]" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#174D3A]">No Customer Orders Found</h3>
                  <p className="text-xs text-[#7A8C81] max-w-sm mx-auto">
                    New customer orders placed through the website or UPI gateway will appear here.
                  </p>
                </div>
              ) : (
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
                          <td className="py-3.5 font-semibold text-xs text-[#174D3A]">{ord.customer || ord.customerName || 'Customer'}</td>
                          <td className="py-3.5 text-xs text-[#4E6155] max-w-[200px] truncate">{ord.products || 'Ayurvedic Formulations'}</td>
                          <td className="py-3.5 font-serif font-bold text-sm text-[#174D3A]">₹{ord.amount || ord.total}</td>
                          <td className="py-3.5 text-xs text-[#708277]">{ord.paymentStatus || 'Paid (UPI/Razorpay)'}</td>
                          <td className="py-3.5">{getStatusBadge(ord.status || 'Processing')}</td>
                          <td className="py-3.5 text-[11px] text-[#7A8C81]">{ord.date || 'Recent'}</td>
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
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: ANALYTICS & INTELLIGENCE */}
          {/* ========================================================================= */}
          {activeTab === 'Analytics' && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6DCC8] shadow-sm space-y-6">
                <div className="border-b border-[#EFE5D3] pb-4">
                  <h2 className="font-serif font-bold text-2xl text-[#174D3A]">Dispensary Analytics & Intelligence</h2>
                  <p className="text-xs text-[#708277]">Ayurvedic category distribution, catalog health, and live customer metrics</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC9]">
                    <span className="text-xs text-[#708277] block">Bhasma Formulations</span>
                    <span className="font-serif font-bold text-2xl text-[#174D3A]">
                      {products.filter(p => p.category === 'Bhasma').length} items
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold block">Primary Category</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC9]">
                    <span className="text-xs text-[#708277] block">Pishti Formulations</span>
                    <span className="font-serif font-bold text-2xl text-[#174D3A]">
                      {products.filter(p => p.category === 'Pishti').length} items
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold block">Pearl & Coral</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC9]">
                    <span className="text-xs text-[#708277] block">Vitality Capsules</span>
                    <span className="font-serif font-bold text-2xl text-[#174D3A]">
                      {products.filter(p => p.category === 'Capsules').length} items
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold block">Nar Ojas Premium</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DEC9]">
                    <span className="text-xs text-[#708277] block">Herbal Teas</span>
                    <span className="font-serif font-bold text-2xl text-[#174D3A]">
                      {products.filter(p => p.category === 'Herbal Tea').length} items
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold block">Agnisip Digestive</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: OTHER SIDEBAR TABS */}
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
                  Cancel
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
                <p className="text-sm font-semibold text-[#174D3A]">{viewingOrder.customer || viewingOrder.customerName || 'Customer'}</p>
                <p className="text-[#6D8074]">{viewingOrder.email || viewingOrder.customerEmail || 'Not provided'}</p>
                <p className="text-[#6D8074]">{viewingOrder.phone || 'WhatsApp Verified'}</p>
                <p className="text-[11px] text-[#8C682D] mt-1">{viewingOrder.date || 'Recent'}</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E7DCBF]">
                <span className="text-[#8C682D] font-bold block mb-0.5">Formulations</span>
                <p className="text-sm text-[#2C3E35] font-medium">{viewingOrder.products || 'Ayurvedic Formulations'}</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E7DCBF] flex items-center justify-between">
                <div>
                  <span className="text-[#8C682D] font-bold block">Status</span>
                  <div className="mt-1">{getStatusBadge(viewingOrder.status || 'Processing')}</div>
                </div>
                <div className="text-right">
                  <span className="text-[#8C682D] font-bold block">Total Amount</span>
                  <span className="font-serif font-bold text-lg text-[#174D3A]">₹{viewingOrder.amount || viewingOrder.total}</span>
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
