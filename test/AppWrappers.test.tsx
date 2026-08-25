import React from 'react'
import { screen } from '@testing-library/react'
import { vi } from 'vitest'
import HomeScreen from '../components/HomeScreen'
import ToursScreen from '../components/ToursScreen'
import ContactScreen from '../components/ContactScreen'
import MyBookingScreen from '../components/MyBookingScreen'
import TourDetailScreen from '../components/TourDetailScreen'
import BookingFlow from '../components/BookingFlow'
import AdminDashboard from '../components/admin/AdminDashboard'
import TourManagement from '../components/admin/TourManagement'
import ItineraryBuilder from '../components/admin/ItineraryBuilder'
import AnalyticsScreen from '../components/admin/AnalyticsScreen'
import InquiriesScreen from '../components/admin/InquiriesScreen'
import { LanguageProvider } from '../components/LanguageContext'
import RootLayout from '../app/layout'
import HomePage from '../app/page'
import ContactPage from '../app/contact/page'
import BookingPage from '../app/my-booking/page'
import ToursPage from '../app/tours/page'
import TourPage from '../app/tours/[slug]/page'
import TourBookingPage from '../app/tours/[slug]/book/page'
import DashboardPage from '../app/dashboard/page'
import DashboardLayout from '../app/dashboard/layout'
import AnalyticsPage from '../app/dashboard/analytics/page'
import InquiriesPage from '../app/dashboard/inquiries/page'
import ToursDashboardPage from '../app/dashboard/tours/page'
import BuilderPage from '../app/dashboard/tours/builder/page'
import { AdminShell } from '../components/admin/AdminShell'
import { withProvider } from './helpers'

const wrapperMocks = vi.hoisted(() => ({
  tourFindMany: vi.fn(),
  tourFindUnique: vi.fn(),
  tourFindFirst: vi.fn(),
  tourCount: vi.fn(),
  bookingFindFirst: vi.fn(),
  bookingCount: vi.fn(),
  bookingAggregate: vi.fn(),
  bookingFindMany: vi.fn(),
  bookingGroupBy: vi.fn(),
}))

