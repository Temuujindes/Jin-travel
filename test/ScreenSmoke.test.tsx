import { fireEvent, screen } from '@testing-library/react'
import HomeScreen from '../components/HomeScreen'
import ToursScreen from '../components/ToursScreen'
import MyBookingScreen from '../components/MyBookingScreen'
import ContactScreen from '../components/ContactScreen'
import AdminDashboard from '../components/admin/AdminDashboard'
import ItineraryBuilder from '../components/admin/ItineraryBuilder'
import { withProvider } from './helpers'

describe('screen smoke coverage', () => {
  it('switches the HomeScreen hero slide', () => {
    const { container } = withProvider(<HomeScreen />)
    const hero = container.querySelector('.hero-slide')!
    expect(hero).toHaveStyle({ backgroundImage: expect.stringContaining('photo-1551269901') })
    fireEvent.click(screen.getByRole('button', { name: 'Show slide 2' }))
    expect(hero).toHaveStyle({ backgroundImage: expect.stringContaining('photo-1509316785289') })
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
