import { fireEvent, screen } from '@testing-library/react'
import { BottomNav, Header, Shell } from '../components/AppShell'
import { LanguageProvider } from '../components/LanguageContext'
import { withProvider } from './helpers'
import { setMockPathname } from './navigation'

describe('AppShell navigation', () => {
  beforeEach(() => setMockPathname('/'))

  it('marks the selected header language and changes it', () => {
    withProvider(<Header />)
    const mn = screen.getByRole('button', { name: 'MN' })
    const en = screen.getByRole('button', { name: 'EN' })
    expect(screen.getByRole('button', { name: 'KR' })).toHaveClass('active')
    fireEvent.click(en)
    expect(en).toHaveClass('active')
    expect(mn).not.toHaveClass('active')
  })

  it('opens and closes the mobile navigation menu', () => {
    withProvider(<Header />)
    const menu = screen.getByRole('button', { name: '메뉴' })
    expect(menu).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toHaveClass('is-open')
    fireEvent.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'false')
  })

  it('links the brand logo home', () => {
    withProvider(<Header />)
    const logo = screen.getByAltText('JIN Travel Mongolia')
    expect(logo).toHaveAttribute('src', '/logo-mark.jpg')
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })

  it('uses the hero header treatment only on hero pages', () => {
    const { container, unmount } = withProvider(<Header />)
    expect(container.querySelector('header')).toHaveClass('hero-topbar')
    unmount()
    setMockPathname('/contact')
    const nonHero = withProvider(<Header />)
    expect(nonHero.container.querySelector('header')).not.toHaveClass('hero-topbar')
    nonHero.unmount()
    setMockPathname('/tours/gobi-4d')
    const detail = withProvider(<Header />)
    expect(detail.container.querySelector('header')).toHaveClass('hero-topbar')
  })

  it('adds and removes the scrolled class and unsubscribes on unmount', () => {
    const { container, unmount } = withProvider(<Header />)
    const header = container.querySelector('header')!
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 30 })
    fireEvent.scroll(window)
    expect(header).toHaveClass('scrolled')
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 10 })
    fireEvent.scroll(window)
    expect(header).not.toHaveClass('scrolled')
    unmount()
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 40 })
    fireEvent.scroll(window)
    expect(header).not.toHaveClass('scrolled')
  })

  it('uses the mocked pathname for active bottom navigation and prefers a provided translator', () => {
    setMockPathname('/tours')
    withProvider(<BottomNav t={(key) => key === 'home' ? 'Provided home' : `provided ${key}`} />)
    expect(screen.getByRole('link', { name: 'provided tours' })).toHaveClass('active')
    expect(screen.getByRole('link', { name: 'Provided home' })).toBeInTheDocument()
  })

  it('renders children with the optional booking bar', () => {
    const { rerender } = withProvider(<Shell><p>Content</p></Shell>)
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /계속하기|예약 신청/ })).not.toBeInTheDocument()
    rerender(<LanguageProvider><Shell bookingBar><p>Content</p></Shell></LanguageProvider>)
    expect(screen.getByRole('link', { name: /예약 신청/ })).toBeInTheDocument()
  })
})
