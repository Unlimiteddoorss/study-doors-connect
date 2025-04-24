
import { DocumentType } from "@/components/applications/DocumentUpload";

export const applicationDocumentTypes: DocumentType[] = [
  {
    id: "passport",
    name: "Passport",
    nameAr: "جواز السفر",
    description: "Valid passport with at least six months validity",
    descriptionAr: "جواز سفر ساري المفعول لمدة لا تقل عن ستة أشهر",
    required: true,
    acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
    maxSize: 5 * 1024 * 1024, // 5MB
    files: []
  },
  {
    id: "transcript",
    name: "Academic Transcript",
    nameAr: "السجل الأكاديمي",
    description: "Official academic transcript from your last educational institution",
    descriptionAr: "السجل الأكاديمي الرسمي من آخر مؤسسة تعليمية",
    required: true,
    acceptedFormats: ['.pdf'],
    maxSize: 10 * 1024 * 1024, // 10MB
    files: []
  },
  {
    id: "diploma",
    name: "Diploma / Degree Certificate",
    nameAr: "شهادة الدبلوم / الدرجة العلمية",
    description: "High school diploma or previous degree certificate",
    descriptionAr: "شهادة الثانوية العامة أو الشهادة الجامعية السابقة",
    required: true,
    acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
    maxSize: 5 * 1024 * 1024, // 5MB
    files: []
  },
  {
    id: "english",
    name: "English Proficiency Certificate",
    nameAr: "شهادة إتقان اللغة الإنجليزية",
    description: "TOEFL, IELTS, or equivalent English language proficiency certificate",
    descriptionAr: "شهادة توفل، آيلتس، أو ما يعادلها لإثبات إتقان اللغة الإنجليزية",
    required: false,
    acceptedFormats: ['.pdf', '.jpg', '.jpeg', '.png'],
    maxSize: 5 * 1024 * 1024, // 5MB
    files: []
  },
  {
    id: "photo",
    name: "Passport-sized Photo",
    nameAr: "صورة بحجم جواز السفر",
    description: "Recent passport-sized photo with white background",
    descriptionAr: "صورة حديثة بحجم جواز السفر مع خلفية بيضاء",
    required: true,
    acceptedFormats: ['.jpg', '.jpeg', '.png'],
    maxSize: 2 * 1024 * 1024, // 2MB
    files: []
  },
  {
    id: "motivation",
    name: "Motivation Letter",
    nameAr: "رسالة الدوافع",
    description: "Why you want to join this program (1-2 pages)",
    descriptionAr: "لماذا ترغب في الالتحاق بهذا البرنامج (1-2 صفحة)",
    required: false,
    acceptedFormats: ['.pdf', '.doc', '.docx'],
    maxSize: 5 * 1024 * 1024, // 5MB
    files: []
  },
  {
    id: "recommendation",
    name: "Recommendation Letters",
    nameAr: "رسائل التوصية",
    description: "Letters from teachers or employers (if applicable)",
    descriptionAr: "رسائل من المعلمين أو أصحاب العمل (إن وجدت)",
    required: false,
    acceptedFormats: ['.pdf', '.doc', '.docx'],
    maxSize: 5 * 1024 * 1024, // 5MB
    files: []
  },
  {
    id: "other",
    name: "Other Documents",
    nameAr: "مستندات أخرى",
    description: "Any additional documents to support your application",
    descriptionAr: "أي مستندات إضافية لدعم طلبك",
    required: false,
    acceptedFormats: ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
    maxSize: 10 * 1024 * 1024, // 10MB
    files: []
  }
];
