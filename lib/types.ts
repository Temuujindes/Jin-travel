export type Language = 'mn' | 'kr' | 'en'
export type TourStatus = 'active' | 'draft'
export type LocalizedText = Partial<Record<Language, string>> & { ko?: string }

export interface ItineraryDay { day: number; title: string; distance?: string; meals: string[]; accommodation: string; activities: string[]; image: string; descriptions?: LocalizedText }
export interface Tour { id?: string; slug: string; badge: string; title: string; subtitle: string; duration: string; priceUsd: number; priceMnt: string; rating: number; reviews: number; tags: string[]; image: string; gallery: string[]; itinerary: ItineraryDay[]; localizedTitle?: LocalizedText; localizedSubtitle?: LocalizedText; status?: TourStatus; featured?: boolean }
export interface Booking { reference: string; tourSlug: string; status: string; date: string; travelers: number; total: number }
export interface Inquiry { id: string; customer: string; tour: string; kakao: string; date: string; status: string }
export interface DashboardMetrics { totalBookings: number; monthlyBookings: number; revenue: number; activeTours: number; bookingTrend: string; revenueTrend: string; tourTrend: string }
export interface AnalyticsPoint { name: string; value: number }