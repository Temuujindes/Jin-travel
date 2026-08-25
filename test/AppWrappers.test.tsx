import React from 'react'
import { screen } from '@testing-library/react'
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
import { LanguageProvider } from '../components/LanguageContext'
import RootLayout from '../app/layout'
import HomePage from '../app/page'
import ContactPage from '../app/contact/page'
import BookingPage from '../app/my-booking/page'
import ToursPage from '../app/tours/page'
import TourPage from '../app/tours/[slug]/page'
import StaticTourPage from '../app/tours/gobi-4d/page'
import TourBookingPage from '../app/tours/gobi-4d/book/page'
import DashboardPage from '../app/dashboard/page'
import DashboardLayout from '../app/dashboard/layout'
import AnalyticsPage from '../app/dashboard/analytics/page'
import InquiriesPage from '../app/dashboard/inquiries/page'
import ToursDashboardPage from '../app/dashboard/tours/page'
import BuilderPage from '../app/dashboard/tours/builder/page'
import { AdminShell } from '../components/admin/AdminShell'
import { withProvider } from './helpers'

describe('App Router page wrappers', () => {
  it('points each route wrapper at its screen component', async () => {
    expect(HomePage().type).toBe(HomeScreen)
    expect(ContactPage().type).toBe(ContactScreen)
    expect(BookingPage().type).toBe(MyBookingScreen)
    expect(ToursPage().type).toBe(ToursScreen)
    expect((await TourPage({ params: Promise.resolve({ slug: 'gobi-4d' }) })).type).toBe(TourDetailScreen)
    expect(StaticTourPage().type).toBe(TourDetailScreen)
    expect(TourBookingPage().type).toBe(BookingFlow)
    expect(DashboardPage().type).toBe(AdminDashboard)
    expect(AnalyticsPage().type).toBe(AnalyticsScreen)
    const inquiries = withProvider(<InquiriesPage />)
    expect(screen.getByRole('heading', { name: '문의 관리' })).toBeInTheDocument()
    inquiries.unmount()
    expect(ToursDashboardPage().type).toBe(TourManagement)
    expect(BuilderPage().type).toBe(ItineraryBuilder)
    expect(DashboardLayout({ children: <span /> })).toEqual(<span />)
  })

  it('wraps children in the root language provider and document shell', () => {
    const result = RootLayout({ children: <span>child</span> })
    expect(result.type).toBe('html')
    expect(result.props.lang).toBe('ko')
    expect(result.props.children.type).toBe('body')
    expect(result.props.children.props.children.type).toBe(LanguageProvider)
  })
})
