import { fireEvent, screen } from '@testing-library/react'
import HomeScreen from '../components/HomeScreen'
import ToursScreen from '../components/ToursScreen'
import MyBookingScreen from '../components/MyBookingScreen'
import ContactScreen from '../components/ContactScreen'
import AdminDashboard from '../components/admin/AdminDashboard'
import ItineraryBuilder from '../components/admin/ItineraryBuilder'
import { fixtureBooking, fixtureTour } from './fixtures'
import { withProvider } from './helpers'

describe('screen smoke coverage', () => {
  it('switches the HomeScreen hero slide', () => {
    const { container } = withProvider(<HomeScreen tours={[fixtureTour]} featuredTour={fixtureTour} />)
    const hero = container.querySelector<HTMLElement>('.hero-slide')!
    expect(hero.style.backgroundImage).toContain('photo-1551269901')
    fireEvent.click(screen.getByRole('button', { name: 'Show slide 2' }))
    expect(hero.style.backgroundImage).toContain('photo-1509316785289')
  })

  it('renders the home collection without a featured hero', () => {
    const { container } = withProvider(<HomeScreen tours={[]} />)
    expect(container.querySelector('.hero')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.tour-card')).toHaveLength(0)
  })

  it('uses localized values when present and falls back when absent', () => {
    const localizedTour = { ...fixtureTour, localizedTitle: { kr: '현지화된 투어' }, localizedSubtitle: { kr: '현지화된 설명' } }

    const toursView = withProvider(<ToursScreen tours={[localizedTour]} />)
    expect(screen.getByRole('heading', { name: '현지화된 투어' })).toBeInTheDocument()
    expect(screen.getByText('현지화된 설명')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('heading', { name: localizedTour.title })).toBeInTheDocument()
    toursView.unmount()

    const bookingView = withProvider(<MyBookingScreen booking={fixtureBooking} tour={localizedTour} />)
    expect(screen.getByRole('heading', { name: '현지화된 투어' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('heading', { name: localizedTour.title })).toBeInTheDocument()
    bookingView.unmount()

    withProvider(<HomeScreen tours={[localizedTour]} featuredTour={localizedTour} />)
    expect(screen.getByText('현지화된 설명')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByText(localizedTour.subtitle)).toBeInTheDocument()
  })

  it('renders and localizes every tour card', () => {
    const tours = [fixtureTour, { ...fixtureTour, slug: 'gobi-ultimate-6d' }, { ...fixtureTour, slug: 'khuvsgul-3d' }]
    const { container } = withProvider(<ToursScreen tours={tours} />)
    expect(container.querySelectorAll('.tour-card')).toHaveLength(3)
    fireEvent.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getAllByText('4-Day Gobi Express & Camel Trekking')).toHaveLength(3)
  })

  it('renders booking, contact, dashboard, and builder screens', () => {
    const booking = withProvider(<MyBookingScreen booking={fixtureBooking} tour={fixtureTour} />)
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

  it('renders an empty booking state without booking data', () => {
    withProvider(<MyBookingScreen booking={null} tour={null} />)
    expect(screen.getByRole('heading', { name: '내 예약' })).toBeInTheDocument()
    expect(screen.queryByText('JIN-2026-08421')).not.toBeInTheDocument()
  })
})
