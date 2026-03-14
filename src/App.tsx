/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Phone, MessageCircle, Facebook, 
  ShieldCheck, Wrench, Car, Building, Truck, 
  ChevronRight, ArrowRight, Star, Clock, Award,
  CheckCircle2, AlertCircle, Loader2, MapPin,
  Search, ChevronDown, ChevronLeft
} from 'lucide-react';

const SERVICES = [
  {
    id: 'auto-glass',
    title: 'ติดตั้งกระจกรถยนต์',
    description: 'บริการติดตั้งกระจกรถยนต์ทุกรุ่น รถเล็ก รถใหญ่ โดยช่างมืออาชีพประสบการณ์กว่า 10 ปี รับประกันคุณภาพตลอดอายุการใช้งาน',
    icon: Car,
    details: 'เราให้บริการเปลี่ยนและติดตั้งกระจกรถยนต์ทุกชนิด ไม่ว่าจะเป็นกระจกบังลมหน้า กระจกประตู กระจกหูช้าง หรือกระจกบังลมหลัง ด้วยกระจกคุณภาพมาตรฐาน OEM ที่มีความแข็งแรงทนทาน ปลอดภัย พร้อมกาวติดกระจกคุณภาพสูงที่แห้งเร็วและป้องกันน้ำรั่วซึม 100% ดำเนินการโดยทีมช่างผู้เชี่ยวชาญที่ผ่านการอบรมเฉพาะทาง',
    images: [
      'https://picsum.photos/seed/glass1/800/600',
      'https://picsum.photos/seed/glass2/800/600',
      'https://picsum.photos/seed/glass3/800/600'
    ]
  },
  {
    id: 'auto-tint',
    title: 'ติดตั้งฟิล์มกรองแสงรถยนต์',
    description: 'จำหน่ายและติดตั้งฟิล์มกรองแสงยี่ห้อชั้นนำ ในห้องปลอดฝุ่นมาตรฐาน พร้อมบริการดูแลหลังการติดตั้ง',
    icon: ShieldCheck,
    details: 'ปกป้องคุณและรถยนต์จากรังสี UV และความร้อนด้วยฟิล์มกรองแสงคุณภาพสูงจากแบรนด์ชั้นนำระดับโลก เรามีห้องปลอดฝุ่นที่ได้มาตรฐานสำหรับการติดตั้งโดยเฉพาะ เพื่อให้ฟิล์มเรียบเนียน ไร้ฟองอากาศ มีให้เลือกทั้งฟิล์มเซรามิค ฟิล์มคาร์บอน และฟิล์มปรอท พร้อมการรับประกันยาวนานสูงสุดถึง 7-10 ปี',
    images: [
      'https://picsum.photos/seed/tint1/800/600',
      'https://picsum.photos/seed/tint2/800/600',
      'https://picsum.photos/seed/tint3/800/600'
    ]
  },
  {
    id: 'building-tint',
    title: 'ติดตั้งฟิล์มอาคาร',
    description: 'ป้องกันความร้อนและรังสี UV จากแสงแดดที่ส่งผลกระทบต่อการใช้ชีวิต ด้วยฟิล์มติดอาคารคุณภาพสูง',
    icon: Building,
    details: 'ลดอุณหภูมิภายในอาคาร บ้าน หรือสำนักงานของคุณด้วยบริการติดตั้งฟิล์มกรองแสงอาคาร ช่วยประหยัดค่าไฟจากเครื่องปรับอากาศ ลดแสงจ้าที่รบกวนสายตา และปกป้องเฟอร์นิเจอร์จากการซีดจาง เรามีทีมงานประเมินหน้างานและให้คำปรึกษาฟรี เพื่อเลือกฟิล์มที่เหมาะสมที่สุดสำหรับความต้องการของคุณ',
    images: [
      'https://picsum.photos/seed/build1/800/600',
      'https://picsum.photos/seed/build2/800/600',
      'https://picsum.photos/seed/build3/800/600'
    ]
  },
  {
    id: 'glass-repair',
    title: 'ซ่อมรอยร้าวกระจก',
    description: 'บริการซ่อมรอยร้าวกระจกรถยนต์ด้วยเครื่องมือทันสมัย โดยช่างผู้ชำนาญที่ผ่านการอบรมอย่างต่อเนื่อง',
    icon: Wrench,
    details: 'หากกระจกรถยนต์ของคุณมีรอยร้าวขนาดเล็ก (ไม่เกินเหรียญ 10 บาท) ไม่จำเป็นต้องเปลี่ยนกระจกใหม่ทั้งบาน! เรามีบริการซ่อมรอยร้าวด้วยน้ำยาเรซินชนิดพิเศษ นำเข้าจากต่างประเทศ ช่วยประสานรอยร้าวให้กลับมาแข็งแรง ป้องกันไม่ให้รอยร้าวลุกลาม และทำให้รอยจางลงจนแทบมองไม่เห็น ประหยัดเวลาและค่าใช้จ่าย',
    images: [
      'https://picsum.photos/seed/repair1/800/600',
      'https://picsum.photos/seed/repair2/800/600',
      'https://picsum.photos/seed/repair3/800/600'
    ]
  },
  {
    id: 'wholesale',
    title: 'ขายส่งกระจกรถยนต์',
    description: 'จำหน่ายส่งกระจกรถยนต์หลากหลายรุ่น ทุกแบรนด์ พร้อมบริการจัดส่งถึงที่อย่างรวดเร็วและปลอดภัย',
    icon: Truck,
    details: 'สำหรับอู่ซ่อมรถ ศูนย์บริการ หรือร้านกระจกที่ต้องการสั่งซื้อกระจกรถยนต์จำนวนมาก เรามีบริการขายส่งในราคาพิเศษ มีสต็อกสินค้าครอบคลุมรถยนต์แทบทุกรุ่นในตลาด ทั้งรถญี่ปุ่น รถยุโรป และรถบรรทุก พร้อมระบบจัดส่งที่รวดเร็วและปลอดภัยทั่วประเทศ มั่นใจได้ในคุณภาพและราคาที่แข่งขันได้',
    images: [
      'https://picsum.photos/seed/truck1/800/600',
      'https://picsum.photos/seed/truck2/800/600',
      'https://picsum.photos/seed/truck3/800/600'
    ]
  }
];

