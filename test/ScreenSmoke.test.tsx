import { fireEvent, screen } from '@testing-library/react'
import { afterEach } from 'vitest'
import HomeScreen from '../components/HomeScreen'
import ToursScreen from '../components/ToursScreen'
import MyBookingScreen from '../components/MyBookingScreen'
import ContactScreen from '../components/ContactScreen'
import AdminDashboard from '../components/admin/AdminDashboard'
import ItineraryBuilder from '../components/admin/ItineraryBuilder'
import { featuredTour, tours } from '../lib/mock-data/tours'
import { withProvider } from './helpers'

const originalLocalizedTitle = Object.getOwnPropertyDescriptor(tours[0], 'localizedTitle')
const originalLocalizedSubtitle = Object.getOwnPropertyDescriptor(featuredTour, 'localizedSubtitle')

afterEach(() => {
  if (originalLocalizedTitle) Object.defineProperty(tours[0], 'localizedTitle', originalLocalizedTitle)
  else delete tours[0].localizedTitle
  if (originalLocalizedSubtitle) Object.defineProperty(featuredTour, 'localizedSubtitle', originalLocalizedSubtitle)
  else delete featuredTour.localizedSubtitle
})

describe('screen smoke coverage', () => {
  it('switches the HomeScreen hero slide', () => {
    const { container } = withProvider(<HomeScreen />)
    const hero = container.querySelector<HTMLElement>('.hero-slide')!
    expect(hero.style.backgroundImage).toContain('photo-1551269901')
    fireEvent.click(screen.getByRole('button', { name: 'Show slide 2' }))
    expect(hero.style.backgroundImage).toContain('photo-1509316785289')
  })

  it('uses localized values when present and falls back when absent', () => {
    tours[0].localizedTitle = { kr: '현지화된 투어' }
    tours[0].localizedSubtitle = { kr: '현지화된 설명' }

    const toursView = withProvider(<ToursScreen />)
    expect(screen.getByRole('heading', { name: '현지화된 투어' })).toBeInTheDocument()
    expect(screen.getByText('현지화된 설명')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('heading', { name: tours[0].title })).toBeInTheDocument()
    toursView.unmount()

    const bookingView = withProvider(<MyBookingScreen />)
    expect(screen.getByRole('heading', { name: '현지화된 투어' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('heading', { name: tours[0].title })).toBeInTheDocument()
    bookingView.unmount()

    withProvider(<HomeScreen />)
    expect(screen.getByText('현지화된 설명')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByText(featuredTour.subtitle)).toBeInTheDocument()
  })

  it('renders and localizes every tour card', () => {
    const { container } = withProvider(<ToursScreen />)
    expect(container.querySelectorAll('.tour-card')).toHaveLength(3)
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByText('4-Day Gobi Express & Camel Trekking')).toBeInTheDocument()
  })

  it('renders booking, contact, dashboard, and builder screens', () => {
    const booking = withProvider(<MyBookingScreen />)
    expect(screen.getByText('JIN-2026-08421')).toBeInTheDocument()
    booking.unmount()
    const contact = withProvider(<ContactScreen />)
    expect(screen.getByText('hello@jintravel.mn')).toBeInTheDocument()
    contact.unmount()
    const dashboard = withProvider(<AdminDashboard />)
    expect(screen.getByRole('heading', { name: '대시보드' })).toBeInTheDocument()
    dashboard.unmount()
    withProvider(<ItineraryBuilder />)
    expect(screen.getByRole('heading', { name: /수정 사항은 고객 화면에 즉시 반영/ })).toBeInTheDocument()
  })
})
