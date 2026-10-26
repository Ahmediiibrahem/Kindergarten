// js/data.js
const DEMO_USER = 'fatima';
const DEMO_PASS = '02082000';

const childrenByClass = {
  'البراعم': [
    {
      id: 'c1',
      name: 'آدم محمد',
      years: 3,
      months: 4,
      avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80',
      allergy: 'لا يوجد',
      guardian: 'منى حسن (الأم)'
    },
    {
      id: 'c2',
      name: 'ليلى أحمد',
      years: 3,
      months: 8,
      avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=150&auto=format&fit=crop&q=80',
      allergy: 'البيض',
      guardian: 'سامي أحمد (الأب)'
    },
    {
      id: 'c3',
      name: 'يوسف علي',
      years: 4,
      months: 1,
      avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80',
      allergy: 'لا يوجد',
      guardian: 'هبة علي (الأم)'
    },
    {
      id: 'c4',
      name: 'مريم خالد',
      years: 3,
      months: 10,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      allergy: 'الفول السوداني',
      guardian: 'خالد محمود (الأب)'
    },
    {
      id: 'c5',
      name: 'عمر حسن',
      years: 4,
      months: 2,
      avatar: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=150&auto=format&fit=crop&q=80',
      allergy: 'الحليب',
      guardian: 'سارة حسن (الأم)'
    },
    {
      id: 'c6',
      name: 'سلمى محمود',
      years: 3,
      months: 2,
      avatar: 'https://images.unsplash.com/photo-1595454223600-91fbdd9691bf?w=150&auto=format&fit=crop&q=80',
      allergy: 'لا يوجد',
      guardian: 'محمود سامي (الأب)'
    }
  ],
  'النجوم': [
    {
      id: 'c7',
      name: 'سيف أحمد',
      years: 5,
      months: 1,
      avatar: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&auto=format&fit=crop&q=80',
      allergy: 'لا يوجد',
      guardian: 'أحمد سيف (الأب)'
    },
    {
      id: 'c8',
      name: 'دانة علي',
      years: 5,
      months: 3,
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      allergy: 'البيض',
      guardian: 'علي محمد (الأب)'
    }
  ],
  'الفراشات': [
    {
      id: 'c9',
      name: 'تيم خالد',
      years: 2,
      months: 4,
      avatar: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?w=150&auto=format&fit=crop&q=80',
      allergy: 'لا يوجد',
      guardian: 'خالد تيم (الأب)'
    },
    {
      id: 'c10',
      name: 'ريم سامي',
      years: 2,
      months: 9,
      avatar: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=150&auto=format&fit=crop&q=80',
      allergy: 'الحليب',
      guardian: 'منى سامي (الأم)'
    }
  ]
};

const activityOptions = [
  { id: 'meal', emoji: '🍎', label: 'يتناول الوجبة الآن' },
  { id: 'water', emoji: '🥤', label: 'يشرب الماء الآن' },
  { id: 'lesson', emoji: '📚', label: 'يشارك في الدرس الآن' },
  { id: 'play', emoji: '🧩', label: 'يلعب الآن' },
  { id: 'art', emoji: '🎨', label: 'يمارس نشاطاً فنياً الآن' },
  { id: 'bathroom', emoji: '🚻', label: 'في الحمام الآن' },
  { id: 'nap', emoji: '😴', label: 'وقت القيلولة الآن' },
  { id: 'outdoor', emoji: '🌳', label: 'في النشاط الخارجي الآن' },
  { id: 'done', emoji: '⭐', label: 'أنهى النشاط بنجاح' }
];