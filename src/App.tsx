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
  Rocket,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const pricingPlans = [
  {
    name: "Khởi đầu",
    price: "1.500.000đ",
    target: "Phù hợp: Cá nhân bắt đầu làm thương hiệu",
    features: [
      "Website 1 trang (Landing Page)",
      "Giao diện đơn giản, hiện đại",
      "Tích hợp Zalo, Nút gọi điện",
      "Tối ưu hiển thị Mobile",
      "Bàn giao nhanh"
    ],
    color: "bg-white",
    buttonColor: "bg-secondary"
  },
  {
    name: "Tiêu chuẩn",
    price: "3.000.000đ",
    target: "Phù hợp: Hộ kinh doanh, cửa hàng nhỏ",
    features: [
      "Website 2–3 trang",
      "Có Form liên hệ khách hàng",
      "Gắn Zalo, Facebook Messenger",
      "Tích hợp Google Maps",
      "Tối ưu SEO cơ bản"
    ],
    color: "bg-blue-50",
    buttonColor: "bg-secondary"
  },
  {
    name: "Bán hàng",
    price: "4.500.000đ",
    target: "Phù hợp: Shop bán hàng chuyên nghiệp",
    features: [
      "Website 4–6 trang",
      "Thiết kế Banner, CTA chuyên nghiệp",
      "Tối ưu SEO nâng cao",
      "Tích hợp quản lý bài viết",
      "Tốc độ tải trang nhanh"
    ],
    color: "bg-primary text-white",
    buttonColor: "bg-accent",
    popular: true
  },
  {
    name: "Tối ưu chốt khách",
    price: "6.000.000đ",
    target: "Phù hợp: Doanh nghiệp cần chuyển đổi cao",
    features: [
      "Website 6–8 trang",
      "Tối ưu tỷ lệ chuyển đổi (CRO)",
      "Hệ thống Form thu thập khách hàng",
      "Tích hợp Tracking (Pixel, GA4)",
      "Hỗ trợ nội dung cơ bản"
    ],
    color: "bg-blue-50",
    buttonColor: "bg-secondary"
  },
  {
    name: "Cao cấp",
    price: "8.000.000đ",
    target: "Phù hợp: Yêu cầu thiết kế độc bản",
    features: [
      "Thiết kế theo yêu cầu riêng",
      "Giao diện cao cấp, độc bản",
      "Tối ưu trải nghiệm người dùng (UX)",
      "Bảo mật đa lớp",
      "Hỗ trợ kỹ thuật 24/7"
    ],
    color: "bg-slate-900 text-white",
    buttonColor: "bg-accent"
  }
];

const supportPlans = [
  {
    name: "Cơ bản",
    price: "500k/tháng",
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
    name: "Tiêu chuẩn",
    price: "1.5 triệu/tháng",
    description: "Phù hợp: khách muốn có người hỗ trợ thường xuyên",
    features: [
      "Bao gồm toàn bộ gói cơ bản",
      "Cập nhật bài viết/nội dung định kỳ",
      "Chỉnh sửa banner, nội dung cơ bản",
      "Theo dõi form, tin nhắn, nút liên hệ",
      "Hỗ trợ tối ưu website dễ chốt khách"
    ],
    color: "bg-blue-50 border-2 border-primary/20",
    icon: <Zap className="w-10 h-10 text-secondary" />,
    popular: true
  },
  {
    name: "Vận hành hỗ trợ bán hàng",
    price: "3 triệu/tháng",
    description: "Phù hợp: khách muốn vừa có website vừa có người vận hành",
    features: [
      "Bao gồm toàn bộ gói tiêu chuẩn",
      "Hỗ trợ đăng bài theo nội dung có sẵn",
      "Tư vấn tối ưu giao diện/chuyển đổi",
      "Hỗ trợ setup automation cơ bản",
      "Đồng hành xử lý nhu cầu phát sinh nhanh"
    ],
    color: "bg-slate-900 text-white",
    icon: <Rocket className="w-10 h-10 text-accent" />
  }
];

const painPoints = [
  "Có Facebook/Zalo nhưng chưa có website chuyên nghiệp",
  "Khách hỏi nhiều nhưng khó chốt",
  "Muốn làm website nhưng không biết bắt đầu từ đâu",
  "Làm xong website nhưng không ai hỗ trợ vận hành"
];

