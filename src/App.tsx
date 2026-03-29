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

const categories = ['Tất cả', 'Bất động sản', 'Thời trang', 'Nội thất', 'Ẩm thực', 'Giáo dục', 'Dịch vụ'];

const templates = [
  // Bất động sản
  { id: 1, category: 'Bất động sản', title: 'Bất động sản Cao cấp', desc: 'Tối ưu hiển thị dự án, tích hợp bản đồ và form đăng ký tư vấn chuyên sâu.', image: 'https://picsum.photos/seed/re1/1200/800', features: ['Quản lý giỏ hàng', 'Tìm kiếm thông minh', 'Tích hợp Google Maps', 'Landing page dự án'] },
  { id: 7, category: 'Bất động sản', title: 'Sàn giao dịch căn hộ', desc: 'Giao diện hiện đại cho các sàn phân phối chung cư, căn hộ cao cấp.', image: 'https://picsum.photos/seed/re2/1200/800', features: ['Lọc theo diện tích', 'Tính toán khoản vay', 'So sánh dự án', 'VR 360 Tour'] },
  { id: 8, category: 'Bất động sản', title: 'Dự án nghỉ dưỡng & Villa', desc: 'Tôn vinh vẻ đẹp không gian sống thượng lưu với hình ảnh tràn viền.', image: 'https://picsum.photos/seed/re3/1200/800', features: ['Thư viện ảnh 4K', 'Đặt lịch tham quan', 'Tiện ích dự án', 'Video giới thiệu'] },
  { id: 9, category: 'Bất động sản', title: 'Website môi giới cá nhân', desc: 'Xây dựng thương hiệu cá nhân chuyên nghiệp cho chuyên viên tư vấn.', image: 'https://picsum.photos/seed/re4/1200/800', features: ['Blog tin tức', 'Review dự án', 'Nút gọi điện nhanh', 'Form thu thập lead'] },
  { id: 10, category: 'Bất động sản', title: 'Quản lý cho thuê văn phòng', desc: 'Chuyên biệt cho dịch vụ cho thuê mặt bằng, văn phòng chia sẻ.', image: 'https://picsum.photos/seed/re5/1200/800', features: ['Sơ đồ mặt bằng', 'Bảng giá thuê', 'Quản lý hợp đồng', 'Tư vấn setup'] },
  { id: 11, category: 'Bất động sản', title: 'Dự án đất nền & Phân lô', desc: 'Giao diện trực quan cho các dự án đất nền tỉnh, pháp lý minh bạch.', image: 'https://picsum.photos/seed/re6/1200/800', features: ['Bản đồ phân lô', 'Tiến độ pháp lý', 'Cập nhật hạ tầng', 'Hỗ trợ vay vốn'] },

  // Thời trang
  { id: 2, category: 'Thời trang', title: 'Fashion Store Hiện đại', desc: 'Trải nghiệm mua sắm mượt mà, tập trung vào hình ảnh sản phẩm.', image: 'https://picsum.photos/seed/fa1/1200/800', features: ['Bộ lọc sản phẩm', 'Giỏ hàng thông minh', 'Tích hợp thanh toán', 'Lookbook nghệ thuật'] },
  { id: 12, category: 'Thời trang', title: 'Local Brand Streetwear', desc: 'Phong cách cá tính, trẻ trung dành cho các thương hiệu thời trang nội địa.', image: 'https://picsum.photos/seed/fa2/1200/800', features: ['Countdown mở bán', 'Review khách hàng', 'Tích điểm thành viên', 'Instagram Feed'] },
  { id: 13, category: 'Thời trang', title: 'Shop Giày dép & Phụ kiện', desc: 'Bố cục lưới tinh tế, làm nổi bật chi tiết và chất liệu sản phẩm.', image: 'https://picsum.photos/seed/fa3/1200/800', features: ['Lọc theo size/màu', 'Bảng quy đổi size', 'Sản phẩm liên quan', 'Mua kèm deal sốc'] },
  { id: 14, category: 'Thời trang', title: 'Thời trang Trẻ em (Kids)', desc: 'Màu sắc sinh động, giao diện thân thiện giúp mẹ dễ dàng chọn đồ cho bé.', image: 'https://picsum.photos/seed/fa4/1200/800', features: ['Lọc theo độ tuổi', 'Combo tiết kiệm', 'Chính sách đổi trả', 'Blog nuôi dạy con'] },
  { id: 15, category: 'Thời trang', title: 'Đồ thể thao & Gymwear', desc: 'Mạnh mẽ, năng động, tối ưu cho việc hiển thị tính năng vải và form dáng.', image: 'https://picsum.photos/seed/fa5/1200/800', features: ['Video sản phẩm', 'Hướng dẫn tập luyện', 'Tư vấn chọn size', 'Feedback thực tế'] },
  { id: 16, category: 'Thời trang', title: 'Trang sức & Phụ kiện cao cấp', desc: 'Sang trọng, tối giản, tập trung vào độ sắc nét và lấp lánh của sản phẩm.', image: 'https://picsum.photos/seed/fa6/1200/800', features: ['Zoom ảnh chi tiết', 'Chứng thư kiểm định', 'Quà tặng kèm', 'Giao hàng hỏa tốc'] },

  // Nội thất
  { id: 3, category: 'Nội thất', title: 'Nội thất Sang trọng', desc: 'Phong cách tối giản, tôn vinh vẻ đẹp không gian và chi tiết sản phẩm.', image: 'https://picsum.photos/seed/in1/1200/800', features: ['Thư viện ảnh 360', 'Danh mục sản phẩm', 'Tư vấn thiết kế', 'Blog xu hướng'] },
  { id: 17, category: 'Nội thất', title: 'Xưởng mộc & Đồ gỗ tự nhiên', desc: 'Mộc mạc, uy tín, tập trung vào quy trình sản xuất và chất lượng gỗ.', image: 'https://picsum.photos/seed/in2/1200/800', features: ['Quy trình sản xuất', 'Bảo hành dài hạn', 'Mẫu gỗ thực tế', 'Dự án đã thi công'] },
  { id: 18, category: 'Nội thất', title: 'Thiết kế thi công trọn gói', desc: 'Giao diện chuyên nghiệp cho các công ty kiến trúc và decor.', image: 'https://picsum.photos/seed/in3/1200/800', features: ['Báo giá nhanh', 'Quy trình làm việc', 'Đội ngũ kiến trúc sư', 'Công trình thực tế'] },
  { id: 19, category: 'Nội thất', title: 'Đồ gia dụng thông minh', desc: 'Hiện đại, công nghệ, tối ưu cho các sản phẩm nội thất đa năng.', image: 'https://picsum.photos/seed/in4/1200/800', features: ['Video hướng dẫn', 'Thông số kỹ thuật', 'So sánh tính năng', 'Đánh giá chuyên gia'] },
  { id: 20, category: 'Nội thất', title: 'Rèm cửa & Giấy dán tường', desc: 'Trực quan, dễ chọn mẫu với hệ thống phân loại màu sắc và họa tiết.', image: 'https://picsum.photos/seed/in5/1200/800', features: ['Tính toán mét vuông', 'Mẫu vải thực tế', 'Tư vấn tại nhà', 'Hình ảnh thực tế'] },
  { id: 21, category: 'Nội thất', title: 'Đèn trang trí & Decor', desc: 'Lung linh, nghệ thuật, tập trung vào hiệu ứng ánh sáng trong không gian.', image: 'https://picsum.photos/seed/in6/1200/800', features: ['Phối cảnh ánh sáng', 'Combo trang trí', 'Hướng dẫn lắp đặt', 'Đổi trả 7 ngày'] },

  // Ẩm thực
  { id: 4, category: 'Ẩm thực', title: 'Nhà hàng & Quán Cafe', desc: 'Menu trực quan, tích hợp đặt bàn và đặt món online nhanh chóng.', image: 'https://picsum.photos/seed/fo1/1200/800', features: ['Menu điện tử', 'Đặt bàn trực tuyến', 'Đánh giá khách hàng', 'Tích hợp giao hàng'] },
  { id: 22, category: 'Ẩm thực', title: 'Tiệm Bánh & Trà sữa', desc: 'Ngọt ngào, bắt mắt, kích thích vị giác ngay từ cái nhìn đầu tiên.', image: 'https://picsum.photos/seed/fo2/1200/800', features: ['Topping tùy chọn', 'Giao hàng nhanh', 'Khuyến mãi giờ vàng', 'Feedback hình ảnh'] },
  { id: 23, category: 'Ẩm thực', title: 'Quán Nhậu & Beer Club', desc: 'Sôi động, menu đa dạng, tập trung vào không gian và các món đặc sản.', image: 'https://picsum.photos/seed/fo3/1200/800', features: ['Đặt tiệc nhóm', 'Sơ đồ bàn', 'Chương trình ca nhạc', 'Ưu đãi sinh nhật'] },
  { id: 24, category: 'Ẩm thực', title: 'Đồ ăn nhanh & Delivery', desc: 'Tối ưu tốc độ đặt hàng và thanh toán trên thiết bị di động.', image: 'https://picsum.photos/seed/fo4/1200/800', features: ['Theo dõi đơn hàng', 'Mã giảm giá', 'Thanh toán ví điện tử', 'Combo giá rẻ'] },
  { id: 25, category: 'Ẩm thực', title: 'Thực phẩm sạch & Organic', desc: 'Xanh, sạch, tin cậy, tập trung vào nguồn gốc và quy trình kiểm định.', image: 'https://picsum.photos/seed/fo5/1200/800', features: ['Truy xuất nguồn gốc', 'Chứng chỉ an toàn', 'Gói đi chợ tuần', 'Công thức nấu ăn'] },
  { id: 26, category: 'Ẩm thực', title: 'Buffet & Tiệc cưới', desc: 'Hoành tráng, chuyên nghiệp, hỗ trợ quản lý số lượng khách lớn.', image: 'https://picsum.photos/seed/fo6/1200/800', features: ['Sảnh tiệc 360', 'Thực đơn theo set', 'Quản lý sự kiện', 'Báo giá trọn gói'] },

  // Giáo dục
  { id: 5, category: 'Giáo dục', title: 'Trung tâm & Khóa học', desc: 'Quản lý khóa học, giảng viên và hệ thống đăng ký học trực tuyến.', image: 'https://picsum.photos/seed/ed1/1200/800', features: ['Lịch học trực tuyến', 'Quản lý học viên', 'Giới thiệu giảng viên', 'Thanh toán học phí'] },
  { id: 27, category: 'Giáo dục', title: 'Trường mầm non tư thục', desc: 'Thân thiện, an tâm, tập trung vào cơ sở vật chất và chế độ dinh dưỡng.', image: 'https://picsum.photos/seed/ed2/1200/800', features: ['Thực đơn hàng tuần', 'Camera trực tuyến', 'Hoạt động ngoại khóa', 'Góc phụ huynh'] },
  { id: 28, category: 'Giáo dục', title: 'Trung tâm Ngoại ngữ', desc: 'Hiện đại, chuyên nghiệp, tích hợp thi thử và kiểm tra trình độ.', image: 'https://picsum.photos/seed/ed3/1200/800', features: ['Thi thử online', 'Lộ trình học tập', 'Đội ngũ GV bản ngữ', 'Cam kết đầu ra'] },
  { id: 29, category: 'Giáo dục', title: 'Đào tạo kỹ năng mềm', desc: 'Giao diện truyền cảm hứng, tập trung vào giá trị nhận được sau khóa học.', image: 'https://picsum.photos/seed/ed4/1200/800', features: ['Video bài giảng', 'Cộng đồng học viên', 'Chứng chỉ hoàn thành', 'Hỗ trợ sau học'] },
  { id: 30, category: 'Giáo dục', title: 'Du học & Định cư', desc: 'Uy tín, thông tin đầy đủ về các quốc gia và quy trình làm hồ sơ.', image: 'https://picsum.photos/seed/ed5/1200/800', features: ['Cẩm nang du học', 'Săn học bổng', 'Tư vấn visa', 'Câu chuyện thành công'] },
  { id: 31, category: 'Giáo dục', title: 'Luyện thi đại học online', desc: 'Tối ưu cho việc học tập và làm bài tập ngay trên website.', image: 'https://picsum.photos/seed/ed6/1200/800', features: ['Ngân hàng câu hỏi', 'Xếp hạng học tập', 'Giải đáp 24/7', 'Tài liệu miễn phí'] },

  // Dịch vụ
  { id: 6, category: 'Dịch vụ', title: 'Dịch vụ Chuyên nghiệp', desc: 'Phù hợp cho các công ty tư vấn, spa, hoặc dịch vụ kỹ thuật.', image: 'https://picsum.photos/seed/se1/1200/800', features: ['Bảng giá dịch vụ', 'Đội ngũ chuyên gia', 'Quy trình làm việc', 'Form báo giá nhanh'] },
  { id: 32, category: 'Dịch vụ', title: 'Spa & Thẩm mỹ viện', desc: 'Thư giãn, sang trọng, tích hợp đặt lịch hẹn và quản lý liệu trình.', image: 'https://picsum.photos/seed/se2/1200/800', features: ['Đặt lịch online', 'Gói liệu trình', 'Review kết quả', 'Chat tư vấn'] },
  { id: 33, category: 'Dịch vụ', title: 'Studio Ảnh cưới', desc: 'Nghệ thuật, cảm xúc, tôn vinh những khoảnh khắc hạnh phúc.', image: 'https://picsum.photos/seed/se3/1200/800', features: ['Album ảnh mẫu', 'Bảng giá chụp', 'Lịch trống', 'Quy trình phục vụ'] },
  { id: 34, category: 'Dịch vụ', title: 'Vận tải & Logistics', desc: 'Mạnh mẽ, tin cậy, tích hợp tra cứu vận đơn và báo giá vận chuyển.', image: 'https://picsum.photos/seed/se4/1200/800', features: ['Tra cứu đơn hàng', 'Tính cước phí', 'Mạng lưới bưu cục', 'Tuyển dụng tài xế'] },
  { id: 35, category: 'Dịch vụ', title: 'Sửa chữa Điện lạnh/Ô tô', desc: 'Rõ ràng, minh bạch, tập trung vào bảng giá và cam kết chất lượng.', image: 'https://picsum.photos/seed/se5/1200/800', features: ['Bảng giá linh kiện', 'Đặt lịch sửa chữa', 'Bảo hành điện tử', 'Cứu hộ 24/7'] },
  { id: 36, category: 'Dịch vụ', title: 'Luật sư & Tư vấn Pháp lý', desc: 'Nghiêm túc, uy tín, cung cấp kiến thức pháp luật và dịch vụ tư vấn.', image: 'https://picsum.photos/seed/se6/1200/800', features: ['Hỏi đáp pháp luật', 'Lĩnh vực tư vấn', 'Hồ sơ năng lực', 'Đặt lịch hẹn'] },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', note: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const filteredTemplates = activeCategory === 'Tất cả' 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

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
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Kho giao diện website mẫu đẳng cấp</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto mb-10">Khám phá các mẫu website được tối ưu riêng cho từng ngành nghề, giúp bạn bứt phá doanh thu ngay hôm nay.</p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-primary text-white shadow-lg scale-105' 
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredTemplates.map((template) => (
                <motion.div 
                  layout
                  key={template.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  className="rounded-2xl overflow-hidden shadow-lg bg-white group cursor-pointer border border-slate-100"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img 
                      src={template.image} 
                      alt={template.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-white text-primary px-8 py-3 rounded-full font-bold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        Xem mẫu thực tế
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                        {template.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-secondary transition-colors">{template.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 font-light">{template.desc}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Template Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/90 backdrop-blur-md"
            onClick={() => setSelectedTemplate(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-6 right-6 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                onClick={() => setSelectedTemplate(null)}
              >
                <X size={24} className="text-primary" />
              </button>

              <div className="md:w-2/3 bg-slate-100 overflow-y-auto custom-scrollbar">
                <img 
                  src={selectedTemplate.image} 
                  alt={selectedTemplate.title} 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:w-1/3 p-8 md:p-12 flex flex-col justify-between bg-white">
                <div>
                  <span className="inline-block bg-accent/10 text-accent px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                    Mẫu website {selectedTemplate.category}
                  </span>
                  <h2 className="text-3xl font-bold text-primary mb-6 leading-tight">{selectedTemplate.title}</h2>
                  <p className="text-slate-600 mb-8 leading-relaxed font-light">
                    {selectedTemplate.desc}
                  </p>
                  
                  <div className="space-y-4 mb-10">
                    <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400">Tính năng nổi bật:</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedTemplate.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-slate-700">
                          <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                            <Check size={12} />
                          </div>
                          <span className="text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <a 
                    href="#contact" 
                    onClick={() => setSelectedTemplate(null)}
                    className="block w-full bg-primary text-white text-center py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                  >
                    Tư vấn triển khai mẫu này
                  </a>
                  <p className="text-center text-xs text-slate-400">
                    * Giao diện có thể tùy chỉnh 100% theo yêu cầu của bạn
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
