// Internationalization configuration - Supports Ukrainian, English, and Romanian
// Add new translations in the translations object

export type Language = "uk" | "en" | "ro"

export const translations = {
  uk: {
    // Navigation
    nav: {
      home: "Головна",
      works: "Роботи",
      about: "Про нас",
      contact: "Контакти",
    },
    // Hero section
    hero: {
      title: "ДИЗАЙН & СВОБОДА",
      subtitle: "Досліджуємо незалежність стилю через інноваційну фотографію та відеозйомку",
      learnMore: "ДІЗНАТИСЯ БІЛЬШЕ",
      video: "Відео",
    },
    // Filters
    filter: {
      byCreator: "По авторові",
      byLocation: "По локації",
      byCategory: "По категорії",
      photographer: "Фотограф",
      videographer: "Відеографець",
      allLocations: "Всі локації",
    },
    // Category cards
    categories: {
      title: "КАТЕГОРІЇ РОБІТ",
      explore: "Досліджуйте наші роботи",
      learnMore: "Дізнатися більше",
      scrollHint: "Наведіть курсор і прокрутіть колесо миші для перегляду",
      fashion: "Мода",
      cars: "Автомобілі",
      lifestyle: "Лайфстайл",
      events: "Події",
    },
    // Stats
    stats: {
      photoshoots: "Фотосесій",
      projects: "Проектів",
      videos: "Відео",
      clients: "Клієнтів",
    },
    // Creator info
    creators: {
      title: "НАШІ АВТОРИ",
      subtitle: "Познайомтесь з майстрами за об'єктивом",
      photographer: "ФОТОГРАФ",
      videographer: "ВІДЕОГРАФЕЦЬ",
      nadya: {
        name: "Надя",
        bio: "Захоплююсь створенням автентичних моментів та безчасної естетики. Спеціалізуюся на модній та лайфстайл фотографії.",
      },
      viktoria: {
        name: "Вікторія",
        bio: "Креативний відеограф з пристрастю до розповідання історій. Експерт у висвітленні подій та кінематографічному лайфстайл контенті.",
      },
    },
    // Footer
    footer: {
      followUs: "СЛІДКУЙТЕ ЗА НАМИ",
      rights: "Всі права захищені",
    },
    // Contact page
    contact: {
      title: "КОНТАКТИ",
      description: "Зв'яжіться з нами для обговорення вашого проекту",
      workLocations: "Регіони роботи",
      ukraine: "Україна",
      ukraineDesc: "Доступні для проектів у Києві та по всій Україні",
      moldova: "Молдова",
      moldovaDesc: "Доступні для проектів у Кишиніві та по всій Молдові",
      serviceCapabilities: "Наші можливості",
      photography: "Фотографія",
      videography: "Відеографія",
      events: "Заходи",
      contactInfo: "Інформація для контакту",
      email: "Електронна пошта",
      phone: "Телефон",
      location: "Місцезнаходження",
      ready: "Готові почати ваш проект?",
      reachOut:
        "Зв'яжіться з нами через соціальні мережі, щоб обговорити деталі вашого проекту. Ми розташовані в Україні та Молдові.",
      followSocials: "Слідкуйте в Instagram",
    },
    // Work/Project page
    work: {
      creator: "Автор",
      location: "Локація",
      category: "Категорія",
      about: "Про проект",
      gallery: "Галерея",
      notFound: "Проект не знайдено",
      goBack: "Повернутися",
      projectDescription:
        "Ця {category} {type} була знята в {location}. Наша команда захопила вражаючі візуальні ефекти, що демонструють професійну якість та творчу досконалість.",
      videoProduction: "відеозйомка",
      photoSession: "фотосесія",
      interested: "Цікавить подібна робота?",
      followUs:
        "Слідкуйте за нами в соціальних мережах, щоб бачити більше наших творчих робіт та бути в курсі останніх проектів.",
      viewAllWorks: "Переглянути всі роботи",
    },
    // Works page
    works: {
      title: "НАШІ РОБОТИ",
      description: "Дослідіть наш повний портфоліо фотографії та відеозйомки",
      backToWorks: "Повернутися до робіт",
      noResults: "Не знайдено проектів за вашими фільтрами",
    },
    // About page
    about: {
      title: "ПРО НАС",
      description:
        "DVSY — це преміум-студія, яка спеціалізується на високоякісній фотографії та відеозйомці. Ми присвячені захопленню моментів, які розповідають історії та створюють стійкі враження. Наша команда двох талановитих творців привносить унікальні перспективи та технічну досконалість до кожного проекту.",
      storyTitle: "Наша історія",
      storyText:
        "Заснована з пристрасністю до візуального розповідання, DVSY виникла завдяки співпраці двох талановитих творців, які поділяють бачення досконалості. Кожен проект — це можливість розширити творчі межі та надати роботу, яка перевищує очікування.",
      storyTextSecond:
        "Це вам подобається модна фотографія, автомобільний кінематограф, документування образу життя чи висвітлення подій, ми підходимо до кожного завдання з тим самим рівнем присвяти та мистецтва, який заробив нам визнання в індустрії.",
      advantagesTitle: "Наші переваги",
      independentDesigners: "Незалежні дизайнери",
      independentDesignersDesc:
        "Наша команда приносить різноманітний спектр незалежних перспектив та творчих підходів до кожного проекту.",
      exclusiveUniqueness: "Виключність & унікальність",
      exclusiveUniquenessDesc:
        "Ми зосереджуємось на створенні виключного контенту, який виділяється та відображає унікальність вашого бренду.",
      highQuality: "Висока якість",
      highQualityDesc: "Кожен кадр ретельно обробляється з увагою до деталей та професійних стандартів.",
    },
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      works: "Works",
      about: "About",
      contact: "Contact",
    },
    // Hero section
    hero: {
      title: "DESIGN & FREEDOM",
      subtitle: "Exploring style independence through innovative photography and videography",
      learnMore: "LEARN MORE",
      video: "Video",
    },
    // Filters
    filter: {
      byCreator: "By Creator",
      byLocation: "By Location",
      byCategory: "By Category",
      photographer: "Photographer",
      videographer: "Videographer",
      allLocations: "All Locations",
    },
    // Category cards
    categories: {
      title: "WORK CATEGORIES",
      explore: "Explore Our Work",
      learnMore: "Learn More",
      scrollHint: "Hover and scroll with your mouse wheel to explore",
      fashion: "Fashion",
      cars: "Cars",
      lifestyle: "Lifestyle",
      events: "Events",
    },
    // Stats
    stats: {
      photoshoots: "Photoshoots",
      projects: "Projects",
      videos: "Videos",
      clients: "Clients",
    },
    // Creator info
    creators: {
      title: "OUR CREATORS",
      subtitle: "Meet the Minds Behind the Lens",
      photographer: "PHOTOGRAPHER",
      videographer: "VIDEOGRAPHER",
      nadya: {
        name: "Nadya",
        bio: "Passionate about capturing authentic moments and timeless aesthetics. Specializing in fashion and lifestyle photography.",
      },
      viktoria: {
        name: "Viktoria",
        bio: "Creative videographer with a passion for storytelling. Expert in event coverage and cinematic lifestyle content.",
      },
    },
    // Footer
    footer: {
      followUs: "FOLLOW US",
      rights: "All rights reserved",
    },
    // Contact page
    contact: {
      title: "CONTACT",
      description: "Get in touch with us to discuss your project",
      workLocations: "Work Locations",
      ukraine: "Ukraine",
      ukraineDesc: "Available for projects in Kyiv and throughout Ukraine",
      moldova: "Moldova",
      moldovaDesc: "Available for projects in Chisinau and throughout Moldova",
      serviceCapabilities: "Our Capabilities",
      photography: "Photography",
      videography: "Videography",
      events: "Events",
      contactInfo: "Contact Information",
      email: "Email",
      phone: "Phone",
      location: "Location",
      ready: "Ready to Start Your Project?",
      reachOut: "Reach out to us on social media to discuss your project details. We are based in Ukraine and Moldova.",
      followSocials: "Follow on Instagram",
    },
    // Work/Project page
    work: {
      creator: "Creator",
      location: "Location",
      category: "Category",
      about: "About This Project",
      gallery: "Gallery",
      notFound: "Project not found",
      goBack: "Go Back",
      projectDescription:
        "This {category} {type} was shot in {location}. Our team captured stunning visuals showcasing professional quality and creative excellence.",
      videoProduction: "video production",
      photoSession: "photography session",
      interested: "Interested in Similar Work?",
      followUs: "Follow us on social media to see more of our creative work and stay updated with our latest projects.",
      viewAllWorks: "View All Works",
    },
    // Works page
    works: {
      title: "OUR WORKS",
      description: "Explore our complete portfolio of photography and videography",
      backToWorks: "Back to Works",
      noResults: "No projects found matching your filters",
    },
    // About page
    about: {
      title: "ABOUT US",
      description:
        "DVSY is a premium creative studio specializing in high-end photography and videography. We are dedicated to capturing moments that tell stories and create lasting impressions. Our team of two talented creators brings unique perspectives and technical excellence to every project.",
      storyTitle: "Our Story",
      storyText:
        "Founded with a passion for visual storytelling, DVSY emerged from the collaboration of two talented creatives who share a vision of excellence. Each project is an opportunity to push creative boundaries and deliver work that exceeds expectations.",
      storyTextSecond:
        "Whether it's fashion photography, automotive cinematic, lifestyle documentation, or event coverage, we approach every assignment with the same level of dedication and artistry that has earned us recognition in the industry.",
      advantagesTitle: "Our Advantages",
      independentDesigners: "Independent Designers",
      independentDesignersDesc:
        "Our team brings a diverse range of independent perspectives and creative approaches to every project.",
      exclusiveUniqueness: "Exclusive & Uniqueness",
      exclusiveUniquenessDesc:
        "We focus on creating exclusive content that stands out and reflects your unique brand identity.",
      highQuality: "High Quality",
      highQualityDesc: "Every frame is meticulously crafted with attention to detail and professional standards.",
    },
  },
  ro: {
    // Navigation
    nav: {
      home: "Acasă",
      works: "Lucrări",
      about: "Despre",
      contact: "Contact",
    },
    // Hero section
    hero: {
      title: "DESIGN & LIBERTATE",
      subtitle: "Explorând independența stilului prin fotografie și videografie inovatoare",
      learnMore: "AFLAȚI MAI MULT",
      video: "Video",
    },
    // Filters
    filter: {
      byCreator: "După Creator",
      byLocation: "După Locație",
      byCategory: "După Categorie",
      photographer: "Fotograf",
      videographer: "Videograf",
      allLocations: "Toate locațiile",
    },
    // Category cards
    categories: {
      title: "CATEGORII DE LUCRĂRI",
      explore: "Explorați lucrările noastre",
      learnMore: "Aflați mai mult",
      scrollHint: "Treceți cursorul și derulați cu rotița mouse-ului pentru a explora",
      fashion: "Modă",
      cars: "Mașini",
      lifestyle: "Lifestyle",
      events: "Evenimente",
    },
    // Stats
    stats: {
      photoshoots: "Sesiuni foto",
      projects: "Proiecte",
      videos: "Videoclipuri",
      clients: "Clienți",
    },
    // Creator info
    creators: {
      title: "CREATORII NOȘTRI",
      subtitle: "Faceți cunoștință cu mințile din spatele obiectivului",
      photographer: "FOTOGRAF",
      videographer: "VIDEOGRAF",
      nadya: {
        name: "Nadya",
        bio: "Pasionată de capturarea momentelor autentice și a esteticii atemporale. Specializată în fotografie de modă și lifestyle.",
      },
      viktoria: {
        name: "Viktoria",
        bio: "Videograf creativ cu o pasiune pentru povestire. Expert în acoperirea evenimentelor și conținutul cinematografic lifestyle.",
      },
    },
    // Footer
    footer: {
      followUs: "URMĂRIȚI-NE",
      rights: "Toate drepturile rezervate",
    },
    // Contact page
    contact: {
      title: "CONTACT",
      description: "Contactați-ne pentru a discuta despre proiectul dvs",
      workLocations: "Locații de lucru",
      ukraine: "Ucraina",
      ukraineDesc: "Disponibil pentru proiecte în Kiev și în toată Ucraina",
      moldova: "Moldova",
      moldovaDesc: "Disponibil pentru proiecte în Chișinău și în toată Moldova",
      serviceCapabilities: "Capacitățile noastre",
      photography: "Fotografie",
      videography: "Videografie",
      events: "Evenimente",
      contactInfo: "Informații de contact",
      email: "Email",
      phone: "Telefon",
      location: "Locație",
      ready: "Gata să începeți proiectul?",
      reachOut:
        "Contactați-ne pe social media pentru a discuta detaliile proiectului. Suntem cu sediul în Ucraina și Moldova.",
      followSocials: "Urmăriți pe Instagram",
    },
    // Work/Project page
    work: {
      creator: "Creator",
      location: "Locație",
      category: "Categorie",
      about: "Despre acest proiect",
      gallery: "Galerie",
      notFound: "Proiect negăsit",
      goBack: "Înapoi",
      projectDescription:
        "Această {category} {type} a fost filmată în {location}. Echipa noastră a captat imagini uimitoare care demonstrează calitate profesională și excelență creativă.",
      videoProduction: "producție video",
      photoSession: "sesiune foto",
      interested: "Vă interesează lucrări similare?",
      followUs:
        "Urmăriți-ne pe social media pentru a vedea mai multe din lucrările noastre creative și pentru a fi la curent cu cele mai recente proiecte.",
      viewAllWorks: "Vezi toate lucrările",
    },
    // Works page
    works: {
      title: "LUCRĂRILE NOASTRE",
      description: "Explorați portofoliul complet de fotografie și videografie",
      backToWorks: "Înapoi la lucrări",
      noResults: "Nu s-au găsit proiecte care să corespundă filtrelor dvs",
    },
    // About page
    about: {
      title: "DESPRE NOI",
      description:
        "DVSY este un studio creativ premium care se specializează în fotografie și videografie de înaltă calitate. Ne-am dedicat capturării momentelor care povestesc istorii și creează impresii durabile. Echipa noastră de doi creatori talentați aduce perspective unice și excelență tehnică la fiecare proiect.",
      storyTitle: "Povestea Noastră",
      storyText:
        "Fondată cu pasiune pentru povestitul vizual, DVSY a apărut din colaborarea a doi creativi talentați care împărtășesc o viziune a excelență. Fiecare proiect este o oportunitate de a împinge limitele creative și de a furniza o muncă care depășește așteptările.",
      storyTextSecond:
        "Fie că este fotografie de modă, cinematică automobilă, documentare a stilului de viață sau acoperire de evenimente, abordam fiecare sarcină cu același nivel de dedicație și artă care ne-a câștigat recunoașterea în industrie.",
      advantagesTitle: "Avantajele Noastre",
      independentDesigners: "Designeri Independenți",
      independentDesignersDesc:
        "Echipa noastră aduce o gamă diversă de perspective independente și abordări creative la fiecare proiect.",
      exclusiveUniqueness: "Exclusivitate & Unicitate",
      exclusiveUniquenessDesc:
        "Ne concentrăm pe crearea de conținut exclusiv care iese în evidență și reflectă identitatea unică a mărcii dvs.",
      highQuality: "Calitate Înaltă",
      highQualityDesc: "Fiecare cadru este realizat cu atenție la detalii și standarde profesionale.",
    },
  },
}

// Hook to use translations in components
export const useTranslation = (language: Language) => {
  return translations[language]
}
