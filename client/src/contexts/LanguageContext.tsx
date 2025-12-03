import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "en" | "ar";

const translations = {
  en: {
    // Sidebar
    chat: "Chat",
    search: "Search",
    lastChats: "Last chats",
    newChat: "New chat",
    contacts: "Contacts",
    calls: "Calls",
    settings: "Settings",
    // Chat
    typeMessage: "Write your message...",
    online: "Online",
    offline: "Offline",
    typing: "typing...",
    available: "available",
    // Files
    image: "Image",
    audio: "Audio",
    video: "Video",
    document: "Document",
    allFiles: "All files",
    allLinks: "All links",
    fileType: "File type",
    documents: "Documents",
    photos: "Photos",
    movies: "Movies",
    other: "Other",
    // Actions
    send: "Send",
    cancel: "Cancel",
    reply: "Reply",
    edit: "Edit",
    delete: "Delete",
    deleteForMe: "Delete for me",
    deleteForEveryone: "Delete for everyone",
    deleteMessage: "Delete Message",
    deleteMessageDesc: "How would you like to delete this message?",
    replyingTo: "Replying to",
    editingMessage: "Editing message",
    // Panel
    messages: "Messages",
    participants: "Participants",
    members: "members",
    sharedFiles: "Shared Files",
    // Auth
    login: "Login",
    register: "Register",
    forgotPassword: "Forgot Password",
    resetPassword: "Reset Password",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    username: "Username",
    verifyEmail: "Verify Email",
    // Profile
    profile: "Profile",
    profileSettings: "Profile Settings",
    updateProfile: "Update Profile",
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    bio: "Bio",
    phone: "Phone",
    // Calls
    voiceCall: "Voice Call",
    videoCall: "Video Call",
    calling: "Calling...",
    endCall: "End Call",
    // Notifications
    soundOn: "Sound On",
    soundOff: "Sound Off",
    newMessage: "New Message",
    // User modal
    userDetails: "User Details",
    groupDetails: "Group Details",
    sharedMedia: "Shared Media",
    sharedLinks: "Shared Links",
    muteNotifications: "Mute Notifications",
    blockUser: "Block User",
    leaveGroup: "Leave Group",
    // Upload
    addCaption: "Add a caption...",
    stagedFiles: "Files to send",
    clearAll: "Clear all",
    // Theme
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    // Language
    language: "Language",
    english: "English",
    arabic: "Arabic",
    // No chat selected
    selectChat: "Select a chat to start messaging",
    welcomeBack: "Welcome back!",
  },
  ar: {
    // Sidebar
    chat: "الدردشة",
    search: "بحث",
    lastChats: "آخر المحادثات",
    newChat: "محادثة جديدة",
    contacts: "جهات الاتصال",
    calls: "المكالمات",
    settings: "الإعدادات",
    // Chat
    typeMessage: "اكتب رسالتك...",
    online: "متصل",
    offline: "غير متصل",
    typing: "يكتب...",
    available: "متاح",
    // Files
    image: "صورة",
    audio: "صوت",
    video: "فيديو",
    document: "مستند",
    allFiles: "كل الملفات",
    allLinks: "كل الروابط",
    fileType: "نوع الملف",
    documents: "المستندات",
    photos: "الصور",
    movies: "الأفلام",
    other: "أخرى",
    // Actions
    send: "إرسال",
    cancel: "إلغاء",
    reply: "رد",
    edit: "تعديل",
    delete: "حذف",
    deleteForMe: "حذف لي",
    deleteForEveryone: "حذف للجميع",
    deleteMessage: "حذف الرسالة",
    deleteMessageDesc: "كيف تريد حذف هذه الرسالة؟",
    replyingTo: "الرد على",
    editingMessage: "تعديل الرسالة",
    // Panel
    messages: "الرسائل",
    participants: "المشاركون",
    members: "أعضاء",
    sharedFiles: "الملفات المشتركة",
    // Auth
    login: "تسجيل الدخول",
    register: "التسجيل",
    forgotPassword: "نسيت كلمة المرور",
    resetPassword: "إعادة تعيين كلمة المرور",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    fullName: "الاسم الكامل",
    username: "اسم المستخدم",
    verifyEmail: "تأكيد البريد الإلكتروني",
    // Profile
    profile: "الملف الشخصي",
    profileSettings: "إعدادات الملف الشخصي",
    updateProfile: "تحديث الملف الشخصي",
    changePassword: "تغيير كلمة المرور",
    currentPassword: "كلمة المرور الحالية",
    newPassword: "كلمة المرور الجديدة",
    bio: "نبذة",
    phone: "الهاتف",
    // Calls
    voiceCall: "مكالمة صوتية",
    videoCall: "مكالمة فيديو",
    calling: "جاري الاتصال...",
    endCall: "إنهاء المكالمة",
    // Notifications
    soundOn: "الصوت مفعل",
    soundOff: "الصوت مغلق",
    newMessage: "رسالة جديدة",
    // User modal
    userDetails: "تفاصيل المستخدم",
    groupDetails: "تفاصيل المجموعة",
    sharedMedia: "الوسائط المشتركة",
    sharedLinks: "الروابط المشتركة",
    muteNotifications: "كتم الإشعارات",
    blockUser: "حظر المستخدم",
    leaveGroup: "مغادرة المجموعة",
    // Upload
    addCaption: "أضف تعليقاً...",
    stagedFiles: "ملفات للإرسال",
    clearAll: "مسح الكل",
    // Theme
    lightMode: "الوضع الفاتح",
    darkMode: "الوضع الداكن",
    // Language
    language: "اللغة",
    english: "الإنجليزية",
    arabic: "العربية",
    // No chat selected
    selectChat: "اختر محادثة للبدء",
    welcomeBack: "مرحباً بعودتك!",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    return (stored as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