vi.mock('../lib/db', () => {
  const tour = {
    id: 'tour-wrapper',
    slug: 'gobi-4d',
    titleMn: 'Говийн аялал',
    titleKr: '고비 여행',
    titleEn: 'Gobi journey',
    subtitleMn: 'Говийн аялал',
    subtitleKr: '고비 여행',
    subtitleEn: 'Gobi journey',
    badge: 'Featured',
    duration: '4 days',
    priceUsd: 580,
    priceMnt: '₮1',
    rating: 4.9,
    reviews: 1,
    tags: [],
    mainImage: 'hero',
    gallery: ['hero'],
    status: 'active',
    featured: true,
    itineraryDays: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return {
    prisma: {
      tour: {
        findMany: wrapperMocks.tourFindMany.mockResolvedValue([tour]),
        findUnique: wrapperMocks.tourFindUnique.mockResolvedValue(tour),
        findFirst: wrapperMocks.tourFindFirst.mockResolvedValue(tour),
        count: wrapperMocks.tourCount.mockResolvedValue(1),
      },
      booking: {
        count: wrapperMocks.bookingCount.mockResolvedValue(1),
        aggregate: wrapperMocks.bookingAggregate.mockResolvedValue({ _sum: { totalPrice: 1160 } }),
        findFirst: wrapperMocks.bookingFindFirst.mockResolvedValue({
          id: 'booking-wrapper',
          tourId: tour.id,
          customerName: 'Ada',
          contact: '@ada',
          startDate: new Date('2026-09-14T00:00:00.000Z'),
          travelers: 2,
          specialRequest: null,
          status: 'Шинэ',
          totalPrice: 1160,
          referenceCode: 'JIN-2026-08421',
          createdAt: new Date(),
          tour,
        }),
        findMany: wrapperMocks.bookingFindMany.mockResolvedValue([{
          id: 'booking-wrapper',
          tourId: tour.id,
          customerName: 'Ada',
          contact: '@ada',
          startDate: new Date('2026-09-14T00:00:00.000Z'),
          travelers: 2,
          specialRequest: null,
          status: 'Шинэ',
          totalPrice: 1160,
          referenceCode: 'JIN-2026-08421',
          createdAt: new Date(),
          tour,
        }]),
        groupBy: wrapperMocks.bookingGroupBy.mockResolvedValue([{ tourId: tour.id, _count: { tourId: 1 } }]),
      },
    },
  }
})

describe('App Router page wrappers', () => {
  it('points each route wrapper at its screen component', async () => {
    expect((await HomePage()).type).toBe(HomeScreen)
    expect(ContactPage().type).toBe(ContactScreen)
    expect((await BookingPage()).type).toBe(MyBookingScreen)
    expect((await ToursPage()).type).toBe(ToursScreen)
    expect((await TourPage({ params: Promise.resolve({ slug: 'gobi-4d' }) })).type).toBe(TourDetailScreen)
    const bookingRoute = await TourBookingPage({ params: Promise.resolve({ slug: 'gobi-4d' }) })
    expect(bookingRoute.type).toBe(BookingFlow)
    expect(bookingRoute.props.tourId).toBe('tour-wrapper')
    expect((await DashboardPage()).type).toBe(AdminDashboard)
    wrapperMocks.bookingFindMany.mockResolvedValueOnce([])
    const zeroRevenueDashboard = await DashboardPage()
    expect(zeroRevenueDashboard.props.metrics.revenue).toBe(0)
    expect((await AnalyticsPage()).type).toBe(AnalyticsScreen)
    const inquiriesRoute = await InquiriesPage()
    expect(inquiriesRoute.type).toBe(InquiriesScreen)
    const inquiries = withProvider(<InquiriesScreen inquiries={[]} />)
    expect(screen.getByRole('heading', { name: '문의 관리' })).toBeInTheDocument()
    inquiries.unmount()
    expect((await ToursDashboardPage()).type).toBe(TourManagement)
    expect((await BuilderPage({ searchParams: Promise.resolve({ tour: 'gobi-4d' }) })).type).toBe(ItineraryBuilder)
    expect((await BuilderPage({ searchParams: Promise.resolve({}) })).type).toBe(ItineraryBuilder)
    wrapperMocks.tourFindFirst.mockResolvedValueOnce(null)
    const emptyBuilder = await BuilderPage({ searchParams: Promise.resolve({}) })
    expect(emptyBuilder.props.initialTour).toMatchObject({ id: '', itinerary: [] })
    const dashboardLayout = DashboardLayout({ children: <span /> })
    expect(dashboardLayout.type).toBe(LanguageProvider)
    expect(dashboardLayout.props.defaultLanguage).toBe('mn')
  })

  it('wraps children in the root language provider and document shell', () => {
    const result = RootLayout({ children: <span>child</span> })
    expect(result.type).toBe('html')
    expect(result.props.lang).toBe('ko')
    expect(result.props.children.type).toBe('body')
    expect(result.props.children.props.children.type).toBe(LanguageProvider)
  })

  it('renders the empty booking state when no booking exists', async () => {
    wrapperMocks.bookingFindFirst.mockResolvedValueOnce(null)
    const result = await BookingPage()
    expect(result.props.booking).toBeNull()
    expect(result.props.tour).toBeNull()
  })

  it('uses notFound for an unknown tour slug', async () => {
    wrapperMocks.tourFindUnique.mockResolvedValueOnce(null)
    await expect(TourPage({ params: Promise.resolve({ slug: 'missing' }) })).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404')
    wrapperMocks.tourFindUnique.mockResolvedValueOnce(null)
    await expect(TourBookingPage({ params: Promise.resolve({ slug: 'missing' }) })).rejects.toThrow('NEXT_HTTP_ERROR_FALLBACK;404')
  })

  it('uses tour IDs when analytics has no matching title row', async () => {
    wrapperMocks.bookingGroupBy.mockResolvedValueOnce([{ tourId: 'missing-tour', _count: { tourId: 2 } }])
    wrapperMocks.tourFindMany.mockResolvedValueOnce([])
    const result = await AnalyticsPage()
    expect(result.props.popular).toEqual([{ name: 'missing-tour', value: 2 }])
  })
})
