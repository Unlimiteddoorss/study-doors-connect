
import { Program } from '../components/programs/ProgramCard';

// Sample program data
export const dummyPrograms: Program[] = [
  {
    id: 1,
    title: 'بكالوريوس إدارة الأعمال',
    university: 'جامعة أوزيجين',
    location: 'Turkey، إسطنبول',
    language: 'الإنجليزية',
    duration: '4 سنوات',
    deadline: '15 أغسطس 2025',
    fee: '$13,000 / سنة',
    discount: '$12,350',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
    isFeatured: true,
    badges: ['إدارة أعمال', 'الأكثر طلباً'],
    scholarshipAvailable: true
  },
  {
    id: 2,
    title: 'ماجستير علوم الحاسوب',
    university: 'جامعة فاتح سلطان محمد',
    location: 'Turkey، إسطنبول',
    language: 'الإنجليزية',
    duration: 'سنتان',
    deadline: '1 يوليو 2025',
    fee: '$15,000 / سنة',
    discount: '$14,250',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    badges: ['علوم الحاسوب', 'برنامج معتمد']
  },
  {
    id: 3,
    title: 'دكتوراه الهندسة المدنية',
    university: 'جامعة المجر للتكنولوجيا',
    location: 'Hungary، بودابست',
    language: 'الإنجليزية',
    duration: '4 سنوات',
    deadline: '15 سبتمبر 2025',
    fee: '$18,000 / سنة',
    discount: '$17,100',
    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    scholarshipAvailable: true,
    badges: ['هندسة مدنية', 'برنامج بحثي']
  },
  {
    id: 4,
    title: 'بكالوريوس الاقتصاد',
    university: 'جامعة أوزيجين',
    location: 'Turkey، إسطنبول',
    language: 'الإنجليزية',
    duration: '4 سنوات',
    deadline: '15 أغسطس 2025',
    fee: '$12,500 / سنة',
    discount: '$12,000',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop&ixlib=rb-4.0.3',
    badges: ['اقتصاد', 'علوم مالية']
  },
  {
    id: 5,
    title: 'بكالوريوس ريادة الأعمال',
    university: 'جامعة أوزيجين',
    location: 'Turkey، إسطنبول',
    language: 'الإنجليزية',
    duration: '4 سنوات',
    deadline: '15 أغسطس 2025',
    fee: '$13,000 / سنة',
    discount: '$12,350',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3',
    isFeatured: true,
    badges: ['ريادة أعمال', 'برنامج حديث']
  },
  {
    id: 6,
    title: 'بكالوريوس التمويل الدولي',
    university: 'جامعة أوزيجين',
    location: 'Turkey، إسطنبول',
    language: 'الإنجليزية',
    duration: '4 سنوات',
    deadline: '15 أغسطس 2025',
    fee: '$13,500 / سنة',
    discount: '$12,800',
    image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3',
    badges: ['تمويل دولي', 'اقتصاد عالمي']
  },
  {
    id: 7,
    title: 'بكالوريوس الهندسة الكهربائية',
    university: 'جامعة إسطنبول التقنية',
    location: 'Turkey، إسطنبول',
    language: 'الإنجليزية',
    duration: '4 سنوات',
    deadline: '30 يوليو 2025',
    fee: '$14,000 / سنة',
    discount: '$13,300',
    image: 'https://images.unsplash.com/photo-1605627079912-97c3810a11a4?q=80&w=2007&auto=format&fit=crop&ixlib=rb-4.0.3',
    badges: ['هندسة كهربائية', 'برنامج معتمد دولياً']
  },
  {
    id: 8,
    title: 'ماجستير إدارة الأعمال',
    university: 'جامعة السوربون أبوظبي',
    location: 'United Arab Emirates، أبوظبي',
    language: 'الإنجليزية',
    duration: 'سنتان',
    deadline: '1 سبتمبر 2025',
    fee: '$20,000 / سنة',
    discount: '$18,500',
    image: 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3',
    isFeatured: true,
    scholarshipAvailable: true,
    badges: ['MBA', 'إدارة أعمال عالمية']
  },
  {
    id: 9,
    title: 'بكالوريوس العلاج الطبيعي',
    university: 'جامعة القاهرة',
    location: 'Egypt، القاهرة',
    language: 'العربية',
    duration: '5 سنوات',
    deadline: '20 أغسطس 2025',
    fee: '$5,000 / سنة',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3',
    badges: ['علاج طبيعي', 'علوم صحية']
  }
];