const solutions = [
  { 
    title: "Thiết kế website theo nhu cầu", 
    desc: "Xây dựng giao diện đúng ý, phù hợp với ngành nghề kinh doanh của bạn.",
    icon: <Layout className="w-10 h-10 text-secondary" /> 
  },
  { 
    title: "Tối ưu giao diện để dễ chốt khách", 
    desc: "Bố trí nút bấm, thông tin khoa học giúp khách hàng dễ dàng ra quyết định mua hàng.",
    icon: <Zap className="w-10 h-10 text-secondary" /> 
  },
  { 
    title: "Hỗ trợ vận hành sau bàn giao", 
    desc: "Đồng hành cùng bạn trong việc cập nhật, chỉnh sửa để website luôn mới và hiệu quả.",
    icon: <ShieldCheck className="w-10 h-10 text-secondary" /> 
  }
];

const mainServices = [
  { title: "Thiết kế website giới thiệu", icon: <Globe className="w-10 h-10 text-secondary" /> },
  { title: "Thiết kế website bán hàng/dịch vụ", icon: <Smartphone className="w-10 h-10 text-secondary" /> },
  { title: "Landing page chốt khách", icon: <FileText className="w-10 h-10 text-secondary" /> },
  { title: "Hỗ trợ vận hành & chăm sóc", icon: <Bot className="w-10 h-10 text-secondary" /> }
];

const workflow = [
  { step: "01", title: "Tiếp nhận nhu cầu", desc: "Lắng nghe ý tưởng và mục tiêu kinh doanh của bạn." },
  { step: "02", title: "Tư vấn gói phù hợp", desc: "Đề xuất giải pháp tối ưu nhất với ngân sách của bạn." },
  { step: "03", title: "Thiết kế giao diện", desc: "Xây dựng bản vẽ demo chuyên nghiệp và hiện đại." },
  { step: "04", title: "Chỉnh sửa & Hoàn thiện", desc: "Tinh chỉnh theo ý kiến khách hàng đến khi hài lòng." },
  { step: "05", title: "Bàn giao & Hỗ trợ", desc: "Hướng dẫn sử dụng và đồng hành vận hành website." }
];

const reasons = [
  "Làm nhanh, rõ việc",
  "Chi phí phù hợp",
  "Hỗ trợ dễ hiểu, không rườm rà",
  "Có hỗ trợ sau bàn giao",
  "Linh hoạt theo nhu cầu thực tế"
];

