/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { 
  Check, 
  Phone, 
  MessageCircle, 
  Layout, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Menu, 
  X,
  Facebook,
  MapPin,
  Mail,
  Send,
  Smartphone,
  Globe,
  BarChart3,
  Bot,
  FileText,
  Share2,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const pricingPlans = [
  {
    name: "COMBO 1 – KHỞI ĐẦU",
    price: "1.500.000đ",
    features: [
      "Website 1 trang (Landing Page)",
      "Giao diện đơn giản, hiện đại",
      "Tích hợp Zalo, Nút gọi điện",
      "Tối ưu hiển thị Mobile",
      "Bàn giao trong 3-5 ngày"
    ],
    color: "bg-slate-50",
    buttonColor: "bg-primary"
  },
  {
    name: "COMBO 2 – TIÊU CHUẨN",
    price: "3.000.000đ",
    features: [
      "Website 2–3 trang",
      "Có Form liên hệ khách hàng",
      "Gắn Zalo, Facebook Messenger",
      "Tích hợp Google Maps",
      "Tối ưu SEO cơ bản"
    ],
    color: "bg-blue-50",
    buttonColor: "bg-primary"
  },
  {
    name: "COMBO 3 – BÁN HÀNG",
    price: "4.500.000đ",
    features: [
      "Website 4–6 trang",
      "Thiết kế Banner, CTA chuyên nghiệp",
      "Tối ưu SEO nâng cao",
      "Tích hợp quản lý bài viết",
      "Tốc độ tải trang nhanh"
    ],
    color: "bg-primary text-white",
    buttonColor: "bg-secondary",
    popular: true
  },
  {
    name: "COMBO 4 – TỐI ƯU CHỐT KHÁCH",
    price: "6.000.000đ",
    features: [
      "Website 6–8 trang",
      "Tối ưu tỷ lệ chuyển đổi (CRO)",
      "Hệ thống Form thu thập khách hàng",
      "Tích hợp Tracking (Pixel, GA4)",
      "Hỗ trợ nội dung cơ bản"
    ],
    color: "bg-blue-50",
    buttonColor: "bg-primary"
  },
  {
    name: "COMBO 5 – CAO CẤP",
    price: "8.000.000đ",
    features: [
      "Thiết kế theo yêu cầu riêng",
      "Giao diện cao cấp, độc bản",
      "Tối ưu trải nghiệm người dùng (UX)",
      "Bảo mật đa lớp",
      "Hỗ trợ kỹ thuật 24/7"
    ],
    color: "bg-slate-900 text-white",
    buttonColor: "bg-secondary"
  }
];

const supportPlans = [
  {
    name: "Gói 1 – Cơ bản",
    price: "500.000đ/tháng",
    description: "Phù hợp: khách chỉ cần duy trì website ổn định",
    features: [
      "Kiểm tra website hoạt động bình thường",
      "Hỗ trợ chỉnh sửa nội dung nhỏ",
      "Cập nhật hình ảnh, số điện thoại, địa chỉ",
      "Hỗ trợ kỹ thuật cơ bản"
    ],
    color: "bg-white",
    icon: <ShieldCheck className="w-10 h-10 text-blue-500" />
  },
  {
    name: "Gói 2 – Tiêu chuẩn",
    price: "1.500.000đ/tháng",
    description: "Phù hợp: khách muốn có người hỗ trợ thường xuyên",
    features: [
      "Bao gồm toàn bộ gói cơ bản",
      "Cập nhật bài viết/nội dung định kỳ",
      "Chỉnh sửa banner, nội dung cơ bản",
      "Theo dõi form, tin nhắn, nút liên hệ",
      "Hỗ trợ tối ưu website dễ chốt khách"
    ],
    color: "bg-blue-50 border-2 border-primary/20",
    icon: <Zap className="w-10 h-10 text-primary" />,
    popular: true
  },
  {
    name: "Gói 3 – Vận hành hỗ trợ bán hàng",
    price: "3.000.000đ/tháng",
    description: "Phù hợp: khách muốn vừa có website vừa có người vận hành",
    features: [
      "Bao gồm toàn bộ gói tiêu chuẩn",
      "Hỗ trợ đăng bài theo nội dung có sẵn",
      "Tư vấn tối ưu giao diện/chuyển đổi",
      "Hỗ trợ setup automation cơ bản",
      "Đồng hành xử lý nhu cầu phát sinh nhanh"
    ],
    color: "bg-slate-900 text-white",
    icon: <Rocket className="w-10 h-10 text-secondary" />
  }
];

const upgradeServices = [
  {
    title: "Auto trả lời Zalo",
    description: "Hệ thống chatbot tự động phản hồi khách hàng trên Zalo 24/7.",
    icon: <Bot className="w-8 h-8 text-primary" />
  },
  {
    title: "Auto gửi báo giá",
    description: "Tự động soạn và gửi báo giá chuyên nghiệp ngay khi khách để lại thông tin.",
    icon: <FileText className="w-8 h-8 text-primary" />
  },
  {
    title: "Auto đăng bài",
    description: "Công cụ tự động lập lịch và đăng bài lên đa nền tảng mạng xã hội.",
    icon: <Share2 className="w-8 h-8 text-primary" />
  },
  {
    title: "Chạy quảng cáo",
    description: "Tối ưu chiến dịch Google Ads, Facebook Ads để mang lại khách hàng thực tế.",
    icon: <BarChart3 className="w-8 h-8 text-primary" />
  },
  {
    title: "Landing page riêng",
    description: "Thiết kế trang đích chuyên biệt cho từng chiến dịch sản phẩm cụ thể.",
    icon: <Smartphone className="w-8 h-8 text-primary" />
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', note: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', phone: '', note: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-extrabold text-primary flex items-center gap-2">
            <span className="bg-primary text-white p-1 rounded">Ti</span> Toàn
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <a href="#home" className="hover:text-primary transition-colors">Trang chủ</a>
            <a href="#services" className="hover:text-primary transition-colors">Dịch vụ</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Bảng giá</a>
            <a href="#contact" className="hover:text-primary transition-colors">Liên hệ</a>
            <a href="#contact" className="bg-secondary text-white px-6 py-2.5 rounded-full hover:bg-red-700 transition-all shadow-lg hover:shadow-red-200">
              Nhận tư vấn miễn phí
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button className="md:hidden text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-4 font-medium">
                <a href="#home" onClick={() => setIsMenuOpen(false)}>Trang chủ</a>
                <a href="#services" onClick={() => setIsMenuOpen(false)}>Dịch vụ</a>
                <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Bảng giá</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>Liên hệ</a>
                <a href="#contact" className="bg-secondary text-white px-6 py-3 rounded-lg text-center" onClick={() => setIsMenuOpen(false)}>
                  Nhận tư vấn miễn phí
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gradient-to-br from-blue-50 via-white to-red-50">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-primary rounded-full text-sm font-bold mb-6">
              GIẢI PHÁP WEBSITE TOÀN DIỆN
            </span>
            <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-6 text-slate-900">
              Thiết kế website & <span className="text-primary">giải pháp bán hàng</span> online
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Giúp cá nhân và doanh nghiệp có website chuyên nghiệp, tối ưu chốt khách và tự động hóa quy trình kinh doanh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#pricing" className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group">
                Nhận báo giá ngay <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#services" className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-primary hover:text-primary transition-all flex items-center justify-center">
                Tìm hiểu thêm
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/webdesign/800/600" 
                alt="Website Design Illustration" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 bg-white p-4 rounded-xl shadow-lg hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <Check size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Tỷ lệ chuyển đổi</p>
                  <p className="font-bold text-slate-900">+45%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction / Benefits */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Tại sao chọn dịch vụ của Ti Toàn?</h2>
            <p className="text-slate-600 text-lg">
              Chúng tôi không chỉ làm website, chúng tôi xây dựng công cụ giúp bạn bán hàng hiệu quả hơn mỗi ngày.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-blue-100 group">
              <div className="w-14 h-14 bg-blue-100 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layout className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Website chuyên nghiệp</h3>
              <p className="text-slate-600">Giao diện hiện đại, chuẩn UI/UX giúp khách hàng dễ dàng tìm kiếm thông tin và tin tưởng thương hiệu.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-blue-100 group">
              <div className="w-14 h-14 bg-blue-100 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Tăng uy tín thương hiệu</h3>
              <p className="text-slate-600">Một website chỉn chu là bộ mặt của doanh nghiệp trên internet, giúp bạn vượt xa đối thủ cạnh tranh.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-blue-100 group">
              <div className="w-14 h-14 bg-blue-100 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Tự động hóa bán hàng</h3>
              <p className="text-slate-600">Tích hợp các công cụ tự động giúp bạn tiết kiệm thời gian và không bỏ lỡ bất kỳ khách hàng tiềm năng nào.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Bảng giá dịch vụ</h2>
            <p className="text-slate-600 text-lg">Lựa chọn gói combo phù hợp nhất với nhu cầu và quy mô kinh doanh của bạn.</p>
          </div>

          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6">
            {pricingPlans.map((plan, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className={`relative p-6 rounded-3xl shadow-lg flex flex-col ${plan.color} ${plan.popular ? 'ring-4 ring-secondary/20' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Phổ biến nhất
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">{plan.name}</h3>
                  <div className="text-3xl font-black">{plan.price}</div>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-sm">
                      <Check size={16} className={plan.color.includes('text-white') ? 'text-white' : 'text-primary'} />
                      <span className="opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="#contact" 
                  className={`w-full py-3 rounded-xl font-bold text-center transition-all ${plan.buttonColor} text-white hover:opacity-90 shadow-lg`}
                >
                  👉 Chọn gói này
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Support Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Dịch vụ hỗ trợ hàng tháng</h2>
            <p className="text-slate-600 text-lg">Đảm bảo website của bạn luôn hoạt động ổn định và được tối ưu liên tục để mang lại hiệu quả kinh doanh cao nhất.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {supportPlans.map((plan, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 rounded-3xl shadow-xl flex flex-col relative ${plan.color}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Khuyên dùng
                  </div>
                )}
                <div className="mb-6">
                  <div className="mb-4">{plan.icon}</div>
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <div className="text-2xl font-black text-primary mb-2">{plan.price}</div>
                  <p className={`text-sm font-medium ${plan.color.includes('text-white') ? 'text-blue-200' : 'text-slate-500'}`}>
                    {plan.description}
                  </p>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-sm">
                      <Check size={18} className="text-green-500 shrink-0" />
                      <span className="opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href="#contact" 
                  className={`w-full py-3 rounded-xl font-bold text-center transition-all ${plan.color.includes('text-white') ? 'bg-secondary text-white' : 'bg-primary text-white'} hover:opacity-90`}
                >
                  Liên hệ tư vấn
                </a>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center max-w-4xl mx-auto border border-blue-100">
            <h4 className="text-xl font-bold mb-4 text-primary">Bạn nên chọn gói nào?</h4>
            <div className="grid sm:grid-cols-3 gap-6 text-sm">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <p className="font-bold text-slate-800 mb-2">Khách nhỏ, ít chỉnh sửa</p>
                <p className="text-slate-600">👉 Chọn gói <span className="font-bold">500k</span></p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <p className="font-bold text-slate-800 mb-2">Muốn hỗ trợ đều đặn</p>
                <p className="text-slate-600">👉 Chọn gói <span className="font-bold">1.5 triệu</span></p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <p className="font-bold text-slate-800 mb-2">Muốn ra khách tốt hơn</p>
                <p className="text-slate-600">👉 Chọn gói <span className="font-bold">3 triệu</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade Services */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8">Dịch vụ nâng cấp & <span className="text-primary">Tăng trưởng</span></h2>
              <div className="space-y-6">
                {upgradeServices.map((service, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 p-4 rounded-2xl hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{service.title}</h4>
                      <p className="text-slate-600 text-sm">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-primary rounded-3xl p-12 text-white relative z-10">
                <Rocket className="w-16 h-16 mb-6 text-secondary" />
                <h3 className="text-3xl font-bold mb-4">Sẵn sàng bứt phá doanh thu?</h3>
                <p className="text-blue-100 mb-8 text-lg">
                  Kết hợp website chuyên nghiệp với các công cụ marketing tự động để tạo ra cỗ máy bán hàng không ngừng nghỉ.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><Check size={14} /></div>
                    <span>Tiết kiệm 70% thời gian vận hành</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><Check size={14} /></div>
                    <span>Tăng 200% khả năng tiếp cận khách hàng</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"><Check size={14} /></div>
                    <span>Chuyên nghiệp hóa quy trình bán hàng</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -left-10 w-full h-full border-2 border-primary/20 rounded-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-primary p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Liên hệ với chúng tôi</h2>
              <p className="text-blue-100 mb-12">
                Để lại thông tin, Ti Toàn sẽ liên hệ tư vấn giải pháp tối ưu nhất cho bạn trong vòng 30 phút.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 uppercase font-bold mb-1">Hotline</p>
                    <p className="text-lg font-bold">0799.600.789</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 uppercase font-bold mb-1">Email</p>
                    <p className="text-lg font-bold">toan@titoan.vn</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 uppercase font-bold mb-1">Địa chỉ</p>
                    <p className="text-lg font-bold">Sóc Trăng, Việt Nam</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-3/5 p-12">
              {formStatus === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <Send size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Gửi thông tin thành công!</h3>
                  <p className="text-slate-600">Cảm ơn bạn đã quan tâm. Ti Toàn sẽ liên hệ với bạn sớm nhất có thể.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Họ và tên *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Số điện thoại *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="0901 234 567"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nhu cầu của bạn</label>
                    <textarea 
                      rows={4}
                      placeholder="Ví dụ: Tôi muốn làm website bán hàng quần áo..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      value={formData.note}
                      onChange={(e) => setFormData({...formData, note: e.target.value})}
                    ></textarea>
                  </div>
                  <button 
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-secondary text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-200 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? 'Đang gửi...' : 'Nhận tư vấn ngay'}
                    <Send size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <a href="#" className="text-3xl font-extrabold text-white flex items-center gap-2 mb-6">
                <span className="bg-primary text-white p-1 rounded">Ti</span> Toàn
              </a>
              <p className="text-slate-400 max-w-md mb-6">
                Chuyên gia thiết kế website và cung cấp các giải pháp công nghệ giúp doanh nghiệp chuyển đổi số hiệu quả, tối ưu doanh thu bán hàng online.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"><Facebook size={20} /></a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"><Globe size={20} /></a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"><Mail size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Liên kết nhanh</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#home" className="hover:text-white transition-colors">Trang chủ</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Dịch vụ</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Bảng giá</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Liên hệ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Thông tin liên hệ</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-primary" />
                  <span>0799.600.789</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-primary" />
                  <span>toan@titoan.vn</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-primary" />
                  <span>Sóc Trăng, Việt Nam</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
            <p className="mb-2">© 2024 Ti Toàn. Tất cả quyền được bảo lưu.</p>
            <p>Ứng dụng này được phát triển bởi <span className="text-white font-bold">Ti Toàn</span></p>
          </div>
        </div>
      </footer>

      {/* Sticky Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
        <a 
          href="https://zalo.me/0799600789" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-blue-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform animate-bounce"
          title="Chat Zalo"
        >
          <MessageCircle size={28} />
        </a>
        <a 
          href="tel:0799600789" 
          className="w-14 h-14 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          title="Gọi ngay"
        >
          <Phone size={28} />
        </a>
      </div>
    </div>
  );
}