// Available countries
export const availableCountries = [
  'Australia', 'Azerbaijan', 'Bosnia and Herzegovina', 'Czech Republic', 'Egypt', 
  'Georgia', 'Germany', 'Hungary', 'Ireland', 'Kosovo', 'Macedonia', 'Malaysia', 
  'Malta', 'Montenegro', 'Northern Cyprus', 'Poland', 'Scotland', 'Serbia', 'Spain', 
  'Turkey', 'United Kingdom', 'United States', 'United Arab Emirates'
];

// Degree types
export const degreeTypes = [
  'Associate', 'Bachelor', 'Diploma', 'Doctorate', 'Foundation Year', 
  'Language Course', 'Master', 'Training Course'
];

// Program specialties
export const programSpecialties = [
  'Accounting and Auditing', 'Accounting, Finance & Economics', 'Aerospace, Aeronautical', 
  'Agriculture', 'Agriculture Engineering', 'Animal Science', 'Anthropology', 'Arabic', 
  'Archaeology', 'Architectural Engineering', 'Architecture', 'Art', 'Astronomy', 
  'Aviation Management', 'Aviation Technology', 'Biochemistry', 'Biology', 'Biomedical', 
  'Biomedical Engineering', 'Business Administration, Management, General', 
  'Cartoon & Animation', 'Chemical Engineering', 'Chemistry', 'Civil Aviation Cabin Services', 
  'Civil Engineering & Construction', 'Communications', 'Community, Social Service', 
  'Comparative Literature', 'Computer Science', 'Cultural Studies, European Studies', 'Dentistry', 
  'Digital Microchip Design & Verification', 'Education', 'Electrical & Electronics Engineering', 
  'Engineering Management', 'English', 'English for Academic Studies', 'English Language and Literature', 
  'English Literature', 'Entrepreneurship', 'Environmental Engineering', 'Environmental, Earth Sciences', 
  'Fashion, Esthetics', 'Fine Arts & Design', 'Food and Culinary', 'Food Engineering', 
  'Food, Nutrition, Exercise', 'French', 'Game Design, Game Animation, Game Creation', 'Gastronomy', 
  'Gender Studies', 'General', 'Geography', 'Geology', 'German', 'Global Studies', 
  'Graphic Design, Interior Design', 'Handicrafts', 'Health Sciences, Nursing', 'History', 
  'Hospitality and Tourism, Recreation', 'Human Resources', 'Humanitarian Sciences', 
  'Industrial Design', 'Industrial Engineering', 'Information Systems Management', 'Interior Design', 
  'International Business, International Trade', 'International Relations', 'Islamic Studies', 
  'Journalism', 'Law, Politics, Policy & Security', 'Liberal Arts', 'Literature, Languages', 
  'Logistics & Supply Chain', 'Logistics and Transportation', 'Marine Science', 
  'Marketing, Analyst, Advertising', 'Material Engineering', 'Mathematics', 
  'Mechanical, Energy, Manufacturing, Robotic', 'Media, Photography, Film, Theater, Performance', 
  'Medicine', 'Molecular Biology and Genetics', 'Molecular Biology, Genetics, and Bioengineering', 
  'Music', 'Music, Audio', 'Natural and Mathematical Sciences', 'New Media', 'Optometry', 
  'Paramedic & Kinesiology', 'Petroleum Engineering', 'Pharmacy', 'Philosophy', 'Physics', 
  'Pilotage', 'Political', 'Political Science & Public Administration', 'Professional Pilot, Civil Aviation', 
  'Psychology', 'Psychology, Philosophy, Therapy', 'Public Relations', 'Public Relations & Advertising', 
  'Public Relations and Advertising', 'Radio, Television and Cinema', 'Radiography', 
  'Real Estate & Asset Valuation', 'Religion', 'Russian', 'Sociology', 'Spanish', 
  'Sports Management', 'Sports Science', 'Teaching, Early Development, Child Care', 
  'Technology, Software, Computer, IT', 'Theater', 'Tourism & Hotel Management', 
  'Translation & Interpretation', 'Transportation Engineering', 'Turkish', 
  'Turkish Language and Literature', 'Urban Planning', 'Veterinarian'
];

// Language options
export const languageOptions = ['الإنجليزية', 'التركية', 'العربية', 'الروسية', 'الألمانية', 'الفرنسية'];
