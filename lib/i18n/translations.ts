import { Language } from '../types'

export const translations: Record<Language, Record<string, string>> = {
  mn: {
    home: 'Нүүр', tours: 'Аялал', booking: 'Миний захиалга', contact: 'Холбоо барих', featured: 'Монголыг нээцгээе', detail: 'Дэлгэрэнгүй', book: 'Захиалах', chat: 'KakaoTalk холболт', languageSelector: 'Хэл сонгох', viewAll: 'Бүгдийг харах', curated: 'Сонгосон аяллууд', makeYours: 'Өөрийн аяллаа бүтээ', slower: 'Дэлхийг удаан хэмнэлээр үзээрэй.', gobiTours: 'Говийн аялал', kakaoChat: 'Kakao чат', bookingRequest: 'Захиалгын хүсэлт', customerRating: 'Хэрэглэгчийн үнэлгээ', travelers: 'Аялагчид', localGuides: 'Орон нутгийн хөтөч', privateJourneys: 'Хувийн 4x4 аялал', collection: 'Аяллын цуглуулга', roomToBreathe: 'Амьсгалах зайтай аяллууд.', exploreTour: 'Аяллыг үзэх', route: 'Маршрут', meals: 'Хоол', stay: 'Буудал', back: 'Буцах', saveTour: 'Аяллыг хадгалах', shareTour: 'Хуваалцах', perPerson: '/ хүн', tripDetails: 'Аяллын мэдээлэл', startDate: 'Эхлэх өдөр', continue: 'Үргэлжлүүлэх', yourDetails: 'Таны мэдээлэл', customerName: 'Хэрэглэгчийн нэр', kakaoId: 'KakaoTalk ID / Утас', specialRequest: 'Нэмэлт хүсэлт', optional: '(заавал биш)', sendRequest: 'Хүсэлт илгээх', bookingComplete: 'Захиалгын хүсэлт амжилттай!', managerMessage: 'Менежер 15 минутын дотор KakaoTalk-аар холбогдох болно.', reference: 'Лавлах дугаар', myJourney: 'Таны аялал', requestSubmitted: 'Хүсэлт илгээгдсэн', managerContact: 'Менежертэй холбогдох', bookingConfirmation: 'Захиалга баталгаажуулах', trip: 'Аялал', within15: '15 минутын дотор KakaoTalk-аар', planVast: 'Өргөн уудам газрыг хамт төлөвлөе.', responseTime: 'Хариу өгөх хугацаа', office: 'Оффис', within15Full: 'KakaoTalk-аар 15 минутын дотор', openBuilder: 'Builder нээх', quickAction: 'Шуурхай үйлдэл', updateItinerary: 'Аяллын хөтөлбөрөө шинэчилнэ үү', editAll: 'Аяллын өдөр, зураг, хэл бүрийн мэдээллээ нэг дор засна уу.', workspace: 'АЖЛЫН ОРЧИН', dashboard: 'Хяналтын самбар', tourPackages: 'Аяллын багц', itineraryBuilder: 'Itinerary Builder', inquiries: 'Ирсэн хүсэлт', analytics: 'Analytics', workspaceOwner: 'Ажлын орчны эзэмшигч', latestActivity: 'Сүүлийн үйл ажиллагаа', recentInquiries: 'Сүүлийн хүсэлтүүд', allInquiries: 'Бүгдийг харах', customer: 'Хэрэглэгч', tour: 'Аялал', date: 'Огноо', status: 'Төлөв', atAGlance: 'Товч тойм', monthlyFocus: 'Энэ сарын анхаарах зүйл', inquiryConversion: 'Хүсэлтийн хөрвөлт', response15: '15 минутад хариулсан', viewAnalytics: 'Analytics үзэх', catalog: 'Каталог', manageTours: 'Аяллын мэдээлэл, үнэ болон нийтлэлийн төлөвийг удирдах', addTour: 'Шинэ аялал нэмэх', searchTours: 'Аялал хайх...', all: 'Бүгд', active: 'Идэвхтэй', draft: 'Ноорог', journeys: 'аялал', updatedRecently: 'Сүүлд шинэчилсэн', makeDraft: 'Ноорог болгох', publish: 'Нийтлэх', edit: 'Засах', catalogEntry: 'Каталогийн бүртгэл', newTour: 'Шинэ аялал', save: 'Хадгалах', cancel: 'Цуцлах', description: 'Тайлбар', duration: 'Үргэлжлэх хугацаа', priceUsd: 'USD үнэ', mainImage: 'Үндсэн зураг', performance: 'Гүйцэтгэл', businessGrowth: 'Аяллын бизнесийн өсөлтөө нэг дороос харах', yearToDate: '2026 · Оны эхнээс', lastQuarter: 'Сүүлийн улирал', audience: 'Зорилтот үзэгч', trafficMarket: 'Зах зээлийн хандалт', demand: 'Эрэлт', popularTours: 'Эрэлттэй аяллууд', inquiriesGrowth: 'Хүсэлтийн өсөлт', livePreview: 'Шууд гар утасны харагдац', journeyEditor: 'Аяллын редактор / Ноорог', editJourney: 'Аяллын мэдээллийг засах үед хэрэглэгчийн харагдац шууд шинэчлэгдэнэ.', generalInfo: 'Ерөнхий мэдээлэл', dayByDay: 'Өдрөөр', addDay: 'Өдөр нэмэх', title: 'Гарчиг', routeLabel: 'Чиглэл', accommodation: 'Буудал', breakfast: 'Өглөө', lunch: 'Өдөр', dinner: 'Орой', uploadImage: 'Зураг энд чирж оруулна уу', chooseImage: 'Зураг сонгох', imageLimit: 'PNG, JPG · 10MB хүртэл', live: 'Шууд', korea: 'Солонгос', share: 'эзлэх хувь', response: 'Хариу' },
  kr: {
    home: '홈', tours: '투어', booking: '내 예약', contact: '문의', featured: '인기 몽골 여행', detail: '자세히 보기', book: '예약 신청', chat: '카카오톡 문의', languageSelector: '언어 선택', viewAll: '전체 보기', curated: '큐레이션 여행', makeYours: '나만의 여행 만들기', slower: '세상을 조금 천천히 만나보세요.', gobiTours: '고비 투어', kakaoChat: '카카오톡 채팅', bookingRequest: '예약 문의', customerRating: '고객 평점', travelers: '여행자', localGuides: '현지 가이드', privateJourneys: '프라이빗 4x4 여행', collection: '여행 컬렉션', roomToBreathe: '숨 쉴 여백이 있는 여행.', exploreTour: '투어 보기', route: '일정', meals: '식사', stay: '숙소', back: '뒤로', saveTour: '투어 저장', shareTour: '공유', perPerson: '/ 1인', tripDetails: '여행 정보', startDate: '출발일', continue: '계속하기', yourDetails: '고객 정보', customerName: '고객 이름', kakaoId: '카카오톡 ID / 전화번호', specialRequest: '특별 요청', optional: '(선택)', sendRequest: '문의 보내기', bookingComplete: '예약 문의가 완료되었습니다!', managerMessage: '매니저가 15분 이내에 카카오톡으로 연락드립니다.', reference: '문의 번호', myJourney: '나의 여행', requestSubmitted: '문의 접수', managerContact: '매니저 연락', bookingConfirmation: '예약 확정', trip: '여행', within15: '카카오톡으로 15분 이내', planVast: '광활한 곳으로 떠날 준비를 해요.', responseTime: '응답 시간', office: '오피스', within15Full: '카카오톡 15분 이내', openBuilder: '빌더 열기', quickAction: '빠른 실행', updateItinerary: '여행 일정을 업데이트하세요', editAll: '일정, 사진, 다국어 정보를 한 곳에서 관리하세요.', workspace: 'WORKSPACE', dashboard: '대시보드', tourPackages: '투어 패키지', itineraryBuilder: '일정 빌더', inquiries: '문의 관리', analytics: '분석', workspaceOwner: '워크스페이스 소유자', latestActivity: '최근 활동', recentInquiries: '최근 문의', allInquiries: '전체 문의', customer: '고객', tour: '투어', date: '날짜', status: '상태', atAGlance: '한눈에 보기', monthlyFocus: '이번 달 주요 지표', inquiryConversion: '문의 전환율', response15: '15분 내 응답', viewAnalytics: '분석 보기', catalog: '카탈로그', manageTours: '투어 정보, 가격 및 게시 상태 관리', addTour: '새 투어 추가', searchTours: '투어 검색...', all: '전체', active: '활성', draft: '초안', journeys: '개 투어', updatedRecently: '최근 업데이트', makeDraft: '초안으로 변경', publish: '게시', edit: '수정', catalogEntry: '카탈로그 항목', newTour: '새 투어', save: '저장', cancel: '취소', description: '설명', duration: '기간', priceUsd: 'USD 가격', mainImage: '대표 이미지', performance: '성과', businessGrowth: '여행 비즈니스 성장을 한눈에 확인하세요', yearToDate: '2026 · 올해 누적', lastQuarter: '지난 분기', audience: '고객 구성', trafficMarket: '시장별 트래픽', demand: '수요', popularTours: '인기 투어', inquiriesGrowth: '문의 성장', livePreview: '모바일 미리보기', journeyEditor: '투어 편집기 / 초안', editJourney: '수정 사항은 고객 화면에 즉시 반영됩니다.', generalInfo: '기본 정보', dayByDay: '일정별 편집', addDay: '일정 추가', title: '제목', routeLabel: '경로', accommodation: '숙소', breakfast: '아침', lunch: '점심', dinner: '저녁', uploadImage: '이미지를 여기에 끌어다 놓으세요', chooseImage: '이미지 선택', imageLimit: 'PNG, JPG · 최대 10MB', live: '실시간', korea: '한국', share: '비중', response: '응답' },
  en: {
    home: 'Home', tours: 'Tours', booking: 'My Booking', contact: 'Contact', featured: 'Mongolia, considered', detail: 'Explore tour', book: 'Request to book', chat: 'Talk on KakaoTalk', languageSelector: 'Select language', viewAll: 'View all', curated: 'Curated journeys', makeYours: 'Make it yours', slower: 'A slower way to see the world.', gobiTours: 'Gobi tours', kakaoChat: 'Kakao chat', bookingRequest: 'Booking request', customerRating: 'Customer rating', travelers: 'Travelers welcomed', localGuides: 'Local Mongolian guides', privateJourneys: 'Private 4x4 journeys', collection: 'The collection', roomToBreathe: 'Journeys with room to breathe.', exploreTour: 'Explore tour', route: 'The route', meals: 'Meals', stay: 'Stay', back: 'Back', saveTour: 'Save tour', shareTour: 'Share tour', perPerson: '/ person', tripDetails: 'Trip details', startDate: 'Start date', continue: 'Continue', yourDetails: 'Your details', customerName: 'Customer name', kakaoId: 'KakaoTalk ID / Phone', specialRequest: 'Special request', optional: '(optional)', sendRequest: 'Send request', bookingComplete: 'Booking request complete!', managerMessage: 'A manager will contact you on KakaoTalk within 15 minutes.', reference: 'Reference', myJourney: 'Your journey', requestSubmitted: 'Request submitted', managerContact: 'Manager contact', bookingConfirmation: 'Booking confirmation', trip: 'Trip', within15: 'Within 15 minutes on KakaoTalk', responseTime: 'Response time', office: 'Office', within15Full: 'Within 15 minutes on KakaoTalk', openBuilder: 'Open builder', quickAction: 'Quick action', updateItinerary: 'Update your itinerary', editAll: 'Edit days, photos, and multilingual content in one place.', workspace: 'WORKSPACE', dashboard: 'Overview', tourPackages: 'Tour packages', itineraryBuilder: 'Itinerary Builder', inquiries: 'Inquiries', analytics: 'Analytics', workspaceOwner: 'Workspace owner', latestActivity: 'Latest activity', recentInquiries: 'Recent inquiries', allInquiries: 'All inquiries', customer: 'Customer', tour: 'Tour', date: 'Date', status: 'Status', atAGlance: 'At a glance', monthlyFocus: 'This month to watch', inquiryConversion: 'Inquiry conversion', response15: 'Response within 15 min', viewAnalytics: 'View analytics', catalog: 'Catalog', manageTours: 'Manage tour information, pricing, and publishing', addTour: 'Add new tour', searchTours: 'Search tours...', all: 'All', active: 'Active', draft: 'Draft', journeys: 'journeys', updatedRecently: 'Updated recently', makeDraft: 'Make draft', publish: 'Publish', edit: 'Edit', catalogEntry: 'Catalog entry', newTour: 'New tour', save: 'Save', cancel: 'Cancel', description: 'Description', duration: 'Duration', priceUsd: 'Price USD', mainImage: 'Main image', performance: 'Performance', businessGrowth: 'See your travel business growth in one place', yearToDate: '2026 · Year to date', lastQuarter: 'Last quarter', audience: 'Audience', trafficMarket: 'Traffic by market', demand: 'Demand', popularTours: 'Popular tours', inquiriesGrowth: 'Inquiry growth', livePreview: 'Live mobile preview', journeyEditor: 'Tour editor / Draft', editJourney: 'Customer-facing content updates instantly as you edit.', generalInfo: 'General information', dayByDay: 'Day by day', addDay: 'Add day', title: 'Title', routeLabel: 'Route', accommodation: 'Accommodation', breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', uploadImage: 'Drag an image here', chooseImage: 'Choose image', imageLimit: 'PNG, JPG · up to 10MB', live: 'Live', korea: 'Korea', share: 'share', response: 'response' },
}

Object.assign(translations.mn, {
  invalidName: 'Нэр болон холбоо барих мэдээллээ оруулна уу.',
  invalidTravelers: 'Дор хаяж нэг аялагч шаардлагатай.',
  invalidDate: 'Эхлэх өдрийг зөв оруулна уу.',
  tourNotFound: 'Сонгосон аялал олдсонгүй.',
  bookingFailed: 'Захиалга илгээгдсэнгүй. Дахин оролдоно уу.',
  loadError: 'Мэдээллийг ачаалж чадсангүй.',
  tryAgain: 'Дахин оролдох',
  notFoundTitle: 'Энэ аялал олдсонгүй.',
  notFoundMessage: 'Таны хүссэн хуудас ашиглах боломжгүй байна.',
  duplicateSlug: 'Ийм нэртэй аялал аль хэдийн байна.',
  invalidTitle: 'Аяллын нэрийг оруулна уу.',
  invalidPrice: 'Зөв үнэ оруулна уу.',
  createFailed: 'Аяллыг үүсгэж чадсангүй. Дахин оролдоно уу.',
  saveFailed: 'Аяллын хөтөлбөрийг хадгалж чадсангүй. Дахин оролдоно уу.',
  statusUpdateFailed: 'Төлөвийг шинэчилж чадсангүй. Дахин оролдоно уу.',
  unauthorized: 'Админ сесс дууссан байна. Дахин нэвтэрнэ үү.',
  adminLoginTitle: 'Тавтай морилно уу',
  adminLoginDescription: 'Аяллуудаа удирдахын тулд нэвтэрнэ үү.',
  email: 'Имэйл',
  password: 'Нууц үг',
  signIn: 'Нэвтрэх',
  signingIn: 'Нэвтэрч байна...',
  invalidCredentials: 'Имэйл эсвэл нууц үг буруу байна.',
  logout: 'Гарах',
  invalidImage: 'Зөвхөн зургийн файл сонгоно уу.',
  imageTooLarge: 'Зургийн хэмжээ 10MB-ээс хэтэрсэн байна.',
  uploadFailed: 'Зургийг байршуулж чадсангүй. Дахин оролдоно уу.',
  noInquiries: 'Одоогоор ирсэн хүсэлт алга байна.',
  noAnalyticsData: 'Одоогоор харуулах мэдээлэл алга байна.',
  noBooking: 'Танд одоогоор захиалга алга байна.',
})

Object.assign(translations.kr, {
  invalidName: '이름과 연락처를 입력해주세요.',
  invalidTravelers: '여행자는 한 명 이상이어야 합니다.',
  invalidDate: '유효한 출발일을 입력해주세요.',
  tourNotFound: '선택한 투어를 찾을 수 없습니다.',
  bookingFailed: '예약을 접수하지 못했습니다. 다시 시도해주세요.',
  loadError: '정보를 불러오지 못했습니다.',
  tryAgain: '다시 시도',
  notFoundTitle: '이 여행을 찾을 수 없습니다.',
  notFoundMessage: '요청하신 페이지를 이용할 수 없습니다.',
  duplicateSlug: '같은 이름의 투어가 이미 있습니다.',
  invalidTitle: '투어 제목을 입력해주세요.',
  invalidPrice: '유효한 가격을 입력해주세요.',
  createFailed: '투어를 만들지 못했습니다. 다시 시도해주세요.',
  saveFailed: '일정을 저장하지 못했습니다. 다시 시도해주세요.',
  statusUpdateFailed: '상태를 변경하지 못했습니다. 다시 시도해주세요.',
  unauthorized: '관리자 세션이 만료되었습니다. 다시 로그인해주세요.',
  adminLoginTitle: '다시 오신 것을 환영합니다',
  adminLoginDescription: '여행을 관리하려면 로그인해주세요.',
  email: '이메일',
  password: '비밀번호',
  signIn: '로그인',
  signingIn: '로그인 중...',
  invalidCredentials: '이메일 또는 비밀번호가 올바르지 않습니다.',
  logout: '로그아웃',
  invalidImage: '이미지 파일만 선택해주세요.',
  imageTooLarge: '이미지 크기는 10MB를 초과할 수 없습니다.',
  uploadFailed: '이미지를 업로드하지 못했습니다. 다시 시도해주세요.',
  noInquiries: '현재 접수된 문의가 없습니다.',
  noAnalyticsData: '현재 표시할 데이터가 없습니다.',
  noBooking: '현재 예약이 없습니다.',
})

Object.assign(translations.en, {
  invalidName: 'Please enter your name and contact details.',
  invalidTravelers: 'At least one traveler is required.',
  invalidDate: 'Please enter a valid start date.',
  tourNotFound: 'The selected tour could not be found.',
  bookingFailed: 'The booking could not be submitted. Please try again.',
  loadError: 'We could not load this information.',
  tryAgain: 'Try again',
  notFoundTitle: 'This journey could not be found.',
  notFoundMessage: 'The page you requested is no longer available.',
  duplicateSlug: 'A tour with this title already exists.',
  invalidTitle: 'Please enter a tour title.',
  invalidPrice: 'Please enter a valid price.',
  createFailed: 'The tour could not be created. Please try again.',
  saveFailed: 'The itinerary could not be saved. Please try again.',
  statusUpdateFailed: 'The tour status could not be updated. Please try again.',
  unauthorized: 'Your admin session has expired. Please sign in again.',
  adminLoginTitle: 'Welcome back',
  adminLoginDescription: 'Sign in to manage your journeys.',
  email: 'Email',
  password: 'Password',
  signIn: 'Sign in',
  signingIn: 'Signing in...',
  invalidCredentials: 'The email or password is incorrect.',
  logout: 'Sign out',
  invalidImage: 'Please choose an image file.',
  imageTooLarge: 'Images must be 10MB or smaller.',
  uploadFailed: 'The image could not be uploaded. Please try again.',
  noInquiries: 'There are no inquiries yet.',
  noAnalyticsData: 'There is no data to display yet.',
  noBooking: 'You do not have a booking yet.',
})

Object.assign(translations.mn, {
  myBooking: 'Миний захиалга',
  footerTagline: 'Монголын уудам нутгийг өөрийн хэмнэлээр аялцгаая.',
  allRightsReserved: 'Бүх эрх хуулиар хамгаалагдсан.',
})

Object.assign(translations.kr, {
  myBooking: '내 예약',
  footerTagline: '몽골의 광활한 풍경을 나만의 속도로 여행하세요.',
  allRightsReserved: 'All rights reserved.',
})

Object.assign(translations.en, {
  myBooking: 'My Booking',
  footerTagline: 'Explore the wide-open spaces of Mongolia at your own pace.',
  allRightsReserved: 'All rights reserved.',
})