const NEWS = [
  {
    title: 'ฟิล์มยี่ห้อดังราคาแพงกันร้อนได้ดีกว่าฟิล์มทั่วไปจริงไหม?',
    category: 'FAQ & Knowledge',
    image: 'https://picsum.photos/seed/tint/600/400',
  },
  {
    title: 'ฟิล์มเซรามิค vs ฟิล์มคาร์บอนควรเลือกแบบไหนดี?',
    category: 'Knowledge',
    image: 'https://picsum.photos/seed/ceramic/600/400',
  },
  {
    title: 'กระจกแตก…ซ่อมได้ไหมหรือเปลี่ยนดีกว่า?',
    category: 'Knowledge',
    image: 'https://picsum.photos/seed/glass/600/400',
  }
];

const GALLERY_CATEGORIES = ['ทั้งหมด', 'เปลี่ยนกระจก', 'ติดฟิล์มรถยนต์', 'ฟิล์มอาคาร', 'ซ่อมกระจก'];

const GALLERY_ITEMS = [
  { id: 1, category: 'เปลี่ยนกระจก', image: 'https://picsum.photos/seed/car1/800/600', title: 'Honda Civic - เปลี่ยนกระจกหน้า' },
  { id: 2, category: 'ติดฟิล์มรถยนต์', image: 'https://picsum.photos/seed/tint1/800/600', title: 'Toyota Camry - ฟิล์มเซรามิค' },
  { id: 3, category: 'ฟิล์มอาคาร', image: 'https://picsum.photos/seed/building1/800/600', title: 'Office Building - ฟิล์มกันความร้อน' },
  { id: 4, category: 'ซ่อมกระจก', image: 'https://picsum.photos/seed/repair1/800/600', title: 'Mazda 3 - ซ่อมรอยร้าวหินกระเด็น' },
  { id: 5, category: 'ติดฟิล์มรถยนต์', image: 'https://picsum.photos/seed/tint2/800/600', title: 'BMW Series 5 - ฟิล์มพรีเมียม' },
  { id: 6, category: 'เปลี่ยนกระจก', image: 'https://picsum.photos/seed/car2/800/600', title: 'Isuzu D-Max - กระจกแท้ศูนย์' },
];

