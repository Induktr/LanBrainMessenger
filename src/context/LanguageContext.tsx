import React, { createContext, useContext, useState, useEffect } from 'react';

interface Language {
  name: string;
  code: string;
  flag: string;
}

interface Translations {
  [key: string]: string | Translations;
}

interface LanguageContextType {
  language: string;
  changeLanguage: (langCode: string) => Promise<void>;
  languages: { [key: string]: Language };
  t: (key: string, params?: { [key: string]: string }) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const languages: { [key: string]: Language } = {
  en: {
    name: 'English',
    code: 'en',
    flag: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734886391/gb--great-britain----element--stylized-image-of-bi_vah3li.svg'
  },
  ru: {
    name: 'Русский',
    code: 'ru',
    flag: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734886396/ru--russia----element--abstract-dome-of-st--basil-_bcv8vd.svg'
  },
  uk: {
    name: 'Українська',
    code: 'uk',
    flag: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734886393/ua--ukraine----element--stylized-sun-and-ears-of-w_zaflxv.svg'
  },
  it: {
    name: 'Italiano',
    code: 'it',
    flag: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734886391/it--italy----element--abstract-leaning-tower-of-pi_qhwx9y.svg'
  },
  fr: {
    name: 'Français',
    code: 'fr',
    flag: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734886392/fr--france----element--minimalist-form-of-the-eiff_onbp93.svg'
  },
  pl: {
    name: 'Polski',
    code: 'pl',
    flag: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734886391/pl--poland----element--shield-with-eagle--national_jwjcer.svg'
  },
  de: {
    name: 'Deutsch',
    code: 'de',
    flag: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734886392/de--germany----element--silhouette-of-the-brandenb_vj3w34.svg'
  },
  tr: {
    name: 'Türkçe',
    code: 'tr',
    flag: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734886393/tr--turkey----element--crescent-moon-and-star-in-a_j40cr4.svg'
  },
  ko: {
    name: '한국어',
    code: 'ko',
    flag: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734886391/kr--south-korea----element--tae-geuk-symbol--from-_iakwre.svg'
  },
  id: {
    name: 'Bahasa Indonesia',
    code: 'id',
    flag: 'https://res.cloudinary.com/dsjalneil/image/upload/v1734887605/id--indonesia----element--minimalist-silhouette-of_enapz5.svg'
  }
};

export const translations: { [key: string]: Translations } = {
  en: {
    // Header
    features: 'Features',
    news: 'News',
    faq: 'FAQ',
    poll: 'Poll',
    updates: 'Updates',
    selectLanguage: 'Select language',
    changeLanguageTooltip: 'Change language',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    settings: 'Settings',
    signOut: 'Sign Out',
    deleteAccount: 'Delete Account',
    deleteAccountConfirmTitle: 'Confirm Account Deletion',
    deleteAccountConfirmMessage: 'Are you sure you want to delete your account? This action cannot be undone.',
    cancel: 'Cancel',
    confirmDelete: 'Confirm Deletion',
    signIn: 'Sign In',

    // Hero
    heroTitle: 'Welcome to BrainMessenger',
    heroSubtitle: 'Your Smart Communication Platform',
    getStarted: 'Get Started',
    learnMore: 'Learn More',

    // Features
    featuresTitle: 'Key Features',
    featuresSubtitle: 'Discover what makes us unique',
    secureMessaging: 'Secure Messaging',
    secureMessagingDesc: 'End-to-end encryption for your privacy',
    smartAssistant: 'Smart Assistant',
    smartAssistantDesc: 'AI-powered help at your fingertips',
    crossPlatform: 'Cross Platform',
    crossPlatformDesc: 'Use on any device, anywhere',

    // News
    latestNews: 'Latest News',
    readMore: 'Read More',
    newsDate: 'Published on',

    // FAQ
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Find answers to common questions',

    // Poll
    pollTitle: 'Community Poll',
    pollSubtitle: 'Share your opinion',
    submit: 'Submit',
    results: 'View Results',

    // Updates
    updateTitle: 'Latest Updates',
    updateSubtitle: 'See what\'s new',
    version: 'Version',
    releaseDate: 'Release Date',
    changingLanguage: 'Changing language...'
  },
  ru: {
    // Header
    features: 'Функции',
    news: 'Новости',
    faq: 'ЧАВО',
    poll: 'Опрос',
    updates: 'Обновления',
    selectLanguage: 'Выбрать язык',
    changeLanguageTooltip: 'Сменить язык',
    lightMode: 'Светлая тема',
    darkMode: 'Тёмная тема',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    settings: 'Настройки',
    signOut: 'Выйти',
    deleteAccount: 'Удалить аккаунт',
    deleteAccountConfirmTitle: 'Подтвердить удаление аккаунта',
    deleteAccountConfirmMessage: 'Вы уверены, что хотите удалить свой аккаунт? Это действие нельзя отменить.',
    cancel: 'Отмена',
    confirmDelete: 'Подтвердить удаление',
    signIn: 'Войти',

    // Hero
    heroTitle: 'Добро пожаловать в BrainMessenger',
    heroSubtitle: 'Ваша умная платформа для общения',
    getStarted: 'Начать',
    learnMore: 'Узнать больше',

    // Features
    featuresTitle: 'Ключевые функции',
    featuresSubtitle: 'Узнайте, что делает нас уникальными',
    secureMessaging: 'Безопасные сообщения',
    secureMessagingDesc: 'Сквозное шифрование для вашей конфиденциальности',
    smartAssistant: 'Умный ассистент',
    smartAssistantDesc: 'ИИ-помощник всегда под рукой',
    crossPlatform: 'Кросс-платформенность',
    crossPlatformDesc: 'Используйте на любом устройстве, где угодно',

    // News
    latestNews: 'Последние новости',
    readMore: 'Читать далее',
    newsDate: 'Опубликовано',

    // FAQ
    faqTitle: 'Часто задаваемые вопросы',
    faqSubtitle: 'Найдите ответы на общие вопросы',

    // Poll
    pollTitle: 'Опрос сообщества',
    pollSubtitle: 'Поделитесь своим мнением',
    submit: 'Отправить',
    results: 'Посмотреть результаты',

    // Updates
    updateTitle: 'Последние обновления',
    updateSubtitle: 'Что нового',
    version: 'Версия',
    releaseDate: 'Дата выпуска',
    changingLanguage: 'Изменение языка...'
  },
  uk: {
    // Header
    features: 'Функції',
    news: 'Новини',
    faq: 'ЧаПи',
    poll: 'Опитування',
    updates: 'Оновлення',
    selectLanguage: 'Обрати мову',
    changeLanguageTooltip: 'Змінити мову',
    lightMode: 'Світла тема',
    darkMode: 'Темна тема',
    openMenu: 'Відкрити меню',
    closeMenu: 'Закрити меню',
    settings: 'Налаштування',
    signOut: 'Вийти',
    deleteAccount: 'Видалити обліковий запис',
    deleteAccountConfirmTitle: 'Підтвердити видалення облікового запису',
    deleteAccountConfirmMessage: 'Ви впевнені, що хочете видалити свій обліковий запис? Цю дію не можна скасувати.',
    cancel: 'Скасувати',
    confirmDelete: 'Підтвердити видалення',
    signIn: 'Увійти',

    // Hero
    heroTitle: 'Ласкаво просимо до BrainMessenger',
    heroSubtitle: 'Ваша розумна платформа для спілкування',
    getStarted: 'Почати',
    learnMore: 'Дізнатися більше',

    // Features
    featuresTitle: 'Ключові функції',
    featuresSubtitle: 'Дізнайтесь, що робить нас унікальними',
    secureMessaging: 'Безпечні повідомлення',
    secureMessagingDesc: 'Сквозне шифрування для вашої конфіденційності',
    smartAssistant: 'Розумний асистент',
    smartAssistantDesc: 'ІП-помічник завжди під рукою',
    crossPlatform: 'Крос-платформеність',
    crossPlatformDesc: 'Використовуйте на будь-якому пристрої, де завгодно',

    // News
    latestNews: 'Останні новини',
    readMore: 'Читати далі',
    newsDate: 'Опубліковано',

    // FAQ
    faqTitle: 'Часто запитувані питання',
    faqSubtitle: 'Знайдіть відповіді на загальні питання',

    // Poll
    pollTitle: 'Опитування спільноти',
    pollSubtitle: 'Поділіться своїм поглядом',
    submit: 'Відправити',
    results: 'Переглянути результати',

    // Updates
    updateTitle: 'Останні оновлення',
    updateSubtitle: 'Що нового',
    version: 'Версія',
    releaseDate: 'Дата випуску',
    changingLanguage: 'Зміна мови...'
  },
  it: {
    // Header
    features: 'Funzionalità',
    news: 'Notizie',
    faq: 'FAQ',
    poll: 'Sondaggio',
    updates: 'Aggiornamenti',
    selectLanguage: 'Seleziona lingua',
    changeLanguageTooltip: 'Cambia lingua',
    lightMode: 'Modalità luce',
    darkMode: 'Modalità scura',
    openMenu: 'Apri menu',
    closeMenu: 'Chiudi menu',
    settings: 'Impostazioni',
    signOut: 'Esci',
    deleteAccount: 'Elimina account',
    deleteAccountConfirmTitle: 'Conferma eliminazione account',
    deleteAccountConfirmMessage: 'Sei sicuro di voler eliminare il tuo account? Questa azione non può essere annullata.',
    cancel: 'Annulla',
    confirmDelete: 'Conferma eliminazione',
    signIn: 'Accedi',

    // Hero
    heroTitle: 'Benvenuto in BrainMessenger',
    heroSubtitle: 'La tua piattaforma di comunicazione intelligente',
    getStarted: 'Inizia',
    learnMore: 'Scopri di più',

    // Features
    featuresTitle: 'Funzionalità chiave',
    featuresSubtitle: 'Scopri cosa ci rende unici',
    secureMessaging: 'Messaggistica sicura',
    secureMessagingDesc: 'Crittografia end-to-end per la tua privacy',
    smartAssistant: 'Assistente intelligente',
    smartAssistantDesc: 'AI-powered help sempre a portata di mano',
    crossPlatform: 'Piattaforma cross',
    crossPlatformDesc: 'Utilizza su qualsiasi dispositivo, ovunque',

    // News
    latestNews: 'Ultime notizie',
    readMore: 'Leggi di più',
    newsDate: 'Pubblicato',

    // FAQ
    faqTitle: 'Domande frequenti',
    faqSubtitle: 'Trova le risposte alle domande comuni',

    // Poll
    pollTitle: 'Sondaggio della comunità',
    pollSubtitle: 'Condividi la tua opinione',
    submit: 'Invia',
    results: 'Visualizza i risultati',

    // Updates
    updateTitle: 'Aggiornamenti più recenti',
    updateSubtitle: 'Cosa c\'è di nuovo',
    version: 'Versione',
    releaseDate: 'Data di rilascio',
    changingLanguage: 'Cambio lingua...'
  },
  fr: {
    // Header
    features: 'Fonctionnalités',
    news: 'Actualités',
    faq: 'FAQ',
    poll: 'Sondage',
    updates: 'Mises à jour',
    selectLanguage: 'Sélectionner la langue',
    changeLanguageTooltip: 'Changer de langue',
    lightMode: 'Mode clair',
    darkMode: 'Mode sombre',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    settings: 'Paramètres',
    signOut: 'Se déconnecter',
    deleteAccount: 'Supprimer le compte',
    deleteAccountConfirmTitle: 'Confirmer la suppression du compte',
    deleteAccountConfirmMessage: 'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',
    cancel: 'Annuler',
    confirmDelete: 'Confirmer la suppression',
    signIn: 'Se connecter',

    // Hero
    heroTitle: 'Bienvenue dans BrainMessenger',
    heroSubtitle: 'Votre plateforme de communication intelligente',
    getStarted: 'Commencer',
    learnMore: 'En savoir plus',

    // Features
    featuresTitle: 'Fonctionnalités clés',
    featuresSubtitle: 'Découvrez ce qui nous rend uniques',
    secureMessaging: 'Messagerie sécurisée',
    secureMessagingDesc: 'Chiffrement de bout en bout pour votre confidentialité',
    smartAssistant: 'Assistant intelligent',
    smartAssistantDesc: 'Aide alimentée par l\'IA toujours à portée de main',
    crossPlatform: 'Plateforme cross',
    crossPlatformDesc: 'Utilisez sur n\'importe quel appareil, partout',

    // News
    latestNews: 'Dernières actualités',
    readMore: 'Lire la suite',
    newsDate: 'Publié',

    // FAQ
    faqTitle: 'Questions fréquentes',
    faqSubtitle: 'Trouvez les réponses aux questions courantes',

    // Poll
    pollTitle: 'Sondage de la communauté',
    pollSubtitle: 'Partagez votre opinion',
    submit: 'Envoyer',
    results: 'Voir les résultats',

    // Updates
    updateTitle: 'Mises à jour les plus récentes',
    updateSubtitle: 'Quoi de neuf',
    version: 'Version',
    releaseDate: 'Date de sortie',
    changingLanguage: 'Changement de langue...'
  },
  pl: {
    // Header
    features: 'Funkcje',
    news: 'Aktualności',
    faq: 'FAQ',
    poll: 'Ankieta',
    updates: 'Aktualizacje',
    selectLanguage: 'Wybierz język',
    changeLanguageTooltip: 'Zmień język',
    lightMode: 'Tryb jasny',
    darkMode: 'Tryb ciemny',
    openMenu: 'Otwórz menu',
    closeMenu: 'Zamknij menu',
    settings: 'Ustawienia',
    signOut: 'Wyloguj się',
    deleteAccount: 'Usuń konto',
    deleteAccountConfirmTitle: 'Potwierdź usunięcie konta',
    deleteAccountConfirmMessage: 'Czy na pewno chcesz usunąć swoje konto? Tej operacji nie można cofnąć.',
    cancel: 'Anuluj',
    confirmDelete: 'Potwierdź usunięcie',
    signIn: 'Zaloguj się',

    // Hero
    heroTitle: 'Witaj w BrainMessenger',
    heroSubtitle: 'Twoja inteligentna platforma komunikacyjna',
    getStarted: 'Rozpocznij',
    learnMore: 'Dowiedz się więcej',

    // Features
    featuresTitle: 'Kluczowe funkcje',
    featuresSubtitle: 'Odkryj, co nas wyróżnia',
    secureMessaging: 'Bezpieczna komunikacja',
    secureMessagingDesc: 'Szyfrowanie end-to-end dla Twojej prywatności',
    smartAssistant: 'Inteligentny asystent',
    smartAssistantDesc: 'Pomoc oparta na AI zawsze pod ręką',
    crossPlatform: 'Platforma cross',
    crossPlatformDesc: 'Użyj na dowolnym urządzeniu, wszędzie',

    // News
    latestNews: 'Najnowsze aktualności',
    readMore: 'Czytaj dalej',
    newsDate: 'Opublikowane',

    // FAQ
    faqTitle: 'Często zadawane pytania',
    faqSubtitle: 'Znajdź odpowiedzi na często zadawane pytania',

    // Poll
    pollTitle: 'Ankieta społeczności',
    pollSubtitle: 'Podziel się swoją opinią',
    submit: 'Wyślij',
    results: 'Zobacz wyniki',

    // Updates
    updateTitle: 'Najnowsze aktualizacje',
    updateSubtitle: 'Co nowego',
    version: 'Wersja',
    releaseDate: 'Data wydania',
    changingLanguage: 'Zmiana języka...'
  },
  de: {
    // Header
    features: 'Funktionen',
    news: 'Nachrichten',
    faq: 'FAQ',
    poll: 'Umfrage',
    updates: 'Aktualisierungen',
    selectLanguage: 'Sprache auswählen',
    changeLanguageTooltip: 'Sprache ändern',
    lightMode: 'Hellmodus',
    darkMode: 'Dunkelmodus',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    settings: 'Einstellungen',
    signOut: 'Abmelden',
    deleteAccount: 'Konto löschen',
    deleteAccountConfirmTitle: 'Kontolöschung bestätigen',
    deleteAccountConfirmMessage: 'Sind Sie sicher, dass Sie Ihr Konto löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
    cancel: 'Abbrechen',
    confirmDelete: 'Löschung bestätigen',
    signIn: 'Anmelden',

    // Hero
    heroTitle: 'Willkommen bei BrainMessenger',
    heroSubtitle: 'Ihre intelligente Kommunikationsplattform',
    getStarted: 'Loslegen',
    learnMore: 'Mehr erfahren',

    // Features
    featuresTitle: 'Schlüssel-Funktionen',
    featuresSubtitle: 'Entdecken Sie, was uns einzigartig macht',
    secureMessaging: 'Sichere Nachrichten',
    secureMessagingDesc: 'End-to-End-Verschlüsselung für Ihre Privatsphäre',
    smartAssistant: 'Intelligenter Assistent',
    smartAssistantDesc: 'AI-gestützte Hilfe immer griffbereit',
    crossPlatform: 'Cross-Plattform',
    crossPlatformDesc: 'Verwenden Sie es auf jedem Gerät, überall',

    // News
    latestNews: 'Neueste Nachrichten',
    readMore: 'Mehr lesen',
    newsDate: 'Veröffentlicht',

    // FAQ
    faqTitle: 'Häufig gestellte Fragen',
    faqSubtitle: 'Finden Sie Antworten auf häufig gestellte Fragen',

    // Poll
    pollTitle: 'Umfrage der Community',
    pollSubtitle: 'Teilen Sie Ihre Meinung',
    submit: 'Senden',
    results: 'Ergebnisse anzeigen',

    // Updates
    updateTitle: 'Neueste Aktualisierungen',
    updateSubtitle: 'Was ist neu',
    version: 'Version',
    releaseDate: 'Veröffentlichungsdatum',
    changingLanguage: 'Sprache ändern...'
  },
  tr: {
    // Header
    features: 'Özellikler',
    news: 'Haberler',
    faq: 'SSS',
    poll: 'Anket',
    updates: 'Güncellemeler',
    selectLanguage: 'Dil seç',
    changeLanguageTooltip: 'Dili değiştir',
    lightMode: 'Açık tema',
    darkMode: 'Koyu tema',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    settings: 'Ayarlar',
    signOut: 'Çıkış yap',
    deleteAccount: 'Hesabı sil',
    deleteAccountConfirmTitle: 'Hesap silme onayı',
    deleteAccountConfirmMessage: 'Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    cancel: 'İptal',
    confirmDelete: 'Silmeyi onayla',
    signIn: 'Giriş yap',

    // Hero
    heroTitle: 'BrainMessenger\'a hoş geldiniz',
    heroSubtitle: 'Akıllı iletişim platformunuz',
    getStarted: 'Başlayın',
    learnMore: 'Daha fazla bilgi',

    // Features
    featuresTitle: 'Önemli özellikler',
    featuresSubtitle: 'Neleri benzersiz kılan',
    secureMessaging: 'Güvenli mesajlaşma',
    secureMessagingDesc: 'Gizlilik için uçtan uca şifreleme',
    smartAssistant: 'Akıllı asistan',
    smartAssistantDesc: 'Her zaman elinizin altında olan AI destekli yardım',
    crossPlatform: 'Çapraz platform',
    crossPlatformDesc: 'Herhangi bir cihazda, her yerde kullanın',

    // News
    latestNews: 'Son haberler',
    readMore: 'Daha fazla oku',
    newsDate: 'Yayınlanma tarihi',

    // FAQ
    faqTitle: 'Sıkça sorulan sorular',
    faqSubtitle: 'Sıkça sorulan soruların cevaplarını bulun',
    // Poll
    pollTitle: 'Topluluk anketi',
    pollSubtitle: 'Görüşünüzü paylaşın',
    submit: 'Gönder',
    results: 'Sonuçları görüntüle',

    // Updates
    updateTitle: 'Son güncellemeler',
    updateSubtitle: 'Ne yeni',
    version: 'Sürüm',
    releaseDate: 'Yayınlanma tarihi',
    changingLanguage: 'Dil değiştirme...'
  },
  ko: {
    // Header
    features: '기능',
    news: '뉴스',
    faq: '자주 묻는 질문',
    poll: '설문조사',
    updates: '업데이트',
    selectLanguage: '언어 선택',
    changeLanguageTooltip: '언어 변경',
    lightMode: '밝은 모드',
    darkMode: '어두운 모드',
    openMenu: '메뉴 열기',
    closeMenu: '메뉴 닫기',
    settings: '설정',
    signOut: '로그아웃',
    deleteAccount: '계정 삭제',
    deleteAccountConfirmTitle: '계정 삭제 확인',
    deleteAccountConfirmMessage: '계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    cancel: '취소',
    confirmDelete: '삭제 확인',
    signIn: '로그인',

    // Hero
    heroTitle: '브레인 메신저에 오신 것을 환영합니다',
    heroSubtitle: '您的智能通信平台',
    getStarted: '시작하기',
    learnMore: '더 알아보기',

    // Features
    featuresTitle: '주요 기능',
    featuresSubtitle: '우리가 특별한 이유',
    secureMessaging: '보안 메시징',
    secureMessagingDesc: '您的隐私的端到端加密',
    smartAssistant: '智能助手',
    smartAssistantDesc: '您的智能助手',
    crossPlatform: '跨平台',
    crossPlatformDesc: '在任何设备上使用',

    // News
    latestNews: '최신 뉴스',
    readMore: '더 읽기',
    newsDate: '게시일',

    // FAQ
    faqTitle: '자주 묻는 질문',
    faqSubtitle: '자주 묻는 질문에 대한 답변',

    // Poll
    pollTitle: '커뮤니티 설문조사',
    pollSubtitle: '您的意见',
    submit: '제출',
    results: '결과 보기',

    // Updates
    updateTitle: '최신 업데이트',
    updateSubtitle: '무엇이 새로운가',
    version: '버전',
    releaseDate: '출시일',
    changingLanguage: '언어 변경 중...'
  },
  id: {
    // Header
    features: 'Fitur',
    news: 'Berita',
    faq: 'FAQ',
    poll: 'Jajak Pendapat',
    updates: 'Pembaruan',
    selectLanguage: 'Pilih bahasa',
    changeLanguageTooltip: 'Ubah bahasa',
    lightMode: 'Mode Terang',
    darkMode: 'Mode Gelap',
    openMenu: 'Buka menu',
    closeMenu: 'Tutup menu',
    settings: 'Pengaturan',
    signOut: 'Keluar',
    deleteAccount: 'Hapus Akun',
    deleteAccountConfirmTitle: 'Konfirmasi Penghapusan Akun',
    deleteAccountConfirmMessage: 'Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan.',
    cancel: 'Batal',
    confirmDelete: 'Konfirmasi Penghapusan',
    signIn: 'Masuk',

    // Hero
    heroTitle: 'Selamat datang di BrainMessenger',
    heroSubtitle: 'Platform Komunikasi Cerdas Anda',
    getStarted: 'Mulai',
    learnMore: 'Pelajari Lebih Lanjut',

    // Features
    featuresTitle: 'Fitur Utama',
    featuresSubtitle: 'Temukan apa yang membuat kami unik',
    secureMessaging: 'Pesan Aman',
    secureMessagingDesc: 'Enkripsi end-to-end untuk privasi Anda',
    smartAssistant: 'Asisten Cerdas',
    smartAssistantDesc: 'Bantuan bertenaga AI di ujung jari Anda',
    crossPlatform: 'Lintas Platform',
    crossPlatformDesc: 'Gunakan di perangkat apa pun, di mana saja',

    // News
    latestNews: 'Berita Terbaru',
    readMore: 'Baca Selengkapnya',
    newsDate: 'Diterbitkan pada',

    // FAQ
    faqTitle: 'Pertanyaan yang Sering Diajukan',
    faqSubtitle: 'Temukan jawaban untuk pertanyaan umum',

    // Poll
    pollTitle: 'Jajak Pendapat Komunitas',
    pollSubtitle: 'Bagikan pendapat Anda',
    submit: 'Kirim',
    results: 'Lihat Hasil',

    // Updates
    updateTitle: 'Pembaruan Terbaru',
    updateSubtitle: 'Lihat apa yang baru',
    version: 'Versi',
    releaseDate: 'Tanggal Rilis',
    changingLanguage: 'Mengubah bahasa...'
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });
  const [currentTranslations, setCurrentTranslations] = useState<Translations>(translations[language]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('language', language);
    // In a real app, you might fetch translations from an API here
    setCurrentTranslations(translations[language]);
  }, [language]);

  const changeLanguage = async (langCode: string) => {
    setIsLoading(true);
    // Simulate fetching translations
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    setLanguage(langCode);
    setIsLoading(false);
  };

  const getTranslation = (key: string, params: { [key: string]: string } = {}): string => {
    const keys = key.split('.');
    let result: any = currentTranslations;
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    let translatedString = result as string;

    // Replace placeholders with params
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      translatedString = translatedString.replace(`{{${paramKey}}}`, paramValue);
    });

    return translatedString;
  };

  const contextValue: LanguageContextType = {
    language,
    changeLanguage,
    languages,
    t: getTranslation,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