const faqs = [
  { q: "Làm website bao lâu xong?", a: "Tùy vào quy mô dự án, thông thường từ 3-10 ngày làm việc." },
  { q: "Có hỗ trợ tên miền/hosting không?", a: "Có, bên em hỗ trợ tư vấn và đăng ký tên miền, hosting phù hợp nhất cho anh/chị." },
  { q: "Có hỗ trợ chỉnh sửa sau bàn giao không?", a: "Chắc chắn rồi, bên em luôn đồng hành và hỗ trợ chỉnh sửa theo cam kết trong hợp đồng." },
  { q: "Không biết nội dung thì có được hỗ trợ không?", a: "Dạ có, bên em hỗ trợ tư vấn định hướng nội dung và hình ảnh cơ bản để website lên hình đẹp nhất." }
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
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-extrabold text-primary flex items-center gap-2 group"
          >
            <span className="bg-primary text-white p-1 rounded shadow-lg group-hover:bg-secondary transition-colors">GP</span> 
            <span className="tracking-tight">Giải pháp <span className="text-secondary drop-shadow-sm">24/7</span></span>
          </motion.a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <a href="#home" className="hover:text-secondary transition-colors">Trang chủ</a>
            <a href="#services" className="hover:text-secondary transition-colors">Dịch vụ</a>
            <a href="#pricing" className="hover:text-secondary transition-colors">Bảng giá</a>
            <a href="#contact" className="hover:text-secondary transition-colors">Liên hệ</a>
            <a href="#contact" className="bg-accent text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-200 font-bold">
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
      <section id="home" className="pt-32 pb-24 lg:pt-56 lg:pb-48 bg-white overflow-hidden relative">
        {/* Subtle decorative lines */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="container mx-auto h-full border-x border-slate-900"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-xs lg:text-sm font-bold tracking-[0.3em] uppercase text-accent mb-8"
            >
              Premium Digital Solutions
            </motion.span>
            
            <h1 className="text-5xl lg:text-8xl font-light leading-[1.1] mb-10 text-primary tracking-tight">
              <span className="block font-serif italic mb-2">Thiết kế Website</span>
              <span className="block font-black uppercase lg:text-7xl">
                & <span className="text-accent">Hỗ trợ vận hành</span>
              </span>
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-24 h-px bg-accent mx-auto mb-10"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-16 max-w-5xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                <div className="text-center md:text-left group">
                  <span className="text-accent font-serif italic text-3xl block mb-4 opacity-50 group-hover:opacity-100 transition-opacity">01.</span>
                  <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">Giải pháp toàn diện</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    Giúp cá nhân & doanh nghiệp sở hữu website <span className="text-primary italic">đẳng cấp</span> và khác biệt.
                  </p>
                </div>
                
                <div className="text-center md:text-left border-y md:border-y-0 md:border-x border-slate-100 py-10 md:py-0 md:px-12 group">
                  <span className="text-accent font-serif italic text-3xl block mb-4 opacity-50 group-hover:opacity-100 transition-opacity">02.</span>
                  <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">Tối ưu quy trình</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    Hệ thống vận hành thông minh, tối ưu hóa tỷ lệ <span className="text-primary italic">chốt khách</span>.
                  </p>
                </div>
                
                <div className="text-center md:text-left group">
                  <span className="text-accent font-serif italic text-3xl block mb-4 opacity-50 group-hover:opacity-100 transition-opacity">03.</span>
                  <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-3">Bứt phá doanh thu</h3>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">
                    Công cụ mạnh mẽ giúp doanh nghiệp <span className="text-primary italic">tăng trưởng</span> doanh số vượt trội.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="bg-primary text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 group min-w-[240px]"
              >
                Nhận tư vấn ngay <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#pricing" 
                className="bg-white text-primary border border-slate-200 px-12 py-5 rounded-full font-bold text-lg hover:border-primary transition-all flex items-center justify-center min-w-[240px]"
              >
                Xem bảng giá
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 italic">Anh/chị đang gặp tình trạng này?</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {painPoints.map((point, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-slate-50 rounded-xl border-l-4 border-secondary shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <AlertCircle className="w-6 h-6 text-secondary shrink-0" />
                  </div>
                  <p className="font-medium text-slate-700">{point}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="services" className="py-20 px-4 bg-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Bên em không chỉ làm website, mà còn hỗ trợ anh/chị vận hành để website thực sự có giá trị</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Giải pháp toàn diện giúp bạn tập trung vào kinh doanh, việc kỹ thuật đã có chúng tôi lo.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {solutions.map((sol, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100"
              >
                <div className="mb-6">{sol.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-primary">{sol.title}</h3>
                <p className="text-slate-600">{sol.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Dịch vụ nổi bật</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {mainServices.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-slate-50 rounded-2xl text-center hover:bg-primary hover:text-white transition-all group"
              >
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-lg font-bold">{service.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-primary">Combo thiết kế website phù hợp theo từng nhu cầu</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-4"></div>
            <p className="text-slate-600 text-lg font-medium">Lựa chọn gói combo tối ưu nhất cho quy mô kinh doanh của bạn.</p>
          </div>

          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6">
            {pricingPlans.map((plan, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className={`relative p-6 rounded-2xl shadow-lg flex flex-col border border-slate-100 ${plan.color} ${plan.popular ? 'ring-4 ring-accent/20' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Phổ biến nhất
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold uppercase tracking-tight mb-1">{plan.name}</h3>
                  <div className="text-3xl font-black mb-2">{plan.price}</div>
                  <p className="text-xs font-medium opacity-80 leading-relaxed">{plan.target}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2 text-sm">
                      <Check size={16} className={plan.color.includes('text-white') ? 'text-white' : 'text-secondary'} />
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

      {/* Monthly Support Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-primary">Website xong rồi, bên em vẫn tiếp tục hỗ trợ nếu anh/chị cần</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {supportPlans.map((plan, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl shadow-xl flex flex-col relative border border-slate-100 ${plan.color}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Khuyên dùng
                  </div>
                )}
                <div className="mb-6">
                  <div className="mb-4">{plan.icon}</div>
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <div className="text-2xl font-black text-secondary mb-2">{plan.price}</div>
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
                  className={`w-full py-3 rounded-xl font-bold text-center transition-all ${plan.color.includes('text-white') ? 'bg-accent text-white' : 'bg-primary text-white'} hover:opacity-90`}
                >
                  Liên hệ tư vấn
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Quy trình triển khai rõ ràng, dễ theo dõi</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {workflow.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-center"
              >
                <div className="text-4xl font-black text-slate-100 absolute top-2 right-4 z-0">{item.step}</div>
                <div className="relative z-10">
                  <h4 className="font-bold text-primary mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
                {index < workflow.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                    <ArrowRight className="text-slate-300 w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-primary">Vì sao khách hàng chọn <span className="text-secondary">Giải pháp 24/7</span></h2>
              <div className="space-y-4">
                {reasons.map((reason, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                      <Check size={18} />
                    </div>
                    <p className="font-bold text-slate-700">{reason}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-primary rounded-3xl p-12 text-white relative z-10 shadow-2xl">
                <Rocket className="w-16 h-16 mb-6 text-accent" />
                <h3 className="text-3xl font-bold mb-4 italic">Đồng hành cùng sự phát triển của bạn</h3>
                <p className="text-blue-100 mb-8 text-lg">
                  Chúng tôi không chỉ là đơn vị thiết kế, mà là đối tác hỗ trợ vận hành website thực thụ, giúp bạn tối ưu hóa doanh thu trên môi trường online.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><Zap className="text-accent" /></div>
                  <div>
                    <p className="font-bold">Hỗ trợ nhanh chóng</p>
                    <p className="text-sm text-blue-200">Phản hồi ngay khi bạn cần</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 w-full h-full border-2 border-secondary/20 rounded-3xl -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Một số giao diện/định hướng bên em có thể triển khai</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div 
                key={item}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl overflow-hidden shadow-lg bg-white group"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img 
                    src={`https://picsum.photos/seed/portfolio${item}/800/600`} 
                    alt={`Dự án mẫu ${item}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="px-6 py-2 bg-white text-primary font-bold rounded-full">Xem chi tiết</button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-bold text-slate-800">Website mẫu ngành {item === 1 ? 'Bất động sản' : item === 2 ? 'Thời trang' : item === 3 ? 'Dịch vụ' : item === 4 ? 'Nội thất' : item === 5 ? 'Ẩm thực' : 'Giáo dục'}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-primary rounded-3xl p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Cam kết hỗ trợ rõ ràng</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0"><Check className="text-accent" /></div>
                  <p className="font-medium">Tư vấn đúng nhu cầu, không ép gói cao</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0"><Check className="text-accent" /></div>
                  <p className="font-medium">Bàn giao dễ sử dụng, hướng dẫn tận tình</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0"><Check className="text-accent" /></div>
                  <p className="font-medium">Hỗ trợ chỉnh sửa trong thời gian cam kết</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0"><Check className="text-accent" /></div>
                  <p className="font-medium">Đồng hành nếu khách cần vận hành tiếp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Câu hỏi thường gặp</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
              >
                <h4 className="font-bold text-primary mb-2 flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-secondary" />
                  {faq.q}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed pl-8">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA / Contact Form */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-slate-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
            <div className="md:w-2/5 bg-primary p-12 text-white">
              <h2 className="text-3xl font-bold mb-6 italic">Anh/chị muốn làm website phù hợp ngân sách và dễ chốt khách hơn?</h2>
              <p className="text-blue-100 mb-12">
                Để lại thông tin, <span className="font-bold text-accent">Giải pháp 24/7</span> sẽ liên hệ tư vấn ngay trong vòng 30 phút.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 uppercase font-bold mb-1">Hotline / Zalo</p>
                    <p className="text-lg font-bold">0799.600.789</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 uppercase font-bold mb-1">Email</p>
                    <p className="text-lg font-bold">contact@giaiphap247.vn</p>
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
                  <p className="text-slate-600">Cảm ơn bạn đã quan tâm. <span className="font-bold text-primary">Giải pháp 24/7</span> sẽ liên hệ với bạn sớm nhất có thể.</p>
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
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      disabled={formStatus === 'submitting'}
                      className="flex-1 bg-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {formStatus === 'submitting' ? 'Đang gửi...' : 'Nhận tư vấn ngay'}
                      <Send size={20} />
                    </button>
                    <a 
                      href="https://zalo.me/0799600789"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
                    >
                      Liên hệ Zalo
                      <MessageCircle size={20} />
                    </a>
                  </div>
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
              <a href="#" className="text-3xl font-extrabold text-white flex items-center gap-2 mb-6 group">
                <span className="bg-primary text-white p-1 rounded shadow-xl group-hover:bg-secondary transition-colors">GP</span> 
                <span>Giải pháp <span className="text-secondary">24/7</span></span>
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
                  <span>contact@giaiphap247.vn</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-primary" />
                  <span>Sóc Trăng, Việt Nam</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
            <p className="mb-2">© 2024 Giải pháp 24/7. Tất cả quyền được bảo lưu.</p>
            <p>Ứng dụng này được phát triển bởi <span className="text-white font-bold">Giải pháp 24/7</span></p>
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
          title="Gọi điện ngay"
        >
          <Phone size={28} />
        </a>
      </div>
    </div>
  );
}