const TEAM = [
  {
    name: 'ช่างสมชาย',
    role: 'หัวหน้าทีมช่างเทคนิค',
    experience: 'ประสบการณ์ 15 ปี',
    image: 'https://picsum.photos/seed/tech1/400/400',
  },
  {
    name: 'ช่างวิชัย',
    role: 'ผู้เชี่ยวชาญด้านฟิล์มกรองแสง',
    experience: 'ประสบการณ์ 12 ปี',
    image: 'https://picsum.photos/seed/tech2/400/400',
  },
  {
    name: 'ช่างมานะ',
    role: 'ช่างเทคนิคกระจกรถยนต์',
    experience: 'ประสบการณ์ 10 ปี',
    image: 'https://picsum.photos/seed/tech3/400/400',
  },
];

const TESTIMONIALS = [
  {
    name: 'คุณวิรัช',
    role: 'เจ้าของรถ Honda CR-V',
    comment: 'บริการดีมากครับ ช่างแนะนำดีมาก กระจกแตกจากหินกระเด็น ซ่อมออกมาเนียนมาก แทบมองไม่เห็นรอยเลย ประทับใจครับ',
    rating: 5,
    image: 'https://picsum.photos/seed/user1/100/100',
  },
  {
    name: 'คุณกัญญา',
    role: 'เจ้าของรถ Toyota Fortuner',
    comment: 'มาติดฟิล์มเซรามิคที่นี่ ห้องติดฟิล์มสะอาดมาก งานเนี้ยบ ไม่มีฟองอากาศเลย ขับกลางแดดไม่ร้อนเหมือนเมื่อก่อนแล้วค่ะ',
    rating: 5,
    image: 'https://picsum.photos/seed/user2/100/100',
  },
  {
    name: 'คุณธนพล',
    role: 'เจ้าของบ้านเดี่ยว (หมู่บ้านดัง)',
    comment: 'เรียกใช้บริการติดฟิล์มบ้าน ทีมงานมาประเมินหน้างานเร็วมาก งานติดตั้งเรียบร้อย ช่างสุภาพ แนะนำเพื่อนต่อแน่นอนครับ',
    rating: 5,
    image: 'https://picsum.photos/seed/user3/100/100',
  },
  {
    name: 'คุณเมทินี',
    role: 'เจ้าของรถ Mazda 2',
    comment: 'เปลี่ยนกระจกหน้าใหม่ ช่างทำงานเร็วมากค่ะ ใช้เวลาไม่นานก็ได้รถคืน แถมยังช่วยจัดการเรื่องเคลมประกันให้ด้วย สะดวกมาก',
    rating: 4,
    image: 'https://picsum.photos/seed/user4/100/100',
  },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Auto-play testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, []);
  const [activeFilter, setActiveFilter] = useState('ทั้งหมด');
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'กรุณากรอกชื่อ-นามสกุล';
    if (!formData.phone.trim()) {
      newErrors.phone = 'กรุณากรอกเบอร์โทรศัพท์';
    } else if (!/^[0-9]{9,10}$/.test(formData.phone.replace(/[- ]/g, ''))) {
      newErrors.phone = 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง';
    }
    if (!formData.service) newErrors.service = 'กรุณาเลือกบริการที่สนใจ';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', phone: '', service: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1500);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (selectedService) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        {/* Navigation for Service Detail */}
        <nav className="fixed w-full z-50 bg-white shadow-md py-3 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center cursor-pointer" onClick={() => setSelectedService(null)}>
                <span className="text-2xl font-bold text-brand-blue tracking-tighter">TLH<span className="text-brand-red">AUTOGLASS</span></span>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="flex items-center gap-2 text-slate-600 hover:text-brand-blue font-medium transition-colors"
              >
                <X className="w-5 h-5" /> ปิด
              </button>
            </div>
          </div>
        </nav>

        <div className="pt-24 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button 
              onClick={() => setSelectedService(null)}
              className="inline-flex items-center gap-2 text-brand-blue font-medium hover:text-brand-blue transition-colors mb-8"
            >
              <ChevronRight className="w-5 h-5 rotate-180" /> กลับหน้าหลัก
            </button>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100"
            >
              <div className="h-64 md:h-96 relative">
                <img 
                  src={selectedService.images[0]} 
                  alt={selectedService.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end">
                  <div className="p-8 md:p-12">
                    <div className="w-16 h-16 bg-brand-blue text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <selectedService.icon className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{selectedService.title}</h1>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">รายละเอียดบริการ</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-12">
                  {selectedService.details}
                </p>

                <h3 className="text-xl font-bold text-slate-900 mb-6">ภาพผลงาน</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {selectedService.images.slice(1).map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden aspect-video shadow-sm">
                      <img 
                        src={img} 
                        alt={`${selectedService.title} ${idx + 1}`} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                <div className="bg-brand-blue/5 rounded-2xl p-8 text-center border border-brand-blue/10">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">สนใจบริการนี้?</h3>
                  <p className="text-slate-600 mb-6">ติดต่อเราเพื่อรับคำปรึกษาและประเมินราคาฟรี</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="tel:0947946459" className="inline-flex justify-center items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-blue transition-colors shadow-md">
                      <Phone className="w-5 h-5" /> โทร 094-794-6459
                    </a>
                    <a href="https://lin.ee/EcsC4drZ" target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-2 bg-[#00B900] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#00a000] transition-colors shadow-md">
                      <MessageCircle className="w-5 h-5" /> แอดไลน์ @TLH95
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-md py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-brand-blue tracking-tighter">TLH<span className="text-brand-red">AUTOGLASS</span></span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors">หน้าแรก</a>
              <a href="#services" className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors">บริการของเรา</a>
              <a href="#gallery" className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors">ผลงานของเรา</a>
              <a href="#about" className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors">เกี่ยวกับเรา</a>
              <a href="#news" className="text-sm font-medium text-slate-700 hover:text-brand-blue transition-colors">ข่าวสารความรู้</a>
              <a href="tel:0947946459" className="bg-brand-blue text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-blue transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" />
                094-794-6459
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-700 hover:text-brand-blue focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-4 shadow-lg">
                {/* Mobile Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ค้นหาบริการหรือบทความ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>

                <div className="space-y-1">
                  <a href="#" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-800 hover:bg-brand-blue/5 hover:text-brand-blue rounded-lg transition-colors">หน้าแรก</a>
                  
                  {/* Collapsible Services Menu */}
                  <div>
                    <button 
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-slate-800 hover:bg-brand-blue/5 hover:text-brand-blue rounded-lg transition-colors"
                    >
                      <span>บริการของเรา</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 space-y-1 overflow-hidden"
                        >
                          {SERVICES.map((service) => (
                            <button
                              key={service.id}
                              onClick={() => {
                                setSelectedService(service);
                                setIsMenuOpen(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="block w-full text-left px-3 py-2.5 text-sm text-slate-600 hover:text-brand-blue transition-colors"
                            >
                              {service.title}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <a href="#gallery" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-800 hover:bg-brand-blue/5 hover:text-brand-blue rounded-lg transition-colors">ผลงานของเรา</a>
                  <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-800 hover:bg-brand-blue/5 hover:text-brand-blue rounded-lg transition-colors">เกี่ยวกับเรา</a>
                  <a href="#news" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 text-base font-medium text-slate-800 hover:bg-brand-blue/5 hover:text-brand-blue rounded-lg transition-colors">ข่าวสารความรู้</a>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-3">
                  <a href="tel:0947946459" className="flex items-center justify-center gap-2 w-full bg-brand-blue text-white px-4 py-3 rounded-xl font-medium shadow-md active:scale-95 transition-transform">
                    <Phone className="w-5 h-5" />
                    โทรปรึกษาฟรี
                  </a>
                  <a href="https://lin.ee/EcsC4drZ" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-[#00B900] text-white px-4 py-3 rounded-xl font-medium shadow-md active:scale-95 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                    LINE Official
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/autoglass/1920/1080" 
            alt="Auto Glass Service" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue/80 text-sm font-medium mb-6 backdrop-blur-sm">
              <Award className="w-4 h-4" />
              <span>มาตรฐาน ISO 9001:2015</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              ศูนย์บริการกระจก <br/>
              <span className="text-brand-red">และฟิล์มรถยนต์ครบวงจร</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl leading-relaxed">
              ซ่อมกระจกรถยนต์ ติดฟิล์มรถยนต์ ฟิล์มบ้าน และฟิล์มอาคาร โดยทีมช่างมืออาชีพ พร้อมรับเคลมประกันกว่า 40 บริษัทชั้นนำ
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:0947946459" className="inline-flex justify-center items-center gap-2 bg-brand-blue hover:bg-brand-blue text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-brand-blue/30">
                <Phone className="w-5 h-5" />
                โทรสอบถามราคา
              </a>
              <a href="https://lin.ee/EcsC4drZ" target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-lg transition-all backdrop-blur-sm">
                <MessageCircle className="w-5 h-5" />
                ปรึกษาผ่าน LINE
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats / Trust Bar */}
      <section className="bg-white border-b border-slate-200 py-8 relative z-20 -mt-8 mx-4 md:mx-auto max-w-5xl rounded-2xl shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          <div className="text-center">
            <div className="flex justify-center mb-2 text-brand-blue"><Clock className="w-8 h-8" /></div>
            <div className="text-2xl font-bold text-slate-800">10+</div>
            <div className="text-sm text-slate-500 font-medium">ปีแห่งประสบการณ์</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2 text-brand-blue"><ShieldCheck className="w-8 h-8" /></div>
            <div className="text-2xl font-bold text-slate-800">40+</div>
            <div className="text-sm text-slate-500 font-medium">บริษัทประกันภัยที่รองรับ</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2 text-brand-blue"><Star className="w-8 h-8" /></div>
            <div className="text-2xl font-bold text-slate-800">100%</div>
            <div className="text-sm text-slate-500 font-medium">รับประกันผลงาน</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2 text-brand-blue"><Award className="w-8 h-8" /></div>
            <div className="text-2xl font-bold text-slate-800">ISO</div>
            <div className="text-sm text-slate-500 font-medium">9001:2015</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">บริการของเรา</h2>
            <div className="w-20 h-1.5 bg-brand-blue mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600">
              ให้บริการครบวงจรเรื่องกระจกและฟิล์มกรองแสง ด้วยมาตรฐานระดับสากล
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-blue/10 transition-all group"
              >
                <div className="w-14 h-14 bg-brand-blue/5 text-brand-blue rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <button 
                  onClick={() => {
                    setSelectedService(service);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center text-brand-blue font-medium hover:text-brand-blue transition-colors"
                >
                  ดูรายละเอียด <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">กว่า 10 ปีที่เราดูแลคุณด้วยความจริงใจ</h2>
              <div className="w-20 h-1.5 bg-brand-blue rounded-full mb-8"></div>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                TLH Autoglass เริ่มต้นจากการเป็นร้านกระจกเล็กๆ ที่มีความมุ่งมั่นในการส่งมอบบริการที่มีคุณภาพและปลอดภัยที่สุดให้กับลูกค้า 
                ด้วยประสบการณ์ที่สั่งสมมานานกว่าทศวรรษ เราได้พัฒนามาตรฐานการทำงานจนได้รับรอง ISO 9001:2015
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                พันธกิจของเราคือการเป็นศูนย์บริการกระจกและฟิล์มกรองแสงอันดับหนึ่งที่ลูกค้าไว้วางใจ 
                โดยเน้นการใช้วัสดุคุณภาพสูง เครื่องมือที่ทันสมัย และทีมช่างที่เชี่ยวชาญเฉพาะด้าน
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-brand-blue/5 rounded-2xl border border-brand-blue/10">
                  <div className="text-2xl font-bold text-brand-blue mb-1">วิสัยทัศน์</div>
                  <div className="text-sm text-slate-600">มุ่งสู่ความเป็นเลิศด้านบริการกระจกและฟิล์มกรองแสงระดับสากล</div>
                </div>
                <div className="p-4 bg-brand-red/5 rounded-2xl border border-brand-red/10">
                  <div className="text-2xl font-bold text-brand-red mb-1">เป้าหมาย</div>
                  <div className="text-sm text-slate-600">สร้างความพึงพอใจสูงสุดและความปลอดภัยให้กับผู้ใช้รถทุกคน</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/workshop/800/800" 
                  alt="Our Workshop" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-brand-blue text-white p-8 rounded-3xl shadow-xl hidden md:block">
                <div className="text-4xl font-bold mb-1">10,000+</div>
                <div className="text-brand-blue/20">คันที่ผ่านการดูแลจากเรา</div>
              </div>
            </motion.div>
          </div>

          <div className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">ทีมช่างผู้เชี่ยวชาญ</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              ทีมงานของเราประกอบด้วยช่างเทคนิคที่ผ่านการฝึกอบรมอย่างเข้มข้น มีความชำนาญเฉพาะทาง 
              เพื่อให้มั่นใจว่ารถทุกคันจะได้รับการดูแลอย่างดีที่สุด
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 group hover:shadow-xl transition-all"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h4>
                  <div className="text-brand-blue font-medium text-sm mb-3">{member.role}</div>
                  <div className="text-slate-500 text-sm">{member.experience}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">ผลงานของเรา</h2>
            <div className="w-20 h-1.5 bg-brand-blue mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600">
              รวมผลงานการติดตั้งกระจกและฟิล์มกรองแสงจากช่างผู้เชี่ยวชาญของเรา
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {GALLERY_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === category
                    ? 'bg-brand-blue text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {GALLERY_ITEMS.filter(item => activeFilter === 'ทั้งหมด' || item.category === activeFilter).map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-sm hover:shadow-xl"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-brand-blue/60 text-sm font-bold mb-1">{item.category}</span>
                    <h3 className="text-white text-lg font-medium">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">รับเคลมประกันกว่า 40 บริษัทชั้นนำ</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                เราเป็นอู่ในเครือของบริษัทประกันภัยชั้นนำมากมาย ทำให้คุณสามารถนำรถเข้ารับบริการเคลมกระจกได้ง่าย สะดวก และรวดเร็ว โดยไม่ต้องสำรองจ่าย (ตามเงื่อนไขกรมธรรม์)
              </p>
              <ul className="space-y-4 mb-8">
                {['บริการรวดเร็ว ทันใจ', 'ไม่ต้องสำรองจ่าย', 'รับประกันงานติดตั้ง', 'ดูแลเอกสารให้ครบถ้วน'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue/60">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
              <a href="tel:0947946459" className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red text-white px-6 py-3 rounded-xl font-bold transition-colors">
                ตรวจสอบบริษัทประกัน <ChevronRight className="w-5 h-5" />
              </a>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {/* Placeholder for insurance logos */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl aspect-video flex items-center justify-center p-4 hover:bg-white/10 transition-colors">
                    <div className="w-full h-full bg-white/20 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">เสียงตอบรับจากลูกค้า</h2>
            <div className="w-20 h-1.5 bg-brand-blue mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600">
              ความพึงพอใจของลูกค้าคือหัวใจสำคัญของการบริการของเรา
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden px-4 py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="bg-slate-50 p-10 md:p-16 rounded-[3rem] border border-slate-100 shadow-xl relative"
                >
                  <div className="absolute top-10 right-10 opacity-10">
                    <MessageCircle className="w-24 h-24 text-brand-blue" />
                  </div>
                  
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-6 h-6 ${i < TESTIMONIALS[testimonialIndex].rating ? 'text-brand-red fill-brand-red' : 'text-slate-300'}`} 
                      />
                    ))}
                  </div>

                  <blockquote className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-12 italic">
                    "{TESTIMONIALS[testimonialIndex].comment}"
                  </blockquote>

                  <div className="flex items-center gap-6 pt-8 border-t border-slate-200">
                    <img 
                      src={TESTIMONIALS[testimonialIndex].image} 
                      alt={TESTIMONIALS[testimonialIndex].name} 
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-lg">{TESTIMONIALS[testimonialIndex].name}</div>
                      <div className="text-brand-blue font-medium">{TESTIMONIALS[testimonialIndex].role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center items-center gap-6 mt-12">
              <button
                onClick={() => setTestimonialIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
                className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all shadow-sm"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex gap-3">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      testimonialIndex === i ? 'bg-brand-blue w-8' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setTestimonialIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
                className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all shadow-sm"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 md:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">ข่าวสารความรู้ ที่คุณควรรู้</h2>
              <div className="w-20 h-1.5 bg-brand-blue rounded-full"></div>
            </div>
            <a href="#" className="inline-flex items-center text-brand-blue font-medium hover:text-brand-blue transition-colors">
              ดูบทความทั้งหมด <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-brand-blue transition-colors">
                    {item.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <a href="#" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-brand-blue transition-colors">
                      อ่านต่อ <ChevronRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">ติดต่อสอบถาม / ประเมินราคา</h2>
              <div className="w-20 h-1.5 bg-brand-blue rounded-full mb-8"></div>
              <p className="text-lg text-slate-600 mb-10">
                ทีมงานผู้เชี่ยวชาญของเราพร้อมให้คำแนะนำและประเมินราคาเบื้องต้นฟรี ไม่มีค่าใช้จ่าย ติดต่อเราได้ตามช่องทางด้านล่าง หรือกรอกแบบฟอร์มเพื่อให้เราติดต่อกลับ
              </p>
              
              <div className="space-y-6">
                <a href="tel:0947946459" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-brand-blue/5 transition-colors group">
                  <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">เบอร์โทรศัพท์</div>
                    <div className="text-lg font-bold text-slate-900">094-794-6459</div>
                  </div>
                </a>
                
                <a href="https://lin.ee/EcsC4drZ" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-[#e5f7e5] transition-colors group">
                  <div className="w-12 h-12 bg-[#e5f7e5] text-[#00B900] rounded-full flex items-center justify-center group-hover:bg-[#00B900] group-hover:text-white transition-colors">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">LINE Official</div>
                    <div className="text-lg font-bold text-slate-900">@TLH95</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
                  <div className="w-12 h-12 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500 mb-1">ที่ตั้งศูนย์บริการ</div>
                    <div className="text-base font-medium text-slate-900">กรุงเทพมหานครและปริมณฑล (มีบริการนอกสถานที่)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-full -z-10"></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">ส่งข้อความถึงเรา</h3>
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-green-800 mb-2">ส่งข้อความสำเร็จ!</h4>
                    <p className="text-green-700">
                      ขอบคุณที่ให้ความสนใจบริการของเรา ทีมงานจะรีบติดต่อกลับไปยังเบอร์โทรศัพท์ที่คุณระบุไว้โดยเร็วที่สุด
                    </p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
                    >
                      ส่งข้อความใหม่
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">ชื่อ-นามสกุล <span className="text-brand-red">*</span></label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-brand-red/30 focus:ring-brand-red focus:border-brand-red bg-brand-red/5' : 'border-slate-200 focus:ring-brand-blue focus:border-brand-blue bg-slate-50'} focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="เช่น สมชาย ใจดี"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-sm text-brand-red flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">เบอร์โทรศัพท์ <span className="text-brand-red">*</span></label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-brand-red/30 focus:ring-brand-red focus:border-brand-red bg-brand-red/5' : 'border-slate-200 focus:ring-brand-blue focus:border-brand-blue bg-slate-50'} focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="เช่น 0812345678"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-sm text-brand-red flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-slate-700 mb-1">บริการที่สนใจ <span className="text-brand-red">*</span></label>
                      <select 
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.service ? 'border-brand-red/30 focus:ring-brand-red focus:border-brand-red bg-brand-red/5' : 'border-slate-200 focus:ring-brand-blue focus:border-brand-blue bg-slate-50'} focus:outline-none focus:ring-2 transition-colors appearance-none`}
                      >
                        <option value="">-- เลือกบริการ --</option>
                        <option value="เปลี่ยนกระจกรถยนต์">เปลี่ยนกระจกรถยนต์</option>
                        <option value="ซ่อมรอยร้าวกระจก">ซ่อมรอยร้าวกระจก</option>
                        <option value="ติดฟิล์มกรองแสงรถยนต์">ติดฟิล์มกรองแสงรถยนต์</option>
                        <option value="ติดฟิล์มอาคาร">ติดฟิล์มอาคาร</option>
                        <option value="สอบถามเรื่องเคลมประกัน">สอบถามเรื่องเคลมประกัน</option>
                        <option value="อื่นๆ">อื่นๆ</option>
                      </select>
                      {errors.service && (
                        <p className="mt-1.5 text-sm text-brand-red flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.service}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">ข้อความเพิ่มเติม (ถ้ามี)</label>
                      <textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition-colors resize-none"
                        placeholder="ระบุรุ่นรถ หรือรายละเอียดเพิ่มเติม"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-brand-blue text-white py-3.5 rounded-xl font-bold text-lg hover:bg-brand-blue transition-colors shadow-lg shadow-brand-blue/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          กำลังส่งข้อมูล...
                        </>
                      ) : (
                        'ส่งข้อมูลติดต่อกลับ'
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold text-white tracking-tighter mb-6">TLH<span className="text-brand-red">AUTOGLASS</span></div>
              <p className="mb-6 text-sm leading-relaxed">
                ศูนย์บริการกระจกรถยนต์ ติดฟิล์มรถยนต์ ฟิล์มบ้าน และฟิล์มอาคาร ครบวงจร โดยทีมช่างมืออาชีพ มาตรฐาน ISO 9001:2015
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/TLH95" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://lin.ee/EcsC4drZ" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#00B900] hover:text-white transition-all">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">บริการของเรา</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-brand-blue transition-colors">ติดตั้งกระจกรถยนต์</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">ติดตั้งฟิล์มกรองแสงรถยนต์</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">ติดตั้งฟิล์มอาคาร</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">ซ่อมรอยร้าวกระจก</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">ขายส่งกระจกรถยนต์</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">เมนูลัด</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-brand-blue transition-colors">เกี่ยวกับเรา</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">ข่าวสารความรู้</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">รายชื่อบริษัทประกันภัย</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">ผลงานของเรา</a></li>
                <li><a href="#" className="hover:text-brand-blue transition-colors">นโยบายความเป็นส่วนตัว</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">ติดต่อเรา</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-blue shrink-0" />
                  <div>
                    <div className="font-medium text-white mb-1">Call Center</div>
                    <a href="tel:0947946459" className="hover:text-brand-blue/60 transition-colors">094-794-6459</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-brand-blue shrink-0" />
                  <div>
                    <div className="font-medium text-white mb-1">Line Official</div>
                    <a href="https://lin.ee/EcsC4drZ" target="_blank" rel="noreferrer" className="hover:text-brand-blue/60 transition-colors">@TLH95</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-sm text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} TLH AUTOGLASS. All rights reserved.</p>
            <p>Designed with modern web technologies.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
